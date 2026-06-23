import { useEffect, useState } from "react";
import api from "../../../services/api";
import Produto from "../../../models/Produto";
import { Link } from "react-router-dom";

//REGRAS PARA A CRIAÇÃO DE NOVOS COMPONENTES
//1 - O componente deve começar com uma letra maiúscula
//2 - O componente DEVE ser uma função
//3 - O componente deve ser exportado
//4 - O componente DEVE retornar apenas um elemento pai HTML

function ListarProdutos() {

    //Estados - Variáveis 
    const [produtos, setProdutos] = useState<Produto[]>([]);

    //O useEffect é executado no carregamento do componente
    useEffect(() => {
        carregarProdutoAPI();
    },[])

    async function carregarProdutoAPI(){
        try {
            const resposta = 
                await api.get<Produto[]>("/api/produto/listar");            
            setProdutos(resposta.data);

        } catch (error) {
            console.log(error);
        }
    }

    async function deletarProduto(id : string){
        try{
            const resposta = 
                await api.delete(`/api/produto/deletar/${id}`);
            carregarProdutoAPI();
        }catch(error){
            console.log(error);
        }
    }

    return (
        <div className="ListarProdutos">
            <h1>Listar Produtos</h1>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Quantidade</th>
                        <th>Criado Em</th>
                        <th>Deletar</th>
                        <th>Alterar</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map((produto : any) => (
                        <tr key={produto.id}>
                            <td>{produto.id}</td>
                            <td>{produto.nome}</td>
                            <td>{produto.quantidade}</td>
                            <td>{produto.preco}</td>
                            <td>{produto.criadoEm}</td>
                            <td>
                                <button onClick={() => deletarProduto(produto.id)}>
                                    Deletar
                                </button>
                            </td>
                            <td>
                                <Link to={`/pages/produto/alterar/${produto.id}`}>
                                    Alterar
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody> 
            </table>
        </div>
    );
}

export default ListarProdutos;