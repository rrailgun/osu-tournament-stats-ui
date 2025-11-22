import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { GroupedScoreResultByBeatmapId, GroupedScoresResult, Scores } from '../models/scores';
import { Tournament } from '../models/tournament';
import { Round } from '../models/round';
import { ScoreFilterService, ScoreFilterPayload } from './score-filter.service';

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
  apiUrl: string = environment.apiUrl + '/api';
  constructor(private http: HttpClient, private scoreFilterService: ScoreFilterService) {}

  groupedScoresQuery(): Observable<GroupedScoresResult[]> {
    let payload: ScoreFilterPayload = this.scoreFilterService.payload;
    return this.http.post<GroupedScoresResult[]>(this.apiUrl + '/scores/groupedQuery', payload);
  }

  getScoreGroupedByBeatmapId(): Observable<GroupedScoreResultByBeatmapId[]> {
    let payload: ScoreFilterPayload = this.scoreFilterService.payload;
    return this.http.post<GroupedScoreResultByBeatmapId[]>(this.apiUrl + '/scores/query/group/beatmap', payload);
  }

  getSelf(): Observable<User> {
    return this.http.get<User>(this.apiUrl+'/players/getSelf');
  }

  getScores(scoresQuery: ScoresQueryPayload = {}): Observable<Scores[]> {
    return this.http.post<Scores[]>(this.apiUrl+'/scores/query', scoresQuery)
  }

  getTournamentDetails(tournamentId: string): Observable<Tournament> {
    return this.http.get<Tournament>(this.apiUrl+'/tournaments/'+tournamentId);
  }

  getRounds(tournamentId: string): Observable<Round[]> {
    return this.http.get<Round[]>(this.apiUrl+'/tournaments'+tournamentId+'/rounds')
  }

  getTournaments(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(this.apiUrl+'/tournaments/search')
  }
}
