import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentControlPanelComponent } from './tournament-control-panel.component';

describe('TournamentControlPanelComponent', () => {
  let component: TournamentControlPanelComponent;
  let fixture: ComponentFixture<TournamentControlPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TournamentControlPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TournamentControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
