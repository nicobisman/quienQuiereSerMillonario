//declaro las variables html de botones
const botonRespuesta1HTML = document.getElementById("botonRespuesta1");
const botonRespuesta2HTML = document.getElementById("botonRespuesta2");
const botonRespuesta3HTML = document.getElementById("botonRespuesta3");
const botonRespuesta4HTML = document.getElementById("botonRespuesta4");
const boton50HTML = document.getElementById("boton50");
const botonPublicoHTML = document.getElementById("botonPublico");
const botonAmigoHTML = document.getElementById("botonAmigo");
const botonRetirarseHTML = document.getElementById("botonRetirarse");
const botonEmpezarHTML = document.getElementById("botonEmpezar");

// Declaro las variables html de texto
const premioActualHTML = document.getElementById("premioActual");
const preguntasContestadasHTML = document.getElementById("preguntasContestadas");
const espacioAmigoHTML = document.getElementById("espacioAmigo");
const espacioPublicoHTML = document.getElementById("espacioPublico");
const estadoDeJuegoHTML = document.getElementById("estadoDeJuego");
const preguntaHTML = document.getElementById("pregunta");

const juego = {
    //declaro las variables que controlan el juego
    preguntasContestadas: 0,
    dineroGanado: 0,
    preguntaRandom: 0,
    preguntasUsadas: [],
    boton50FueUsado: false,
    botonPublicoFueUsado: false,
    botonAmigoFueUsado: false,

    limpiarJuego: function () {
        //limpia los datos del juego para reiniciar
        estadoDeJuegoHTML.innerHTML = "El juego no ha comenzado";
        premioActualHTML.innerHTML = "Premio actual: 0";
        preguntasContestadasHTML.innerHTML = "Preguntas contestadas: 0";
        espacioAmigoHTML.innerHTML = "";
        espacioPublicoHTML.innerHTML = "";
        preguntaHTML.innerHTML = "Pregunta";
        botonRespuesta1HTML.innerHTML = "Respuesta 1";
        botonRespuesta2HTML.innerHTML = "Respuesta 2";
        botonRespuesta3HTML.innerHTML = "Respuesta 3";
        botonRespuesta4HTML.innerHTML = "Respuesta 4";
        //resetea las variables
        this.preguntaRandom = 0;
        this.preguntasContestadas = 0;
        this.dineroGanado = 0;
        this.preguntasUsadas = [];
        this.boton50FueUsado = false;
        this.botonPublicoFueUsado = false;
        this.botonAmigoFueUsado = false;
        //desactiva los botones
        this.desactivarBotones();
    },
    empezar: function () {
        this.activarBotones();
        //imprime en pantalla que se está en partida
        estadoDeJuegoHTML.innerHTML = "En partida";
        this.megaFuncionPreguntas();
    },
    megaFuncionPreguntas: function () {
        //si preguntasContestadas es 5 se gana
        if (this.preguntasContestadas == 5) {
            this.ganar();
        } else {
            //si no continúa el juego
            this.modificarInformacion();
            this.randomizadorPreguntas();
            this.modificarBotonesYPreguntas();
        }
    },
    modificarInformacion: function () {
        //imprime en pantalla cuantas preguntas se contestaron
        preguntasContestadasHTML.innerHTML = `Preguntas contestadas: ${this.preguntasContestadas}`;
        switch (this.preguntasContestadas) {
            case 0:
                //si no se contesto ninguna pregunta el premio actual es 0
                premioActualHTML.innerHTML = "Premio actual: 0";
                break;
            default:
                //si se ha contestado alguna se calculara con la funcion y=15^x
                this.dineroGanado = Math.pow(1000000, 1 / 5) ** this.preguntasContestadas;
                //se sacan los decimales
                this.dineroGanado = Math.trunc(this.dineroGanado);
                //se agregan los puntos
                this.dineroGanado = this.dineroGanado.toLocaleString();
                this.dineroGanado = `$${this.dineroGanado}`;
                //imprime en pantalla el dinero ganado
                premioActualHTML.innerHTML = `Premio actual: ${this.dineroGanado}`;
                break;
        }
    },
    randomizadorPreguntas: function () {
        //guarda en pregunta random un numero del 1 al de la cantidad de preguntas
        this.preguntaRandom = Math.floor(Math.random() * Object.keys(preguntas).length) + 1;
        //si la pregunta ya fue elegida hay recursividad
        if (this.preguntasUsadas.includes(this.preguntaRandom)) {
            this.randomizadorPreguntas();
        } else {
            //si no se agrega la pregunta a un array para que no se repita
            this.preguntasUsadas.push(this.preguntaRandom);
        }
    },
    modificarBotonesYPreguntas: function () {
        //imprimo en pantalla la pregunta deseada
        preguntaHTML.innerHTML = preguntas["pregunta" + this.preguntaRandom].pregunta;
        //imprimo en pantalla la respuesta deseada
        botonRespuesta1HTML.innerHTML = preguntas["pregunta" + this.preguntaRandom].opcionA;
        botonRespuesta2HTML.innerHTML = preguntas["pregunta" + this.preguntaRandom].opcionB;
        botonRespuesta3HTML.innerHTML = preguntas["pregunta" + this.preguntaRandom].opcionC;
        botonRespuesta4HTML.innerHTML = preguntas["pregunta" + this.preguntaRandom].opcionD;
    },
    //el parametro opcionElegida depende del boton tocado
    logicaPreguntas: function (opcionElegida) {
        this.limpiarPreguntasPorComodines();
        this.gestionarComodines("logicaPreguntas");
        let opcionElegidaLetras;
        switch (opcionElegida) {
            //si la opcion elegida es la 1 opcionElegidaLetras será igual a la opcionA
            case 1:
                opcionElegidaLetras = preguntas["pregunta" + this.preguntaRandom].opcionA;
                break;
            case 2:
                opcionElegidaLetras = preguntas["pregunta" + this.preguntaRandom].opcionB;
                break;
            case 3:
                opcionElegidaLetras = preguntas["pregunta" + this.preguntaRandom].opcionC;
                break;
            case 4:
                opcionElegidaLetras = preguntas["pregunta" + this.preguntaRandom].opcionD;
                break;
        }
        switch (preguntas["pregunta" + this.preguntaRandom].respuestaCorrecta) {
            //activa todos los botones, menos el de empezar que lo desactiva
            case opcionElegidaLetras:
                this.preguntasContestadas++;
                this.megaFuncionPreguntas();
                break;
            default:
                this.perder();
                break;
        }
    },
    retirarse: function () {
        switch (this.dineroGanado) {
            //si no se gano dinero se imprime en pantalla un mensaje
            case 0:
                alert((estadoDeJuegoHTML.innerHTML = `Te retiraste sin ganar nada`));
                break;
            //si se gano dinero se imprime otro
            default:
                alert(`Felicitaciones, ganaste ${this.dineroGanado}`);
        }
        this.limpiarJuego();
    },
    perder: function () {
        //si no se gano dinero se imprime en pantalla un mensaje
        switch (this.dineroGanado) {
            //si no se gano dinero se imprime en pantalla un mensaje
            case 0:
                alert(`Perdiste, de todas manedas no podrías haber ganado nada`);
                break;
            //si se gano dinero se imprime otro
            default:
                alert(`Perdiste, podrías haber ganado ${this.dineroGanado} si te retirabas`);
        }
        this.limpiarJuego();
    },
    ganar: function () {
        this.modificarInformacion();
        //se imprime un mensaje felicitando la victoria
        alert(`Felicitaciones, ganaste el juego, te llevás ${this.dineroGanado} a tu casa`);
        this.limpiarJuego();
    },
    boton50: function () {
        let respuestaCorrecta50;
        let desactivadorRandom1;
        let desactivadorRandom2;
        //declaro respuestaCorrecta50 como la respuesta correcta
        switch (preguntas["pregunta" + this.preguntaRandom].respuestaCorrecta) {
            case preguntas["pregunta" + this.preguntaRandom].opcionA:
                respuestaCorrecta50 = 1;
                break;
            case preguntas["pregunta" + this.preguntaRandom].opcionB:
                respuestaCorrecta50 = 2;
                break;
            case preguntas["pregunta" + this.preguntaRandom].opcionC:
                respuestaCorrecta50 = 3;
                break;
            case preguntas["pregunta" + this.preguntaRandom].opcionD:
                respuestaCorrecta50 = 4;
                break;
        }
        //declaro desactivadorRandom1 como el primer numero a desactivar
        do {
            desactivadorRandom1 = Math.trunc(Math.random() * 4) + 1;
        } while (!(desactivadorRandom1 !== respuestaCorrecta50));
        //declaro desactivadorRandom2 como el segundo numero a desactivar
        do {
            desactivadorRandom2 = Math.trunc(Math.random() * 4) + 1;
        } while (!(desactivadorRandom2 !== respuestaCorrecta50 && desactivadorRandom2 !== desactivadorRandom1));
        //desactivo el boton que corresponda segun el valor de desactivadorRandom1
        switch (desactivadorRandom1) {
            case 1:
                botonRespuesta1HTML.disabled = true;
                break;
            case 2:
                botonRespuesta2HTML.disabled = true;
                break;
            case 3:
                botonRespuesta3HTML.disabled = true;
                break;
            case 4:
                botonRespuesta4HTML.disabled = true;
                break;
        }
        //desactivo el boton que corresponda segun el valor de desactivadorRandom2
        switch (desactivadorRandom2) {
            case 1:
                botonRespuesta1HTML.disabled = true;
                break;
            case 2:
                botonRespuesta2HTML.disabled = true;
                break;
            case 3:
                botonRespuesta3HTML.disabled = true;
                break;
            case 4:
                botonRespuesta4HTML.disabled = true;
                break;
        }
        this.gestionarComodines("boton50");
    },
    botonAyuda: function (quien) {
        let respuestaCorrectaAyuda;
        let respuestaIncorrectaAyuda = [];
        let numeroAyuda;
        //declaro respuestaCorrectaAyuda como la opcion correcta
        respuestaCorrectaAyuda = preguntas["pregunta" + this.preguntaRandom].respuestaCorrecta;
        //declaro respuestaIncorrectaAyuda como todas las opciones incorrectas
        switch (preguntas["pregunta" + this.preguntaRandom].respuestaCorrecta) {
            case preguntas["pregunta" + this.preguntaRandom].opcionA:
                respuestaIncorrectaAyuda.push(preguntas["pregunta" + this.preguntaRandom].opcionB);
                respuestaIncorrectaAyuda.push(preguntas["pregunta" + this.preguntaRandom].opcionC);
                respuestaIncorrectaAyuda.push(preguntas["pregunta" + this.preguntaRandom].opcionD);
                break;
            case preguntas["pregunta" + this.preguntaRandom].opcionB:
                respuestaIncorrectaAyuda.push(preguntas["pregunta" + this.preguntaRandom].opcionC);
                respuestaIncorrectaAyuda.push(preguntas["pregunta" + this.preguntaRandom].opcionD);
                respuestaIncorrectaAyuda.push(preguntas["pregunta" + this.preguntaRandom].opcionA);
                break;
            case preguntas["pregunta" + this.preguntaRandom].opcionC:
                respuestaIncorrectaAyuda.push(preguntas["pregunta" + this.preguntaRandom].opcionD);
                respuestaIncorrectaAyuda.push(preguntas["pregunta" + this.preguntaRandom].opcionA);
                respuestaIncorrectaAyuda.push(preguntas["pregunta" + this.preguntaRandom].opcionB);
                break;
            case preguntas["pregunta" + this.preguntaRandom].opcionD:
                respuestaIncorrectaAyuda.push(preguntas["pregunta" + this.preguntaRandom].opcionA);
                respuestaIncorrectaAyuda.push(preguntas["pregunta" + this.preguntaRandom].opcionB);
                respuestaIncorrectaAyuda.push(preguntas["pregunta" + this.preguntaRandom].opcionC);
                break;
        }
        //genero un numero random entre [1, 10]
        numeroAyuda = Math.floor(Math.random() * 10 + 1);
        switch (quien) {
            //si se ha llamado desde el boton ayuda del publico
            case "publico":
                //si el numero está entre [1, 9]
                if (numeroAyuda <= 9) {
                    //el publico dara la respuesta correcta
                    espacioPublicoHTML.innerHTML = `El público cree que la respuesta es ${respuestaCorrectaAyuda}`;
                } else {
                    //si el numero es 10 el publico dará la respuesta una respuesta incorrecta random
                    espacioPublicoHTML.innerHTML = `El público cree que la respuesta es ${
                        respuestaIncorrectaAyuda[Math.floor(Math.random() * 3)]
                    }`;
                }
                this.gestionarComodines("botonPublico");
                break;
            //si se ha llamado desde el boton ayuda de amigo
            case "amigo":
                if (numeroAyuda <= 7) {
                    espacioAmigoHTML.innerHTML = `Hola amigo, creo que la respuesta correcta es ${respuestaCorrectaAyuda}`;
                } else {
                    espacioAmigoHTML.innerHTML = `Tu amigo cree que la respuesta correcta es ${
                        respuestaIncorrectaAyuda[Math.floor(Math.random() * 3)]
                    }`;
                }
                this.gestionarComodines("botonAmigo");
                break;
        }
    },
    gestionarComodines: function (donde) {
        switch (donde) {
            //si se llamo a la funcion desde boton 50, se desactivan los tres botones y
            //boton50FueUsado se convierte en true, para luego desavilitarlo definitivamente
            case "boton50":
                boton50HTML.disabled = true;
                botonPublicoHTML.disabled = true;
                botonAmigoHTML.disabled = true;
                this.boton50FueUsado = true;
                break;
            case "botonPublico":
                boton50HTML.disabled = true;
                botonPublicoHTML.disabled = true;
                botonAmigoHTML.disabled = true;
                this.botonPublicoFueUsado = true;
                break;
            case "botonAmigo":
                boton50HTML.disabled = true;
                botonPublicoHTML.disabled = true;
                botonAmigoHTML.disabled = true;
                this.botonAmigoFueUsado = true;
                break;
            //si fue llamado desde logicaPreguntas, se habilitan los botones que fueron
            //temporalmente deshabilitados
            case "logicaPreguntas":
                if (this.boton50FueUsado == false) {
                    boton50HTML.disabled = false;
                }
                if (this.botonPublicoFueUsado == false) {
                    botonPublicoHTML.disabled = false;
                }
                if (this.botonAmigoFueUsado == false) {
                    botonAmigoHTML.disabled = false;
                }
                break;
        }
    },
    limpiarPreguntasPorComodines: function () {
        //activo los botones por si se ha tocado anteriormente el botón50
        this.activarBotonesRespuestas();
        //vacio eso por si se ha usado algun boton de ayuda
        espacioAmigoHTML.innerHTML = "";
        espacioPublicoHTML.innerHTML = "";
    },
    activarBotones: function () {
        //activa todos los botones, menos el de empezar que lo desactiva
        botonRespuesta1HTML.disabled = false;
        botonRespuesta2HTML.disabled = false;
        botonRespuesta3HTML.disabled = false;
        botonRespuesta4HTML.disabled = false;
        boton50HTML.disabled = false;
        botonPublicoHTML.disabled = false;
        botonAmigoHTML.disabled = false;
        botonRetirarseHTML.disabled = false;
        botonEmpezarHTML.disabled = true;
    },

    desactivarBotones: function () {
        //desactiva todos los botones, menos el de empezar que lo activa
        botonRespuesta1HTML.disabled = true;
        botonRespuesta2HTML.disabled = true;
        botonRespuesta3HTML.disabled = true;
        botonRespuesta4HTML.disabled = true;
        boton50HTML.disabled = true;
        botonPublicoHTML.disabled = true;
        botonAmigoHTML.disabled = true;
        botonRetirarseHTML.disabled = true;
        botonEmpezarHTML.disabled = false;
    },

    activarBotonesRespuestas: function () {
        //activa todos los botones de respuestas
        botonRespuesta1HTML.disabled = false;
        botonRespuesta2HTML.disabled = false;
        botonRespuesta3HTML.disabled = false;
        botonRespuesta4HTML.disabled = false;
    },
};
