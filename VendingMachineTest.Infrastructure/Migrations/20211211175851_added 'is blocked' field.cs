using Microsoft.EntityFrameworkCore.Migrations;

namespace VendingMachineTest.Infrastructure.Migrations
{
    public partial class addedisblockedfield : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "is_blocked",
                table: "Coins",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "is_blocked",
                table: "Coins");
        }
    }
}
