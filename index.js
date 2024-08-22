require('dotenv').config(); 
const express = require('express');
const Color = require('color');
const colorNamer = require('color-namer');
const moment = require('moment');
const convert = require('convert-units');

const app = express();
const port = process.env.PORT || 3000;

// Mapa de traducción de nombres de colores al español
const colorTranslations = {
    "red": "Rojo",
    "green": "Verde",
    "blue": "Azul",
    "black": "Negro",
    "white": "Blanco",
    "yellow": "Amarillo",
    "orange": "Naranja",
    "pink": "Rosa",
    "purple": "Púrpura",
    "brown": "Marrón",
    "gray": "Gris",
    "cyan": "Cian",
    "magenta": "Magenta",
};

// Mapa de traducción de unidades
const unitTranslations = {
    'metros': 'm',
    'pies': 'ft',
    'kilómetros': 'km',
    'millas': 'mi',
    'centímetros': 'cm',
    'pulgadas': 'in',
    'yardas': 'yd',
    'milímetros cuadrados': 'mm2',
    'centímetros cuadrados': 'cm2',
    'metros cuadrados': 'm2',
    'hectáreas': 'ha',
    'kilómetros cuadrados': 'km2',
    'pulgadas cuadradas': 'in2',
    'yardas cuadradas': 'yd2',
    'pies cuadrados': 'ft2',
    'acres': 'ac',
    'millas cuadradas': 'mi2',
    'microgramos': 'mcg',
    'miligramos': 'mg',
    'gramos': 'g',
    'kilogramos': 'kg',
    'toneladas': 't',
    'milímetros cúbicos': 'mm3',
    'centímetros cúbicos': 'cm3',
    'mililitros': 'ml',
    'centilitros': 'cl',
    'decilitros': 'dl',
    'litros': 'l',
    'kilolitros': 'kl',
    'metros cúbicos': 'm3',
    'kilómetros cúbicos': 'km3',
    'cucharaditas': 'tsk',
    'cucharadas': 'msk',
    'vasos': 'glas',
    'tazas': 'kanna',
    'onzas fluidas': 'fl-oz',
    'pintas': 'pnt',
    'cuartos': 'qt',
    'galones': 'gal',
    'unidades': 'ea',
    'docenas': 'dz',
    'grados Celsius': 'C',
    'kelvin': 'K',
    'grados Fahrenheit': 'F',
    'grados Rankine': 'R',
    'nanosegundos': 'ns',
    'micrómetros': 'mu',
    'milisegundos': 'ms',
    'segundos': 's',
    'minutos': 'min',
    'horas': 'h',
    'días': 'd',
    'semanas': 'week',
    'meses': 'month',
    'años': 'year',
    'bits': 'b',
    'kilobits': 'Kb',
    'megabits': 'Mb',
    'gigabits': 'Gb',
    'terabits': 'Tb',
    'bytes': 'B',
    'kilobytes': 'KB',
    'megabytes': 'MB',
    'gigabytes': 'GB',
    'terabytes': 'TB',
    'partes por millón': 'ppm',
    'partes por mil millones': 'ppb',
    'partes por billón': 'ppt',
    'partes por cuatrillón': 'ppq',
    'metros por segundo': 'm/s',
    'kilómetros por hora': 'km/h',
    'nudos': 'knot',
    'pies por segundo': 'ft/s',
    'minutos por kilómetro': 'min/km',
    'segundos por metro': 's/m',
    'minutos por milla': 'min/mi',
    'segundos por pie': 's/ft',
    'pascales': 'Pa',
    'kilopascales': 'kPa',
    'megapascales': 'MPa',
    'hectopascales': 'hPa',
    'bares': 'bar',
    'torr': 'torr',
    'libras por pulgada cuadrada': 'psi',
    'mil libras por pulgada cuadrada': 'ksi',
    'amperios': 'A',
    'miliamperios': 'mA',
    'kiloamperios': 'kA',
    'voltios': 'V',
    'milivoltios': 'mV',
    'kilovoltios': 'kV',
    'vatios': 'W',
    'milivatios': 'mW',
    'kilovatios': 'kW',
    'megavatios': 'MW',
    'gigavatios': 'GW',
    'varios': 'VAR',
    'milivarios': 'mVAR',
    'kilovarios': 'kVAR',
    'megavarios': 'MVAR',
    'gigavarios': 'GVAR',
    'voltios-amperios': 'VA',
    'milivoltios-amperios': 'mVA',
    'kilovoltios-amperios': 'kVA',
    'megavoltios-amperios': 'MVA',
    'gigavoltios-amperios': 'GVA',
    'vatios-hora': 'Wh',
    'milivatios-hora': 'mWh',
    'kilovatios-hora': 'kWh',
    'megavatios-hora': 'MWh',
    'gigavatios-hora': 'GWh'
};

