namespace GerenciadorPlacasApi.ViewsModel
{
    public class EnderecoViewModel
    {
        public int Id { get; set; }
        public string Rua { get; set; }
        public string Bairro { get; set; }
        public string CEP { get; set; }
        public int? Numero { get; set; }
    }
}
