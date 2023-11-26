function desactivarBotones() {
    //desactiva todos los botones, menos el de empezar que lo activa
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

function activarBotones() {
    //activa todos los botones, menos el de empezar que lo desactiva
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
const juego = {
    //declaro las variables que controlan el juego
    preguntasContestadas: 0,
    dineroGanado: 0,
    preguntaRandom: 0,
    preguntasUsadas: [],
    limpiarJuego: function () {
        //limpia los datos del juego para reiniciar
        document.getElementById("premioActual").innerHTML = "Premio actual: 0";
        document.getElementById("preguntasContestadas").innerHTML = "Preguntas contestadas: 0";
        this.preguntaRandom = 0;
        this.preguntasContestadas = 0;
        this.dineroGanado = 0;
        this.preguntasUsadas = [];
        desactivarBotones();
        //Empezar se convierte en empezar de nuevo
        document.getElementById("botonEmpezar").innerHTML = "Empezar de nuevo";
    },
    empezar: function () {
        activarBotones();
        //imprime en pantalla que se está en partida
        document.getElementById("estadoDeJuego").innerHTML = "En partida";
        this.megaFuncionPreguntas();
    },
    megaFuncionPreguntas: function () {
        this.modificarInformacion();
        this.randomizadorPreguntas();
        //si preguntasContestadas es 15 se gana
        if (this.preguntasContestadas == 15) {
            this.ganar();
        } else {
            //si no continúa el juego
            this.modificarBotonesYPreguntas();
        }
    },
    randomizadorPreguntas: function () {
        //guarda en pregunta random un numero del 0 al 100
        this.preguntaRandom = Math.floor(Math.random() * 100) + 1;
        //si la pregunta ya fue elegida hay recursividad
        if (this.preguntasUsadas.includes(this.preguntaRandom)) {
            this.randomizadorPreguntas();
        } else {
            //si no se agrega la pregunta a un array para que no se repita
            this.preguntasUsadas.push(this.preguntaRandom);
        }
    },
    modificarInformacion: function () {
        //imprime en pantalla cuantas preguntas se contestaron
        document.getElementById(
            "preguntasContestadas"
        ).innerHTML = `Preguntas contestadas: ${this.preguntasContestadas}`;
        switch (this.preguntasContestadas) {
            case 0:
                //si no se contesto ninguna pregunta el premio actual es 0
                document.getElementById("premioActual").innerHTML = "Premio actual: 0";
                break;
            default:
                //si se ha contestado alguna se calculara con la funcion y=15^x
                this.dineroGanado = Math.pow(1000000, 1 / 15) ** this.preguntasContestadas;
                //se sacan los decimales
                this.dineroGanado = Math.trunc(this.dineroGanado);
                //se agregan los puntos
                this.dineroGanado = this.dineroGanado.toLocaleString();
                this.dineroGanado = `$${this.dineroGanado}`;
                //imprime en pantalla el dinero ganado
                document.getElementById("premioActual").innerHTML = `Premio actual: ${this.dineroGanado}`;
                break;
        }
    },
    modificarBotonesYPreguntas: function () {
        //Declaro pregunta deseada
        preguntaDeseada = preguntas["pregunta" + this.preguntaRandom].pregunta;
        //La imprimo en pantalla
        document.getElementById("pregunta").innerHTML = preguntaDeseada;
        //Declaro la respuesta deseada
        let respuestaADeseada = preguntas["pregunta" + this.preguntaRandom].opcionA;
        //La imprimo en pantalla
        document.getElementById("botonRespuesta1").innerHTML = respuestaADeseada;
        let respuestaBDeseada = preguntas["pregunta" + this.preguntaRandom].opcionB;
        document.getElementById("botonRespuesta2").innerHTML = respuestaBDeseada;
        let respuestaCDeseada = preguntas["pregunta" + this.preguntaRandom].opcionC;
        document.getElementById("botonRespuesta3").innerHTML = respuestaCDeseada;
        let respuestaDeseada = preguntas["pregunta" + this.preguntaRandom].opcionD;
        document.getElementById("botonRespuesta4").innerHTML = respuestaDeseada;
    },

    //el parametro opcionElegida depende del boton tocado
    logicaPreguntas: function (opcionElegida) {
        let opcionElegidaL;
        switch (opcionElegida) {
            //si la opcion elegida es la 1 opcionElegidaLetras será igual a la opcionA
            case 1:
                opcionElegidaL = preguntas["pregunta" + this.preguntaRandom].opcionA;
                break;
            case 2:
                opcionElegidaL = preguntas["pregunta" + this.preguntaRandom].opcionB;
                break;
            case 3:
                opcionElegidaL = preguntas["pregunta" + this.preguntaRandom].opcionC;
                break;
            case 4:
                opcionElegidaL = preguntas["pregunta" + this.preguntaRandom].opcionD;
                break;
        }
        switch (preguntas["pregunta" + this.preguntaRandom].respuestaCorrecta) {
            //activa todos los botones, menos el de empezar que lo desactiva
            case opcionElegidaL:
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
                document.getElementById("estadoDeJuego").innerHTML = `Te retiraste sin ganar nada`;
                break;
            //si se gano dinero se imprime otro
            default:
                document.getElementById("estadoDeJuego").innerHTML = `Felicitaciones, ganaste ${this.dineroGanado}`;
        }
        this.limpiarJuego();
    },
    perder: function () {
        //si no se gano dinero se imprime en pantalla un mensaje
        switch (this.dineroGanado) {
            //si no se gano dinero se imprime en pantalla un mensaje
            case 0:
                document.getElementById(
                    "estadoDeJuego"
                ).innerHTML = `Perdiste, de todas manedas no podrías haber ganado nada`;
                break;
            //si se gano dinero se imprime otro
            default:
                document.getElementById(
                    "estadoDeJuego"
                ).innerHTML = `Perdiste, podrías haber ganado ${this.dineroGanado}`;
        }
        this.limpiarJuego();
    },
    ganar: function () {
        //se imprime un mensaje felicitando la victoria
        document.getElementById(
            "estadoDeJuego"
        ).innerHTML = `Ganaste el juego, te llevás ${this.dineroGanado} a tu casa`;
        this.limpiarJuego();
    },
};
