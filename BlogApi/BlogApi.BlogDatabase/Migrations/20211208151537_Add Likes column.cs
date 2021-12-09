using Microsoft.EntityFrameworkCore.Migrations;

namespace BlogApi.BlogDatabase.Migrations
{
    public partial class AddLikescolumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PhotoPath",
                table: "Articles");

            migrationBuilder.AddColumn<bool>(
                name: "IsLiked",
                table: "Likes",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsLiked",
                table: "Likes");

            migrationBuilder.AddColumn<string>(
                name: "PhotoPath",
                table: "Articles",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
