namespace GerenciadorPlacasApi.ViewsModel
{
    public class PlacaViewModel
    {
        public int Id { get; set; }
        public string Digitos { get; set; }
        public EnderecoViewModel? Endereco { get; set; }
    }
}
