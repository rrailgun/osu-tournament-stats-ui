import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Tournament } from '../../models/tournament';
import { Round } from '../../models/round';
import { HttpClient } from '@angular/common/http';
import { OsuApiService } from '../osu-api.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TournamentEditService {
  private readonly osuApi: OsuApiService = inject(OsuApiService);
  private readonly httpService: HttpClient = inject(HttpClient);

  private apiUrl: string = environment.apiUrl + '/api'

  private tournamentSubject = new BehaviorSubject<Tournament | null>(null);

  public tournament$: Observable<Tournament | null> = this.tournamentSubject.asObservable();

  loadTournament(tournamentId: string) {
    this.httpService.get<Tournament>(this.apiUrl + '/tournaments/' + tournamentId)
      .subscribe(res => {
        this.tournamentSubject.next(res);
      })
  }

  updateTitle(newTitle: string) {
    const currentTournament = this.tournamentSubject.value;
    if (currentTournament) {
      const updatedTournament = {
        ...currentTournament,
        name: newTitle,
      };
      this.tournamentSubject.next(updatedTournament);
    }
  }

  createTournament(name: string): Observable<Tournament> {
    return this.osuApi.createTournament(name);
  }

  createRound(name: string): Observable<Round> {
    const currentTournament = this.tournamentSubject.value;
    if (!currentTournament) {
      throw new Error("No tournament loaded");
    }

    return new Observable<Round>(observer => {
      this.osuApi.createRound(currentTournament.id, name).subscribe({
        next: (newRound) => {
          const updatedTournament = {
            ...currentTournament,
            rounds: [...(currentTournament.rounds || []), newRound]
          };
          this.tournamentSubject.next(updatedTournament);
          observer.next(newRound);
          observer.complete();
        },
        error: (err) => observer.error(err)
      });
    });
  }
}
