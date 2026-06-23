import { useEffect, useState } from 'react';
import { apiLivros } from '../../api/Livros';

export interface FormularioLivro {
    nome: string,
    autor: string,
}

function CadastrarLivro() {
    const [formLivro, setFormLivro] = useState<FormularioLivro>({
        "nome": "",
        "autor": ""
    })

    useEffect(() => { })

    async function criar() {
        var data = await apiLivros.cadastrarLivro(formLivro)
        console.log("Livro cadastrado: " + data)
    }

    return (<div>
        <form onSubmit={criar}>
            <div >
                <label>Nome: </label>
                <input type="text" name="nome" value={formLivro.nome} required />
            </div>
            <div className="form-group">
                <label>Classificação: </label>
                <input type="text" name="classificacao" value={formLivro.autor} required />
            </div>
            <button type="submit">Guardar</button>
        </form >
    </div >);
}

export default CadastrarLivro;