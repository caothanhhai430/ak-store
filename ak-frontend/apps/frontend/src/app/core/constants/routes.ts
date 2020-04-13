import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: 'welcome',
    loadChildren: () =>
      import('../containers/welcome/welcome.module').then(m => m.WelcomeModule)
  }
];
