import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './lista/lista.component'; // Ajuste o caminho conforme necessário

const routes: Routes = [
    { path: '', component: ListaComponent },
  // Adicione outras rotas relacionadas a placas aqui
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlacasRoutingModule { }
