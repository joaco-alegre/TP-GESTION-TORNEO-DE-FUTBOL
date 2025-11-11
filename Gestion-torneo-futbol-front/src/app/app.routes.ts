import { Routes } from '@angular/router';
import { EquipoList} from './pages/equipo/equipo-list/equipo-list';
import { EquipoDetails } from './pages/equipo/equipo-details/equipo-details';
import { EquipoForm } from './pages/equipo/equipo-form/equipo-form';
import { Home } from './pages/home/home';
import { TorneoList } from './pages/torneo/torneo-list/torneo-list';
import { TorneoDetails } from './pages/torneo/torneo-details/torneo-details';
import { JugadorList } from './pages/jugador/jugador-list/jugador-list';
import { JugadorDetails } from './pages/jugador/jugador-details/jugador-details';
import { UsuarioHome } from './pages-admin/usuario/usuario-home/usuario-home';
import { UsuarioLogin } from './pages-admin/usuario/usuario-login/usuario-login';
import { FixtureDetails } from './pages/fixture/fixture-details/fixture-details';
import { TorneoAdmin } from './pages/admin/torneo-admin/torneo-admin';
import { TorneoListAdmin } from './pages-admin/torneo/torneo-list-admin/torneo-list-admin';
import { TorneoDetailsAdmin } from './pages-admin/torneo/torneo-details-admin/torneo-details-admin';
import { TorneoFormAdmin } from './pages-admin/torneo/torneo-form-admin/torneo-form-admin';
import { EquipoAdmin } from './pages/admin/equipo-admin/equipo-admin';
import { EquipoListAdmin } from './pages-admin/equipo/equipo-list-admin/equipo-list-admin';
import { EquipoDetailsAdmin } from './pages-admin/equipo/equipo-details-admin/equipo-details-admin';
import { EquipoFormAdmin } from './pages-admin/equipo/equipo-form-admin/equipo-form-admin';
import { JugadorListAdmin } from './pages-admin/jugadores/jugador-list-admin/jugador-list-admin';
import { JugadorDetailsAdmin } from './pages-admin/jugadores/jugador-details-admin/jugador-details-admin';
import { DtDetails } from './pages/dt/dt-details/dt-details';
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
    {path: 'torneos-admin', component: TorneoListAdmin},
    {path: 'torneo-details-admin/:id', component: TorneoDetailsAdmin},
    {path: 'torneo-formulario-admin/:id', component: TorneoFormAdmin},
    {path: 'torneo-formulario-admin', component: TorneoFormAdmin},
    {path: 'equipo-admin/:id', component: EquipoListAdmin},
    {path: 'equipo-details-admin/:id', component: EquipoDetailsAdmin},
    {path: 'equipo-formulario-admin/:id', component: EquipoFormAdmin},
    {path: 'equipo-formulario-admin', component: EquipoFormAdmin},
    {path: 'jugador-lista-admin/:id', component: JugadorListAdmin},
    {path: 'jugador-detalles-admin/:id', component: JugadorDetailsAdmin},
    {path: 'dt-detalles-admin/:id', component: DtDetailsAdmin},
    {path: 'dt-formulario-admin/:id', component: DtFormAdmin},
    {path: 'dt-formulario-admin', component: DtFormAdmin},
    {path: 'jugador-formulario-admin/:id', component: JugadorFormAdmin},
    {path: 'jugador-formulario-admin', component: JugadorFormAdmin},
    {path: 'fixture-detalles-admin/:id', component: FixtureDetailsAdmin},
    {path: 'fixture-form-admin/:id', component: FixtureFormAdmin},
    {path: 'dt-list-admin', component: DtListAdmin},
    {path: 'jugadores-libres-list-admin', component: JugadorLibreList},
    {path: 'panel-cotacto-admin', component: PanelContacto},
    {path: 'panel-noticias-admin', component: NoticiaList},
    {path: 'form-noticia-admin', component: NoticiaForm},






    {path: 'equipo/formulario', component: EquipoForm},
    {path: ' ', redirectTo: 'home', pathMatch: 'full'},
    /*{path: '**', redirectTo: 'home'},*/
    {path: 'es/inicio-sesion',
    title: 'Iniciar sesion - Goal Manager',
    component: UsuarioLogin},
    // {path:' ', redirectTo: 'home'}
];
