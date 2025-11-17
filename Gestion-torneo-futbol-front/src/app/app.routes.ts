import { Routes } from '@angular/router';
import { EquipoDetails } from './pages/equipo/equipo-details/equipo-details';
import { Home } from './pages/home/home';
import { TorneoList } from './pages/torneo/torneo-list/torneo-list';
import { TorneoDetails } from './pages/torneo/torneo-details/torneo-details';
import { JugadorDetails } from './pages/jugador/jugador-details/jugador-details';
import { UsuarioHome } from './pages-admin/usuario/usuario-home/usuario-home';
import { UsuarioLogin } from './pages-admin/usuario/usuario-login/usuario-login';
import { RoleGuard } from './guards/role.guard';
import { FixtureDetails } from './pages/fixture/fixture-details/fixture-details';
import { TorneoListAdmin } from './pages-admin/torneo/torneo-list-admin/torneo-list-admin';
import { TorneoDetailsAdmin } from './pages-admin/torneo/torneo-details-admin/torneo-details-admin';
import { TorneoFormAdmin } from './pages-admin/torneo/torneo-form-admin/torneo-form-admin';
import { EquipoListAdmin } from './pages-admin/equipo/equipo-list-admin/equipo-list-admin';
import { EquipoDetailsAdmin } from './pages-admin/equipo/equipo-details-admin/equipo-details-admin';
import { EquipoFormAdmin } from './pages-admin/equipo/equipo-form-admin/equipo-form-admin';
import { JugadorListAdmin } from './pages-admin/jugadores/jugador-list-admin/jugador-list-admin';
import { JugadorDetailsAdmin } from './pages-admin/jugadores/jugador-details-admin/jugador-details-admin';
import { DtDetailsAdmin } from './pages-admin/dt/dt-details-admin/dt-details-admin';
import { DtFormAdmin } from './pages-admin/dt/dt-form-admin/dt-form-admin';
import { JugadorFormAdmin } from './pages-admin/jugadores/jugador-form-admin/jugador-form-admin';
import { FixtureDetailsAdmin } from './pages-admin/fixture/fixture-details-admin/fixture-details-admin';
import { FixtureFormAdmin } from './pages-admin/fixture/fixture-form-admin/fixture-form-admin';
import { DtListAdmin } from './pages-admin/dt/dt-list-admin/dt-list-admin';
import { JugadorLibreList } from './pages-admin/jugadores/jugador-libre-list/jugador-libre-list';
import { PanelContacto } from './pages-admin/usuario/panel-contacto/panel-contacto';
import { NoticiaList } from './pages-admin/noticia/noticia-list/noticia-list';
import { NoticiaForm } from './pages-admin/noticia/noticia-form/noticia-form';
import { UsuarioList } from './pages-admin/usuario/usuario-list/usuario-list';
import { UsuarioForm } from './pages-admin/usuario/usuario-form/usuario-form';
import { UsuarioDetails } from './pages-admin/usuario/usuario-details/usuario-details';
import { DtHome } from './pages-dt/home/dt-home/dt-home';
import { DtEquipoDetails } from './pages-dt/equipo/dt-equipo-details/dt-equipo-details';
import { DtJugadorDetails } from './pages-dt/jugador/dt-jugador-details/dt-jugador-details';
import { DtJugadorList } from './pages-dt/jugador/dt-jugador-list/dt-jugador-list';
import { DtDtDetails } from './pages-dt/dt/dt-dt-details/dt-dt-details';
import { DtDtForm } from './pages-dt/dt/dt-dt-form/dt-dt-form';