// Lista de unidades disponibles
const availableUnits = {
    'metros': 'm',
    'centímetros': 'cm',
    'kilómetros': 'km',
    'pies': 'ft',
    'pulgadas': 'in',
    'millas': 'mi',
    'yardas': 'yd',
    'milímetros': 'mm',
    'milímetros cuadrados': 'mm2',
    'centímetros cuadrados': 'cm2',
    'metros cuadrados': 'm2',
    'hectáreas': 'ha',
    'kilómetros cuadrados': 'km2',
    'pulgadas cuadradas': 'in2',
    'yardas cuadradas': 'yd2',
    'pies cuadrados': 'ft2',
    'acres': 'ac',
    'millas cuadradas': 'mi2',
    'microgramos': 'mcg',
    'miligramos': 'mg',
    'gramos': 'g',
    'kilogramos': 'kg',
    'toneladas': 't',
    'milímetros cúbicos': 'mm3',
    'centímetros cúbicos': 'cm3',
    'mililitros': 'ml',
    'centilitros': 'cl',
    'decilitros': 'dl',
    'litros': 'l',
    'kilolitros': 'kl',
    'metros cúbicos': 'm3',
    'kilómetros cúbicos': 'km3',
    'cucharaditas': 'tsk',
    'cucharadas': 'msk',
    'vasos': 'glas',
    'tazas': 'kanna',
    'onzas fluidas': 'fl-oz',
    'pintas': 'pnt',
    'cuartos': 'qt',
    'galones': 'gal',
    'unidades': 'ea',
    'docenas': 'dz',
    'grados Celsius': 'C',
    'kelvin': 'K',
    'grados Fahrenheit': 'F',
    'grados Rankine': 'R',
    'nanosegundos': 'ns',
    'micrómetros': 'mu',
    'milisegundos': 'ms',
    'segundos': 's',
    'minutos': 'min',
    'horas': 'h',
    'días': 'd',
    'semanas': 'week',
    'meses': 'month',
    'años': 'year',
    'bits': 'b',
    'kilobits': 'Kb',
    'megabits': 'Mb',
    'gigabits': 'Gb',
    'terabits': 'Tb',
    'bytes': 'B',
    'kilobytes': 'KB',
    'megabytes': 'MB',
    'gigabytes': 'GB',
    'terabytes': 'TB',
    'partes por millón': 'ppm',
    'partes por mil millones': 'ppb',
    'partes por billón': 'ppt',
    'partes por cuatrillón': 'ppq',
    'metros por segundo': 'm/s',
    'kilómetros por hora': 'km/h',
    'nudos': 'knot',
    'pies por segundo': 'ft/s',
    'minutos por kilómetro': 'min/km',
    'segundos por metro': 's/m',
    'minutos por milla': 'min/mi',
    'segundos por pie': 's/ft',
    'pascales': 'Pa',
    'kilopascales': 'kPa',
    'megapascales': 'MPa',
    'hectopascales': 'hPa',
    'bares': 'bar',
    'torr': 'torr',
    'libras por pulgada cuadrada': 'psi',
    'mil libras por pulgada cuadrada': 'ksi',
    'amperios': 'A',
    'miliamperios': 'mA',
    'kiloamperios': 'kA',
    'voltios': 'V',
    'milivoltios': 'mV',
    'kilovoltios': 'kV',
    'vatios': 'W',
    'milivatios': 'mW',
    'kilovatios': 'kW',
    'megavatios': 'MW',
    'gigavatios': 'GW',
    'varios': 'VAR',
    'milivarios': 'mVAR',
    'kilovarios': 'kVAR',
    'megavarios': 'MVAR',
    'gigavarios': 'GVAR',
    'voltios-amperios': 'VA',
    'milivoltios-amperios': 'mVA',
    'kilovoltios-amperios': 'kVA',
    'megavoltios-amperios': 'MVA',
    'gigavoltios-amperios': 'GVA',
    'vatios-hora': 'Wh',
    'milivatios-hora': 'mWh',
    'kilovatios-hora': 'kWh',
    'megavatios-hora': 'MWh',
    'gigavatios-hora': 'GWh'
};

