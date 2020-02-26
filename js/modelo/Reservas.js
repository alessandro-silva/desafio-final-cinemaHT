class Reservas {
  constructor() {
    this.reservas = []
    this.sessoes = []
    this.clientes = []
    this.cadeiras = []
    this.idReservas = 0
    this.idClientes = 0
    this.idSessoes = 0
    this.edicao = null
  }

  carregarLocalStorage(){
    if (localStorage.getItem('sessoes') != null) {
      this.sessoes = JSON.parse(localStorage.getItem('sessoes'))
      let selectsessoes = document.querySelector('#selectSessao')

      for (let i = 0; i < this.sessoes.length; i++) {
        let op = document.createElement('option')
        op.setAttribute('value', this.sessoes[i].id)
        op.innerText = `${this.sessoes[i].filme.nome}, ${this.sessoes[i].data}, ${this.sessoes[i].horario}, ${this.sessoes[i].dubleg}`
        selectsessoes.appendChild(op)
      }
    }

    if (localStorage.getItem('idSessoes') != null) {
      this.idSessoes = JSON.parse(localStorage.getItem('idSessoes'))
    }

    if (localStorage.getItem('clientes') != null) {
      this.clientes = JSON.parse(localStorage.getItem('clientes'))
      let selectclientes = document.querySelector('#selectCliente')

      for (let i = 0; i < this.clientes.length; i++) {
        let op = document.createElement('option')
        op.setAttribute('value', this.clientes[i].id)
        op.innerText = this.clientes[i].nome
        selectclientes.appendChild(op)
      }
    }

    if (localStorage.getItem('idClientes') != null) {
      this.idClientes = JSON.parse(localStorage.getItem('idClientes'))
    }

    if (localStorage.getItem('reservas') != null) {
      this.reservas = JSON.parse(localStorage.getItem('reservas'))
    }

    if (localStorage.getItem('idReservas') != null) {
      this.idReservas = JSON.parse(localStorage.getItem('idReservas'))
    }
  }


  sincronizarLocalStorageClientes() {
    localStorage.setItem('clientes', JSON.stringify(this.clientes))
    localStorage.setItem('idClientes', JSON.stringify(this.idClientes))
  }

  sincronizarLocalStorageSessoes() {
    localStorage.setItem('sessoes', JSON.stringify(this.sessoes))
    localStorage.setItem('idSessoes', JSON.stringify(this.idSessoes))
  }

  sincronizarLocalStorageReservas() {
    localStorage.setItem('reservas', JSON.stringify(this.reservas))
    localStorage.setItem('idReservas', JSON.stringify(this.idReservas))
  }

  lerDados() {
    let reserva = {}

    reserva.sessao = document.querySelector('#selectSessao').value
    reserva.cliente = document.querySelector('#selectCliente').value

    return reserva
  }

  lerCadeiras() {
    let cadeira = {}

    cadeira.a1 = document.querySelector('#a1')
    cadeira.a2 = document.querySelector('#a2')
    cadeira.a3 = document.querySelector('#a3')
    cadeira.a4 = document.querySelector('#a4')
    cadeira.a5 = document.querySelector('#a5')
    cadeira.a6 = document.querySelector('#a6')
    cadeira.a7 = document.querySelector('#a7')
    cadeira.a8 = document.querySelector('#a8')
    cadeira.a9 = document.querySelector('#a9')
    cadeira.a10 = document.querySelector('#a10')

    cadeira.b1 = document.querySelector('#b1')
    cadeira.b2 = document.querySelector('#b2')
    cadeira.b3 = document.querySelector('#b3')
    cadeira.b4 = document.querySelector('#b4')
    cadeira.b5 = document.querySelector('#b5')
    cadeira.b6 = document.querySelector('#b6')
    cadeira.b7 = document.querySelector('#b7')
    cadeira.b8 = document.querySelector('#b8')
    cadeira.b9 = document.querySelector('#b9')
    cadeira.b10 = document.querySelector('#b10')

    cadeira.c1 = document.querySelector('#c1')
    cadeira.c2 = document.querySelector('#c2')
    cadeira.c3 = document.querySelector('#c3')
    cadeira.c4 = document.querySelector('#c4')
    cadeira.c5 = document.querySelector('#c5')
    cadeira.c6 = document.querySelector('#c6')
    cadeira.c7 = document.querySelector('#c7')
    cadeira.c8 = document.querySelector('#c8')
    cadeira.c9 = document.querySelector('#c9')
    cadeira.c10 = document.querySelector('#c10')

    cadeira.d1 = document.querySelector('#d1')
    cadeira.d2 = document.querySelector('#d2')
    cadeira.d3 = document.querySelector('#d3')
    cadeira.d4 = document.querySelector('#d4')
    cadeira.d5 = document.querySelector('#d5')
    cadeira.d6 = document.querySelector('#d6')
    cadeira.d7 = document.querySelector('#d7')
    cadeira.d8 = document.querySelector('#d8')
    cadeira.d9 = document.querySelector('#d9')
    cadeira.d10 = document.querySelector('#d10')

    cadeira.e1 = document.querySelector('#e1')
    cadeira.e2 = document.querySelector('#e2')
    cadeira.e3 = document.querySelector('#e3')
    cadeira.e4 = document.querySelector('#e4')
    cadeira.e5 = document.querySelector('#e5')
    cadeira.e6 = document.querySelector('#e6')
    cadeira.e7 = document.querySelector('#e7')
    cadeira.e8 = document.querySelector('#e8')
    cadeira.e9 = document.querySelector('#e9')
    cadeira.e10 = document.querySelector('#e10')

    cadeira.f1 = document.querySelector('#f1')
    cadeira.f2 = document.querySelector('#f2')
    cadeira.f3 = document.querySelector('#f3')
    cadeira.f4 = document.querySelector('#f4')
    cadeira.f5 = document.querySelector('#f5')
    cadeira.f6 = document.querySelector('#f6')
    cadeira.f7 = document.querySelector('#f7')
    cadeira.f8 = document.querySelector('#f8')
    cadeira.f9 = document.querySelector('#f9')
    cadeira.f10 = document.querySelector('#f10')

    return cadeira
  }

  statusCadeira(cadeira) {
    cadeira.a1.setAttribute('onclick', ) 
  }

  salvar() {
    let reserva = this.lerDados()
    let cadeira = this.lerCadeiras()
    if (this.verificar(reserva)) {
      if (this.edicao == null) {
        this.adicionar(reserva)
      }
    }
    this.statusCadeira(cadeira)
  }

  cancelar() {
    document.querySelector('#selectSessao').value = ''
    document.querySelector('#selectCliente').value = ''
    this.edicao = null
  }

  verificar(reserva) {
    let mensagem = ''
    if (reserva.sessao == '') {
      mensagem += 'Selecione uma Sessão'
    }
    if (reserva.cliente == '') {
      mensagem += 'Selecione um Cliente'
    }

    if (mensagem != '') {
      alert(mensagem)
      return false
    }
    return true
  }

  adicionar(reserva) {
    reserva.id = this.idReservas
    this.reservas.push(reserva)
    this.idReservas++
  }

  gerartabela() { }

  editar() { }

  salvarEdicao() { }

  excluir() { }
}

let reservas = new Reservas()