export const routes: Routes = [
    {path: '', 
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
    {path: 'usuario-home', component: UsuarioHome},
    {path: 'torneos-admin', component: TorneoListAdmin, canActivate: [RoleGuard], data: { roles: ['ADMINISTRADOR'] }},
    {path: 'torneo-details-admin/:id', component: TorneoDetailsAdmin, canActivate: [RoleGuard], data: { roles: ['ADMINISTRADOR'] }},
    {path: 'torneo-formulario-admin/:id', component: TorneoFormAdmin, canActivate: [RoleGuard], data: { roles: ['ADMINISTRADOR'] }},
    {path: 'torneo-formulario-admin', component: TorneoFormAdmin, canActivate: [RoleGuard], data: { roles: ['ADMINISTRADOR'] }},
    {path: 'equipo-admin/:id', component: EquipoListAdmin, canActivate: [RoleGuard], data: { roles: ['ADMINISTRADOR'] }},
    {path: 'equipo-details-admin/:id', component: EquipoDetailsAdmin, canActivate: [RoleGuard], data: { roles: ['ADMINISTRADOR'] }},
    {path: 'equipo-formulario-admin/:id', component: EquipoFormAdmin, canActivate: [RoleGuard], data: { roles: ['ADMINISTRADOR'] }},
    {path: 'equipo-formulario-admin', component: EquipoFormAdmin, canActivate: [RoleGuard], data: { roles: ['ADMINISTRADOR'] }},
    {path: 'jugador-lista-admin/:id', component: JugadorListAdmin, canActivate: [RoleGuard], data: { roles: ['ADMINISTRADOR'] }},
    {path: 'jugador-detalles-admin/:id', component: JugadorDetailsAdmin, canActivate: [RoleGuard], data: { roles: ['ADMINISTRADOR'] }},
    {path: 'dt-detalles-admin/:id', component: DtDetailsAdmin, canActivate: [RoleGuard], data: { roles: ['ADMINISTRADOR'] }},
    {path: 'dt-formulario-admin/:id', component: DtFormAdmin, canActivate: [RoleGuard], data: { roles: ['ADMINISTRADOR'] }},
    {path: 'dt-formulario-admin', component: DtFormAdmin, canActivate: [RoleGuard], data: { roles: ['ADMINISTRADOR'] }},
    {path: 'jugador-formulario-admin/:id', component: JugadorFormAdmin, canActivate: [RoleGuard], data: { roles: ['ADMINISTRADOR'] }},
    {path: 'jugador-formulario-admin', component: JugadorFormAdmin, canActivate: [RoleGuard], data: { roles: ['ADMINISTRADOR'] }},
    {path: 'fixture-detalles-admin/:id', component: FixtureDetailsAdmin, canActivate: [RoleGuard], data: { roles: ['ADMINISTRADOR'] }},
    {path: 'fixture-form-admin/:id', component: FixtureFormAdmin, canActivate: [RoleGuard], data: { roles: ['ADMINISTRADOR'] }},
    {path: 'dt-list-admin', component: DtListAdmin, canActivate: [RoleGuard], data: { roles: ['ADMINISTRADOR'] }},
    {path: 'jugadores-libres-list-admin', component: JugadorLibreList, canActivate: [RoleGuard], data: { roles: ['ADMINISTRADOR'] }},
    {path: 'panel-cotacto-admin', component: PanelContacto, canActivate: [RoleGuard], data: { roles: ['ADMINISTRADOR'] }},
    {path: 'panel-noticias-admin', component: NoticiaList, canActivate: [RoleGuard], data: { roles: ['ADMINISTRADOR'] }},
    {path: 'form-noticia-admin', component: NoticiaForm, canActivate: [RoleGuard], data: { roles: ['ADMINISTRADOR'] }},
    {path: 'form-noticia-admin/:id', component: NoticiaForm, canActivate: [RoleGuard], data: { roles: ['ADMINISTRADOR'] }},
    {path: 'usuario-list-admin', component: UsuarioList, canActivate: [RoleGuard], data: { roles: ['ADMINISTRADOR'] }},
    {path: 'usuario-form-admin', component: UsuarioForm, canActivate: [RoleGuard], data: { roles: ['ADMINISTRADOR'] }},
    {path: 'usuario-form-admin/:id', component: UsuarioForm, canActivate: [RoleGuard], data: { roles: ['ADMINISTRADOR'] }},
    {path: 'usuario-details-admin/:id', component: UsuarioDetails, canActivate: [RoleGuard], data: { roles: ['ADMINISTRADOR'] }},
    {path: 'dt-home', component: DtHome, canActivate: [RoleGuard], data: { roles: ['DT'] }},
    {path: 'dt-mi-equipo', component: DtEquipoDetails, canActivate: [RoleGuard], data: { roles: ['DT'] }},
    {path: 'dt-jugador-details/:id', component: DtJugadorDetails, canActivate: [RoleGuard], data: { roles: ['DT'] }},
    {path: 'dt-jugadores-libres', component: DtJugadorList, canActivate: [RoleGuard], data: { roles: ['DT'] }},
    {path: 'dt-dt-details/:id', component: DtDtDetails, canActivate: [RoleGuard], data: { roles: ['DT'] }},
    {path: 'dt-dt-form/:id', component: DtDtForm, canActivate: [RoleGuard], data: { roles: ['DT'] }},











    {path: ' ', redirectTo: 'home', pathMatch: 'full'},
    /*{path: '**', redirectTo: 'home'},*/
    {path: 'es/inicio-sesion',
    title: 'Iniciar sesion - Goal Manager',
    component: UsuarioLogin},
     {
    path: 'home',
    loadComponent: () => import('./pages/home/home').then(m => m.Home),
  }
    // {path:' ', redirectTo: 'home'}
];
