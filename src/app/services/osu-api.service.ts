import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { Scores } from '../models/scores';

export type ScoresQueryPayload = {
  tournamentId?: string,
  playerId?: number,
  matchId?: number,
  beatmapId?: number
}

@Injectable({
  providedIn: 'root'
})
export class OsuApiService {

  apiUrl: string = environment.apiUrl+'/api'
  constructor(private http: HttpClient) {}

  getSelf(): Observable<User> {
    return this.http.get<User>(this.apiUrl+'/players/getSelf');
  }

  getScores(scoresQuery: ScoresQueryPayload = {}): Observable<Scores[]> {
    return this.http.post<Scores[]>(this.apiUrl+'/scores/query', scoresQuery)
  }
}
