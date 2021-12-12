using System.Threading.Tasks;

namespace VendingMachineTest.Domain.Interfaces.Repositories
{
    public interface IUnitOfWork
    {
        Task<int> SaveChangesAsync();
    }
}
