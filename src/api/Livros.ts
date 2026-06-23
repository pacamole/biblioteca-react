import { json } from "stream/consumers"
import { FormularioLivro } from "../features/livros/CadastrarLivro"

export interface Livro {
    id: number
    nome: string
    autor: string
    estaDisponivel: boolean
    quantidadeEmprestimos: number
    criadoEm: Date
}

const BASE_URL = "http://localhost:5063/api/livro";

export const apiLivros = {

    async cadastrarLivro(livro: FormularioLivro) {
        try {
            const response = await fetch(`${BASE_URL}/cadastrar`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(livro),
            })

            return await response.json();
        } catch (err) {
            console.log("Erro ao listar livros: " + err)
        }
    },

    async buscarLivros() {
        try {
            const response = await fetch(`${BASE_URL}/listar`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            })

            return await response.json();
        } catch (err) {
            console.log("Erro ao listar livros: " + err)
        }
    },

    async emprestarLivro(id: number) {
        try {
            const response = await fetch(`${BASE_URL}/emprestar/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
            });

            return await response.json();
        } catch (err) {
            console.log("Erro ao devolver livro: " + err)
        }
    },

    async devolverLivro(id: number) {
        try {
            const response = await fetch(`${BASE_URL}/devolver/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
            });

            return await response.json();

        } catch (err) {
            console.log("Erro ao devolver livro: " + err)
        }
    },

    async disponiveis() {
        try {
            const response = await fetch(`${BASE_URL}/disponiveis`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            return await response.json();

        } catch (err) {
            console.log("Erro ao devolver livro: " + err)
        }
    },

    async emprestados() {
        try {
            const response = await fetch(`${BASE_URL}/emprestados`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            return await response.json();

        } catch (err) {
            console.log("Erro ao devolver livro: " + err)
        }
    },

    async maisEmprestado() {
        try {
            const response = await fetch(`${BASE_URL}/maisemprestado`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            return await response.json();

        } catch (err) {
            console.log("Erro ao devolver livro: " + err)
        }
    },
}
