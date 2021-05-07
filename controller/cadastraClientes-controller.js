 
import { clienteService } from '../service/cliente-service.js'
import { validaCEPSecundario } from './preencheCEPSecundario-controller.js'

//Criando código HTML a ser adicionado no momento em que clica-se no botão "Adicionar endereço secundário" 
const criaNovoEndereco = () =>  { 
  const criaNovoEndereco = document.createElement('div')
  const content = `
    <legend class="mt-4 formulario__legenda">Endereço Secundário</legend>

    <div class="input-container">
      <input name="cepSecundario" id="cepSecundario" class="input inputSecundario" type="text" placeholder="cepSecundario"  data-cepSecundario data-tipo="cepSecundario">
      <label class="input-label" for="cepSecundario">CEP</label>
      <span class="input-mensagem-erro">Este campo não está válido</span>
    </div>

    <div class="input-container">
        <input name="logradouroSecundario" id="logradouroSecundario" class="input inputSecundario" type="text" placeholder="logradouroSecundario" data-logradouroSecundario data-tipo="logradouroSecundario">
        <label class="input-label" for="logradouroSecundario">Logradouro</label>
        <span class="input-mensagem-erro">Este campo não está válido</span>
    </div>

    <div class="input-container">
        <input name="numeroSecundario" id="numeroSecundario" class="input inputSecundario" type="text" placeholder="numeroSecundario" data-numeroSecundario     data-tipo="numeroSecundario">
        <label class="input-label" for="numeroSecundario">Número</label>
        <span class="input-mensagem-erro">Este campo não está válido</span>
    </div>

    <div class="input-container">
        <input name="complementoSecundario" id="complementoSecundario" class="input inputSecundario" type="text" placeholder="complementoSecundario"    data-complementoSecundario data-tipo="complementoSecundario">
        <label class="input-label" for="complementoSecundario">Complemento</label>
        <span class="input-mensagem-erro">Este campo não está válido</span>
    </div>

    <div class="input-container">
        <input name="cidadeSecundaria" id="cidadeSecundaria" class="input inputSecundario" type="text" placeholder="cidadeSecundaria" data-cidadeSecundario     data-tipo="cidadeSecundario">
        <label class="input-label" for="cidadeSecundaria">Cidade</label>
        <span class="input-mensagem-erro">Este campo não está válido</span>
    </div>
    <div class="input-container">
        <input name="estadoSecundario" id="estadoSecundario" class="input inputSecundario" type="text" placeholder="estadoSecundario" data-estadoSecundario     data-tipo="estadoSecundario">
        <label class="input-label" for="estadoSecundario">Estado</label>
        <span class="input-mensagem-erro">Este campo não está válido</span>
    </div>
  `
  criaNovoEndereco.innerHTML = content;
  return criaNovoEndereco;
}

//Criando campos de preenchimento do endereço secundário ao clicar no botão "Adicionar endereço secundário"
let enderecoSecundario = false;

const btnEnderecoSecundario = document.querySelector("#btnenderecosecundario")
btnEnderecoSecundario.addEventListener("click", (evento)=> {
  enderecoSecundario = true;
 
  const fieldEnderecoSecunario = document.querySelector(".endereco-secundario")
  fieldEnderecoSecunario.appendChild(criaNovoEndereco());
})


//Validando CEP do endereço secundário:
const formulario = document.querySelector('[data-form]')

formulario.addEventListener('click', ()=>{
  let inputsSecundarios = document.querySelectorAll(".inputSecundario")

  inputsSecundarios.forEach(item=>{
    item.addEventListener('blur', (evento) => {
      validaCEPSecundario(evento.target)
  })
  })
})

//Escutando envento ao clicar em "Cadastrar" e criando/enviando os dados para o server.
formulario.addEventListener('submit', (evento)=> { 
  evento.preventDefault()
  const nome = evento.target.querySelector('[data-nome]').value
  const email = evento.target.querySelector('[data-email]').value
  const telefone = evento.target.querySelector('[data-telefone]').value
  const nascimento = evento.target.querySelector('[data-nascimento]').value
  const cpf = evento.target.querySelector('[data-cpf]').value
  const cep = evento.target.querySelector('[data-cep]').value
  const logradouro = evento.target.querySelector('[data-logradouro]').value
  const numero = evento.target.querySelector('[data-numero]').value
  const complemento = evento.target.querySelector('[data-complemento]').value
  const cidade = evento.target.querySelector('[data-cidade]').value
  const estado = evento.target.querySelector('[data-estado]').value

  const cepSecundario = ""
  const logradouroSecundario = ""
  const numeroSecundario = ""
  const complementoSecundario = ""
  const cidadeSecundario = ""
  const estadoSecundario = ""

  //Caso tenha endereço secundário, também enviar este:
  if(enderecoSecundario){
  const cepSecundario = evento.target.querySelector('[data-cepSecundario]').value
  const logradouroSecundario = evento.target.querySelector('[data-logradouroSecundario]').value
  const numeroSecundario = evento.target.querySelector('[data-numeroSecundario]').value
  const complementoSecundario = evento.target.querySelector('[data-complemento]').value
  const cidadeSecundario = evento.target.querySelector('[data-cidade]').value
  const estadoSecundario = evento.target.querySelector('[data-estado]').value

  
  clienteService.criaCliente(nome, email, telefone, cpf, nascimento, cep, logradouro, numero, complemento, cidade, estado, cepSecundario, logradouroSecundario, numeroSecundario, complementoSecundario, cidadeSecundario, estadoSecundario)
  .then(()=> {
    window.location.href = '../telas/cadastro_concluido.html'
  })
  
  //Caso não tenha endereço secundário, envia somente o principal:
  }else{
    clienteService.criaCliente(nome, email, telefone, cpf, nascimento, cep, logradouro, numero, complemento, cidade, estado, cepSecundario, logradouroSecundario, numeroSecundario, complementoSecundario, cidadeSecundario, estadoSecundario)
  .then(()=> {
    window.location.href = '../telas/cadastro_concluido.html'
  })
  }
}
) 
