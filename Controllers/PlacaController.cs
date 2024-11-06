using GerenciadorPlacasApi.Models;
using Microsoft.AspNetCore.Mvc;
using GerenciadorPlacasApi.ViewsModel;
using System.Collections.Generic;
using GerenciadorPlacasApi.Data;
using System.Linq;
using Microsoft.AspNetCore.Authorization;

namespace GerenciadorPlacasApi.Controllers
{
    [Route("api/placa")]
    public class PlacaController : Controller
    {
        private readonly AppDbContext _db;

        // Construtor do controlador onde a injeção de dependência é realizada
        public PlacaController(AppDbContext db)
        {
            _db = db;
        }

        [HttpGet ("{id}")]
        public PlacaViewModel ObterPorId(int id)
        {
            var placaModel = _db.Placas.FirstOrDefault(x => x.Id == id);
            if (placaModel != null)
            {
                var vm = ModelParaViewModel(placaModel);
                return vm;
            }
            else
            { 
                var vm = new PlacaViewModel();
                vm.Id = 0;
                return vm;
            }
            
        }

        [HttpGet ("getAll")]
        public List<PlacaViewModel> GetAllPlacas()
        {
            var placaModel = _db.Placas.Where(x => x.Ativo).ToList();
            var listaplacasViewModel = new List<PlacaViewModel>();
            foreach (var item in placaModel)
            {
                var vm = ModelParaViewModel(item);
                listaplacasViewModel.Add(vm);
            }
            return listaplacasViewModel;
        }

        [HttpPost ("salvar")]
        public int Salvar([FromBody]PlacaViewModel vm)
        {
            var model = ViewModelParaModel(vm);
            _db.Placas.Add(model);
            _db.SaveChanges();

            var enderecoModel = new Endereco()
            {
               CEP = vm.Endereco.CEP,
               Rua = vm.Endereco.CEP,
               Bairro = vm.Endereco.Bairro,
               Numero = vm.Endereco.Numero,
               IdPlaca = model.Id
            };

            _db.Enderecos.Add(enderecoModel);
            _db.SaveChanges();


            var carroModel = new Carro()
            {
                Cor = vm.Carro.Cor,
                Modelo = vm.Carro.Modelo,
                IdPlaca = model.Id
            };

            _db.Carros.Add(carroModel);
            _db.SaveChanges();

            return model.Id;
        }
        protected PlacaViewModel ModelParaViewModel(Placa model)
        {
            var vm = new PlacaViewModel();
            vm.Id = model.Id;
            vm.Digitos = model.Digitos;
            var endereco = _db.Enderecos.FirstOrDefault(x => x.IdPlaca == model.Id);
            var enderecoViewModel = new EnderecoViewModel();

            if (endereco != null)
            {
                enderecoViewModel.Id = endereco.Id;
                enderecoViewModel.CEP = endereco.CEP;
                enderecoViewModel.Rua = endereco.Rua;
                enderecoViewModel.Numero = endereco.Numero;
            }
            vm.Endereco = enderecoViewModel;

            var carro = _db.Carros.FirstOrDefault(x => x.IdPlaca == model.Id);
            var carroViewModel = new CarroViewModel();
            if (carro != null)
            {
                carroViewModel.Id = carro.Id;
                carroViewModel.IdPlaca = carro.IdPlaca;
                carroViewModel.Modelo = carro.Modelo;
                carroViewModel.Cor = carro.Cor;
            }
            vm.Carro = carroViewModel;

            return vm;
        }

        protected Placa ViewModelParaModel(PlacaViewModel vm)
        {
            Placa placa = new(){
                Digitos = vm.Digitos,
                Ativo = true,
                DataInclusao = DateTime.Now
            };
            return placa;
        }
    }
}
