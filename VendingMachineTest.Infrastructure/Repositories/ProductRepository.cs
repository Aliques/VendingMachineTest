using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using VendingMachineTest.Domain.Entities;
using VendingMachineTest.Domain.Interfaces.Repositories;

namespace VendingMachineTest.Infrastructure.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly RepositoryContext _repositoryContext;
        public ProductRepository(RepositoryContext repositoryContext)
        {
            _repositoryContext = repositoryContext;
        }

        public Product Create(Product product)
        {
            var createdEntity = _repositoryContext.Products.Add(product);

            return createdEntity.Entity;
        }

        public EntityState Delete(Product product)
        {
            var entityEntry = _repositoryContext.Products.Remove(product);

            return entityEntry.State;
        }

        public async Task<IQueryable<Product>> GetProducts(HttpRequest httpRequest) //не очень нравится
        {
            var list = await _repositoryContext.Products
                .Select(x=> new Product {
                    Guid=x.Guid, 
                    Cost=x.Cost,
                    ImageSrc= String.Format("{0}://{1}{2}/Images/{3}", 
                    httpRequest.Scheme, httpRequest.Host, httpRequest.PathBase, x.ImageName),
                    Title = x.Title,
                    ImageName = x.ImageName
                }).ToListAsync();

            return list.AsQueryable();
        }
    }
}
