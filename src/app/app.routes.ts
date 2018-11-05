import { Routes } from '@angular/router';

// import { HomeComponent } from './home/home.component';
import { ListaConcursosComponent } from './concursos/lista-concursos/lista-concursos.component';
import { ListaBilhetesComponent } from './billhetes/lista-bilhetes/lista-bilhetes.component';

export const rootRouterConfig: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: ListaConcursosComponent },
    { path: 'bilhetes', component: ListaBilhetesComponent }
]