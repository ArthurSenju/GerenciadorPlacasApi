using GerenciadorPlacasApi.Models;
using Microsoft.AspNetCore.Mvc;
using GerenciadorPlacasApi.ViewsModel;
using System.Collections.Generic;
using GerenciadorPlacasApi.Data;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

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

        [HttpGet("todasParaDeteccao")]
        public async Task<IActionResult> ObterTodasPlacasParaDeteccao()
        {
            var placas = await _db.Placas.Where(x => x.Ativo).Select(p => p.Digitos).ToListAsync();
            return Ok(placas);
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
            if (vm.Id != 0)
            {
                var model = ViewModelParaModel(vm);
                model.Id = vm.Id;
                _db.Entry(model).State = Microsoft.EntityFrameworkCore.EntityState.Modified;

                var enderecoModel = _db.Enderecos.FirstOrDefault(x => x.IdPlaca == model.Id);
                enderecoModel.CEP = vm.Endereco.CEP;
                enderecoModel.Bairro = vm.Endereco.Bairro;
                enderecoModel.Numero = vm.Endereco.Numero;
                enderecoModel.Rua = vm.Endereco.Rua;

                _db.Entry(enderecoModel).State = Microsoft.EntityFrameworkCore.EntityState.Modified;

                var carroModel = _db.Carros.FirstOrDefault(x => x.IdPlaca == model.Id);
                carroModel.Cor = vm.Carro.Cor;
                carroModel.Modelo = vm.Carro.Modelo;

                _db.Entry(carroModel).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                _db.SaveChanges();
                return model.Id;
            }
            else
            {
                var model = ViewModelParaModel(vm);
                _db.Placas.Add(model);
                _db.SaveChanges();

                var enderecoModel = new Endereco()
                {
                   CEP = vm.Endereco.CEP,
                   Rua = vm.Endereco.Rua,
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
        }

        [HttpGet ("excluir/{id}")]
        public int Excluir(int id)
        {
            var model = _db.Placas.FirstOrDefault(x => x.Id == id);
            model.Ativo = false;
            model.DataExclusao = DateTime.Now;
            _db.Entry(model).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
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
                enderecoViewModel.Bairro = endereco.Bairro;
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
