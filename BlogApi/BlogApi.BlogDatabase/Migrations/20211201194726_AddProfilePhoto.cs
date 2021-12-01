using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BlogApi.BlogDatabase.Migrations
{
    public partial class AddProfilePhoto : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ProfilePhotoId",
                table: "UserPhotos",
                type: "uniqueidentifier",
                nullable: true,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_UserPhotos_ProfilePhotoId",
                table: "UserPhotos",
                column: "ProfilePhotoId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserPhotos_Photos_ProfilePhotoId",
                table: "UserPhotos",
                column: "ProfilePhotoId",
                principalTable: "Photos",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserPhotos_Photos_ProfilePhotoId",
                table: "UserPhotos");

            migrationBuilder.DropIndex(
                name: "IX_UserPhotos_ProfilePhotoId",
                table: "UserPhotos");

            migrationBuilder.DropColumn(
                name: "ProfilePhotoId",
                table: "UserPhotos");
        }
    }
}
