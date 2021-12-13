using System;

namespace VendingMachineTest.Domain.DTO
{
    public class CoinDto
    {
        public Guid Guid { get; set; }
        public decimal Value { get; set; }
        public int TotalCount { get; set; }

        public bool IsBlocked { get; set; }
    }
}