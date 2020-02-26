class Salas {

  constructor() {
    this.salas = []
    this.idSalas = 0
    this.edicao = null
  }

  lerDados() { 
    let sala = {}

    sala.nome = document.querySelector('#inputNome').value

    return sala
  }

  carregarSalas() {

    if (localStorage.getItem('salas') != null) {
      this.salas = JSON.parse(localStorage.getItem('salas'))
    }

    if (localStorage.getItem('idSalas') != null) {
      this.idSalas = JSON.parse(localStorage.getItem('idSalas'))
    }

    this.gerarTabela()

  }

  sincronizarLocalStorage() {
    localStorage.setItem('salas', JSON.stringify(this.salas))
    localStorage.setItem('idSalas', JSON.stringify(this.idSalas))
  }

  salvar() {
    let sala = this.lerDados()

    if (this.validar(sala)) {
      if (this.edicao == null) {
        this.adicionar(sala)
      } else {
        this.salvarEdicao(sala)
      }

      this.cancelar()
      this.sincronizarLocalStorage()
      this.gerarTabela()
    }

  }

  validar(sala) {
    let mensagem = ''

    if (sala.nome == '') {
      mensagem += 'Campo nome é obrigatório \n'
    }


    if (mensagem != '') {
      alert(mensagem)
      return false
    }
    return true
  }

  adicionar(sala) {
    sala.id = this.idSalas
    this.salas.push(sala)
    this.idSalas++
  }

  cancelar() {
    document.getElementById('inputNome').value = ''

    this.edicao = null
  }

  gerarTabela() {
    let tab = document.querySelector('#tabela')
    tab.innerHTML = ''

    for (let i = 0; i < this.salas.length; i++) {
      let linha = tab.insertRow()
      let cellNome = linha.insertCell()
      let cellEditar = linha.insertCell()
      let cellExcluir = linha.insertCell()

      cellNome.innerText = this.salas[i].nome

      let imgEditar = document.createElement('img')
      let imgExcluir = document.createElement('img')
      imgEditar.src = 'img/pencil.svg'
      imgEditar.setAttribute('onclick', `salas.editar('${this.salas[i].id}')`)
      imgExcluir.src = 'img/cancel.svg'
      imgExcluir.setAttribute('onclick', `salas.excluir('${this.salas[i].id}')`)

      cellEditar.appendChild(imgEditar)
      cellExcluir.appendChild(imgExcluir)
    }
  }

  editar(id) {
    let achou = false
    let i = 0
    while (i < this.salas.length && !achou) {
      if (this.salas[i].id == id) {
        document.getElementById('inputNome').value = this.salas[i].nome
        this.edicao = id
        achou = true
      }
      i++
    }
  }

  salvarEdicao(sala) {
    let achou = false
    let i = 0
    while (i < this.salas.length && !achou) {
      if (this.salas[i].id == this.edicao) {
        this.salas[i].nome = sala.nome
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
    while (i < this.salas.length && !achou) {
      if (this.salas[i].id == id) {
        this.salas.splice(i, 1)
        achou = true
      }
      i++
    }
    this.sincronizarLocalStorage()
    this.gerarTabela()
  }

}

let salas = new Salas() 