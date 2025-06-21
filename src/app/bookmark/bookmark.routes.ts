import { importProvidersFrom } from "@angular/core"
import { Routes } from "@angular/router"

export const routes: Routes = [
    {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard').then(c => c.Dashboard)
    },
    {
        path: 'list',
        loadComponent: () => import('./list/list').then(c => c.List)
    },
    {
        path: 'collection/:id',
        loadComponent: () => import('./collection/collection').then(c => c.Collection)
    },
    {
        path: 'tag/:id',
        loadComponent: () => import('./tag/tag').then(c => c.Tag)
    },
    {
        path: 'create-collection',
        loadComponent: () => import('./create-collection/create-collection').then(c => c.CreateCollection),
        outlet: 'details'
    },
    {
        path: 'create-tag',
        loadComponent: () => import('./create-tag/create-tag').then(c => c.CreateTag),
        outlet: 'details'
    },
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    }
]