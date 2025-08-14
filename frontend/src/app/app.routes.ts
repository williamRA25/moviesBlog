import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PostDetailComponent } from './pages/post-detail/post-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'post/:id', component: PostDetailComponent },
  { path: '**', redirectTo: '' }
];
