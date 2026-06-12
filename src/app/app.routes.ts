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

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'homes',
        pathMatch: 'full'
    },
    {
        path: 'homes',
        component: Homecomponent
    },
    {
        path: 'roles',
        component: Rolescomponent,
        children:[
            {
                path:'listar',
                component:RolesList
            },
            {
                path:'registrar',
                component:RolesInsert
            }
        ]
    },
    {
        path:'usuarios',
        component:Usuarioscomponent,
        children:[
            {
                path:'listar',
                component:UsuariosList
            },
            {
                path:'registrar',
                component:UsuariosInsert
            }
        ]
    },
    {
        path:'proyectos',
        component:Proyectoscomponent,
        children:[
            {
                path:'listar',
                component:ProyectosList
            },
            {
                path:'registrar',
                component:ProyectosInsert
            }
        ]
    }
];
