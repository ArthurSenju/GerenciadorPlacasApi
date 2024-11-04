﻿namespace GerenciadorPlacasApi.Models
{
    public class Placa
    {
        public int Id { get; set; }
        public required string Digitos { get; set; }
        public int IdEndereco { get; set; }
        public bool Ativo { get; set; }
        public DateTime? DataExclusao { get; set; }

    }
}
