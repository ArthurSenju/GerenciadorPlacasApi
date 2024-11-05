export class Placa {
    constructor(
      public id: number,
      public digitos: string,
      public carro: {
        id: number,
        cor: string,
        modelo: string,
        idPlaca: number
      },
      public endereco: {
        id: number,
        rua: string,
        bairro: string,
        cep: string,
        numero: number
      }
    ) {}
  }
  