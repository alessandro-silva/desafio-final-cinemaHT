class Sessoes {

  constructor() {
    this.filmes = []
    this.salas = []
    this.sessoes = []
    this.gerarId = 0
    this.idSalas = 0
    this.edicao = null
  }

  carregarSessoes() {

    if (localStorage.getItem('sessoes') != null) {
      this.sessoes = JSON.parse(localStorage.getItem('sessoes'))
    }

    if (localStorage.getItem('idSessoes') != null) {
      this.gerarId = JSON.parse(localStorage.getItem('idSessoes'))
    }

    if (localStorage.getItem('filmes') != null) {
      this.filmes = JSON.parse(localStorage.getItem('filmes'))

      let selectfilmes = document.querySelector('#selectFilme')

      for (let i = 0; i < this.filmes.length; i++) {
        let op = document.createElement('option')
        op.setAttribute('value', this.filmes[i].id)
        op.innerText = this.filmes[i].nome
        selectfilmes.appendChild(op)
      }
    }

    if (localStorage.getItem('salas') != null) {
      this.salas = JSON.parse(localStorage.getItem('salas'))

      let selectsalas = document.querySelector('#selectSala')

      for (let i = 0; i < this.salas.length; i++) {
        let opt = document.createElement('option')
        opt.setAttribute('value', this.salas[i].id)
        opt.innerText = this.salas[i].nome
        selectsalas.appendChild(opt)
      }
    }

    if (localStorage.getItem('idSalas') != null) {
      this.idSalas = JSON.parse(localStorage.getItem('idSalas'))
    }

    this.gerarTabela()
  }

  sincronizarLocalStorage() {
    localStorage.setItem('sessoes', JSON.stringify(this.sessoes))
    localStorage.setItem('idSessoes', JSON.stringify(this.gerarId))
  }

  lerDados() {
    let sessao = {}

    sessao.filme = document.querySelector('#selectFilme').value
    sessao.sala = document.querySelector('#selectSala').value
    sessao.dubleg = document.querySelector('#selectDubLeg').value
    sessao.tresddoisd = document.querySelector('#select3D2D').value
    sessao.data = document.querySelector('#inputData').value
    sessao.horario = document.querySelector('#inputHorario').value

    return sessao
  }

  salvar() {
    let sessao = this.lerDados()

    if (this.verificar(sessao)) {
      if (this.edicao == null) {
        this.adicionar(sessao)
      } else {
        this.salvarEdicao(sessao)
      }
    }
    this.sincronizarLocalStorage()
    this.gerarTabela()
    this.cancelar()
  }

  verificar(sessao) {
    let mensagem = ''

    if (sessao.filme == '') {
      mensagem += 'Selecione um filme \n'
    }

    if (sessao.sala == '') {
      mensagem += 'Selecione uma sala \n'
    }

    if (sessao.dubleg == '') {
      mensagem += 'Dublado ou Legendado \n'
    }

    if (sessao.tresddoisd == '') {
      mensagem += '3D ou 2D \n'
    }

    if (sessao.data == '') {
      mensagem += 'Informe a data da sessão \n'
    }

    if (sessao.horario == '') {
      mensagem += 'Informe o horário de iníco \n'
    }

    if (mensagem != '') {
      alert(mensagem)
      return false
    }
    return true
  }

  cancelar() {
    document.querySelector('#selectFilme').value = ''
    document.querySelector('#selectSala').value = ''
    document.querySelector('#selectDubLeg').value = ''
    document.querySelector('#select3D2D').value = ''
    document.querySelector('#inputData').value = ''
    document.querySelector('#inputHorario').value = ''
  }

  adicionar(sessao) {
    sessao.id = this.gerarId
    let achou = false
    let i = 0
    while (i < this.filmes.length && !achou) {
      if (this.filmes[i].id == sessao.filme) {
        sessao.filme = this.filmes[i]
        achou = true
      }
      i++
    }
    
    let achouu = false
    let o = 0
    while (o < this.salas.length && !achouu) {
      if (this.salas[o].id == sessao.sala) {
        sessao.sala = this.salas[o]
        achouu = true
      }
      o++
    }
    
    this.sessoes.push(sessao)
    this.gerarId++
  }

  gerarTabela() {
    let tab = document.querySelector('#tabela')
    tab.innerHTML = ''

    for (let i = 0; i < this.sessoes.length; i++) {
      let linha = tab.insertRow()
      let cellFilme = linha.insertCell()
      let cellSala = linha.insertCell()
      let cellDubLeg = linha.insertCell()
      let cell3D2D = linha.insertCell()
      let cellData = linha.insertCell()
      let cellHorario = linha.insertCell()
      let cellEditar = linha.insertCell()
      let cellExcluir = linha.insertCell()

      cellFilme.innerText = this.sessoes[i].filme.nome
      cellSala.innerText = this.sessoes[i].sala.nome
      cellDubLeg.innerText = this.sessoes[i].dubleg
      cell3D2D.innerText = this.sessoes[i].tresddoisd
      cellData.innerText = this.sessoes[i].data
      cellHorario.innerText = this.sessoes[i].horario

      let imgEditar = document.createElement('img')
      let imgExcluir = document.createElement('img')
      imgEditar.src = 'img/pencil.svg'
      imgEditar.setAttribute('onclick', `sessoes.editar('${this.sessoes[i].id}')`)
      imgExcluir.src = 'img/cancel.svg'
      imgExcluir.setAttribute('onclick', `sessoes.excluir('${this.sessoes[i].id}')`)

      cellEditar.appendChild(imgEditar)
      cellExcluir.appendChild(imgExcluir)
    }

  }

  editar(id) {
    let achou = false
    let i = 0
    while (i < this.sessoes.length && !achou) {
      if (this.sessoes[i].id == id) {
        document.querySelector('#selectFilme').value = this.sessoes[i].filme
        document.querySelector('#selectSala').value = this.sessoes[i].sala
        document.querySelector('#selectDubLeg').value = this.sessoes[i].dubleg
        document.querySelector('#select3D2D').value = this.sessoes[i].tresddoisd
        document.querySelector('#inputData').value = this.sessoes[i].data
        document.querySelector('#inputHorario').value = this.sessoes[i].horario
        this.edicao = id
      }
      i++
    }
  }

  salvarEdicao(sessao) {
    let achou = false
    let i = 0
    while (i < this.sessoes.length && !achou) {
      if (this.sessoes[i].id == this.edicao) {
        this.sessoes[i].filme = sessao.filme
        this.sessoes[i].sala = sessao.sala
        this.sessoes[i].dubleg = sessao.dubleg
        this.sessoes[i].tresddoisd = sessao.tresddoisd
        this.sessoes[i].data = sessao.data
        this.sessoes[i].horario = sessao.horario
        this.edicao = null
        achou = true
      }
      i++
    }
    this.sincronizarLocalStorage()
    this.gerarTabela()
    this.cancelar()
  }

  excluir(id) {
    let achou = false
    let i = 0
    while (i < this.sessoes.length && !achou) {
      if (this.sessoes[i].id == id) {
        this.sessoes.splice(i, 1)
        achou = true
      }
      i++
    }
    this.sincronizarLocalStorage()
    this.gerarTabela()
  }

}

let sessoes = new Sessoes()