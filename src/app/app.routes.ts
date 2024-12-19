import { Routes } from '@angular/router';
import { SportsComponent } from './components/sports/sports.component';

export const routes: Routes = [
    { path: '', redirectTo: '/sports', pathMatch: 'full' },
    { path: 'sports', component: SportsComponent },
    { path: 'sports/:id', component: SportsComponent },
];