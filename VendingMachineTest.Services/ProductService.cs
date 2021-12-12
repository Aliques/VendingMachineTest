using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using VendingMachineTest.Domain.DTO;
using VendingMachineTest.Domain.Entities;
using VendingMachineTest.Domain.Interfaces.Repositories;
using VendingMachineTest.Domain.Interfaces.Services;
using Microsoft.AspNetCore.Hosting;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using AutoMapper.QueryableExtensions;

namespace VendingMachineTest.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly IWebHostEnvironment _hostEnvironment;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public ProductService(IProductRepository productRepository, IUnitOfWork unitOfWork, IMapper mapper,
            IWebHostEnvironment hostEnvironment)
        {
            _hostEnvironment = hostEnvironment;
            _productRepository = productRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }
        public async Task<ProductDto> CreateAsync(ProductsForCreationDto productForCreationDto)
        {
            var productEntity = _mapper.Map<Product>(productForCreationDto);

            string imageName = new string(Path.GetFileNameWithoutExtension(productEntity.ImageFile.FileName)
                .Take(10)
                .ToArray())
                .Replace(' ', '-');

            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(productEntity.ImageFile.FileName);
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Images", imageName);
            productEntity.ImageName = imageName;

            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await productEntity.ImageFile.CopyToAsync(fileStream);
            }

            var createdProduct = _productRepository.Create(productEntity);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<ProductDto>(createdProduct);
        }

        public Task<EntityState> DeleteAsync(Guid productId)
        {
            throw new NotImplementedException();
        }

        public async Task<IQueryable<ProductDto>> GetProductsAsync(HttpRequest httpRequest)
        {
            var configuration = new MapperConfiguration(cfg =>
                cfg.CreateMap<Product, ProductDto>());
            var products = await _productRepository.GetProducts(httpRequest);

            return products.ProjectTo<ProductDto>(configuration);
        }
    }
}
