import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaComponent } from './lista/lista.component';
import { InserirComponent } from './inserir/inserir.component';
import { PlacasRoutingModule } from './placas.routes'; // Importar o módulo de rotas
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [ListaComponent, InserirComponent],
  imports: [
    CommonModule,
    PlacasRoutingModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule
  ]
})
export class PlacasModule { }
