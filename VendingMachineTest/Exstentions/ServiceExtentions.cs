using Microsoft.Extensions.DependencyInjection;
using VendingMachineTest.Domain.Interfaces.Repositories;
using VendingMachineTest.Domain.Interfaces.Services;
using VendingMachineTest.Infrastructure.Repositories;
using VendingMachineTest.Services;

namespace VendingMachineTest.Exstentions
{
    public static class ServiceExtensions
    {
        public static void ConfigureRepositories(this IServiceCollection services)
        {
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<ICoinRepository, CoinRepository>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
        }

        public static void ConfigureServices(this IServiceCollection services)
        {
            services.AddScoped<IProductService, ProductService>();
            services.AddScoped<ICoinServiece, CoinService>();
        }
    }
}
