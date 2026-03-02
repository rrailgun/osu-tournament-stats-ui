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

  it('opens modal when openAddRoundModal is called', () => {
    expect(component.showAddRoundModal).toBeFalse();
    component.openAddRoundModal();
    expect(component.showAddRoundModal).toBeTrue();
  });

  it('handles add round event by calling service and closing modal', () => {
    component.showAddRoundModal = true;
    component.isAddingRound = false;
    const spy = spyOn((component as any).tournamentService, 'createRound').and.returnValue({
      subscribe: (opts: any) => opts.next({ round_id: 1, round_name: 'x' })
    });

    component.handleAddRound('My Round');
    expect(spy).toHaveBeenCalledWith('My Round');
    expect(component.showAddRoundModal).toBeFalse();
    expect(component.isAddingRound).toBeFalse();
  });
});
