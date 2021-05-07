import { clienteService } from "../service/cliente-service.js"
import { validaCEPSecundario } from "./preencheCEPSecundario-controller.js"

const pegaURL = new URL(window.location)
console.log(pegaURL)

const id = pegaURL.searchParams.get('id')

const formulario = document.querySelector('[data-form]')

const inputNome = document.querySelector("[data-nome]")
const inputEmail = document.querySelector("[data-email]")
const inputTelefone = document.querySelector("[data-telefone]")
const inputCpf = document.querySelector("[data-cpf]")
const inputNascimento = document.querySelector("[data-nascimento]")
const inputCep = document.querySelector("[data-cep]")
const inputLogradouro = document.querySelector("[data-logradouro]")
const inputNumero = document.querySelector("[data-numero]")
const inputComplemento = document.querySelector("[data-complemento]")
const inputCidade = document.querySelector("[data-cidade]")
const inputEstado = document.querySelector("[data-estado]")

let criadoEnderecoSecundario = false;

const enderecoSecundarioField = document.querySelector(".field-endereco-secundario")
const content = `
<h1 class="cartao__titulo mt-4">Endereço Secundário</h1>
                <div class="input-container">
                    <input name="cepSecundario" id="cepSecundario" class="inputSecundario input" type="text" placeholder="cepSecundario" data-cepSecundario data-tipo="cepSecundario">
                    <label class="input-label" for="cepSecundario">CEP</label>
                    <span class="input-mensagem-erro">Esse campo não pode ficar vazio</span>
                </div>

                <div class="input-container">
                    <input name="logradouroSecundario" id="logradouroSecundario" class="inputSecundario input" type="text" placeholder="logradouroSecundario" data-logradouroSecundario data-tipo="logradouroSecundario">
                    <label class="input-label" for="logradouroSecundario">Logradouro</label>
                    <span class="input-mensagem-erro">Esse campo não pode ficar vazio</span>
                </div>

                <div class="input-container">
                    <input name="numeroSecundario" id="numeroSecundario" class="inputSecundario input" type="text" placeholder="numeroSecundario" data-numeroSecundario>
                    <label class="input-label" for="numeroSecundario">Numero</label>
                    <span class="input-mensagem-erro">Esse campo não pode ficar vazio</span>
                </div>

                <div class="input-container">
                    <input name="complementoSecundario" id="complementoSecundario" class="inputSecundario input" type="text" placeholder="complementoSecundario" data-complementoSecundario>
                    <label class="input-label" for="complementoSecundario">Complemento</label>
                    <span class="input-mensagem-erro">Esse campo não pode ficar vazio</span>
                </div>

                <div class="input-container">
                    <input name="cidadeSecundario" id="cidadeSecundario" class="inputSecundario input" type="text" placeholder="cidadeSecundario" data-cidadeSecundario data-tipo="cidadeSecundario">
                    <label class="input-label" for="cidadeSecundario">Cidade</label>
                    <span class="input-mensagem-erro">Esse campo não pode ficar vazio</span>
                </div>

                <div class="input-container">
                    <input name="estadoSecundario" id="estadoSecundario" class="inputSecundario input" type="text" placeholder="estadoSecundario" data-estadoSecundario data-tipo="estadoSecundario">
                    <label class="input-label" for="estadoSecundario">Estado</label>
                    <span class="input-mensagem-erro">Esse campo não pode ficar vazio</span>
                </div>
`

//Validando CEP do endereço secundário:
formulario.addEventListener('click', ()=>{
    let inputsSecundarios = document.querySelectorAll(".inputSecundario")
    inputsSecundarios.forEach(item=>{
        item.addEventListener('blur', (evento) => {
            validaCEPSecundario(evento.target)
            })
    })
})

const htmlBtnAdicionaEnderecoSecundario = `
            <button type="button" class="btn btn-secondary" id="btnenderecosecundario">Adicionar endereço secundário</button>
            `
const divBtnAddEnderecoSecundario = document.querySelector(".btnAddEnderecoSecundario")
divBtnAddEnderecoSecundario.innerHTML = htmlBtnAdicionaEnderecoSecundario
const btnAddEndSecSim = document.querySelector("#btnenderecosecundario")

