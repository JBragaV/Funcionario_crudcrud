const pegarElemento = (id) => document.getElementById(id)
const criarTabelaUsuarios = () => {
    const sessaoTabela = pegarElemento('section-table-list')
    console.log(sessaoTabela)
    const tabela = document.createElement('table')
    const tabelaHead = document.createElement('thead')
    const headLinhaNome = document.createElement('th')
    const headLinhaEmail = document.createElement('th')
    const headLinhaAcao = document.createElement('th')
    headLinhaNome.innerText = "Nome"
    headLinhaEmail.innerText = "E-mail"
    headLinhaAcao.innerText = "Ação"
    const tabelaBody = document.createElement('tbody')
    const tabelaBodyLinha = document.createElement('tr')
    const dadoLinha = document.createElement('td')
    tabelaHead.appendChild(headLinhaNome)
    tabelaHead.appendChild(headLinhaEmail)
    tabelaHead.appendChild(headLinhaAcao)
    tabela.appendChild(tabelaHead)
    sessaoTabela.appendChild(tabela)
}
const baseUrl = 'https://crudcrud.com/api/aa154cd1f28c4a74aebbf5afb76d5831/funcionario'
const formulario = pegarElemento('add-form-woker')

document.addEventListener('DOMContentLoaded', () => {
    fetch(baseUrl)
    .then(response => {
        if (!response.ok) throw new Error("Erro ao buscar")
        return response.json()
    }).then(dados => {
        console.table(dados)
        criarTabelaUsuarios()
    }).catch(error => console.error(`MEU ERRO FOI ${error.status}`))
})


formulario.addEventListener('submit', (e) => {

    e.preventDefault()
    const nome = pegarElemento('nome-worker').value
    const email = pegarElemento('email-worker').value
    console.log(nome, email)
    cadastrarCliente(nome, email)
})


function cadastrarCliente(nome, email) {
    console.log('Olá enfermeira')
    const header = {
        "Content-Type": "application/json"
    }
    fetch(baseUrl, {
        method: 'POST',
        headers: header,
        body: JSON.stringify({"nome": nome, "email": email})
    }).then(response => {
        if (!response.ok) throw new Error(`Erro na requisição. Status Code ${response.status}`)
        return response.json()
    }).then(dados => {
        console.log(dados)
    }).catch(erro => console.error(`O erro foi esse: ${erro}`))
}

