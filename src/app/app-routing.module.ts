import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardsGuard } from './guards/auth-guards.guard';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { EditarEmprestimoComponent } from './views/editar-emprestimo/editar-emprestimo.component';
import { HomeComponent } from './views/home/home.component';
import { InscreverComponent } from './views/inscrever/inscrever.component';
import { LivrosComponent } from './views/livros/livros.component';
import { LoginComponent } from './views/login/login.component';
import { NovoEmprestimoComponent } from './views/novo-emprestimo/novo-emprestimo.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardsGuard],
    title: "Home"
  },
  {
    path: 'login',
    component: LoginComponent,
    title: "Login"
  },
  {
    path: 'inscrever-se',
    component: InscreverComponent,
    title: "Inscrever-se"
  },
  {
    path: 'livros',
    component: LivrosComponent,
    canActivate: [AuthGuardsGuard],
    title: "Livros"
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardsGuard],
    title: "Dashboard"
  },
  {
    path: 'novo_emprestimo',
    component: NovoEmprestimoComponent,
    canActivate: [AuthGuardsGuard],
    title: "Novo Emprestimo"
  },
  {
    path: 'dashboard/editar_emprestimo/:id',
    component: EditarEmprestimoComponent,
    canActivate: [AuthGuardsGuard],
    title: "Editar Emprestimo"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
