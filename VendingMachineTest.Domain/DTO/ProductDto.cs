﻿using System;

namespace VendingMachineTest.Domain.DTO
{
    public class ProductDto
    {
        public Guid Guid { get; set; }
        public string Title { get; set; }

        public string ImageName { get; set; }

        public decimal Cost { get; set; }

        public int Quantity { get; set; }

        public string ImageSrc { get; set; }
    }
}
