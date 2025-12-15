import { pegarElemento } from "./utils.js"

export class Funcionario {
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


export class ApiFuncionarios {
    #baseUrl
    // 0469d2885c6247f6b60a2f885d121213
    constructor(chaveApi) {
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
        console.log(id)
        alert("Apagando")
        console.log(`${this.#baseUrl}/${id}`)
        try {
            const response = await fetch(`${this.#baseUrl}/${id}`, {method: 'DELETE'})
            if(!response.ok) throw new Error(`Erro ao apagar o funcionário. Status ${response.status}`)
        } catch (error) {
            console.error("Houve um erro ao deletar\n"+error)
        }
        
    }

    async listarFuncionarios() {
        console.log("Listando", this.#baseUrl)
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
    constructor(chaveApi = 'abd7e922dacc49c88811b790d596470b') {
        this.#api = new ApiFuncionarios(chaveApi)
        this.#listaFuncionarios = []
    }

    apagarTabelaUsuários = () => {
    const tabela = document.getElementById('tabela-funcionarios')
        if (tabela) {
            tabela.remove()
        }   
    }

    dadosFuncionarioTabela(dado) {
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
            this.apagarLinha(dado._id)
        })
        btnDeleteTd.appendChild(btnDelete)
        tabelaBodyLinha.appendChild(nome)
        tabelaBodyLinha.appendChild(email)
        tabelaBodyLinha.appendChild(btnDelete)
        return tabelaBodyLinha
    }

    async criarTabelaUsuarios() {
        const sessaoTabela = pegarElemento('section-table-list')
        console.log("SESSÃO", sessaoTabela)
        try {
            const dados = await this.#api.listarFuncionarios()
            
            if (dados.length == 0){
                // TODO inserir informação que não existe usuários
                console.log(this.#api)
    
            }else{
                
                console.log("Tem dados DADOS BRUTO", dados)
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
                console.log('Cheguei aqui')
            }
        } catch (error) {
            console.error("ESSE ERRO É MEU "+error)
        }
    }

    apagarLinha(id) {
        this.apagarTabelaUsuários()
        this.#api.apagarFuncionario(id)
        this.criarTabelaUsuarios()
    }
}