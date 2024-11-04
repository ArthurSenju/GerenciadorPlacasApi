using GerenciadorPlacasApi.Data;
using Microsoft.EntityFrameworkCore;

namespace GerenciadorPlacasApi.Repositories
{
    public abstract class BaseREP : IDisposable
    {
        protected AppDbContext _db;

        public BaseREP(DbContextOptions<AppDbContext> options) 
        {
            _db = new AppDbContext(options);
        }

        public void Dispose()
        {
            _db.Dispose();
        }
    }
}
