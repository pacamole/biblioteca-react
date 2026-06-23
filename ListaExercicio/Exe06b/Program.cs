Console.Clear();
//Passo a passo para criar uma solução e projeto e C#

//1 - Criar a solução           dotnet new sln --output Nome
//2 - Entrar na pasta sln       cd nome da pasta
//3 - Criar o projeto           dotnet new console --name Nome
//4 - Adicionar o projetona sln dotnet sln add NomeProjeto

//Passo a passo para resolver o exercíio 06

//1 - Criar um vetor de valores inteiros com N posições
int[] vetor = new int[100];

//2 - Criar um laço de repetição para percorrer o vetor
for (int i = 0; i < vetor.Length; i++)
{
    //3 - Atribuir um valor aleatório para cada posição
    Random random = new Random();
    vetor[i] = random.Next(1000);
}

//4 - Imprimir o vetor sem ordenção
for (int i = 0; i < vetor.Length; i++)
{
    Console.Write(vetor[i] + " ");
}

//5 - Ordenar o vetor com uma função do C#
Array.Sort(vetor);
Array.Reverse(vetor);

Console.WriteLine("\n");
//6 - Imprimir o vetor com ordenção
for (int i = 0; i < vetor.Length; i++)
{
    Console.Write(vetor[i] + " ");
}