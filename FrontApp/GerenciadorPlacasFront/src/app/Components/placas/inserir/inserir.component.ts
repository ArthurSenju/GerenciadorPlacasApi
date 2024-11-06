import { Component, OnInit, inject } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import { Placa } from '../../../Models/PlacaViewModel';
import { PlacaService } from '../../../services/placa.service';
import { ActivatedRoute } from '@angular/router';
import {FormControl, FormGroup, FormBuilder} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inserir',
  templateUrl: './inserir.component.html',
  styleUrl: './inserir.component.css'
})
export class InserirComponent implements OnInit {
  public placa : any = {};
  public id?: number;
  private formBuilder = inject(FormBuilder);
  placaForm = this.formBuilder.group({
    digitos: [''],
    endereco: this.formBuilder.group({
      rua: [''],
      bairro: [''],
      numero: [''],
      cep: [''],
    }),
    carro: this.formBuilder.group({
      modelo: [''],
      cor: ['']
    })
  });

  constructor(private placaService : PlacaService, private route: ActivatedRoute, private toastr: ToastrService) {}

  ngOnInit(): void {    
    const idUrl = this.route.snapshot.paramMap.get('id')!;
    if(idUrl != "" && idUrl != null && idUrl != undefined){
      const idInt = parseInt(idUrl);
      this.id = idInt;
      this.placaService.ObterPorId(this.id).subscribe((data) => {
        this.placa = data;
      });
      this.placaForm.patchValue({
        digitos: this.placa.digitos,
        endereco: this.placa.endereco,
        carro: this.placa.carro
      });
    }
  }

  onSubmit(): void {
    const idUrl = this.route.snapshot.paramMap.get('id')!;
    this.placa = this.placaForm.value;    
    if(idUrl == "" || idUrl == null || idUrl == undefined){
      this.placaService.Salvar(this.placa).subscribe((data) =>{
        if(data != 0){
          this.toastr.success('Placa Cadastrada com sucesso!', 'Sucesso!');
        }else{
          this.toastr.error('Algo deu errado.', 'Erro');
        }
      });
    }
  }
}
