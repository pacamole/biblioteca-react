//CONTRUIR A APLICAÇÃO BASE
using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

//Adicionar o contexto na lista de serviços da aplicação
builder.Services.AddDbContext<AppDataContext>();

builder.Services.AddCors(options =>
    options.AddPolicy("Acesso Total", 
        configs => configs
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod())
);

var app = builder.Build();

List<Produto> produtos = new List<Produto>();

//Endpoints - ADICIONAR FUNCIONALIDADES NA APLICAÇÃO
//Requisição
// - URL
// - Método HTTP
// - Parâmetros/Informações/Dados (Opcional)
//  - Listar/buscar (Retrive) dados: Método HTTP GET
//  - Cadastrar (Create) dados: Método HTTP POST

//Resposta
// - Código de Status HTTP
// - Informações/Dados (Opcional)
app.MapGet("/", () => "API de Produtos!");

//GET: /api/produto/listar
app.MapGet("/api/produto/listar",
    ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Produtos.Any())
    {
        //Configurar a resposta da requisição
        return Results.Ok(ctx.Produtos.ToList());
    }
    return Results.NotFound("Lista de produtos vazia!");
});

//POST: /api/produto/cadastrar
app.MapPost("/api/produto/cadastrar",
    ([FromBody] Produto produto,
    [FromServices] AppDataContext ctx) =>
{
    //Não permitir o cadastro de um produto com o mesmo nome
    //Expressão lambda
    Produto? resultado = ctx.Produtos.FirstOrDefault
        (x => x.Nome == produto.Nome);

    if (resultado is not null)
    {
        return Results.Conflict("Esse produto já existe!");
    }

    ctx.Produtos.Add(produto);
    ctx.SaveChanges();
    return Results.Created("", produto);
});

//GET: /api/produto/buscar/{id}
app.MapGet("/api/produto/buscar/{id}",
    ([FromRoute] string id,
    [FromServices] AppDataContext ctx) =>
{
    // Produto? resultado = ctx.Produtos.FirstOrDefault
    //     (x => x.Id == id);

    Produto? resultado = ctx.Produtos.Find(id);

    if (resultado is not null)
    {
        return Results.Ok(resultado);
    }

    return Results.NotFound("Produto não encontrado!");
});

//DELETE: /api/produto/deletar/{id}
app.MapDelete("/api/produto/deletar/{id}",
    ([FromRoute] string id,
    [FromServices] AppDataContext ctx) =>
{

    Produto? resultado = ctx.Produtos.Find(id);

    if (resultado is not null)
    {
        ctx.Produtos.Remove(resultado);
        ctx.SaveChanges();
        return Results.NoContent();
    }

    return Results.NotFound("Produto não encontrado!");
});

//PUT: /api/produto/alterar/
app.MapPut("/api/produto/alterar",
    ([FromBody] Produto produtoAlterado,
    [FromServices] AppDataContext ctx) =>
{

    Produto? resultado = ctx.Produtos.Find(produtoAlterado.Id);

    if (resultado is not null)
    {
        resultado.Nome = produtoAlterado.Nome;
        resultado.Preco = produtoAlterado.Preco;
        resultado.Quantidade = produtoAlterado.Quantidade;
        ctx.Produtos.Update(resultado);
        ctx.SaveChanges();
        return Results.Ok(produtoAlterado);
    }

    return Results.NotFound("Produto não encontrado!");
});

app.UseCors("Acesso Total");

//RODAR A APLICAÇÃO
app.Run();
