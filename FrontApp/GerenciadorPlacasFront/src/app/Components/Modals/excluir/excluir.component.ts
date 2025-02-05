import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { PlacaService } from '../../../services/placa.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-excluir',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './excluir.component.html',
  styleUrl: './excluir.component.css'
})
export class ExcluirComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public id : number, private placaService: PlacaService, private router : Router, private dialogRef: MatDialogRef<ExcluirComponent>) {}

  ngOnInit(): void {
    console.log(this.id); // Acesse após a inicialização
  }

  excluir(): void {
    this.placaService.Excluir(this.id).subscribe(() => {      
      this.dialogRef.close('deleted'); // Emite que a exclusão foi confirmada
    });
  }
}
