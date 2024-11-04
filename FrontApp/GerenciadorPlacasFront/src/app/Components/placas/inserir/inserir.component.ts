import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Placa } from '../../../Models/PlacaViewModel';

@Component({
  selector: 'app-inserir',
  standalone: true,
  imports: [],
  templateUrl: './inserir.component.html',
  styleUrl: './inserir.component.css'
})
export class InserirComponent implements OnInit {
  placaForm!: FormGroup; // Formulário do tipo FormGroup
  placas: Placa[] = []; // Lista para armazenar as instâncias da classe Placa

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.placaForm = this.fb.group({
      id: [''],
      digitos: [''],
      carro: [''],
      dono: ['']
    });
  }

  onSubmit(): void {
    // Cria uma nova instância de Placa com os dados do formulário
    const novaPlaca = new Placa(
      this.placaForm.value.id,
      this.placaForm.value.digitos,
      this.placaForm.value.carro,
      this.placaForm.value.dono
    );

    // Adiciona a nova placa na lista
    this.placas.push(novaPlaca);

    // Reseta o formulário após o envio
    this.placaForm.reset();
  }
}