btnAddEndSecSim.addEventListener('click', ()=>{
    enderecoSecundarioField.innerHTML = content;
    criadoEnderecoSecundario = true;
    clienteService.detalhaCliente(id)
    .then( dados => {
        formulario.addEventListener('submit', (evento)=>{
        //Se não existe endereço secundário, deseja adicionar? Opção para adicionar:
            evento.preventDefault()
            let inputCepSecundario = document.querySelector("[data-cepSecundario]").value
            let inputLogradouroSecundario = document.querySelector("[data-logradouroSecundario]").value
            let inputNumeroSecundario = document.querySelector("[data-numeroSecundario]").value
            let inputComplementoSecundario = document.querySelector("[data-complementoSecundario]").value
            let inputCidadeSecundario = document.querySelector("[data-cidadeSecundario]").value
            let inputEstadoSecundario = document.querySelector("[data-estadoSecundario]").value
            clienteService.atualizaCliente(id,inputNome.value,inputEmail.value,inputTelefone.value,inputCpf.value,inputNascimento.value,inputCep.value,inputLogradouro.value,inputNumero.value,inputComplemento.value,inputCidade.value,inputEstado.value,inputCepSecundario,inputLogradouroSecundario,inputNumeroSecundario,inputComplementoSecundario,inputCidadeSecundario,inputEstadoSecundario)
            .then(()=>{
                window.location.href="../telas/cadastro_concluido.html"
            })
        })
    })
})



//Detalhando cliente com dados já adicionados
clienteService.detalhaCliente(id)
.then( dados => {
    inputNome.value = dados.nome,
    inputEmail.value= dados.email,
    inputTelefone.value= dados.telefone,
    inputCpf.value= dados.cpf,
    inputNascimento.value= dados.nascimento,
    inputCep.value= dados.cep,
    inputLogradouro.value= dados.logradouro,
    inputNumero.value= dados.numero,
    inputComplemento.value= dados.complemento,
    inputCidade.value= dados.cidade,
    inputEstado.value= dados.estado
    

    //Caso tenha segundo endereço, exibe este na tela e detalha:
    if(dados.cepSecundario && !criadoEnderecoSecundario){
        enderecoSecundarioField.innerHTML = content;

        const inputCepSecundario = document.querySelector("[data-cepSecundario]")
        const inputLogradouroSecundario = document.querySelector("[data-logradouroSecundario]")
        const inputNumeroSecundario = document.querySelector("[data-numeroSecundario]")
        const inputComplementoSecundario = document.querySelector("[data-complementoSecundario]")
        const inputCidadeSecundario = document.querySelector("[data-cidadeSecundario]")
        const inputEstadoSecundario = document.querySelector("[data-estadoSecundario]")

        inputCepSecundario.value= dados.cepSecundario,
        inputLogradouroSecundario.value= dados.logradouroSecundario,
        inputNumeroSecundario.value= dados.numeroSecundario,
        inputComplementoSecundario.value= dados.complementoSecundario,
        inputCidadeSecundario.value= dados.cidadeSecundario,
        inputEstadoSecundario.value= dados.estadoSecundario
        
        formulario.addEventListener('submit', (evento)=>{
            evento.preventDefault()
            clienteService.atualizaCliente(id,inputNome.value,inputEmail.value,inputTelefone.value,inputCpf.value,inputNascimento.value,inputCep.value,inputLogradouro.value,inputNumero.value,inputComplemento.value,inputCidade.value,inputEstado.value,inputCepSecundario.value,inputLogradouroSecundario.value,inputNumeroSecundario.value,inputComplementoSecundario.value,inputCidadeSecundario.value,inputEstadoSecundario.value)
            .then(()=>{
                window.location.href="../telas/cadastro_concluido.html"
            })
        }) 
    }else{
        formulario.addEventListener('submit', (evento)=>{
            evento.preventDefault()
            let nada  = ""                
            clienteService.atualizaCliente(id,inputNome.value,inputEmail.value,inputTelefone.value,inputCpf.value,inputNascimento.value,inputCep.value,inputLogradouro.value,inputNumero.value,inputComplemento.value,inputCidade.value,inputEstado.value,nada,nada,nada,nada,nada,nada)
            .then(()=>{
                window.location.href="../telas/cadastro_concluido.html"
            })
        })
    }  
})    

