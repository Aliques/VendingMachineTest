using System;

namespace VendingMachineTest.Domain.DTO
{
    public class DepositedCoin
    {
        public Guid Guid { get; set; }
        public int Value { get; set; }
    }
}
