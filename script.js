
const fields = document.querySelectorAll('[required]')

console.log(fields);

function customValidation(event){
  const field = event.target


  //Lógica para vereficar se existem erros
  function verifyErrors(){
    let foundError = false;

    for(const error in field.validity) {
      // se não for customError
      // então verifica se tem erro
      if (field.validity[error] && !field.validity.valid ) {
          foundError = error
      }
    }
    return foundError;
  }

  const error = verifyErrors()
  console.log(`Error: Exists: ${error}`);

  if (error) {
    field.setCustomValidity("Esse campo é obrigatório");
  } else {
    field.setCustomValidity("");
  }
  
  
}

for(let field of fields) {
  field.addEventListener('invalid', customValidation)
}









document.querySelector('form').addEventListener('submit', (event) => {
  console.log('Enviar o formulario!')

  //Não vai enviar o formulário
  event.preventDefault()
})