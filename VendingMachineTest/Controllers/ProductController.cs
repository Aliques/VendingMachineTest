using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using VendingMachineTest.Domain.DTO;
using VendingMachineTest.Domain.Interfaces.Services;

namespace VendingMachineTest.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateProduct([FromForm] ProductsForCreationDto productsForCreationDto)
        {
            var createdEntity = await _productService.CreateAsync(productsForCreationDto);

            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var createdEntity = await _productService.GetProductsAsync(Request);

            return Ok(createdEntity);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(Guid id)
        {
            var state = await _productService.DeleteAsync(id);
            if (EntityState.Modified == state)
            {
                return Ok();
            }
            else 
            { 
                return BadRequest(state); 
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateProduct([FromForm] ProductDto list)
        {
            var createdEntity = await _productService.UpdateProduct(list);

            return Ok(createdEntity);
        }

        [HttpPut("quantity")]
        public async Task<IActionResult> UpdateProducts([FromBody] List<ProductDto> list)
        {
            var createdEntity = await _productService.UpdateProducts(list);

            return Ok(createdEntity);
        }
    }
}
