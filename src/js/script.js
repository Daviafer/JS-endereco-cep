// Selecionando individual, pois, posteriormente terá colocar o valor deles conforme vem na API 
const addressForm = document.querySelector("#address-form")
const cepInput = document.querySelector("#cep")
const addressInput = document.querySelector("#address") 
const cityInput = document.querySelector("#city")
const neighborhoodInput = document.querySelector("#neighborhood")
const regionInput = document.querySelector("#region")
// selecionando todos inputs que tem o data input 
const formInputs = document.querySelectorAll("[data-input]")
// botão de fechar modal 
const closeButton = document.querySelector("#close-message")

const fadeElement = document.querySelector("#fade")


// Validate CEP input 
cepInput.addEventListener("keypress", (e) => {
  const onlyNumbers = /[0-9]/
  // pegando o que foi digitado pelo keypress
  const key = String.fromCharCode(e.keyCode)
  // filtrando itens - permitir apenas números
  if (!onlyNumbers.test(key)) {
    e.preventDefault()
    return;
  }
})
// pegando endereço evento 
cepInput.addEventListener("keyup", (e) => {
  const inputValue = e.target.value

  // verificando o tamanho 8 números 
  if (inputValue.length === 8) {
    getAddress(inputValue)
  }
})
// pegando da API 
const getAddress = async (cep) => {
  console.log(cep)

  // chamando loader enquanto busca da API 
  toggleLoader()
  // tirando o cursor do input - após finalizar 8 digitos 
  cepInput.blur()

  // API 
  const apiUrl = `https://viacep.com.br/ws/${cep}/json/`
  
  // response para pegar dados 
  const response = await fetch(apiUrl)
  const data = await response.json()

  // Erro no CEP digitado: limpar formulário, retirar o loader
  if(data.erro === "true"){
    if (!addressInput.hasAttribute("disabled")) {
      toggleDisabled()
    }
    addressForm.reset()
    toggleLoader()
    // mostrar mensagem
    toggleMessage("CEP inválido, tente novamente.")

    return
  }
  // função disabled 
if(addressInput.value === ""){
  toggleDisabled()
}

  addressInput.value = data.logradouro
  cityInput.value = data.localidade
  neighborhoodInput.value = data.bairro
  regionInput.value = data.uf

  // fechando loader 
  toggleLoader()
}

// Adicionar ou remover atributo disabled
const toggleDisabled = () => {
  if (regionInput.hasAttribute("disabled")) {
    formInputs.forEach((input) => {
      input.removeAttribute("disabled")
    })
  } else {
    formInputs.forEach((input) => {
      input.setAttribute("disabled", "disabled")
    })
  }
}


// mostrar ou ocultar loader enquanto busca da API
const toggleLoader = () => {
  const loaderElement = document.querySelector("#loader")

  fadeElement.classList.toggle("hide")
  loaderElement.classList.toggle("hide")
}
// mostrar ou ocultar mensagem 
const toggleMessage = (msg) => {
  const messageElement = document.querySelector("#message")
  const messageElementText = document.querySelector("#message p")

  messageElementText.innerText = msg

  fadeElement.classList.toggle("hide")
  messageElement.classList.toggle("hide")
}

// Fechando modal - após processo de mostrar mensagem de erro 
closeButton.addEventListener("click", () => toggleMessage())

// botão salvar 
addressForm.addEventListener("submit", (e) => {
  e.preventDefault()

  toggleLoader()

  setTimeout(() => {
    toggleLoader()

    toggleMessage("Endereço salvo com sucesso!")

    addressForm.reset()

    toggleDisabled()
  }, 1500)
})