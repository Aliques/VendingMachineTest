using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using VendingMachineTest.Domain.DTO;
using VendingMachineTest.Domain.Interfaces.Services;

namespace VendingMachineTest.Controllers
{
    [ApiController]
    [Route("[controller]")]
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

            return Ok(createdEntity);
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var createdEntity = await _productService.GetProductsAsync(Request);

            return Ok(createdEntity);
        }
    }
}
