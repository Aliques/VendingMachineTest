using System.ComponentModel.DataAnnotations.Schema;

namespace VendingMachineTest.Domain.Entities
{
    public class Coin : BaseEntity
    {
        [Column("value")]
        public decimal Value { get; set; }

        [Column("is_blocked")]
        public bool IsBlocked { get; set; }
    }
}
