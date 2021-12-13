using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VendingMachineTest.Domain.DTO;
using VendingMachineTest.Domain.Entities;

namespace VendingMachineTest.Domain.Interfaces.Services
{
    public interface ICoinServiece
    {
        Task<Coin> UpdateCoin(Guid guid, CoinForUpdateDto coin);

        Task<IQueryable<CoinDto>> GetAll();
    }
}