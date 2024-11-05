using GerenciadorPlacasApi.Models;
using Microsoft.AspNetCore.Mvc;
using GerenciadorPlacasApi.ViewsModel;
using System.Collections.Generic;
using GerenciadorPlacasApi.Data;
using System.Linq;

namespace GerenciadorPlacasApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlacaController : Controller
    {
        private readonly AppDbContext _db;

        // Construtor do controlador onde a injeção de dependência é realizada
        public PlacaController(AppDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public List<PlacaViewModel> GetAllPlacas()
        {
            var placaModel = _db.Placas.Where(x => x.Ativo).ToList();
            var listaplacasViewModel = new List<PlacaViewModel>();
            foreach (var item in placaModel)
            {
                var vm = new PlacaViewModel();
                vm.Id = item.Id;
                vm.Digitos = item.Digitos;
                var endereco = _db.Enderecos.FirstOrDefault(x => x.Id == item.IdEndereco);
                var enderecoViewModel = new EnderecoViewModel();

                if (endereco != null)
                {
                    enderecoViewModel.Id = endereco.Id;
                    enderecoViewModel.CEP = endereco.CEP;
                    enderecoViewModel.Rua = endereco.Rua;
                    enderecoViewModel.Numero = endereco.Numero;
                }
                vm.Endereco = enderecoViewModel;

                var carro = _db.Carros.FirstOrDefault(x => x.IdPlaca == item.Id);
                var carroViewModel = new CarroViewModel();
                if (carro != null)
                {
                    carroViewModel.Id = carro.Id;
                    carroViewModel.IdPlaca = carro.IdPlaca;
                    carroViewModel.Modelo = carro.Modelo;
                    carroViewModel.Cor = carro.Cor;
                }
                vm.Carro = carroViewModel;

                listaplacasViewModel.Add(vm);
            }
            return listaplacasViewModel;
        }
    }
}
