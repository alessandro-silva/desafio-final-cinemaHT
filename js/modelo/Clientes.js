
export default class Clientes {

  constructor() {
    this.clientes = []
    this.gerarId = 0
    this.edicao = null
  }

  lerDados() {

    let cliente = {}

    cliente.nome = document.getElementById('inputNome').value
    cliente.idade = document.querySelector('#inputIdade').value
    cliente.email = document.querySelector('#inputEmail').value

    return cliente
  }

  carregarClientes() {

    if (localStorage.getItem('clientes') != null) {
      this.clientes = JSON.parse(localStorage.getItem('clientes'))
    }

    if (localStorage.getItem('idClientes') != null) {
      this.gerarId = JSON.parse(localStorage.getItem('idClientes'))
    }

    this.gerarTabela()

  }

  sincronizarLocalStorage() {
    localStorage.setItem('clientes', JSON.stringify(this.clientes))
    localStorage.setItem('idClientes', JSON.stringify(this.gerarId))
  }

  salvar() {
    let cliente = this.lerDados()

    if (this.validar(cliente)) {
      if (this.edicao == null) {
        this.adicionar(cliente)
      } else {
        this.salvarEdicao(cliente)
      }

      this.cancelar()
      this.sincronizarLocalStorage()
      this.gerarTabela()
    }

  }

  validar(cliente) {
    let mensagem = ''

    if (cliente.nome == '') {
      mensagem += 'Campo nome é obrigatório \n'
    }

    if (cliente.idade == '') {
      mensagem += 'Campo idade é obrigatório \n'
    }

    if (cliente.email == '') {
      mensagem += 'Campo email é obrigatório \n'
    }

    if (mensagem != '') {
      alert(mensagem)
      return false
    }
    return true
  }

  adicionar(cliente) {
    cliente.id = this.gerarId
    this.clientes.push(cliente)
    this.gerarId++
  }

  cancelar() {
    document.getElementById('inputNome').value = ''
    document.querySelector('#inputIdade').value = ''
    document.querySelector('#inputEmail').value = ''

    this.edicao = null
  }

  gerarTabela() {
    let tab = document.querySelector('#tabela')
    tab.innerHTML = ''

    for (let i = 0; i < this.clientes.length; i++) {
      let linha = tab.insertRow()
      let cellNome = linha.insertCell()
      let cellIdade = linha.insertCell()
      let cellEmail = linha.insertCell()
      let cellEditar = linha.insertCell()
      let cellExcluir = linha.insertCell()
   
      cellNome.innerText = this.clientes[i].nome
      cellIdade.innerText = this.clientes[i].idade
      cellEmail.innerText = this.clientes[i].email

      let imgEditar = document.createElement('img')
      let imgExcluir = document.createElement('img')
      imgEditar.src = 'img/pencil.svg'
      imgEditar.addEventListener('click', function(){`editar('${this.clientes[i].id}')`})
      // imgEditar.setAttribute('onclick', `clientes.editar('${this.clientes[i].id}')`)
      imgExcluir.src = 'img/cancel.svg'
      imgExcluir.setAttribute('onclick', `clientes.excluir('${this.clientes[i].id}')`)

      cellEditar.appendChild(imgEditar)
      cellExcluir.appendChild(imgExcluir)
    }
  }

  editar(id) {
    let achou = false
    let i = 0
    while (i < this.clientes.length && !achou) {
      if (this.clientes[i].id == id) {
        document.getElementById('inputNome').value = this.clientes[i].nome
        document.querySelector('#inputIdade').value = this.clientes[i].idade
        document.querySelector('#inputEmail').value = this.clientes[i].email

        this.edicao = id
        achou = true
      }
      i++
    }
  }

  salvarEdicao(cliente) {
    let achou = false
    let i = 0
    while (i < this.clientes.length && !achou) {
      if (this.clientes[i].id == this.edicao) {
        this.clientes[i].nome = cliente.nome
        this.clientes[i].idade = cliente.idade
        this.clientes[i].email = cliente.email
        achou = true
      }
      i++
    }
    this.cancelar
    this.sincronizarLocalStorage()
    this.gerarTabela()
  }

  excluir(id) {
    let achou = false
    let i = 0
    while (i < this.clientes.length && !achou) {
      if (this.clientes[i].id == id) {
        this.clientes.splice(i, 1)
        achou = true
      }
      i++
    }
    this.sincronizarLocalStorage()
    this.gerarTabela()
  }

}

// let clientes = new Clientes()
