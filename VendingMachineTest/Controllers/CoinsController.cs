using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VendingMachineTest.Domain.DTO;
using VendingMachineTest.Domain.Interfaces.Services;

namespace VendingMachineTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoinsController : ControllerBase
    {
        private readonly ICoinServiece _coinServiece;
        public CoinsController(ICoinServiece coinServiece)
        {
            _coinServiece = coinServiece;
        }

        [HttpPut]
        public async Task<IActionResult> UpdateCoins([FromBody] List<CoinForUpdateDto> coinForUpdateDto)
        {
            var coin = await _coinServiece.UpdateCoin(coinForUpdateDto);

            return Ok(coin);
        }

        [HttpPut("deposit/")]
        public async Task<IActionResult> DepositCoins([FromBody] List<DepositedCoin> coins)
        {
            var updatedCoins = await _coinServiece.DepositedCoins(coins);

            return Ok(updatedCoins);
        }

        [HttpGet]
        public async Task<IActionResult> GetCoins()
        {
            var coins = await _coinServiece.GetAll();

            return Ok(coins);
        }
    }
}