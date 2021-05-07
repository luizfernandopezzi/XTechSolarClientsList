const listaClientes = () => {
    return fetch(`http://localhost:3000/profile`)
    .then(resposta => {
        if(resposta.ok){
            return resposta.json()
        }
    })
}

const criaCliente = (nome, email, telefone, cpf, nascimento, cep, logradouro, numero, complemento, cidade, estado, cepSecundario, logradouroSecundario, numeroSecundario, complementoSecundario, cidadeSecundario, estadoSecundario) => { 
    return fetch(`http://localhost:3000/profile`, {
        method: 'POST', 
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            nome: nome,
            email: email,
            telefone: telefone,
            cpf: cpf,
            nascimento: nascimento,
            cep: cep,
            logradouro: logradouro,
            numero: numero,
            complemento: complemento,
            cidade: cidade,
            estado: estado,
            cepSecundario: cepSecundario,
            logradouroSecundario: logradouroSecundario,
            numeroSecundario: numeroSecundario,
            complementoSecundario: complementoSecundario,
            cidadeSecundario: cidadeSecundario,
            estadoSecundario: estadoSecundario
        })
    })
    .then( resposta => {
        return resposta.body
    })
}

const criaEnderecoSecundario = (id, cepSecundario, logradouroSecundario, numeroSecundario, complementoSecundario, cidadeSecundario, estadoSecundario) => { 
    return fetch(`http://localhost:3000/profile/${id}`, {
        method: 'POST', 
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            cepSecundario: cepSecundario,
            logradouroSecundario: logradouroSecundario,
            numeroSecundario: numeroSecundario,
            complementoSecundario: complementoSecundario,
            cidadeSecundario: cidadeSecundario,
            estadoSecundario: estadoSecundario
        })
    })
    .then( resposta => {
        console.log(resposta.body)
        return resposta.body
    })
}

const removeCliente = (id) => { 
    return fetch(`http://localhost:3000/profile/${id}`, {
        method: 'DELETE'
    })
}

const listaClienteEndereco = (id) => {
    return fetch(`http://localhost:3000/profile/${id}`)
    .then(resposta => {
        let answer = resposta.json()
        return answer
    })
}

const detalhaCliente = (id) => {
    return fetch(`http://localhost:3000/profile/${id}`)
    .then(resposta => {
        return resposta.json()
    })
}

const atualizaCliente = (id,nome, email, telefone, cpf, nascimento, cep, logradouro, numero, complemento, cidade, estado, cepSecundario, logradouroSecundario, numeroSecundario, complementoSecundario, cidadeSecundario, estadoSecundario) => {
    return fetch(`http://localhost:3000/profile/${id}`, {
        method: 'PUT',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            nome: nome,
            email: email,
            telefone: telefone,
            cpf: cpf,
            nascimento: nascimento,
            cep: cep,
            logradouro: logradouro,
            numero: numero,
            complemento: complemento,
            cidade: cidade,
            estado: estado,
            cepSecundario: cepSecundario,
            logradouroSecundario: logradouroSecundario,
            numeroSecundario: numeroSecundario,
            complementoSecundario: complementoSecundario,
            cidadeSecundario: cidadeSecundario,
            estadoSecundario: estadoSecundario
        })
    })
    .then( resposta => {
        return resposta.json()
    })
}

export const clienteService = { 
    listaClientes,
    criaCliente, 
    removeCliente,
    detalhaCliente,
    atualizaCliente,
    listaClienteEndereco,
    criaEnderecoSecundario
}