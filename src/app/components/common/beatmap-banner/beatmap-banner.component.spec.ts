import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeatmapBannerComponent } from './beatmap-banner.component';

describe('BeatmapBannerComponent', () => {
  let component: BeatmapBannerComponent;
  let fixture: ComponentFixture<BeatmapBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeatmapBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeatmapBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
