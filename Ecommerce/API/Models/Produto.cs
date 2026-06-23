using System;

namespace API.Models;

public class Produto
{
    public Produto()
    {
        CriadoEm = DateTime.Now;
        Id = Guid.NewGuid().ToString();
    }

    //Atributo, propriedade e característica - C#
    public string? Id { get; set; } = Guid.NewGuid().ToString();
    public string? Nome { get; set; }
    public int Quantidade { get; set; }
    public double Preco { get; set; }
    public DateTime CriadoEm { get; set; } = DateTime.Now;

    //Atributo, propriedade e característica - Java
    // private string nome;
    // public string getNome()
    // {
    //     return this.nome;
    // }
    // public void setNome(string nome)
    // {
    //     this.nome = nome;
    // }
}
