import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './Components/Login/inicio.component';
import { ListaComponent } from './Components/placas/lista/lista.component';
import { InserirComponent } from './Components/placas/inserir/inserir.component';
import { PaginaInicialComponent } from './Components/pagina-inicial/pagina-inicial.component';
import { AuthGuard } from './Components/auth.guard';

export const routes: Routes = [
  { path: 'login', component: InicioComponent },
  { path: 'home', component: PaginaInicialComponent, canActivate: [AuthGuard] },
  { path: 'placas', loadChildren: () => import('./Components/placas/placas.module').then(m => m.PlacasModule), canActivate: [AuthGuard] },
  { path: 'placa/alterar/:id', component: InserirComponent, canActivate: [AuthGuard] },
  { path: 'placa/excluir/:id', component: InserirComponent, canActivate: [AuthGuard] },
  { path: 'placa/inserir', component: InserirComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
