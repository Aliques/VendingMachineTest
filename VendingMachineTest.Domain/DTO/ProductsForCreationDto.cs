
using Microsoft.AspNetCore.Http;

namespace VendingMachineTest.Domain.DTO
{
    public class ProductsForCreationDto
    {
        public string Title { get; set; }

        public string ImageName { get; set; }

        public decimal Cost { get; set; }

        public int Quantity { get; set; }

        public IFormFile ImageFile { get; set; }
    }
}
