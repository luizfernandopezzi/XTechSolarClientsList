import { clienteService } from '../service/cliente-service.js'

const criaNovaLinha = (nome, email, telefone, cpf, nascimento, cep, logradouro, numero, complemento, cidade, estado, id) =>  { 
  const linhaNovoCliente = document.createElement('tr')
  linhaNovoCliente.classList.add("cliente");
  const conteudo = `
        <td class="col text-center align-middle td" data-td>${nome}</td>
        <td class="col text-center align-middle">${email}</td>
        <td class="col text-center align-middle">${telefone}</td>
        <td class="col text-center align-middle">
            <ul>
                <li class="mb-1">CPF: ${cpf}</li>
                <li class="mb-1">Nascimento: ${nascimento}</li>
            </ul>
        </td>
        <td class="col text-center col-md-auto">
            <ul>
                <li class="mb-1">CEP: ${cep}</li>
                <li class="mb-1">Logradouro: ${logradouro}</li>
                <li class="mb-1">Número: ${numero}</li>
                <li class="mb-1">Complemento: ${complemento}</li>
                <li class="mb-1">Cidade: ${cidade}</li>
                <li class="mb-1">Estado: ${estado}</li>
            </ul>
        </td>

        <td class="col text-center col-md-auto align-middle">
            <ul>   
                <div class="btn-group-vertical btn-group-sm" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-outline-secondary"><a href="../telas/enderecos_cliente.html?id=${id}">Endereços</a></button>
                    <button type="button" class="btn btn-outline-secondary"><a href="../telas/edita_cliente.html?id=${id}">Editar</a></button>
                    <button type="button" class="btn btn-outline-secondary text-danger botao-simples--excluir">Excluir</button>
                </div>
            </ul>
        </td> 
                        `
  linhaNovoCliente.innerHTML = conteudo
  linhaNovoCliente.dataset.id = id
  return linhaNovoCliente
}


const tabela = document.querySelector('[data-tabela]')

tabela.addEventListener('click', (evento)=> {
    let ehBotaoDeDeleta = evento.target.className === 'btn btn-outline-secondary text-danger botao-simples--excluir'
    if(ehBotaoDeDeleta){
        const linhaCliente = evento.target.closest('[data-id]')
        let id = linhaCliente.dataset.id
        clienteService.removeCliente(id)
        .then(()=>{
            linhaCliente.remove()
        })
    }
})

clienteService.listaClientes()
.then(data => {
        data.forEach(elemento => {
        tabela.appendChild(criaNovaLinha(elemento.nome,elemento.email, elemento.telefone, elemento.cpf, elemento.nascimento, elemento.cep, elemento.logradouro, elemento.numero, elemento.complemento, elemento.cidade, elemento.estado, elemento.id))
})})