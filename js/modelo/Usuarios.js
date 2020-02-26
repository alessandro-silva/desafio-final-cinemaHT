class Usuario {
  constructor() {
    this.usuarios = []
    this.gerarId = 0
    this.edicao = null
  }

  carregarUsuarios() {
    if (localStorage.getItem('usuarios') != null) {
      this.usuarios = JSON.parse(localStorage.getItem('usuarios'))
    }

    if (localStorage.getItem('idUsarios') != null) {
      this.gerarId = JSON.parse(localStorage.getItem('idUsuarios'))
    }
    this.gerarTabela()
  }

  sincronizarLocalStorage() {
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios))
    localStorage.setItem('idUsuarios', JSON.stringify(this.gerarId))
  }

  lerDados() {
    let usuario = {}

    usuario.nome = document.querySelector('#inputNome').value
    usuario.email = document.querySelector('#inputEmail').value
    usuario.senha = document.querySelector('#inputSenha').value

    return usuario
  }

  salvar() {
    let usuario = this.lerDados()

    if (this.verificar(usuario)) {
      if(this.edicao == null) {
        this.adicionar(usuario)
      } else {
        this.salvarEdicao(usuario)
      }
    }
    this.sincronizarLocalStorage()
    this.cancelar()
  }

  verificar(usuario) {
    let mensagem = ''

    if (usuario.nome == '') {
      mensagem += 'Campo nome do Usuário é obrigatório \n'
    }

    if (usuario.email == '') {
      mensagem += 'Campo email do Usuário é obrigatório \n'
    }

    if (usuario.senha == '') {
      mensagem += 'Campo senha do Usuário é obrigatório \n'
    }

    if (mensagem != '') {
      alert(mensagem)
      return false
    }
    return true
  }

  adicionar(usuario) {

    usuario.id = this.gerarId
    this.usuarios.push(usuario)
    this.gerarId++
  }

  gerarTabela() {
    let tab = document.querySelector('#tabela')
    tab.innerHTML = ''

    for (let i = 0; i < this.usuarios.length; i++) {
      let linha = tab.insertRow()
      let cellNome = linha.insertCell()
      let cellEmail = linha.insertCell()
      let cellSenha = linha.insertCell()
      let cellEditar = linha.insertCell()
      let cellExcluir = linha.insertCell()

      cellNome.innerText = this.usuarios[i].nome
      cellEmail.innerText = this.usuarios[i].email
      cellSenha.innerText = this.usuarios[i].senha

      let imgEditar = document.createElement('img')
      let imgExcluir = document.createElement('img')
      imgEditar.src = 'img/pencil.svg'
      imgEditar.setAttribute('onclick', `usuario.editar('${this.usuarios[i].id}')`)
      imgExcluir.src = 'img/cancel.svg'
      imgExcluir.setAttribute('onclick', `usuario.excluir('${this.usuarios[i].id}')`)
      
      cellEditar.appendChild(imgEditar)
      cellExcluir.appendChild(imgExcluir)
    }
  }

  editar(id) {
    let achou = false
    let i = 0
    while (i < this.usuarios.length && !achou) {
      if (this.usuarios[i].id == id) {
        document.querySelector('#inputNome').value = this.usuarios[i].nome 
        document.querySelector('#inputEmail').value = this.usuarios[i].email
        document.querySelector('#inputSenha').value = this.usuarios[i].senha
        this.edicao = id
        achou = true
      }
      i++
    }

  }

  salvarEdicao(usuario) {
    let achou = false
    let i = 0
    while(i < this.usuarios.length && !achou) {
      if (this.usuarios[i].id == this.edicao) {
        this.usuarios[i].nome = usuario.nome
        this.usuarios[i].email = usuario.email
        this.usuarios[i].senha = usuario.senha
        
      }
      i++
    } 
    this.cancelar()
    this.sincronizarLocalStorage()
    this.gerarTabela
  }

  excluir(id) {
    let achou = false
    let i = 0
    while(i < this.usuarios.length && !achou) {
      if (this.usuarios[i].id == id) {
        this.usuarios.splice(i, 1)
        achou = true
      }
      i++
    }
    this.sincronizarLocalStorage()
    this.gerarTabela()
  }
  
  cancelar() {
    document.querySelector('#inputNome').value = ''
    document.querySelector('#inputEmail').value = ''
    document.querySelector('#inputSenha').value = ''
  }

}
let usuario = new Usuario()