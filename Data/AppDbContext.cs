using GerenciadorPlacasApi.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace GerenciadorPlacasApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) 
        {

        }

        public DbSet<Endereco> Enderecos { get; set; }
        public DbSet<Placa> Placas { get; set; }
        public DbSet<Carro> Carros { get; set; }
    }

}
