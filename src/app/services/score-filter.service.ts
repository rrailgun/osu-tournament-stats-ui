import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ScoreGroupBy } from '../enums/score.enum';

export interface ScoreFilterPayload {
  tournamentId?: string;
  roundId?: string;
  matchIds?: string[];
  playerIds?: string[];
  beatmapIds?: string[];
  groupBy: ScoreGroupBy;
}

@Injectable({
  providedIn: 'root'
})
export class ScoreFilterService {
  private readonly _payloadSubject = new BehaviorSubject<ScoreFilterPayload>({
    groupBy: ScoreGroupBy.BEATMAP_ID
  });
  readonly payload$ = this._payloadSubject.asObservable();

  private update(payload: Partial<ScoreFilterPayload>, remove?: (keyof ScoreFilterPayload)[]) {
    let next = {
      ...this._payloadSubject.value,
      ...payload
    };
    remove?.forEach(key => delete next[key]);
    this._payloadSubject.next(next);
  }

  private setFilter<K extends keyof ScoreFilterPayload>(key: K, value: ScoreFilterPayload[K]) {
    if (value === undefined) {
      this.update({}, [key]);
    } else {
      this.update({ [key]: value } as Partial<ScoreFilterPayload>);
    }
  }

  get payload(): ScoreFilterPayload {
    return this._payloadSubject.value;
  }

  setTournamentId(tournamentId: string | undefined) {
    this.setFilter('tournamentId', tournamentId);
  }

  setRoundId(roundId: string | undefined) {
    this.setFilter('roundId', roundId);
  }

  setMatchId(matchIds: string[]) {
    this.setFilter('matchIds', matchIds);
  }

  setPlayerId(playerIds: string[]) {
    this.setFilter('playerIds', playerIds);
  }

  setBeatmapId(beatmapIds: string[]) {
    this.setFilter('beatmapIds', beatmapIds);
  }
}
