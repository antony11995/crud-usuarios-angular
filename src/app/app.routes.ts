import { Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },  
  { path: 'home', component: UserListComponent },
  { path: 'user/:id', component: UserDetailComponent },
  { path: 'newuser', component: UserFormComponent },
  { path: 'updateuser/:id', component: UserFormComponent },  
  { path: '**', component: NotFoundComponent },
];
