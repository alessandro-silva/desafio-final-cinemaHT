class Filmes {

  constructor() {
    this.filmes = []
    this.gerarId = 0
    this.edicao = null
  }

  carregarFilmes() {
    
    if(localStorage.getItem('filmes') != null) {
      this.filmes = JSON.parse(localStorage.getItem('filmes'))
    }
    if(localStorage.getItem('idFilmes') != null) {
      this.gerarId = JSON.parse(localStorage.getItem('idFilmes'))
    }
    this.gerarTabela()
   }

  sincronizarLocalStorage() {
    localStorage.setItem('filmes', JSON.stringify(this.filmes))
    localStorage.setItem('idFilmes', JSON.stringify(this.gerarId))
   }

  lerDados() {
    let filme = {}

    filme.nome = document.querySelector('#inputNomeFilme').value
    filme.duracao = document.querySelector('#inputDuracao').value
    filme.etaria = document.querySelector('#inputEtaria').value
    filme.genero = document.querySelector('#inputGenero').value
    filme.sinopse = document.querySelector('#inputSinopse').value

    return filme
  }

  salvar() {
    let filme = this.lerDados()

    if (this.verificar(filme)) {
      if (this.edicao == null) {
        this.adicionar(filme)
      } else {
        this.salvarEdicao(filme)
      }
    }
    this.sincronizarLocalStorage()
    this.gerarTabela()
    this.cancelar()
  }

  verificar(filme) {
    let mensagem = ''

    if (filme.nome == '') {
      mensagem += 'Campo Nome do Filme é obrigatório \n'
    }

    if (filme.duracao == '') {
      mensagem += 'Campo Duração é obrigatório \n'
    }

    if (filme.etaria == '') {
      mensagem += 'Campo Classificação etária é obrigatório \n'
    }

    if (filme.genero == '') {
      mensagem += 'Campo Gênero é obrigatório \n'
    }

    if (filme.sinopse == '') {
      mensagem += 'Campo Sinopse é obrigatório \n'
    }

    if (mensagem != '') {
      alert(mensagem)
      return false
    }
    return true

  }

  cancelar() {
    document.querySelector('#inputNomeFilme').value = ''
    document.querySelector('#inputDuracao').value = ''
    document.querySelector('#inputEtaria').value = ''
    document.querySelector('#inputGenero').value = ''
    document.querySelector('#inputSinopse').value = ''

    this.edicao = null
  }

  adicionar(filme) {
    filme.id = this.gerarId
    this.filmes.push(filme)
    this.gerarId++
  }

  gerarTabela() {
    let tab = document.querySelector('#tabela')
    tab.innerHTML = ''

    for (let i = 0; i < this.filmes.length; i++) {
      let linha = tab.insertRow()
      let cellNomeFilme = linha.insertCell()
      let cellDuracao = linha.insertCell()
      let cellEtaria = linha.insertCell()
      let cellGenero = linha.insertCell()
      let cellSinopse = linha.insertCell()
      let cellEditar = linha.insertCell()
      let cellExcluir = linha.insertCell()

      cellNomeFilme.innerText = this.filmes[i].nome
      cellDuracao.innerText = this.filmes[i].duracao
      cellEtaria.innerText = this.filmes[i].etaria
      cellGenero.innerText = this.filmes[i].genero
      cellSinopse.innerText = this.filmes[i].sinopse

      let imgEditar = document.createElement('img')
      let imgExcluir = document.createElement('img')
      imgEditar.src = 'img/pencil.svg'
      imgEditar.setAttribute('onclick', `filmes.editar('${this.filmes[i].id}')`)
      imgExcluir.src = 'img/cancel.svg'
      imgExcluir.setAttribute('onclick', `filmes.excluir('${this.filmes[i].id}')`)

      cellEditar.appendChild(imgEditar)
      cellExcluir.appendChild(imgExcluir)
    }

  }

  editar(id) {
    let achou = false
    let i = 0
    while (i < this.filmes.length && !achou) {
      if (this.filmes[i].id == id) {
        document.querySelector('#inputNomeFilme').value = this.filmes[i].nome
        document.querySelector('#inputDuracao').value = this.filmes[i].duracao
        document.querySelector('#inputEtaria').value = this.filmes[i].etaria
        document.querySelector('#inputGenero').value = this.filmes[i].genero
        document.querySelector('#inputSinopse').value = this.filmes[i].sinopse
        this.edicao = id
        achou = true
      }
      i++
    }
  }

  salvarEdicao(filme) {
    let achou = false
    let i = 0
    while (i < this.filmes.length && !achou) {
      if(this.filmes[i].id == this.edicao) {
        this.filmes[i].nome = filme.nome
        this.filmes[i].duracao = filme.duracao
        this.filmes[i].etaria = filme.etaria
        this.filmes[i].genero = filme.genero
        this.filmes[i].sinopse = filme.sinopse
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
    while (i < this.filmes.length && !achou) {
      if (this.filmes[i].id == id) {
        this.filmes.splice(i, 1)
        achou = true
      }
      i++
    }
    this.sincronizarLocalStorage()
    this.gerarTabela()
   }

}

let filmes = new Filmes()
// export default filmes = new Filmes()