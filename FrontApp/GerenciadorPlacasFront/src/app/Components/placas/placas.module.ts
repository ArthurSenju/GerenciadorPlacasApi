import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaComponent } from './lista/lista.component';
import { PlacasRoutingModule } from './placas.routes'; // Importar o módulo de rotas

@NgModule({
  declarations: [ListaComponent],
  imports: [
    CommonModule,
    PlacasRoutingModule // Adicione o módulo de rotas aqui
  ]
})
export class PlacasModule { }
