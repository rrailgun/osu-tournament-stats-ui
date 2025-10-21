import { TestBed } from '@angular/core/testing';

import { TournamentEditService } from './tournament-edit.service';

describe('TournamentEditService', () => {
  let service: TournamentEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TournamentEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
