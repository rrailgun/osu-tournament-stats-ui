import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Tournament } from '../../models/tournament';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  private readonly httpService: HttpClient = inject(HttpClient);

  private apiUrl: string = environment.apiUrl+'/api'

  private tournamentSubject = new BehaviorSubject<Tournament | null>(null);

  public tournament$: Observable<Tournament | null> = this.tournamentSubject.asObservable();

  loadTournament(tournamentId: string) {
    this.httpService.get<Tournament>(this.apiUrl + '/tournaments/' + tournamentId)
      .subscribe( res => {
        this.tournamentSubject.next(res);
      })
  }

  updateTitle(newTitle: string) {
    const currentTournament = this.tournamentSubject.value;
    if (currentTournament) {
      const updatedTournament = {
        ...currentTournament,
        title: newTitle,
      };
      this.tournamentSubject.next(updatedTournament);
    }
  }
}
