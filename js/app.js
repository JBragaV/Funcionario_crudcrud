import { TabelaFuncionarios } from "./classes.js"
import { pegarElemento } from "./utils.js"


const formulario = pegarElemento('add-form-woker')
const tabelaHtml = new TabelaFuncionarios()


document.addEventListener('DOMContentLoaded', () => {
    tabelaHtml.criarTabelaUsuarios()
})


formulario.addEventListener('submit', (e) => {
    e.preventDefault()
    const nome = pegarElemento('nome-worker').value
    const email = pegarElemento('email-worker').value

    tabelaHtml.adicionarFuncionario(nome, email)
    formulario.reset()
})
