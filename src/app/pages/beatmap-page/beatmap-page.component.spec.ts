import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeatmapPageComponent } from './beatmap-page.component';

describe('BeatmapPageComponent', () => {
  let component: BeatmapPageComponent;
  let fixture: ComponentFixture<BeatmapPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeatmapPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeatmapPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
