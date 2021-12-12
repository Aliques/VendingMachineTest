using Microsoft.EntityFrameworkCore.Migrations;

namespace VendingMachineTest.Infrastructure.Migrations
{
    public partial class productentitieschanged : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "name",
                table: "Products");

            migrationBuilder.AddColumn<string>(
                name: "image_name",
                table: "Products",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "title",
                table: "Products",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "image_name",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "title",
                table: "Products");

            migrationBuilder.AddColumn<string>(
                name: "name",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
