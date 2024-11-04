import { Component, OnInit } from '@angular/core';
import { PlacaService } from '../../../services/placa.service';
import { Placa } from '../../../Models/PlacaViewModel';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {
  placas: Placa[] = [];

  constructor(private placaService: PlacaService) {}
  
  ngOnInit(): void {
    this.placaService.getAllPlacas().subscribe((data) => {
      console.log(data);
      this.placas = data;
    });
  }

  verDetalhes(id: number): void {
    // Navegar para detalhes
  }
}
