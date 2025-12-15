import { pegarElemento } from "./utils.js"


class Funcionario {
    #id
    #nome
    #email

    constructor(id, nome, email) {
        this.#id = id
        this.#nome = nome
        this.#email = email
    }

    get id() {
        return this.#id
    }

    get nome() {
        return this.#nome
    }

    get email() {
        return this.#email
    }
}


class ApiFuncionarios {
    #baseUrl
    // abd7e922dacc49c88811b790d596470b
    constructor(chaveApi = '27936a8c1dd343f0bb27c0a104f6d1a6') {
        this.#baseUrl = `https://crudcrud.com/api/${chaveApi}/funcionario`
    }

    async cadastrarCliente(nome, email) {
        const header = {
            "Content-Type": "application/json"
        }
        try {
            const response = await fetch(this.#baseUrl, {
                method: 'POST',
                headers: header,
                body: JSON.stringify({"nome": nome, "email": email})
            })
            if (!response.ok) throw new Error(`Erro na requisição. Status Code ${response.status}`)
            return response
        } catch (error) {
            console.error(`O erro foi esse: ${error}`)
        }
    }
    
    async apagarFuncionario(id) {
        try {
            const response = await fetch(`${this.#baseUrl}/${id}`, {method: 'DELETE'})
            if(!response.ok) throw new Error(`Erro ao apagar o funcionário. Status ${response.status}`)
        } catch (error) {
            console.error("Houve um erro ao deletar\n"+error)
        }
        
    }

    async listarFuncionarios() {
        try {
            const response = await fetch(this.#baseUrl)
            if (!response.ok) throw new Error("Erro ao buscar")
            const dados = await response.json()
            return dados
        } catch (error) {
            console.error(`MEU ERRO FOI ${error}`)
            // TODO Informar que houve um erro na API.
        }
    }
}

export class TabelaFuncionarios {
    #listaFuncionarios
    #api
    constructor() {
        this.#api = new ApiFuncionarios()
        this.#listaFuncionarios = [] // "Base de Dados" para economizar nas requisições para a api Work in Progress
    }

    async adicionarFuncionario(nome, email) {
        this.apagarTabelaUsuários()
        await this.#api.cadastrarCliente(nome, email)
        await this.criarTabelaUsuarios()
    }

    apagarTabelaUsuários = () => {
        const tabela = document.getElementById('tabela-funcionarios')
        if (tabela) {
            tabela.remove()
        }   
    }
    dadosFuncionarioTabela(dado) {
        console.log(dado)
        const tabelaBodyLinha = document.createElement('tr')
        const nome = document.createElement('td')
        const email = document.createElement('td')
        const btnDeleteTd = document.createElement('td')
        const btnDelete = document.createElement('button')
        nome.innerText = dado.nome
        email.innerText = dado.email
        btnDelete.innerText = 'X'
        btnDelete.classList.add('btn-apagar')
        btnDelete.addEventListener('click', () => {
            this.apagarLinha(dado.id)
        })
        btnDeleteTd.appendChild(btnDelete)
        tabelaBodyLinha.appendChild(nome)
        tabelaBodyLinha.appendChild(email)
        tabelaBodyLinha.appendChild(btnDelete)
        return tabelaBodyLinha
    }

    async carregarDadosFuncionarios() {
        const dados = await this.#api.listarFuncionarios()
        this.#listaFuncionarios = []
        console.log('carregar', dados)
        dados.map(elemento => {
            let funcionario = new Funcionario(elemento._id, elemento.nome, elemento.email)
            this.#listaFuncionarios.push(funcionario)
        })
        return this.#listaFuncionarios
    }

    async criarTabelaUsuarios() {
        const sessaoTabela = pegarElemento('section-table-list')
        try {
            const dados = await this.carregarDadosFuncionarios()
            if (dados.length == 0){
                // TODO inserir informação que não existe usuários
                console.log(this.#api)
    
            }else{                
                // Criação dinâmica da tabela
                const tabela = document.createElement('table')
                tabela.id = 'tabela-funcionarios'
                
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
                    let elemento = this.dadosFuncionarioTabela(dado)
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
        } catch (error) {
            console.error("ESSE ERRO É MEU "+error)
        }
    }

    async apagarLinha(id) {
        await this.#api.apagarFuncionario(id)
        this.apagarTabelaUsuários()
        await this.criarTabelaUsuarios()
        
        // location.reload()
    }
}