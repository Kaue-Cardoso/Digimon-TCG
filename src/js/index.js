/*

OBJETIVO 1 - quando clicarmos na seta de avançar temos que mostrar o próximo cartão da lista
    - passo 1 - dar um jeito de pegar o elemento HTML da seta avancar
    - passo 2 - dar um jeito de identificar o clique do usuário na seta avançar
    - passo 3 - fazer aparecer o próximo cartão da lista 
    - passo 4 - buscar o cartão que esta selecionado e esconder

OBJETIVO 2 - quando clicarmos na seta de voltar temos que mostrar o cartão anterior da lista
    - passo 1 - dar um jeito de pegar o elemento HTML da seta voltar
    - passo 2 - dar um jeito de identificar o clique do usuário na seta voltar
    - passo 3 - fazer aparecer o cartão anterior da lista 
    - passo 4 - buscar o cartão que esta selecionado e esconder

*/

const btnAvancar = document.getElementById('btn-next')
const btnVoltar = document.getElementById('btn-back')
const cartoes = document.querySelectorAll('.card')
let cartaoAtual = 0

function esconderCartaoSelecionado() {
  const cartaoSelecionado = document.querySelector('.select')
  cartaoSelecionado.classList.remove('select')
}

function mostrarCartao(indiceCartao) {
  cartoes[indiceCartao].classList.add('select')
}

btnAvancar.addEventListener('click', function () {
  if (cartaoAtual === cartoes.length - 1) return

  esconderCartaoSelecionado()

  cartaoAtual++
  mostrarCartao(cartaoAtual)
})

btnVoltar.addEventListener('click', function () {
  if (cartaoAtual === 0) return

  esconderCartaoSelecionado()

  cartaoAtual--
  mostrarCartao(cartaoAtual)
})
