using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace VendingMachineTest.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Coins",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    creation_date = table.Column<DateTimeOffset>(nullable: false),
                    changing_date = table.Column<DateTimeOffset>(nullable: false),
                    total_count = table.Column<int>(nullable: false),
                    value = table.Column<decimal>(nullable: false),
                    is_blocked = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Coins", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    creation_date = table.Column<DateTimeOffset>(nullable: false),
                    changing_date = table.Column<DateTimeOffset>(nullable: false),
                    title = table.Column<string>(nullable: true),
                    image_name = table.Column<string>(nullable: true),
                    cost = table.Column<decimal>(nullable: false),
                    quantity = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Coins");

            migrationBuilder.DropTable(
                name: "Products");
        }
    }
}
