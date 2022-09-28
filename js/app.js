//Variables
const btnSend = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const form = document.querySelector('#enviar-mail');

//Variables for fields
const email = document.querySelector('#email');
const subject = document.querySelector('#asunto');
const message = document.querySelector('#mensaje');

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListeners();
function eventListeners() {
    //When the app start
    document.addEventListener('DOMContentLoaded', startApp);


    //Form fields
    email.addEventListener('blur', validarFormulario);
    subject.addEventListener('blur', validarFormulario);
    message.addEventListener('blur', validarFormulario);


    //Restart form
    btnReset.addEventListener('click', resetForm);


    //Send emial
    form.addEventListener('submit', sendEmail);
}





//Functions
function startApp() {
    btnSend.disabled = true;
    btnSend.classList.add('cursor-not-allowed', 'opacity-50');
}

//Form validation
function validarFormulario(e) {


    if (e.target.value.length > 0) {

        //Delete errors
        const error = document.querySelector('p.error');
        if (error) {
            error.remove();
        }

        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    } else {
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');

        showError('Todos los campos son obligatorios');
    }


    if(e.target.type === 'email') {
        
        // const results = e.target.value.indexOf('@');

        if (er.test( e.target.value ) ) {
            const error = document.querySelector('p.error');
            if (error) {
                error.remove();
            }

        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
        } else {
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');

            showError('Email no válido')
        }
    }

    if(er.test( email.value ) !== "" && subject.value !== "" && message.value !== "") {
        btnSend.disabled = false;
        btnSend.classList.remove('cursor-not-allowed', 'opacity-50');
    } 
}


function showError(message) {
    const errorMessage = document.createElement('p');
    errorMessage.textContent = message;
    errorMessage.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errors = document.querySelectorAll('.error');
    if (errors.length === 0) {
        form.appendChild(errorMessage);
    }
}



//Send the email
function sendEmail(e) {
    e.preventDefault();

    //Show the spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    //after 3 seconds hide the spinner and show message
    setTimeout( () => {
        spinner.style.display = 'none';

        //Message that says send correctly
        const parrafo = document.createElement('p');
        parrafo.textContent = "El mensaje se envió correctamente.";
        parrafo.classList.add('text-center', 'p-2', 'my-10', 'bg-green-500', 'text-white', 'font-bold', 'uppercase')

        //Insert parrafo before spinner
        form.insertBefore(parrafo, spinner);

       setTimeout(() => {
         parrafo.remove(); //Delete message text

         resetForm();
       }, 5000);
    }, 3000 );
}



//Function form reset
function resetForm() {
    form.reset();

    startApp();
}