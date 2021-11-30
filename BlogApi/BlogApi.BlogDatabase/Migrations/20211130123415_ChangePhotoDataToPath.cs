using Microsoft.EntityFrameworkCore.Migrations;

namespace BlogApi.BlogDatabase.Migrations
{
    public partial class ChangePhotoDataToPath : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Data",
                table: "Photos",
                newName: "Path");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Path",
                table: "Photos",
                newName: "Data");
        }
    }
}
