const grid = new Muuri('.grid', {
    layout:{
        rounding:false
    }
}); 


let age = () => {
    let currentYear = new Date();
    let birth = 1986;
    document.getElementById("age").innerHTML = currentYear.getFullYear() - birth;
}
age();


window.onscroll = function() { scrollFunction() };


/* ----------------------------------------------------------------------------------------------------------------
        funcion que permite a la Navbar hace la transicion de transparente a blanco cuando se hace scroll hacia
        arriba o hacia abajo
------------------------------------------------------------------------------------------------------------------*/
function scrollFunction() {
    if (document.body.scrollTop === 0 || document.documentElement.scrollTop === 0) {
        document.getElementById("barra").style.background = "transparent";
        cambioColor2()
        document.getElementsByClassName('navbar-brand')[0].style.color = "yellow";
    }

    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("barra").style.top = "0";
        document.getElementById("barra").style.background = "white";
        cambioColor()
        document.getElementsByClassName('navbar-brand')[0].style.color = "black";

    } else {
        document.getElementById("barra").style.top = "-10px";
    }
    myFunction();
}


/* ----------------------------------------------------------------------------------------------------------------
				        Cambia a color negro el texto de la barra de navegacion cuando se hace scroll hacia abajo 
------------------------------------------------------------------------------------------------------------------*/
function cambioColor() {
    let y = document.getElementsByClassName("nav-link");
    let i;
    for (i = 0; i < y.length; i++) {
        y[i].style.color = "black";
    }
}


/* ----------------------------------------------------------------------------------------------------------------
                        Cambia a color blanco el texto de la barra de navegacion cuando se 
                        hace scroll hacia arriba y se vuelve  al princpio de la pagina
------------------------------------------------------------------------------------------------------------------*/
function cambioColor2() {
    let y = document.getElementsByClassName("nav-link");
    let i;
    for (i = 0; i < y.length; i++) {
        y[i].style.color = "white";
    }
}




/* ----------------------------------------------------------------------------------------------------------------
                        Funcion que anima las barra de progreso de la Seccion 3 de la pagina web
------------------------------------------------------------------------------------------------------------------*/

function myFunction() {
    console.log("Vertical: " + window.scrollY);

    if (document.documentElement.scrollTop >= 1100) {
        var width = 0;
        var elem = document.getElementsByClassName("myBar");


        let id = setInterval(function() {
            for (let i = 0; i < elem.length; i++) {
                if (width >= document.getElementsByClassName('myBar')[i].getAttribute('data-valor')) {
                    clearInterval(id);
                } else {
                    width++; // cualquera de las dos formas es funcional
                    //width += 1;
                    elem[i].style.width = document.getElementsByClassName('myBar')[i].getAttribute('data-valor') + '%'; //el procentaje hace referencia a la unidad de medida en el css por lo 
                } //cual la propiedad width debe llevar una unidad de longitud ya sea en 
            } //cm, mm, px, % pc etc
        }, 15);
    }
}


/*----------------------------------------------------------------------------------------------------------------------------------------------
                                                          obtiene el año del sistema
-----------------------------------------------------------------------------------------------------------------------------------------------*/
let ano = new Date();

document.getElementById("year").innerHTML = ano.getFullYear();


/*----------------------------------------------------------------------------------------------------------------------------------------------
				                                            Validacion Formulario
-----------------------------------------------------------------------------------------------------------------------------------------------*/

const nombre = document.getElementById('form_name');
const email = document.getElementById('form_email');
const asunto = document.getElementById('form_subject');
const mensaje = document.getElementById('form_message');
const btnEnviar = document.getElementById('botonFormulario');
const formulario = document.getElementById('contact-form')

//--------------------------------------- Deshabilitando el boton enviar----------------------------------------------------------------------

eventListeners();

function eventListeners(){
    document.addEventListener('DOMContentLoaded', inicioApp)
    
    nombre.addEventListener('blur', validarCampo);
    email.addEventListener('blur', validarCampo);
    asunto.addEventListener('blur', validarCampo);
    mensaje.addEventListener('blur', validarCampo);

    formulario.addEventListener('submit', enviarEmail)
}

function inicioApp(){
    btnEnviar.disabled = true;
}


//---------------------------------------Validando campos----------------------------------------------------------------------



function validarCampo(){
    validarLongitud(this)

    console.log(this.type);
    if(this.type === 'email'){
        validarEmail(this);
    }

    let errores = document.querySelectorAll('.error')
    if(nombre.value !== "" && email.value !== "" && asunto.value !== "" &&  mensaje.value !== ""){
        if(errores.length === 0){
            btnEnviar.disabled = false;
        }
        
    }
}


// envia el correo
function enviarEmail(e){

    const spinerGif = document.querySelector('#spinner')
    spinerGif.style.display = 'block';

    const enviado = document.createElement('img');
    enviado.src = 'Imagenes/mail.gif';
    enviado.style.display = 'block';


    setTimeout(function(){
        spinerGif.style.display = 'none'
        document.querySelector('#loaders').appendChild(enviado)
        setTimeout(function(){
            enviado.remove();
            formulario.reset();
        }, 4000)
    }, 2000)
    //e.preventDefault();
}


// verifica la longitud del texto en los campos

function validarLongitud(campo){
    console.log(campo.value.length)
    if(campo.value.length > 0){
        campo.style.borderBottomColor = 'green';
        campo.classList.remove('error');
    }
    else{
        campo.style.borderBottomColor = 'red';
        campo.classList.add('error');
    }

}

function validarEmail(campo){
    const mensaje = campo.value

    if(mensaje.indexOf('@') !== -1){
        campo.style.borderBottomColor = 'green';
        campo.classList.remove('error');
    }
    else{
        campo.style.borderBottomColor = 'red';
        campo.classList.add('error');
    }
}

//------------------------------------------------------------------------------------------------------------------------------------------
                                                //Agrega la clase cuando termina de cargar la pagina
//------------------------------------------------------------------------------------------------------------------------------------------

window.addEventListener("load", ()=>{
    grid.refreshItems().layout(); //permite que los elementos se acomoden al responsive
    document.getElementById('grid').classList.add('imagenes-cargadas')



    const enlaces = document.querySelectorAll('#categorias a');
    enlaces.forEach((elemento) =>{
        //console.log(elemento);
        elemento.addEventListener('click', (evento)=>{
            evento.preventDefault();
            //console.log(evento.target); //muestra el elemento al cual se le hace click
            enlaces.forEach((enlace) => enlace.classList.remove('activo'));
            evento.target.classList.add('activo'); 

            const categoria = evento.target.innerHTML.toLowerCase();
            console.log(categoria);
            categoria ==='all' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria = "${categoria}"]`);                        
        });
    });
})