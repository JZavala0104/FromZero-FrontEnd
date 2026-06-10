import { Routes } from '@angular/router';
import { Homecomponent } from './components/homecomponent/homecomponent';
import { Usuarioscomponent } from './components/usuarioscomponent/usuarioscomponent';
import { UsuariosList } from './components/usuarioscomponent/usuarios-list/usuarios-list';

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
        path:'proyectos',
        component:Usuarioscomponent,
        children:[
            {
                path:'listar',
                component:UsuariosList
            }
        ]
    }
];
