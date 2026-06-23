import { useEffect, useState } from 'react';
import TabelaLivros, { Filtro } from './TabelaLivros';
import CadastrarLivro from './CadastrarLivro';

enum SelecaoTela {
    TODOS,
    DISPONIVEIS,
    EMPRESTADOS,
    CRIAR,
}

function LivrosScreen() {

    const [selecao, setSelecao] = useState<SelecaoTela>(SelecaoTela.TODOS);

    function mudarTela(selecao: SelecaoTela) {
        setSelecao(selecao);
        console.log("Mudou para a tela: " + selecao)
    }


    return <main>
        <div>
            <button id='todos' onClick={() => mudarTela(SelecaoTela.TODOS)}>Todos</button>
            <button id='disponiveis' onClick={() => mudarTela(SelecaoTela.DISPONIVEIS)}>Disponiveis</button>
            <button id='emprestados' onClick={() => mudarTela(SelecaoTela.EMPRESTADOS)}>Emprestados</button>
            <button id='emprestados' onClick={() => mudarTela(SelecaoTela.CRIAR)}>Cadastrar um livro</button>
        </div>
        <hr />

        <article>
            {selecao === SelecaoTela.TODOS && (TabelaLivros())}
            {selecao === SelecaoTela.DISPONIVEIS && (TabelaLivros(Filtro.DISPONIVEIS))}
            {selecao === SelecaoTela.EMPRESTADOS && (TabelaLivros(Filtro.EMPRESTADOS))}
            {selecao === SelecaoTela.CRIAR && (<CadastrarLivro />)}
        </article>
    </main>
}

export default LivrosScreen;