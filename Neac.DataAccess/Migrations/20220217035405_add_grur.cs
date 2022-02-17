using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Neac.DataAccess.Migrations
{
    public partial class add_grur : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GroupUserRoles");

            migrationBuilder.CreateTable(
                name: "GroupRoleUserPositions",
                columns: table => new
                {
                    GroupRoleUserPositionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PositionUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    RoleId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupRoleUserPositions", x => x.GroupRoleUserPositionId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GroupRoleUserPositions");

            migrationBuilder.CreateTable(
                name: "GroupUserRoles",
                columns: table => new
                {
                    GroupUserRoleId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    GroupRoleId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupUserRoles", x => x.GroupUserRoleId);
                });
        }
    }
}
