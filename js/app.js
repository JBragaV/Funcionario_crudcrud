import { ApiFuncionarios, TabelaFuncionarios } from "./classes.js"
import { pegarElemento, } from "./utils.js"


const formulario = pegarElemento('add-form-woker')
const tabelaHtml = new TabelaFuncionarios()
const apiFuncionario = new ApiFuncionarios('abd7e922dacc49c88811b790d596470b')


document.addEventListener('DOMContentLoaded', () => {
    tabelaHtml.criarTabelaUsuarios()
})


formulario.addEventListener('submit', (e) => {
    const nome = pegarElemento('nome-worker').value
    const email = pegarElemento('email-worker').value
    console.log(nome, email)

    apiFuncionario.cadastrarCliente(nome, email)
})
