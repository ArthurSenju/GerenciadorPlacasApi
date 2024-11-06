import { Component, Inject, OnInit  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Placa } from '../../../Models/PlacaViewModel';

@Component({
  selector: 'app-detalhes',
  standalone: true,
  imports: [CommonModule, MatDialogModule], // Adicione MatDialogModule aqui
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})
export class DetalhesComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Placa) {}

  ngOnInit(): void {
    console.log(this.data); // Acesse após a inicialização
  }
}
