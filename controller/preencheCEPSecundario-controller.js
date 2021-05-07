export function validaCEPSecundario(input) {
    const tipoDeInput = input.dataset.tipo

    if(validadores[tipoDeInput]) {
        validadores[tipoDeInput](input)
    }
}

const validadores = {

    cepSecundario: input => recuperarCEPSecundario(input)
}

function recuperarCEPSecundario(input) {
    const cep = input.value.replace(/\D/g, '')
    const url = `https://viacep.com.br/ws/${cep}/json/`
    const options = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'content-type': 'application/json;charset=utf-8'
        }
    }

    if(!input.validity.patternMismatch && !input.validity.valueMissing) {
        fetch(url,options).then(
            response => response.json()
        ).then(
            data => {
                if(data.erro) {
                    input.setCustomValidity('Não foi possível buscar o CEP.')
                    return
                }
                input.setCustomValidity('')
                preencherCamposComCEPSecundario(data)
                return
            }
        )
    }
}

function preencherCamposComCEPSecundario(data){
const logradouroSecundario = document.querySelector('[data-tipo="logradouroSecundario"]')
const cidadeSecundario = document.querySelector('[data-tipo="cidadeSecundario"]')
const estadoSecundario = document.querySelector('[data-tipo="estadoSecundario"]')

logradouroSecundario.value = data.logradouro
cidadeSecundario.value = data.localidade
estadoSecundario.value = data.uf
}
