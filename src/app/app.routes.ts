import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { PlayerPageComponent } from './pages/player-page/player-page.component';
import { TournamentPageComponent } from './pages/tournament-page/tournament-page.component';
import { TournamentControlPanelComponent } from './pages/tournament-control-panel/tournament-control-panel.component';
import { AuthLandingComponent } from './pages/auth/auth/auth-landing.component';
import { FailedComponent } from './pages/auth/failed/failed.component';

export const routes: Routes = [
    {
        path: '',
        component: LandingComponent
    },
    {
        path: 'auth',
        component: AuthLandingComponent
    },
    {
        path: 'login-failed',
        component: FailedComponent
    },
    {
        path: 'player/:playerId',
        component: PlayerPageComponent
    },
    {
        path: 'tournament/:tournamentId',
        component: TournamentPageComponent
    },
    {
        path: 'edit/:tournamentId',
        component: TournamentControlPanelComponent
    }
];
