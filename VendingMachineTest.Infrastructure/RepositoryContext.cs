using Microsoft.EntityFrameworkCore;
using VendingMachineTest.Domain.Entities;

namespace VendingMachineTest.Infrastructure
{
    public class RepositoryContext : DbContext
    {
        public RepositoryContext(DbContextOptions options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
           base.OnModelCreating(modelBuilder);
        }

        public DbSet<Coin> Coins { get; set; }
        public DbSet<Product> Products { get; set; }
    }
}
