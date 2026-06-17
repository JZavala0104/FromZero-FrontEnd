import { Routes } from '@angular/router';
import { Homecomponent } from './components/homecomponent/homecomponent';
import { Usuarioscomponent } from './components/usuarioscomponent/usuarioscomponent';
import { UsuariosList } from './components/usuarioscomponent/usuarios-list/usuarios-list';
import { UsuariosInsert } from './components/usuarioscomponent/usuarios-insert/usuarios-insert';
import { Rolescomponent } from './components/rolescomponent/rolescomponent';
import { RolesList } from './components/rolescomponent/roles-list/roles-list';
import { RolesInsert } from './components/rolescomponent/roles-insert/roles-insert';
import { Proyectoscomponent } from './components/proyectoscomponent/proyectoscomponent';
import { ProyectosList } from './components/proyectoscomponent/proyectos-list/proyectos-list';
import { ProyectosInsert } from './components/proyectoscomponent/proyectos-insert/proyectos-insert';
import { ProyectosUpdate } from './components/proyectoscomponent/proyectos-update/proyectos-update';
import { Empresascomponent } from './components/empresascomponent/empresascomponent';
import { EmpresasList } from './components/empresascomponent/empresas-list/empresas-list';
import { EmpresasInsert } from './components/empresascomponent/empresas-insert/empresas-insert';
import { RolesUpdate } from './components/rolescomponent/roles-update/roles-update';
import { UsuariosUpdate } from './components/usuarioscomponent/usuarios-update/usuarios-update';
import { Codigogeneradocomponent } from './components/codigogeneradocomponent/codigogeneradocomponent';
import { CodigogeneradoList } from './components/codigogeneradocomponent/codigogenerado-list/codigogenerado-list';
import { CodigogeneradoUpdate } from './components/codigogeneradocomponent/codigogenerado-update/codigogenerado-update';
import { CodigogeneradoInsert } from './components/codigogeneradocomponent/codigogenerado-insert/codigogenerado-insert';
import { Desarrolladorescomponent } from './components/desarrolladorescomponent/desarrolladorescomponent';
import { DesarrolladoresList } from './components/desarrolladorescomponent/desarrolladores-list/desarrolladores-list';
import { DesarrolladoresUpdate } from './components/desarrolladorescomponent/desarrolladores-update/desarrolladores-update';
import { DesarrolladoresInsert } from './components/desarrolladorescomponent/desarrolladores-insert/desarrolladores-insert';
import { Mensajescomponent } from './components/mensajescomponent/mensajescomponent';
import { MensajesList } from './components/mensajescomponent/mensajes-list/mensajes-list';
import { MensajesUpdate } from './components/mensajescomponent/mensajes-update/mensajes-update';
import { MensajesInsert } from './components/mensajescomponent/mensajes-insert/mensajes-insert';
import { Notificacionescomponent } from './components/notificacionescomponent/notificacionescomponent';
import { NotificacionesList } from './components/notificacionescomponent/notificaciones-list/notificaciones-list';
import { NotificacionesInsert } from './components/notificacionescomponent/notificaciones-insert/notificaciones-insert';
import { NotificacionesUpdate } from './components/notificacionescomponent/notificaciones-update/notificaciones-update';
import { ProyectodesarrolladorInsert } from './components/proyectodesarrolladorcomponent/proyectodesarrollador-insert/proyectodesarrollador-insert';
import { Proyectodesarrolladorcomponent } from './components/proyectodesarrolladorcomponent/proyectodesarrolladorcomponent';
import { ProyectodesarrolladorList } from './components/proyectodesarrolladorcomponent/proyectodesarrollador-list/proyectodesarrollador-list';
import { ProyectodesarrolladorUpdate } from './components/proyectodesarrolladorcomponent/proyectodesarrollador-update/proyectodesarrollador-update';
import { Revisionescomponent } from './components/revisionescomponent/revisionescomponent';
import { RevisionesList } from './components/revisionescomponent/revisiones-list/revisiones-list';
import { RevisionesInsert } from './components/revisionescomponent/revisiones-insert/revisiones-insert';
import { RevisionesUpdate } from './components/revisionescomponent/revisiones-update/revisiones-update';
import { Tareascomponent } from './components/tareascomponent/tareascomponent';
import { TareasList } from './components/tareascomponent/tareas-list/tareas-list';
import { TareasInsert } from './components/tareascomponent/tareas-insert/tareas-insert';
import { TareasUpdate } from './components/tareascomponent/tareas-update/tareas-update';
import { Tipsiacomponent } from './components/tipsiacomponent/tipsiacomponent';
import { TipsiaList } from './components/tipsiacomponent/tipsia-list/tipsia-list';
import { TipsiaInsert } from './components/tipsiacomponent/tipsia-insert/tipsia-insert';
import { TipsiaUpdate } from './components/tipsiacomponent/tipsia-update/tipsia-update';
import { Valoracionescomponent } from './components/valoracionescomponent/valoracionescomponent';
import { ValoracionesList } from './components/valoracionescomponent/valoraciones-list/valoraciones-list';
import { ValoracionesInsert } from './components/valoracionescomponent/valoraciones-insert/valoraciones-insert';
import { ValoracionesUpdate } from './components/valoracionescomponent/valoraciones-update/valoraciones-update';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'homes',
    pathMatch: 'full',
  },
  {
    path: 'homes',
    component: Homecomponent,
  },
  {
    path: 'codigosgenerados',
    component: Codigogeneradocomponent,
    children: [
      { path: 'listar', component: CodigogeneradoList },
      { path: 'registrar', component: CodigogeneradoInsert },
      { path: 'editar/:id', component: CodigogeneradoUpdate },
    ],
  },
  {
    path: 'desarrolladores',
    component: Desarrolladorescomponent,
    children: [
      { path: 'listar', component: DesarrolladoresList },
      { path: 'registrar', component: DesarrolladoresInsert },
      { path: 'editar/:id', component: DesarrolladoresUpdate },
    ],
  },
  {
    path: 'mensajes',
    component: Mensajescomponent,
    children: [
      { path: 'listar', component: MensajesList },
      { path: 'registrar', component: MensajesInsert },
      { path: 'editar/:id', component: MensajesUpdate },
    ],
  },
  {
    path: 'notificaciones',
    component: Notificacionescomponent,
    children: [
      { path: 'listar', component: NotificacionesList },
      { path: 'registrar', component: NotificacionesInsert },
      { path: 'editar/:id', component: NotificacionesUpdate },
    ],
  },
  {
    path: 'proyectodesarrolladores',
    component: Proyectodesarrolladorcomponent,
    children: [
      { path: 'listar', component: ProyectodesarrolladorList },
      { path: 'registrar', component: ProyectodesarrolladorInsert },
      { path: 'editar/:id', component: ProyectodesarrolladorUpdate },
    ],
  },
  {
    path: 'revisiones',
    component: Revisionescomponent,
    children: [
      { path: 'listar', component: RevisionesList },
      { path: 'registrar', component: RevisionesInsert },
      { path: 'editar/:id', component: RevisionesUpdate },
    ],
  },
  {
    path: 'tareas',
    component: Tareascomponent,
    children: [
      { path: 'listar', component: TareasList },
      { path: 'registrar', component: TareasInsert },
      { path: 'editar/:id', component: TareasUpdate },
    ],
  },
  {
    path: 'tipsia',
    component: Tipsiacomponent,
    children: [
      { path: 'listar', component: TipsiaList },
      { path: 'registrar', component: TipsiaInsert },
      { path: 'editar/:id', component: TipsiaUpdate },
    ],
  },
  {
    path: 'roles',
    component: Rolescomponent,
    children: [
      { path: 'listar', component: RolesList },
      { path: 'registrar', component: RolesInsert },
      { path: 'editar/:id', component: RolesUpdate },
    ],
  },
  {
    path: 'usuarios',
    component: Usuarioscomponent,
    children: [
      { path: 'listar', component: UsuariosList },
      { path: 'registrar', component: UsuariosInsert },
      { path: 'editar/:id', component: UsuariosUpdate },
    ],
  },
  {
    path: 'valoraciones',
    component: Valoracionescomponent,
    children: [
      { path: 'listar', component: ValoracionesList },
      { path: 'registrar', component: ValoracionesInsert },
      { path: 'editar/:id', component: ValoracionesUpdate },
    ],
  },
  {
    path: 'proyectos',
    component: Proyectoscomponent,
    children: [
      { path: 'listar', component: ProyectosList },
      { path: 'registrar', component: ProyectosInsert },
      { path: 'editar/:id', component: ProyectosUpdate },
    ],
  },
  {
    path: 'empresas',
    component: Empresascomponent,
    children: [
      { path: 'listar', component: EmpresasList },
      { path: 'registrar', component: EmpresasInsert },
    ],
  },
];
