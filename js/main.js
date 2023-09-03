let pantallaValorAnterior = document.getElementById("valor-anterior");
let pantallaValorActual = document.getElementById("valor-actual");
const botonesNumeros = document.querySelectorAll(".numero");
const botonesOperadores = document.querySelectorAll(".operador");
const botonesFunciones = document.querySelectorAll(".funcion");

let valorActual = "";
let valorAnterior = "";
let simbolo = "";//Cambia segun la operacion 
let resultado = undefined;
let resultadoActual = "";
let historial = [];
let valoresAnterior  = "";

const suma = function(nro1, nro2){
    return parseFloat(nro1) + parseFloat(nro2)
};
const resta = function(nro1, nro2){
    return parseFloat(nro1) - parseFloat(nro2)    
};
const  multiplicacion = function(nro1, nro2){
    return parseFloat(nro1) * parseFloat(nro2)    
};
const division = function(nro1, nro2){
    return parseFloat(nro1) / parseFloat(nro2)    
};
//-------------
function borrar(){
    valorActual =  valorActual.toString().slice(0,-1);
    pantallaValorActual.textContent = valorActual;
};
function borrarTodo(){
    pantallaValorActual.innerHTML = "";
    pantallaValorAnterior.innerHTML = "";
    valorActual = "";
    valorAnterior = "";
    valoresAnterior= "";
    resultadoActual= "";

};
//--------------
const agregar_numero = function(numero){
    pantallaValorActual.textContent = valorActual 
    pantallaValorActual.style = "color:white;"
    let numeros = "";
    numeros = numeros + numero;
    return numeros
};
function imprimir_actual(numeros){
    pantallaValorActual.textContent = pantallaValorActual.textContent + numeros;
    valorActual = pantallaValorActual.textContent;
};
function imprimir_anterior(numeros){
    pantallaValorAnterior.textContent =  numeros + pantallaValorActual.textContent;
    valorAnterior = pantallaValorAnterior.textContent;
    pantallaValorActual.textContent = "";
    valorActual = "";
};
//--------------
botonesNumeros.forEach(boton => {
    boton.addEventListener("click", ()=>
    imprimir_actual(agregar_numero(boton.innerHTML))) //valorActual tiene el mismo valor de pantallavaloractual  
});

const operacion = function(){
    console.log(valorAnterior,"< valorAnterior + ", valorActual, "<valor Actual = ", resultado)
    if (valorActual != "" && simbolo != ""){
        switch(simbolo){
            case "+":
            resultado = suma(valorAnterior, valorActual)
            console.log(simbolo ,resultado + "<resultado")
            break
            case "-":
            resultado = resta(valorAnterior, valorActual)
            break
            case "×":
            resultado = multiplicacion(valorAnterior, valorActual)
            break
            case "÷":
            resultado = division(valorAnterior, valorActual)
            break
        }
    }
    valorAnterior = resultado //Para que opere el resultado anterior con el valor actual
    pantallaValorActual.textContent = ""
    valorActual = ""; //Se renicia porque ya fue operado
    resultadoActual = resultado
    pantallaValorActual.textContent = resultadoActual
    pantallaValorActual.style = "color:gray;"
}

