//desactiva todos los botones, menos el de empezar que lo activa
function desactivarBotones() {
    document.getElementById("botonRespuesta1").disabled = true;
    document.getElementById("botonRespuesta2").disabled = true;
    document.getElementById("botonRespuesta3").disabled = true;
    document.getElementById("botonRespuesta4").disabled = true;
    document.getElementById("boton50").disabled = true;
    document.getElementById("botonPublico").disabled = true;
    document.getElementById("botonAmigo").disabled = true;
    document.getElementById("botonRetirarse").disabled = true;
    document.getElementById("botonEmpezar").disabled = false;
}

//activa todos los botones, menos el de empezar que lo desactiva
function activarBotones() {
    document.getElementById("botonRespuesta1").disabled = false;
    document.getElementById("botonRespuesta2").disabled = false;
    document.getElementById("botonRespuesta3").disabled = false;
    document.getElementById("botonRespuesta4").disabled = false;
    document.getElementById("boton50").disabled = false;
    document.getElementById("botonPublico").disabled = false;
    document.getElementById("botonAmigo").disabled = false;
    document.getElementById("botonRetirarse").disabled = false;
    document.getElementById("botonEmpezar").disabled = true;
}

//creo el objeto juego que almacena todos los controles del juego
const juego = {
    //decalro las variables que controlan el juego
    preguntasContestadas: 0,
    dineroGanado: 0,
    limpiarJuego: function () {
        //limpia los datos del juego para reiniciar
        document.getElementById("premioActual").innerHTML = "Premio actual: 0";
        document.getElementById("preguntasContestadas").innerHTML = "Preguntas contestadas: 0";
        this.preguntasContestadas = 0;
        this.dineroGanado = 0;
        //desactiva botones
        desactivarBotones();
        //Empezar se convierte en empezar de nuevo
        document.getElementById("botonEmpezar").innerHTML = "Empezar de nuevo";
    },
    empezar: function () {
        //activa los botones
        activarBotones();
        //imprime en pantalla que se está en partida
        document.getElementById("estadoDeJuego").innerHTML = "En partida";
        //Llama a la funcion preguntas superficie
        this.contestarPreguntasSuperfice();
    },
    contestarPreguntasSuperfice: function () {
        //imprime en pantalla el premio actual
        switch (this.preguntasContestadas) {
            //si no se contesto ninguna pregunta 0
            case 0:
                document.getElementById("premioActual").innerHTML = "Premio actual: 0";
                break;
            default:
                //si se ha contestado alguna se calculara con la funcion y=15^x
                this.dineroGanado = Math.pow(1000000, 1 / 15) ** this.preguntasContestadas;
                //saca los decimales
                this.dineroGanado = Math.trunc(this.dineroGanado);
                //le agrega los puntos
                this.dineroGanado = this.dineroGanado.toLocaleString();
                this.dineroGanado = `$${this.dineroGanado}`;
                //imprime en pantalla el dinero ganado
                document.getElementById("premioActual").innerHTML = `Premio actual: ${this.dineroGanado}`;
                break;
        }
        if (this.preguntasContestadas == 15) {
            this.ganar();
        } else {
            //imprime en pantalla cuantas preguntas se contestaron
            document.getElementById(
                "preguntasContestadas"
            ).innerHTML = `Preguntas contestadas: ${this.preguntasContestadas}`;
            //Declaro pregunta deseada
            let preguntaDeseada = preguntas["pregunta" + (this.preguntasContestadas + 1)].pregunta;
            //La imprimo en pantalla
            document.getElementById("pregunta").innerHTML = preguntaDeseada;
            //Declaro respuesta a deseada
            let respuestaADeseada = preguntas["pregunta" + (this.preguntasContestadas + 1)].opcionA;
            //La imprimo en pantalla
            document.getElementById("botonRespuesta1").innerHTML = respuestaADeseada;
            //Declaro respuesta b deseada
            let respuestaBDeseada = preguntas["pregunta" + (this.preguntasContestadas + 1)].opcionB;
            //La imprimo en pantalla
            document.getElementById("botonRespuesta2").innerHTML = respuestaBDeseada;
            //Declaro respuesta c deseada
            let respuestaCDeseada = preguntas["pregunta" + (this.preguntasContestadas + 1)].opcionC;
            //La imprimo en pantalla
            document.getElementById("botonRespuesta3").innerHTML = respuestaCDeseada;
            //Declaro respuesta D deseada
            let respuestaDeseada = preguntas["pregunta" + (this.preguntasContestadas + 1)].opcionD;
            //La imprimo en pantalla
            document.getElementById("botonRespuesta4").innerHTML = respuestaDeseada;
        }
    },
    logicaPreguntas: function (opcionElegida) {
        let opcionElegidaL;
        switch (opcionElegida) {
            case 1:
                opcionElegidaL = preguntas["pregunta" + (this.preguntasContestadas + 1)].opcionA;
                break;
            case 2:
                opcionElegidaL = preguntas["pregunta" + (this.preguntasContestadas + 1)].opcionB;
                break;
            case 3:
                opcionElegidaL = preguntas["pregunta" + (this.preguntasContestadas + 1)].opcionC;
                break;
            case 4:
                opcionElegidaL = preguntas["pregunta" + (this.preguntasContestadas + 1)].opcionD;
                break;
        }
        switch (preguntas["pregunta" + (this.preguntasContestadas + 1)].respuestaCorrecta) {
            case opcionElegidaL:
                this.preguntasContestadas++;
                this.contestarPreguntasSuperfice();
                break;
            default:
                this.perder();
                break;
        }
    },
    retirarse: function () {
        switch (this.dineroGanado) {
            case 0:
                document.getElementById("estadoDeJuego").innerHTML = `Te retiraste sin ganar nada`;
                break;
            default:
                document.getElementById("estadoDeJuego").innerHTML = `Felicitaciones, ganaste ${this.dineroGanado}`;
        }
        this.limpiarJuego();
    },
    perder: function () {
        switch (this.dineroGanado) {
            case 0:
                document.getElementById(
                    "estadoDeJuego"
                ).innerHTML = `Perdiste, de todas manedas no podrías haber ganado nada`;
                break;
            default:
                document.getElementById(
                    "estadoDeJuego"
                ).innerHTML = `Perdiste, podrías haber ganado ${this.dineroGanado}`;
        }
        this.limpiarJuego();
    },
    ganar: function () {
        document.getElementById(
            "estadoDeJuego"
        ).innerHTML = `Ganaste el juego, te llevás ${this.dineroGanado} a tu casa`;
        this.limpiarJuego();
    },
};
