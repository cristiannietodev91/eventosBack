var HttpStatus = require('http-status-codes');

/**
 * Funcion que recibe un peticion POST
 * y valida que cartas hacen parte de la escalera
 * @param {*} req 
 * @param {*} res 
 * @param {*} next
 * @returns {JSON} 
 */
const validateEscalera = (req, res, next) => {
    try {
        let cartas = req.body;

        let esCalera = escalera(cartas);

        console.debug('Cartas recibidas para validar escalera', esCalera);

        res.status(HttpStatus.OK).json(esCalera);

    } catch (error) {
        console.error('Error al listar eventos ', error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

const escalera = (cartas) => {
    //Ordenamos las cartas
    let orderCartas = cartas.sort((a, b) => {
        return a.value.number - b.value.number;
    });

    //Reinicia las cartas ordenadas
    for (let i = 0; i < orderCartas.length; i++) {
        orderCartas[i].value.esEscalera = false;
    }

    console.debug('Cartas ordenadas ::::>', orderCartas);

    for (let i = 0; i <= orderCartas.length;) {
        let cartaValidate = orderCartas[i];
        console.log('Valores toma i ', i)
        // Valida si es un AS
        /*if (cartaValidate.value.number == 14) {
            let count = orderCartas.filter((element) => {
                return element.value.esEscalera == true;
            }).length

            if(count >= 4){
                if(orderCartas[0].value.number == 2){
                    orderCartas[i].value.esEscalera = true;
                }
            }
            break;
        }*/
        if (i == orderCartas.length - 1) {
            //Valida ultima carta
            if (cartaValidate.value.number - 1 == (orderCartas[i - 1].value.number) || (orderCartas[0].value.number == 2  && cartaValidate.value.number == 14)) {
                orderCartas[i].value.esEscalera = true;
            }
            break;
        }
        for (let j = i + 1; j < orderCartas.length; ++j) {
            console.log('Valores toma j ', j)
            if (cartaValidate.value.number != (orderCartas[j].value.number)) {
                if (cartaValidate.value.number + 1 == (orderCartas[j].value.number)) {
                    orderCartas[i].value.esEscalera = true;
                    orderCartas[j].value.esEscalera = true;
                    i = j;
                    break;
                } else {
                    let count = orderCartas.filter((element) => {
                        return element.value.esEscalera == true;
                    }).length

                    if (count == 5) {
                        return orderCartas;
                    }

                    if (count < 4) {
                        for (let k = 0; k <= i; k++) {
                            orderCartas[k].value.esEscalera = false;
                        }
                    }
                    //orderCartas[i].value.esEscalera = true;
                    i++;
                    break;

                }
            } else {
                console.log('Se omite carta ::::>');

            }
        }
    }

    return orderCartas;
}

module.exports = {
    validateEscalera
}