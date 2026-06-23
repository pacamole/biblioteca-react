using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Deconto.Migrations
{
    /// <inheritdoc />
    public partial class QuantidadeEmprestimo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "QuantidadeEmprestimos",
                table: "Livros",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "QuantidadeEmprestimos",
                table: "Livros");
        }
    }
}
