import Clientes from './modelo/Clientes.js'
let cli = new Clientes()

function clienteCarregar() {
  cli.carregarClientes()
}

function clienteSalvar() {
  cli.salvar()
}

function clienteCancelar() {
  cli.cancelar()
}


window.addEventListener("load", clienteCarregar)

document.getElementById("salvar").addEventListener("click", clienteSalvar)
document.getElementById("cancelar").addEventListener("click", clienteCancelar)
