﻿using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VendingMachineTest.Domain.DTO;

namespace VendingMachineTest.Domain.Interfaces.Services
{
    public interface IProductService
    {
        Task<ProductDto> CreateAsync(ProductsForCreationDto productForCreationDto);
        Task<EntityState> DeleteAsync(Guid productId);
        Task<IQueryable<ProductDto>> GetProductsAsync(HttpRequest httpRequest);
        Task<int> UpdateProducts(List<ProductDto> products);
        Task<int> UpdateProduct(ProductDto product);
    }
}
