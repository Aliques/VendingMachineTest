using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VendingMachineTest.Domain.Entities;

namespace VendingMachineTest.Domain.Interfaces.Repositories
{
    public interface ICoinRepository
    {
        Task<Coin> GetById(Guid guid);
        Task<IQueryable<Coin>> FindAllAsync();
    }
}