import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TournamentEditService } from '../../services/edit/tournament-edit.service';

@Component({
    selector: 'app-create-tournament',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './create-tournament.component.html',
    styleUrl: './create-tournament.component.css'
})
export class CreateTournamentComponent {
    tournamentName = '';
    isSubmitting = false;

    private readonly tournamentService = inject(TournamentEditService);
    private readonly router = inject(Router);

    onSubmit() {
        if (!this.tournamentName.trim()) return;

        this.isSubmitting = true;
        this.tournamentService.createTournament(this.tournamentName).subscribe({
            next: (tournament) => {
                this.router.navigate(['/tournament/edit', tournament.id]);
            },
            error: (err) => {
                console.error('Failed to create tournament', err);
                this.isSubmitting = false;
            }
        });
    }

    onCancel() {
        this.router.navigate(['/']);
    }
}