// Endpoint principal
app.get('/', (req, res) => {
    res.send(`
        <h1>Bienvenido a la API de DarknessDev</h1>
        <p>Esta API ofrece varios servicios principales:</p>

        <h2>1. Conversión de Códigos Hexadecimales a Nombres de Colores</h2>
        <p>Ruta: <code>/color?hex=</code></p>
        <p>Descripción: Este endpoint convierte un código hexadecimal de color en su nombre correspondiente en español. El código hexadecimal puede ser de 3 o 6 dígitos.</p>
        <p>Parámetro requerido:
            <ul>
                <li><strong>hex</strong>: El código hexadecimal del color (por ejemplo, <code>FF5733</code> o <code>F53</code>).</li>
            </ul>
        </p>
        <p>Ejemplo de solicitud: <code>GET /color?hex=FF5733</code></p>
        <p>Respuesta esperada: El nombre del color en español, como <code>Naranja</code> para el código <code>FF5733</code>.</p>

        <h2>2. Conversión de Timestamp Unix a Tiempo Formateado</h2>
        <p>Ruta: <code>/timestamp?unix=</code></p>
        <p>Descripción: Este endpoint convierte un timestamp Unix (en segundos) a un formato legible que muestra el tiempo en días, horas, minutos y segundos.</p>
        <p>Parámetro requerido:
            <ul>
                <li><strong>unix</strong>: El timestamp Unix en segundos (por ejemplo, <code>86400</code> para 1 día).</li>
            </ul>
        </p>
        <p>Ejemplo de solicitud: <code>GET /timestamp?unix=60</code></p>
        <p>Respuesta esperada: El tiempo formateado como <code>0 días, 0 horas, 1 minutos, 0 segundos</code> para un timestamp de 60 segundos.</p>

        <h2>3. Diferencia de Días Entre Fechas</h2>
        <p>Ruta: <code>/datediff?date1=&date2=</code></p>
        <p>Descripción: Este endpoint calcula la diferencia en días entre dos fechas.</p>
        <p>Parámetros requeridos:
            <ul>
                <li><strong>date1</strong>: La primera fecha en formato ISO (por ejemplo, <code>2023-01-01</code>).</li>
                <li><strong>date2</strong>: La segunda fecha en formato ISO (por ejemplo, <code>2024-08-21</code>).</li>
            </ul>
        </p>
        <p>Ejemplo de solicitud: <code>GET /datediff?date1=2023-01-01&date2=2024-08-21</code></p>
        <p>Respuesta esperada: La diferencia en días entre las dos fechas proporcionadas, como <code>Diferencia de días: 597 días</code>.</p>

        <h2>4. Conversión de Unidades</h2>
        <p>Ruta: <code>/convertirunidad?valor=&de=&a=</code></p>
        <p>Descripción: Convierte una cantidad de una unidad a otra (por ejemplo, de metros a pies).</p>
        <p>Parámetros requeridos:
            <ul>
                <li><strong>valor</strong>: La cantidad a convertir.</li>
                <li><strong>de</strong>: La unidad de origen (por ejemplo, <code>metros</code>).</li>
                <li><strong>a</strong>: La unidad de destino (por ejemplo, <code>pies</code>).</li>
            </ul>
        </p>
        <p>Ejemplo de solicitud: <code>GET /convertirunidad?valor=10&de=metros&a=pies</code></p>
        <p>Respuesta esperada: La cantidad convertida a la unidad de destino, como <code>10 metros es igual a 32.81 pies.</code>.</p>

        <h2>5. Unidades Disponibles</h2>
        <p>Ruta: <code>/unidades</code></p>
        <p>Descripción: Este endpoint devuelve una lista de todas las unidades que se pueden usar para la conversión. Asegúrate de escribir las unidades correctamente, incluyendo acentos y tildes. Por ejemplo, se debe escribir <code>kilómetros</code> con tilde, no <code>kilometro</code>.</p>
        <p>Ejemplo de solicitud: <code>GET /unidades</code></p>
        <p>Respuesta esperada: Una lista de unidades disponibles en español.</p>
    `);
});

