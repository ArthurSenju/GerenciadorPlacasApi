using GerenciadorPlacasApi.Data;
using GerenciadorPlacasApi.ViewsModel;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace GerenciadorPlacasApi.Repositories
{
    public class PlacaREP : BaseREP
    {
        public PlacaREP(DbContextOptions<AppDbContext> options) : base(options)
        {
            // O construtor do BaseREP já inicializa _db com as opções passadas
        }

        public List<PlacaViewModel> GetAllPlaca()
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
                listaplacasViewModel.Add(vm);
            }
            return listaplacasViewModel;
        }
    }
}
