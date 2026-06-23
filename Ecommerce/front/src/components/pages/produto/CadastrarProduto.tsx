import { useState } from "react";
import Produto from "../../../models/Produto";
import api from "../../../services/api";

function CadastrarProduto(){

    //Estados
    const [nome, setNome] =  useState("");
    const [quantidade, setQuantidade] =  useState("");
    const [preco, setPreco] =  useState("");

    async function enviarProdutoAPI(e : any){
        e.preventDefault();

        // const resposta = fetch("url_inteira",
        //     {
        //         method : "POST",
        //         headers : {
        //             "Content-Type" : "application/json"
        //         },
        //         body: JSON.stringify({nome})
        //     }
        // )
        // .then(resposta => {
        //     //fazer algo caso de certo
        // })
        // .catch(error => {
        //     //fazer algo caso de errado
        // });
        
        try {
            const produto : Produto = { 
                nome, 
                quantidade: Number(quantidade),
                preco: Number(preco)
            };


           const resposta = 
            await api.post("/api/produto/cadastrar", produto);

            setNome("");
            setPreco("");
            setQuantidade("");

            console.log(resposta.data);
        } catch (error) {
            console.log(error);
        }

    }

    return(
        <div className="CadastrarProduto">
            <h1>Cadastrar Produto</h1>
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
                        Cadastrar
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CadastrarProduto;