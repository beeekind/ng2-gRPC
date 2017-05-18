import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home';
import { AboutComponent } from './components/about/about.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent }
];

export const routing = RouterModule.forRoot(appRoutes);
