import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { Tournament } from '../../models/tournament';
import { LoadingIndicatorComponent } from "../../components/common/loading-indicator/loading-indicator.component";
import { TournamentEditService } from '../../services/edit/tournament-edit.service';
import { RoundEditorComponent } from "../../components/editors/round-editor/round-editor.component";

@Component({
  selector: 'app-tournament-control-panel',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    FormsModule,
    LoadingIndicatorComponent,
    RoundEditorComponent
  ],
  templateUrl: './tournament-control-panel.component.html',
  styleUrls: ['./tournament-control-panel.component.css']
})
export class TournamentControlPanelComponent {

  private readonly route = inject(ActivatedRoute);
  private readonly tournamentService = inject(TournamentEditService);

  tournament$!: Observable<Tournament | null>;

  // two-way bound to input
  editedTitle = '';

  // selected round
  selectedRound: any = null;

  // modal state
  showAddRoundModal = false;
  newRoundName = '';
  isAddingRound = false;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('tournamentId');
    if (!id) return;

    this.tournamentService.loadTournament(id);

    // map tournament$ to initialize editedTitle and selectedRound reactively
    this.tournament$ = this.tournamentService.tournament$.pipe(
      tap(tournament => {
        if (tournament) {
          if (!this.editedTitle) this.editedTitle = tournament.name;
          if (!this.selectedRound && tournament.rounds?.length) {
            this.selectedRound = tournament.rounds[0];
          }
        }
      })
    );
  }

  saveTitle() {
    const trimmed = this.editedTitle.trim();
    if (!trimmed) return;
    this.tournamentService.updateTitle(trimmed);
  }

  selectRound(round: any) {
    this.selectedRound = round;
  }

  openAddRoundModal() {
    this.showAddRoundModal = true;
  }

  closeAddRoundModal() {
    this.showAddRoundModal = false;
    this.newRoundName = '';
  }

  addRound() {
    if (!this.newRoundName.trim() || this.isAddingRound) return;

    this.isAddingRound = true;

    this.tournamentService.createRound(this.newRoundName).subscribe({
      next: () => {
        this.isAddingRound = false;
        this.closeAddRoundModal();
      },
      error: (err) => {
        console.error('Failed to add round', err);
        this.isAddingRound = false;
      }
    });
  }
}