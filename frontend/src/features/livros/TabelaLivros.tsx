import { useEffect, useState } from 'react';
import { apiLivros, Livro } from '../../api/Livros';

export enum Filtro {
    DISPONIVEIS,
    EMPRESTADOS
}

function TabelaLivros(filtro?: Filtro) {
    const [livros, setLivros] = useState<Livro[]>([]);

    async function listar() {

        if (filtro === Filtro.EMPRESTADOS) {
            var data = await apiLivros.emprestados()
            console.log("Livros emprestados")
            setLivros(data);
            return
        } else if (filtro === Filtro.DISPONIVEIS) {
            var data = await apiLivros.disponiveis()
            console.log("Livros disponíveis")
            setLivros(data);
            return
        }

        var data = await apiLivros.buscarLivros()
        setLivros(data);

        return
    }

    async function emprestar(id: number) {
        var data = await apiLivros.emprestarLivro(id)
        console.log(data)
        listar();
    }

    async function devolver(id: number) {
        var data = await apiLivros.devolverLivro(id)
        console.log(data)
        listar();
    }

    useEffect(() => {
        listar();
    }); // <- sem item de dependência de propósito para que a lista atualize ao mudar a tela

    return (
        <div className='table-container'>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Autor</th>
                        <th>Disponível</th>
                        <th>Empréstimos</th>
                        {/* <th>Data cadastro</th> */}
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {!livros && <p>Não há nenhum livro</p>}
                    {livros && (livros.map(livro =>
                        <tr key={livro.id}>
                            <td>{livro.id}</td>
                            <td>{livro.nome}</td>
                            <td>{livro.autor}</td>
                            <td>{livro.estaDisponivel ? "Disponível" : "Emprestado"}</td>
                            {/* <td>{livro.criadoEm.toISOString()}</td> */}
                            <td>{livro.quantidadeEmprestimos}</td>
                            <td>
                                <button onClick={() => {
                                    livro.estaDisponivel ?
                                        emprestar(livro.id)
                                        : devolver(livro.id)

                                }}>{
                                        livro.estaDisponivel ? "Emprestar" : "Devolver"
                                    }</button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    );
}

export default TabelaLivros;