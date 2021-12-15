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

            string imageName = new string(Path.GetFileNameWithoutExtension(productForCreationDto.ImageFile.FileName)
                .Take(10)
                .ToArray())
                .Replace(' ', '-');

            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(productForCreationDto.ImageFile.FileName);
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Images", imageName);
            productEntity.ImageName = imageName;

            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await productForCreationDto.ImageFile.CopyToAsync(fileStream);
            }

            var createdProduct = _productRepository.Create(productEntity);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<ProductDto>(createdProduct);
        }

        public async Task<EntityState> DeleteAsync(Guid productId)
        {
            var product = await _productRepository.GetById(productId);

            if(product==null)
            {
                return EntityState.Unchanged;
            }
            _productRepository.Delete(product);
            await _unitOfWork.SaveChangesAsync();

            return EntityState.Modified;
        }

        public async Task<IQueryable<ProductDto>> GetProductsAsync(HttpRequest httpRequest)
        {
            var configuration = new MapperConfiguration(cfg =>
                cfg.CreateMap<Product, ProductDto>());
            var products = await _productRepository.GetProducts(httpRequest);

            return products.ProjectTo<ProductDto>(configuration);
        }

        public async Task<int> UpdateProduct(ProductDto product)
        {
            var updatedProduct = await _productRepository.GetById(product.Guid);

            if (product.ImageFile != null)
            {
                DeleteImage(product.ImageName);
                updatedProduct.ImageName = await SaveImage(product.ImageFile);
            }

            updatedProduct.Quantity = product.Quantity;
            updatedProduct.Name = product.Name;
            updatedProduct.ChangingDate = DateTimeOffset.Now;
            updatedProduct.Cost = product.Cost;

            return await _unitOfWork.SaveChangesAsync();
        }

        public async Task<int> UpdateProducts(List<ProductDto> products)
        {
            foreach (var product in products)
            {
               var updatedProduct = await _productRepository.GetById(product.Guid);
                updatedProduct.ImageName = product.ImageName;
                updatedProduct.Quantity = product.Quantity;
                updatedProduct.Name = product.Name;
            }
            return await _unitOfWork.SaveChangesAsync();
        }

        public void DeleteImage(string imageName)
        {
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Images", imageName);
            if (File.Exists(imagePath))
                File.Delete(imagePath);
        }
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName)
                .Take(10)
                .ToArray())
                .Replace(' ', '-');

            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Images", imageName);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return imageName;
        }
    }
}
