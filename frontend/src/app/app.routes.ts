import { Routes } from '@angular/router';
import {Layout} from './layout/layout';

export const routes: Routes = [
  {
    path: 'identity',
    loadChildren: () => import('./identity/identity.routes').then(m => m.routes)
  },
  {
    path: 'app',
    component: Layout,
    children: [
      {
        path: 'bookmark',
        loadChildren: () => import('./bookmark/bookmark.routes').then(m => m.routes)
      },
      {
        path: 'settings',
        loadComponent: () => import('./settings/settings').then(c => c.Settings)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'app/bookmark/dashboard',
    pathMatch: 'full'
  }
];
