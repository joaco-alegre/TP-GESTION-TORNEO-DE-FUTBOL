import { Routes } from '@angular/router';
import { EquipoDetails } from './pages/equipo/equipo-details/equipo-details';
import { Home } from './pages/home/home';
import { TorneoList } from './pages/torneo/torneo-list/torneo-list';
import { TorneoDetails } from './pages/torneo/torneo-details/torneo-details';
import { JugadorDetails } from './pages/jugador/jugador-details/jugador-details';
import { UsuarioHome } from './pages-admin/usuario/usuario-home/usuario-home';
import { UsuarioLogin } from './pages-admin/usuario/usuario-login/usuario-login';
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
import { ContenedorLayoutAdmin } from './component/layout/contenedor-layout-admin/contenedor-layout-admin';
import { ContenedorLayoutDt } from './component/layout/contenedor-layout-dt/contenedor-layout-dt';
import { ContenedorLayoutHincha } from './component/layout/contenedor-layout-hincha/contenedor-layout-hincha';





export const routes: Routes = [
  
  { path: '', redirectTo: 'es', pathMatch: 'full' },


  {path: '',
  component: ContenedorLayoutHincha,
  children: [   
    {path: '', component: Home, title: 'Inicio - Goal Manager'},
    {path: 'en', component: Home, title: 'Home - Goal Manager'},
    {path: 'es/torneos', component: TorneoList, title: 'Torneos - Goal Manager'},
    {path: 'es/torneos/:id', component: TorneoDetails},
    {path: 'es/equipos/:id', component: EquipoDetails},
    {path: 'es/jugadores/:id', component: JugadorDetails},
    {path: 'es/fixture/:id', component: FixtureDetails},
        {path: 'es/inicio-sesion', title: 'Iniciar sesion - Goal Manager', component: UsuarioLogin},
  ]},


    {
    path: 'admin',
    component: ContenedorLayoutAdmin,
    children: [
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
    {path: 'form-noticia-admin/:id', component: NoticiaForm},
    {path: 'usuario-list-admin', component: UsuarioList},
    {path: 'usuario-form-admin', component: UsuarioForm},
    {path: 'usuario-form-admin/:id', component: UsuarioForm},
    {path: 'usuario-details-admin/:id', component: UsuarioDetails},
    ]
  },


    
    {path: 'dt',
    component: ContenedorLayoutDt,
    children: [
    {path: 'dt-home', component: DtHome},
    {path: 'dt-mi-equipo', component: DtEquipoDetails},
    {path: 'dt-jugador-details/:id', component: DtJugadorDetails},
    {path: 'dt-jugadores-libres', component: DtJugadorList},
    {path: 'dt-dt-details/:id', component: DtDtDetails},
    {path: 'dt-dt-form/:id', component: DtDtForm},
    ]
    },



    {path: '**', redirectTo: 'es'},
];
