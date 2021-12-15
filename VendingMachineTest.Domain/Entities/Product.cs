using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations.Schema;

namespace VendingMachineTest.Domain.Entities
{
    public class Product : BaseEntity
    {
        [Column("title")]
        public string Name { get; set; }

        [Column("image_name")]
        public string ImageName { get; set; }

        [Column("cost")]
        public decimal Cost { get; set; }

        [Column("quantity")]
        public int Quantity { get; set; }

        [NotMapped]
        public IFormFile ImageFile { get; set; }

        [NotMapped]
        public string ImageSrc { get; set; }
    }
}