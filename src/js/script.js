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
const closeButton = document.querySelector("#close-messege")