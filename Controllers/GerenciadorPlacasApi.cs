using GerenciadorPlacasApi.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GerenciadorPlacasApi.Controllers
{
    public class GerenciadorPlacasApi : Controller
    {
        private readonly AppDbContext _db;

        // Construtor do controlador onde a injeção de dependência é realizada
        public GerenciadorPlacasApi(AppDbContext db)
        {
            _db = db;
        }

        [HttpGet("verificar-placa/{placa}")]
        public async Task<IActionResult> VerificarPlaca(string placa)
        {
            var existe = await _db.Placas.AnyAsync(p => p.Digitos == placa);
            return Ok(existe);
        }
    }
}
