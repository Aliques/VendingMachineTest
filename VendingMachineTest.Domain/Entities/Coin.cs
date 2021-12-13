using System.ComponentModel.DataAnnotations.Schema;

namespace VendingMachineTest.Domain.Entities
{
    public class Coin : BaseEntity
    {
        [Column("total_count")]
        public int TotalCount { get; set; }

        [Column("value")]
        public decimal Value { get; set; }

        [Column("is_blocked")]
        public bool IsBlocked { get; set; }
    }
}