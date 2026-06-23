import { useEffect, useState } from "react";
import Produto from "../../../models/Produto";
import api from "../../../services/api";
import { useNavigate, useParams } from "react-router-dom";

function AlterarProduto(){

    //Estados
    const [nome, setNome] =  useState("");
    const [quantidade, setQuantidade] =  useState("");
    const [preco, setPreco] =  useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        buscarProdutoAPI();
    }, [])

    async function buscarProdutoAPI(){
        try {
            const resposta = await 
                api.get<Produto>(`/api/produto/buscar/${id}`);
            setNome(resposta.data.nome);
            setQuantidade(resposta.data.quantidade!.toString());
            setPreco(String(resposta.data.preco));
        } catch (error) {
            console.log(error);
        }
    }

    async function enviarProdutoAPI(e : any){
        e.preventDefault();
        
        try {
            const produto : Produto = { 
                id,
                nome, 
                quantidade: Number(quantidade),
                preco: Number(preco)
            };

           const resposta = 
            await api.put("/api/produto/alterar", produto);

            setNome("");
            setPreco("");
            setQuantidade("");

            navigate("/");
        } catch (error) {
            console.log(error);
        }

    }

    return(
        <div className="CadastrarProduto">
            <h1>Alterar Produto</h1>
            <form onSubmit={enviarProdutoAPI}>
                <div>
                    <label>Nome:</label>
                    <input value={nome} required type="text" onChange={
                        (e : any) => {setNome(e.target.value)}
                    }/>
                </div>
                <div>
                    <label>Quantidade:</label>
                    <input value={quantidade} required type="text" onChange={
                        (e : any) => {setQuantidade(e.target.value)}
                    }/>
                </div>
                <div>
                    <label>Preço:</label>
                    <input value={preco} required type="text" onChange={
                        (e : any) => {setPreco(e.target.value)}
                    }/>
                </div>
                <div>
                    <button type="submit">
                        Salvar
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AlterarProduto;