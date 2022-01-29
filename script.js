
const fields = document.querySelectorAll('[required]')


function validateField(field){
  //Lógica para vereficar se existem erros
  function verifyErrors(){
    let foundError = false;

    for(const error in field.validity) {
      // se não for customError
      // então verifica se tem erro
      if (field.validity[error] && !field.validity.valid) {
          foundError = error
      }
    }

    console.log(foundError)
    return foundError;
  }

  function customMessage(typeError){
      const messages = {
        text: {
          valueMissing: "Por favor, preencha este campo"
        },
        email: {
          valueMissing: "Email é obrigatório",
          typeMismatch: "Por favor, preencha um email válido!"
        }  
      } 

      return messages[field.type][typeError]
  }

  function setCustomMessage(message = "") {
    const spanError = field.parentNode.querySelector("span.error")

    if (message) {
      spanError.classList.add("active")
      spanError.innerHTML = "Campo Obrigatório!"
    } else {
      spanError.classList.remove("active")
      spanError.innerHTML = ""
    }    
  }
  
  return function(){ 

    const error = verifyErrors()
    
    
    if(error){
      const message = customMessage(error)

      field.style.borderColor = "red"
      setCustomMessage(message)
      
    } else {
      field.style.transition = ".5s";
      field.style.borderColor = "green"
      setCustomMessage()
    }
  }
}


















function customValidation(event){

  const field = event.target
  const validation = validateField(field)

  validation()
  
}

for(let field of fields) {
  field.addEventListener('invalid', event => {
    //eliminar o bubble
    event.preventDefault()
    customValidation(event)
  })
  field.addEventListener('blur', customValidation)
}



document.querySelector('form').addEventListener('submit', (event) => {
  console.log('Enviar o formulario!')

  //Não vai enviar o formulário
  event.preventDefault()
})