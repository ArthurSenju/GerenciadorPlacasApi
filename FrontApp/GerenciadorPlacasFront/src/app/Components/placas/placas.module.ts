import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaComponent } from './lista/lista.component';
import { PlacasRoutingModule } from './placas.routes'; // Importar o módulo de rotas
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { DetalhesComponent } from '../Modals/detalhes/detalhes.component';


@NgModule({
  declarations: [ListaComponent, DetalhesComponent],
  imports: [
    CommonModule,
    PlacasRoutingModule,
    MatDialogModule
  ]
})
export class PlacasModule { }
