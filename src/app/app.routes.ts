import { Routes } from '@angular/router';
import {LoginComponent} from './pages/login/login.component'
import {BoardsComponent} from './pages/boards/boards.component'
import {BoardComponent} from './pages/board/board.component'
import {ScrollComponent} from './pages/scroll/scroll.component'
import { TableComponent } from './pages/table/table.component'
import {ForgotPasswordComponent} from './../app/pages/forgot-password/forgot-password.component';
import{RegisterFormComponent} from './components/auth/register-form/register-form.component'
import {ProfileComponent} from './../app/pages/profile/profile.component'
import { UsersComponent } from './pages/users/users.component';
import {RecoveryComponent} from '../app/pages/recovery/recovery.component'
import {authGuard} from './guards/auth.guard'
import { redirectGuard } from './guards/redirect.guard';

export const routes: Routes = [
    {
        path: '',
        //loadComponent: () => import('../app/pages/login/login.component').then( m => m.LoginComponent)
        component: LoginComponent
    },
    {
        path: 'login',
        canActivate: [redirectGuard],
        //loadComponent: () => import('../app/pages/login/login.component').then( m => m.LoginComponent)
        component: LoginComponent

    },
    {
        path: 'board',
        canActivate: [authGuard],
        //loadComponent: () => import('../app/pages/boards/boards.component').then( m => m.BoardsComponent)
        component: BoardsComponent

    },
    {
        path: 'board/:id',
        canActivate: [authGuard],
        //loadComponent: () => import('../app/pages/board/board.component').then( m => m.BoardComponent)
        component: BoardComponent

    },
    {
        path: 'scroll',
        canActivate: [authGuard],
        //loadComponent: () => import('../app/pages/scroll/scroll.component').then( m => m.ScrollComponent)
        component: ScrollComponent
    },
    {
        path: 'table',
        canActivate: [authGuard],
        //loadComponent: () => import('../app/pages/table/table.component').then( m => m.TableComponent)
        component: TableComponent
    },
    {
        path: 'forgot-password',
        canActivate: [redirectGuard],
        //loadComponent: () => import('../app/pages/forgot-password/forgot-password.component').then( m => m.ForgotPasswordComponent),
        component: ForgotPasswordComponent
    },
    {
        path: 'register',
        canActivate: [redirectGuard],
        //loadComponent: () => import('../app/pages/register/register.component').then( m => m.RegisterComponent)
        component: RegisterFormComponent
    },
    {
        path: 'profile',
        canActivate: [authGuard],
        //loadComponent: () => import('../app/pages/profile/profile.component').then( m => m.ProfileComponent)
        component: ProfileComponent
    },
    {
        path: 'user',
        canActivate: [authGuard],
        //loadComponent: () => import('../app/pages/users/users.component').then( m => m.UsersComponent)
        component: UsersComponent
    },
    {
        path: 'recovery',
        canActivate: [redirectGuard],
        //loadComponent: () => import('../app/pages/recovery/recovery.component').then( m => m.RecoveryComponent)
        component: RecoveryComponent
    }
   
];
