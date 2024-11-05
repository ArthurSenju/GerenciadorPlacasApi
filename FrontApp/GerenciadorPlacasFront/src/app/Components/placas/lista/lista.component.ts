import { PlacaService } from '../../../services/placa.service';
import { Placa } from '../../../Models/PlacaViewModel';
import {Component, inject, OnInit} from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { DetalhesComponent } from '../../Modals/detalhes/detalhes.component';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {
  public placas: Placa[] = [];
  dialog = inject(MatDialog);

  constructor(private placaService: PlacaService) {}
  
  ngOnInit(): void {
    this.placaService.getAllPlacas().subscribe((data) => {
      console.log(data);
      this.placas = data;
    });
  }
  openDialog() {
    this.dialog.open(DetalhesComponent, {
      data: {
        animal: 'panda',
      },
    });
  }
}
