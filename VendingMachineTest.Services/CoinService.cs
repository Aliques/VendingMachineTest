using AutoMapper;
using System;
using System.Threading.Tasks;
using VendingMachineTest.Domain.DTO;
using VendingMachineTest.Domain.Entities;
using VendingMachineTest.Domain.Interfaces.Repositories;
using VendingMachineTest.Domain.Interfaces.Services;
using AutoMapper.QueryableExtensions;
using System.Linq;
using System.Collections.Generic;

namespace VendingMachineTest.Services
{
    public class CoinService : ICoinServiece
    {
        private readonly ICoinRepository _coinRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public CoinService(IUnitOfWork unitOfWork, ICoinRepository coinRepository, IMapper mapper)
        {
            _mapper = mapper;
            _coinRepository = coinRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<IQueryable<CoinDto>> GetAll()
        {
            var configuration = new MapperConfiguration(cfg =>
                cfg.CreateMap<Coin, CoinDto>());
            var coins = await _coinRepository.FindAllAsync();
            return coins.ProjectTo<CoinDto>(configuration);
        }
        public async Task<int> DepositedCoins(List<DepositedCoin> coins)
        {
            foreach (var coin in coins)
            {
                var updatableCoin = await _coinRepository.GetById(coin.Guid);
                updatableCoin.ChangingDate = DateTimeOffset.Now;
                updatableCoin.TotalCount = updatableCoin.TotalCount + coin.Value;
            }

            var saved = await _unitOfWork.SaveChangesAsync();

            return saved;
        }
        public async Task<int> UpdateCoin(List<CoinForUpdateDto> coins)
        {
            foreach (var coin in coins)
            {
                var updatableCoin = await _coinRepository.GetByValue(coin.Value);
                updatableCoin.ChangingDate = DateTimeOffset.Now;
                updatableCoin.IsBlocked = coin.IsBlocked;
                updatableCoin.TotalCount = coin.TotalCount;
            }
            
            var saved = await _unitOfWork.SaveChangesAsync();

            return saved;
        }
    }
}