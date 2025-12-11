const pegarElemento = (id) => document.getElementById(id)
const criarTabelaUsuarios = (dados) => {
    const sessaoTabela = pegarElemento('section-table-list')
    
    // Criação dinâmica da tabela
    const tabela = document.createElement('table')
    
    // Criação do cabeçalho da tabela
    const tabelaHead = document.createElement('thead')
    const headLinhaNome = document.createElement('th')
    const headLinhaEmail = document.createElement('th')
    const headLinhaAcao = document.createElement('th')
    
    headLinhaNome.innerText = "Nome"
    headLinhaEmail.innerText = "E-mail"
    headLinhaAcao.innerText = "Ação"

    // Criação do corpo da tabela
    const tabelaBody = document.createElement('tbody')

    dados.forEach((dado) => {
        let elemento = dadosFuncionarioTabela(dado)
        tabelaBody.appendChild(elemento)
    })
    // Montanto a tabela dinâmicamente
    tabelaHead.appendChild(headLinhaNome)
    tabelaHead.appendChild(headLinhaEmail)
    tabelaHead.appendChild(headLinhaAcao)
    tabela.appendChild(tabelaHead)
    tabela.appendChild(tabelaBody)
    sessaoTabela.appendChild(tabela)
}

const dadosFuncionarioTabela = (dado) => {
    console.log(dado)
    const tabelaBodyLinha = document.createElement('tr')
    const nome = document.createElement('td')
    const email = document.createElement('td')
    const btnDelete = document.createElement('td')
    nome.innerText = dado.nome
    email.innerText = dado.email
    btnDelete.innerHTML = `<button class="btn-apagar" onclick="apagarFuncionario('${dado._id}')">X</button>`
    tabelaBodyLinha.appendChild(nome)
    tabelaBodyLinha.appendChild(email)
    tabelaBodyLinha.appendChild(btnDelete)
    return tabelaBodyLinha
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
        criarTabelaUsuarios(dados)
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

function apagarFuncionario(id) {
    console.log(`${baseUrl}/${id}`)
    fetch(`${baseUrl}/${id}`, {method: 'DELETE'})
    .then(response => {
        if(!response.ok) throw new Error(`Erro ao apagar o funcionário. Status ${response.status}`)
        return response.json()
    }).then(dado => console.log(dado))
    .catch(erro => console.error("Houve um erro ao deletar\n"+erro))

}