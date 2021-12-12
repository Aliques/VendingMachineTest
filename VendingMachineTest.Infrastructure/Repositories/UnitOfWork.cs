using System.Threading.Tasks;
using VendingMachineTest.Domain.Interfaces.Repositories;

namespace VendingMachineTest.Infrastructure.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly RepositoryContext _repositoryContext;

        public UnitOfWork(RepositoryContext dbContext)
        {
            _repositoryContext = dbContext;
        }

        public Task<int> SaveChangesAsync()
        {
            return _repositoryContext.SaveChangesAsync();
        }
    }
}
