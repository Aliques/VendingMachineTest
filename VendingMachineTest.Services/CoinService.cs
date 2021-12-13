using AutoMapper;
using System;
using System.Threading.Tasks;
using VendingMachineTest.Domain.DTO;
using VendingMachineTest.Domain.Entities;
using VendingMachineTest.Domain.Interfaces.Repositories;
using VendingMachineTest.Domain.Interfaces.Services;
using AutoMapper.QueryableExtensions;
using System.Linq;

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

        public async Task<Coin> UpdateCoin(Guid guid, CoinForUpdateDto coin)
        {
            var updatableCoin = await _coinRepository.GetById(guid);
            updatableCoin.ChangingDate = DateTimeOffset.Now;
            updatableCoin.IsBlocked = coin.IsBlocked;
            updatableCoin.TotalCount = coin.TotalCount;
            await _unitOfWork.SaveChangesAsync();

            return updatableCoin;
        }
    }
}