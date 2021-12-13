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

        [HttpPut("{id}")]
        public async Task<IActionResult> GetCoints(Guid guid, [FromBody] CoinForUpdateDto coinForUpdateDto)
        {
            var coin = await _coinServiece.UpdateCoin(guid, coinForUpdateDto);

            return Ok(coin);
        }

        [HttpGet]
        public async Task<IActionResult> GetCoins()
        {
            var coins = await _coinServiece.GetAll();

            return Ok(coins);
        }
    }
}