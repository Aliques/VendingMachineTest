using AutoMapper;
using System.Linq;
using VendingMachineTest.Domain.DTO;
using VendingMachineTest.Domain.Entities;

namespace VendingMachineTest
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<ProductsForCreationDto, Product>();
            CreateMap<Product, ProductDto>();
        }
    }
}
