import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'todo', loadChildren: () => import('./pages/todo/todo.module').then(m => m.TodoModule) },
      { path: 'user', loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule) },
      { path: '', pathMatch: 'full', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
