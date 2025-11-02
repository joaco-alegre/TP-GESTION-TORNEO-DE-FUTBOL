import { Routes } from '@angular/router';
import { EquipoList} from './pages/equipo/equipo-list/equipo-list';
import { EquipoDetails } from './pages/equipo/equipo-details/equipo-details';
import { EquipoForm } from './pages/equipo/equipo-form/equipo-form';
import { Home } from './pages/home/home';
import { TorneoList } from './pages/torneo/torneo-list/torneo-list';
import { TorneoDetails } from './pages/torneo/torneo-details/torneo-details';
import { JugadorList } from './pages/jugador/jugador-list/jugador-list';
import { JugadorDetails } from './pages/jugador/jugador-details/jugador-details';
import { UsuarioForm } from './pages/usuario/usuario-form/usuario-form';
import { UsuarioHome } from './pages/usuario/usuario-home/usuario-home';
import { UsuarioLogin } from './pages/usuario/usuario-login/usuario-login';
import { FixtureDetails } from './pages/fixture/fixture-details/fixture-details';
import { TorneoAdmin } from './pages/admin/torneo-admin/torneo-admin';
import { TorneoListAdmin } from './pages-admin/torneo/torneo-list-admin/torneo-list-admin';
import { TorneoDetailsAdmin } from './pages-admin/torneo/torneo-details-admin/torneo-details-admin';
import { TorneoFormAdmin } from './pages-admin/torneo/torneo-form-admin/torneo-form-admin';

export const routes: Routes = [
    {path: 'es', 
    component: Home,
    title: 'Inicio - Goal Manager'},
    {path: 'en', 
    component: Home,
     title: 'Home - Goal Manager'},
    {path: 'es/torneos', 
    component: TorneoList,
    title: 'Torneos - Goal Manager'},
    {path: 'es/torneos/:id',
    component: TorneoDetails},
    {path: 'es/equipos/:id', component: EquipoDetails},
    {path: 'es/jugadores/:id', component: JugadorDetails},
    {path: 'es/fixture/:id', component: FixtureDetails},
    {path: 'torneos-admin', component: TorneoListAdmin},
    {path: 'torneo-details-admin/:id', component: TorneoDetailsAdmin},
    {path: 'torneo-formulario-admin/:id', component: TorneoFormAdmin},
    {path: 'torneo-formulario-admin', component: TorneoFormAdmin},
    {path: 'equipo/formulario', component: EquipoForm},
    {path: ' ', redirectTo: 'home', pathMatch: 'full'},
    {path: '**', redirectTo: 'home'},
    {path: 'es/inicio-sesion',
    title: 'Iniciar sesion - Goal Manager',
    component: UsuarioLogin},
    {path: 'usuario-home', component: UsuarioHome,},
    {path:' ', redirectTo: 'home'}
];
