import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeatmapScoreTableComponent } from './beatmap-score-table.component';

describe('ScoreTableComponent', () => {
  let component: BeatmapScoreTableComponent;
  let fixture: ComponentFixture<BeatmapScoreTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeatmapScoreTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeatmapScoreTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
