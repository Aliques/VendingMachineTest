using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using VendingMachineTest.Domain.Entities;

namespace VendingMachineTest.Domain.Interfaces.Repositories
{
    public interface IProductRepository
    {
        Task<IQueryable<Product>> GetProducts(HttpRequest httpRequest);
        Product Create(Product product);
        EntityState Delete(Product product);
    }
}