/////////////////////////////////////////////////////////////////
botonesOperadores.forEach(operador => {
    operador.addEventListener("click", ()=>{
    switch (operador.value){
        case "sumar":
            valoresAnterior += `${valorActual} + `
            if (valorAnterior == ""){//CUNADO LA PRIMERA OPRACION ESTA INCOMPLETA
                imprimir_anterior(pantallaValorAnterior.textContent)
            }
            if (valorAnterior != "" && valorActual != ""){//CUNADO LA PRIMERA OPRACION ESTA COMPLETA
                operacion()
             }
            simbolo = "+"
            pantallaValorAnterior.textContent = valoresAnterior
            break
        case "restar":
            valoresAnterior += `${pantallaValorActual.textContent} - `
            if (valorAnterior == ""){//CUNADO LA PRIMERA OPRACION ESTA INCOMPLETA
               imprimir_anterior(pantallaValorAnterior.textContent)
            }
            if (valorAnterior != "" && valorActual != ""){//CUNADO LA PRIMERA OPRACION ESTA COMPLETA
               operacion()
            }
            simbolo = "-" 
            pantallaValorAnterior.textContent = valoresAnterior
            break
        case "multiplicar":
            
            valoresAnterior += `${pantallaValorActual.textContent} × `
            if (valorAnterior == ""){//CUNADO LA PRIMERA OPRACION ESTA INCOMPLETA
               imprimir_anterior(pantallaValorAnterior.textContent)
            }
            if (valorAnterior != "" && valorActual != ""){//CUNADO LA PRIMERA OPRACION ESTA COMPLETA
               operacion()
            }
            simbolo = "×"
            pantallaValorAnterior.textContent = valoresAnterior 
            break
        case "dividir":
            
            valoresAnterior += `${pantallaValorActual.textContent} ÷ `
            if (valorAnterior == ""){//CUNADO LA PRIMERA OPRACION ESTA INCOMPLETA
               imprimir_anterior(pantallaValorAnterior.textContent)
            }
            if (valorAnterior != "" && valorActual != ""){//CUNADO LA PRIMERA OPRACION ESTA COMPLETA
               operacion()
            }
            simbolo = "÷"
            pantallaValorAnterior.textContent = valoresAnterior
            break
        case "igual":
            if (valorAnterior != "" && pantallaValorActual !="" && simbolo != ""){
                switch (simbolo){
                    case "+":
                        if (valorActual == ""){ //PRESIONA 'IGUAL' CUANDO NO ESCRIO NINGUN VALOR 
                            pantallaValorActual.textContent =""; //para que no salga doble resultado en pantalla
                            pantallaValorActual.style = "color:white;"
                            imprimir_actual(resultado)

                            historial.push(valoresAnterior)
                            console.log("historial " + historial)

                            valorAnterior = ""
                            pantallaValorAnterior.textContent = "";
                            valoresAnterior = "";
                            
                        }
                        else{ // PARA QUE OPERE EL RESULTADO DE LAS OPERACIONES ANTERIOR CON EL VALOR ACTUAL
                        pantallaValorActual.textContent = "";
                        imprimir_actual(suma(valorAnterior, valorActual))

                        historial.push(valoresAnterior, "+", valorActual )
                        console.log("historial " + historial)
                        
                        valorAnterior = ""
                        pantallaValorAnterior.textContent = "";
                        valoresAnterior = "";
                        
                        }
                        break
                    case "-":
                        if (valorActual == ""){ //PRESIONA 'IGUAL' CUANDO NO ESCRIO NINGUN VALOR 
                            pantallaValorActual.textContent =""; //para que no salga doble resultado en pantalla
                            pantallaValorActual.style = "color:white;"
                            imprimir_actual(resultado)
                            valorAnterior = ""
                            pantallaValorAnterior.textContent = "";
                            valoresAnterior = "";
                        }
                        else{ // PARA QUE OPERE EL RESULTADO DE LAS OPERACIONES ANTERIOR CON EL VALOR ACTUAL
                        pantallaValorActual.textContent = "";
                        imprimir_actual(resta(valorAnterior, valorActual))
                        valorAnterior = ""
                        pantallaValorAnterior.textContent = "";
                        valoresAnterior= "";
                        }
                        break
                    case "×":
                        if (valorActual == ""){ //PRESIONA 'IGUAL' CUANDO NO ESCRIO NINGUN VALOR 
                            pantallaValorActual.textContent =""; //para que no salga doble resultado en pantalla
                            pantallaValorActual.style = "color:white;"
                            imprimir_actual(resultado)
                            valorAnterior = ""
                            pantallaValorAnterior.textContent = "";
                            valoresAnterior = "";
                        }
                        else{ // PARA QUE OPERE EL RESULTADO DE LAS OPERACIONES ANTERIOR CON EL VALOR ACTUAL
                        pantallaValorActual.textContent = "";
                        imprimir_actual(multiplicacion(valorAnterior, valorActual))
                        valorAnterior = ""
                        pantallaValorAnterior.textContent = "";
                        valoresAnterior = "";
                        }
                        break
                    case "÷":
                        if (valorActual == ""){ //PRESIONA 'IGUAL' CUANDO NO ESCRIO NINGUN VALOR 
                            pantallaValorActual.textContent =""; //para que no salga doble resultado en pantalla
                            pantallaValorActual.style = "color:white;"
                            imprimir_actual(resultado)
                            valorAnterior = ""
                            pantallaValorAnterior.textContent = "";
                            valoresAnterior = "";
                        }
                        else{ // PARA QUE OPERE EL RESULTADO DE LAS OPERACIONES ANTERIOR CON EL VALOR ACTUAL
                        pantallaValorActual.textContent = "";
                        imprimir_actual(division(valorAnterior, valorActual))
                        valorAnterior = ""
                        pantallaValorAnterior.textContent = "";
                        valoresAnterior= "";
                        }
                        break
                        
                }
         
            }
            else{
                pantallaValorActual.textContent = "";
                pantallaValorAnterior.textContent = "";
            }
    }
    })
});
botonesFunciones.forEach(botonFuncion => {
    botonFuncion.addEventListener("click", ()=>{
        switch(botonFuncion.value){
            case "borrar":
                borrar()
                break
            case "borrar todo":
                borrarTodo()
                break
            case "operadores":
                break
        }
    })
});

//Efecto click
botonesNumeros.forEach(boton => {
    boton.addEventListener('click', () => {
        boton.style.backgroundColor = 'white';

        setTimeout(function() {
            boton.style.backgroundColor = 'black';
          }, 50);
    })
})

botonesOperadores.forEach(boton => {
    boton.addEventListener('click', () => {
        boton.style.backgroundColor = 'white';

        setTimeout(function() {
            boton.style.backgroundColor = 'rgb(255, 123, 0)';
          }, 50);
    })
})

botonesFunciones.forEach(boton => {
    boton.addEventListener('click', () => {
        boton.style.backgroundColor = 'white';

        setTimeout(function() {
            boton.style.backgroundColor = 'rgb(59, 58, 58)';
          }, 50);
    })
})