import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Tournament } from '../../models/tournament';
import { LoadingIndicatorComponent } from "../../components/common/loading-indicator/loading-indicator.component";
import { TournamentService } from '../../services/edit/tournament-edit.service';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { RoundEditorComponent } from "../../components/editors/round-editor/round-editor.component";


@Component({
  selector: 'app-tournament-control-panel',
  imports: [CommonModule, AsyncPipe, FormsModule, LoadingIndicatorComponent, NgbNavModule, RoundEditorComponent],
  templateUrl: './tournament-control-panel.component.html',
  styleUrl: './tournament-control-panel.component.css'
})
export class TournamentControlPanelComponent {
  tournament$!: Observable<Tournament | null>;
  editedTitle = '';


  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly tournamentService: TournamentService = inject(TournamentService)

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('tournamentId');
    this.tournamentService.loadTournament(id!);
    this.tournament$ = this.tournamentService.tournament$;
    this.tournament$.subscribe(tournament => {
      if (tournament) {
        this.editedTitle = tournament.name;
      }
    });

  }

  saveTitle() {
    this.tournamentService.updateTitle(this.editedTitle);
  }
}