// Endpoint para obtener las unidades disponibles
app.get('/unidades', (req, res) => {
    const unidadesList = Object.keys(availableUnits).map(unit => `• ${unit}`).join('<br>');
    const message = `Asegúrate de escribir las unidades correctamente, incluyendo acentos y tildes. Por ejemplo, se debe escribir 'kilómetros' con tilde, no 'kilometro'.<br><br>Unidades disponibles:<br>${unidadesList}`;
    res.send(message);
});

app.get('/color', (req, res) => {
    const hex = req.query.hex;

    if (!hex) {
        return res.status(400).send('Parámetro hex es requerido');
    }

    try {
        const color = Color(`#${hex}`).hex().slice(1); // Eliminar el prefijo '#'
        const namedColors = colorNamer(color);
        const colorNameInEnglish = namedColors.basic[0].name;
        const colorNameInSpanish = colorTranslations[colorNameInEnglish.toLowerCase()] || colorNameInEnglish;
        res.send(colorNameInSpanish);
    } catch (error) {
        res.status(400).send('Código hexadecimal inválido');
    }
});

app.get('/timestamp', (req, res) => {
    const unixTimestamp = parseInt(req.query.unix, 10);

    if (isNaN(unixTimestamp)) {
        return res.status(400).send('Timestamp Unix inválido');
    }

    const duration = moment.duration(unixTimestamp * 1000); // Multiplicar por 1000 para convertir a milisegundos
    const days = Math.floor(duration.asDays());
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    const formattedTime = `${days} días, ${hours} horas, ${minutes} minutos, ${seconds} segundos`;
    res.send(formattedTime);
});

app.get('/datediff', (req, res) => {
    const { date1, date2 } = req.query;

    if (!date1 || !date2) {
        return res.status(400).send('Parámetros date1 y date2 son requeridos');
    }

    try {
        const d1 = moment(date1, 'YYYY-MM-DD');
        const d2 = moment(date2, 'YYYY-MM-DD');
        const diffInDays = d2.diff(d1, 'days');
        res.send(`Diferencia de días: ${diffInDays} días`); // Corrección aquí
    } catch (error) {
        res.status(400).send('Fechas inválidas');
    }
});
                          // Endpoint para la conversión de unidades
                          app.get('/convertirunidad', (req, res) => {
                              const { valor, de, a } = req.query;

                              if (!valor || !de || !a) {
                                  return res.status(400).send('Parámetros valor, de y a son requeridos.');
                              }

                              try {
                                  // Convertir las unidades de español a las abreviaturas que convert-units entiende
                                  const fromUnitInEnglish = unitTranslations[de] || de;
                                  const toUnitInEnglish = unitTranslations[a] || a;

                                  const numericValue = parseFloat(valor);
                                  const result = convert(numericValue).from(fromUnitInEnglish).to(toUnitInEnglish);
                                  res.send(`${numericValue} ${de} es igual a ${Math.round(result)} ${a}.`);
                              } catch (error) {
                                  res.status(400).send(error.message);
                              }
                          });
                          app.listen(port, () => {
                              console.log(`Servidor corriendo en http://localhost:${port}`); // Corrección aquí
                          });
