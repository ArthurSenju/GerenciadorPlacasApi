import { PlacaService } from '../../../services/placa.service';
import { Placa } from '../../../Models/PlacaViewModel';
import {Component, inject, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { DetalhesComponent } from '../../Modals/detalhes/detalhes.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ExcluirComponent } from '../../Modals/excluir/excluir.component';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {
  public placas: Placa[] = [];

  constructor(private placaService: PlacaService, private dialog: MatDialog, private router: Router) {}
  
  ngOnInit(): void {
    this.placaService.GetAllPlacas().subscribe((data) => {
      this.placas = data;
    });
  }
  openDetails(data: Placa) {
    const dialogRef = this.dialog.open(DetalhesComponent, {
      data: data,
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
    });
  }

  openExcluir(id: number){
    const dialogRef = this.dialog.open(ExcluirComponent, {
      data: id,
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'deleted') { // Verifica se a exclusão foi confirmada
        this.atualizarLista();
      }
    });
  }

  atualizarLista(): void {
    this.placaService.GetAllPlacas().subscribe((data) => {
      this.placas = data;
    });
  }

  openAlterar(id: number){
    this.router.navigate([`/placa/alterar/${id}`]);
  }

  openInserir(){
    this.router.navigate([`/placa/inserir`]);
  }
}
