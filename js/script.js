// 1. Importação dos elementos do HTML
const cep = document.querySelector('#cepInput')
const rua = document.querySelector('#rua')
const bairro = document.querySelector('#bairro')
const cidade = document.querySelector('#cidade')
const estado = document.querySelector('#estado')


// 2. Função para chamar a API vinda do site viacep, usando os conceitos de fetch e de promise
function consultarCEP(cep) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(parseJSON)
        .then(exibirNaTela)
        .catch(exibirError)
}

// 2.1 Primeiro 'then' da consultarCEP(), responsável por transformar os dados recebidos em JSON para objeto JavaScript
function parseJSON(response) {
    return response.json()
}

// 2.2 Segundo 'then' da consultarCEP(), responsável por receber os dados da função parseJSON() e emitir eles para o HTML nos inputs.
function exibirNaTela(response) {
    console.log(response)
    rua.value = `${response.logradouro}`
    bairro.value = `${response.bairro}`
    cidade.value = `${response.localidade}`
    estado.value = `${response.uf}`
}

// 2.3 'catch' para emissão de uma mensagem de error caso aconteça algo de errado com a promise.
function exibirError() {
    alert('Erro ao tentar consultar CEP. Tente novamente mais tarde.')
}


// 3 Função para limpar os dados da tela
function limparTela(){
    cep.value = ''
    rua.value = ``
    bairro.value = ``
    cidade.value = ``
    estado.value = ``
}


cep.addEventListener('input', (event) => {
    let cepConsulta = event.target.value.length
    let cep = event.target.value

    if (cepConsulta === 8) {
        consultarCEP(cep)
    } else if(cepConsulta > 8){
        event.target.value = cep.slice(0, 8);
    }
})

cep.addEventListener('blur', (event) => {
    let cepConsulta = event.target.value.length
    if (cepConsulta != 8) {
        alert('Digite um CEP válido')
        limparTela()
    }
})