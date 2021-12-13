using System;
using System.Collections.Generic;
using System.Text;

namespace VendingMachineTest.Domain.DTO
{
    public class CoinForUpdateDto
    {
        public int TotalCount { get; set; }

        public bool IsBlocked { get; set; }
    }
}