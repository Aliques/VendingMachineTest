using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VendingMachineTest.Domain
{
    public class BaseEntity
    {
        [Key]
        [Column("Id")]
        public Guid Guid { get; set; }

        [Column("creation_date")]
        public DateTimeOffset CreationDate { get; set; }

        [Column("changing_date")]
        public DateTimeOffset ChangingDate { get; set; }
    }
}