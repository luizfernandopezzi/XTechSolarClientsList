import { clienteService } from "../service/cliente-service.js"

const pegaURL = new URL(window.location)
console.log(pegaURL)

const id = pegaURL.searchParams.get('id')

const criaNovaLinhaEndereco = (nome, cep, logradouro, numero, complemento, cidade, estado, id) =>  { 
const linhaNovoClienteEndereco = document.createElement('tr')
linhaNovoClienteEndereco.classList.add("row");
    
    const conteudo = `

          <td class="col align-middle" data-td data-nome>${nome}</td>

          <td class="col align-middle">
              <ul>
                  <li class="mb-1" data-cep>CEP: ${cep}</li>
                  <li class="mb-1" data-logradouro>Logradouro: ${logradouro}</li>
                  <li class="mb-1" data-numero>Número: ${numero}</li>
                  <li class="mb-1" data-complemento>Complemento: ${complemento}</li>
                  <li class="mb-1" data-cidade>Cidade: ${cidade}</li>
                  <li class="mb-1" data-estado>Estado: ${estado}</li>
              </ul>
          </td>
          <td class="col text-center col-md-auto align-middle">
            <ul>   
                <div class="btn-group-vertical btn-group-sm" role="group" aria-label="Basic example">
                    
                    <button type="button" class="btn btn-outline-secondary"><a href="../telas/edita_cliente.html?id=${id}">Editar</a></button>
                   
                </div>
            </ul>
        </td> 
            
    `
    linhaNovoClienteEndereco.innerHTML = conteudo
    return linhaNovoClienteEndereco
}

const criaNovaLinhaEnderecoSecundario = (nome, cep, logradouro, numero, complemento, cidade, estado, cepSecundario, logradouroSecundario, numeroSecundario, complementoSecundario, cidadeSecundario, estadoSecundario, id) =>  { 
const linhaNovoClienteEnderecoSecundario = document.createElement('tr')
linhaNovoClienteEnderecoSecundario.classList.add("cliente", "row");
    
    const conteudo = `
        <td class="col-2 align-middle" data-td data-nome>${nome}</td>
        <td class="col-4 align-middle">
            <ul>
                <li class="mb-1" data-cep>CEP: ${cep}</li>
                <li class="mb-1" data-logradouro>Logradouro: ${logradouro}</li>
                <li class="mb-1" data-numero>Número: ${numero}</li>
                <li class="mb-1" data-complemento>Complemento: ${complemento}</li>
                <li class="mb-1" data-cidade>Cidade: ${cidade}</li>
                <li class="mb-1" data-estado>Estado: ${estado}</li>
            </ul>
        </td> 

        <td class="col-4 align-middle">
            <ul>
                <li class="mb-1" data-cep>CEP: ${cepSecundario}</li>
                <li class="mb-1" data-logradouro>Logradouro: ${logradouroSecundario}</li>
                <li class="mb-1" data-numero>Número: ${numeroSecundario}</li>
                <li class="mb-1" data-complemento>Complemento: ${complementoSecundario}</li>
                <li class="mb-1" data-cidade>Cidade: ${cidadeSecundario}</li>
                <li class="mb-1"data-estado>Estado: ${estadoSecundario}</li>
            </ul>

        </td>    
        
        <td class="col-2 text-center ">
 
                <div class="btn-group-vertical btn-group-sm " role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-outline-secondary"><a href="../telas/edita_cliente.html?id=${id}">Editar</a></button>
                </div>
            </ul>
        </td>
                     
         
    `
    linhaNovoClienteEnderecoSecundario.innerHTML = conteudo
    return linhaNovoClienteEnderecoSecundario
}

//Ao abrir a página executa:
const tabela = document.querySelector('[data-tabela]')
clienteService.listaClienteEndereco(id)
.then(dados => {
    if(dados.cepSecundario){
        tabela.appendChild(criaNovaLinhaEnderecoSecundario(dados.nome,dados.cep,dados.logradouro,dados.numero,dados.complemento,dados.cidade,dados.estado,dados.cepSecundario,dados.logradouroSecundario, dados.numeroSecundario, dados.complementoSecundario, dados.cidadeSecundario, dados.estadoSecundario,dados.id))
    }else{
        console.log(dados)
        tabela.appendChild(criaNovaLinhaEndereco(dados.nome,dados.cep,dados.logradouro,dados.numero,dados.complemento,dados.cidade,dados.estado,dados.id))
    }
})

