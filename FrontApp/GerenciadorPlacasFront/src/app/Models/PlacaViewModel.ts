export class Placa {
    constructor(
      public id: number,
      public digitos: string,
      public carro: {
        cor: string,
        modelo: string
      },
      public endereco: {
        rua: string,
        bairro: string,
        cep: string,
        numero: number
      }
    ) {}
  }
  