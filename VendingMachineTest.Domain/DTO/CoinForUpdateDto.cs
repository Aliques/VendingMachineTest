namespace VendingMachineTest.Domain.DTO
{
    public class CoinForUpdateDto
    {
        public int Value { get; set; }
        public int TotalCount { get; set; }

        public bool IsBlocked { get; set; }
    }
}