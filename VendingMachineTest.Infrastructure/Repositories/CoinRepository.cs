using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VendingMachineTest.Domain.Entities;
using VendingMachineTest.Domain.Interfaces.Repositories;

namespace VendingMachineTest.Infrastructure.Repositories
{
    public class CoinRepository : ICoinRepository
    {
        private readonly RepositoryContext _repositoryContext;
        public CoinRepository(RepositoryContext repositoryContext)
        {
            _repositoryContext = repositoryContext;
        }

        public async Task<IQueryable<Coin>> FindAllAsync()
        {
            var coinList = await _repositoryContext.Coins.ToListAsync();
            return coinList.AsQueryable();
        }

        public async Task<Coin> GetById(Guid guid)
        {
            return await _repositoryContext.Coins.FindAsync(guid);
        }
    }
}