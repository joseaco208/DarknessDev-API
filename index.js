require('dotenv').config();
const express = require('express');
const Color = require('color');
const colorNamer = require('color-namer');
const moment = require('moment');
const convert = require('convert-units');
const morse = require('morse');
const QRCode = require('qrcode');

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

// Lista de unidades disponibles
const availableUnits = {
    'metros': 'm',
    'pies': 'ft',
    'kilómetros': 'km',
    'millas': 'mi',
    'centímetros': 'cm',
    'pulgadas': 'in',
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
        <!DOCTYPE html>
        <html>
        <head>
            <title>API de DarknessDev</title>
            <style>
                /* Estilos CSS minimalistas */
                body {
                    font-family: 'Open Sans', sans-serif;
                    background-color: #f5f5f5;
                    color: #333;
                    margin: 0;
                    padding: 0;
                    transition: background-color 0.5s, color 0.5s;
                }
                body.dark-mode {
                    background-color: #121212;
                    color: #f5f5f5;
                }
                .container {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 40px;
                }
                h1, h2 {
                    color: #007bff;
                    transition: color 0.5s;
                }
                body.dark-mode h1, body.dark-mode h2 {
                    color: #4da6ff;
                }
                a {
                    color: #007bff;
                    text-decoration: none;
                    transition: color 0.5s;
                }
                body.dark-mode a {
                    color: #4da6ff;
                }
                a:hover {
                    text-decoration: underline;
                }
                code {
                    background-color: #e6e6e6;
                    color: #333;
                    padding: 2px 4px;
                    border-radius: 4px;
                    transition: background-color 0.5s, color 0.5s;
                }
                body.dark-mode code {
                    background-color: #333;
                    color: #e6e6e6;
                }
                .endpoint {
                    margin-bottom: 40px;
                }
                .endpoint h2 {
                    margin-top: 0;
                }
                .endpoint p {
                    margin-bottom: 10px;
                }
                .button {
                    background-color: #007bff;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;
                    font-size: 16px;
                    margin: 4px 2px;
                    cursor: pointer;
                    border-radius: 4px;
                    transition: background-color 0.3s;
                }
                .button:hover {
                    background-color: #0056b3;
                }
                .button-bw {
                    background-color: black;
                    color: white;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <button class="button button-bw" onclick="toggleDarkMode()">Modo Oscuro</button>
                <h1>Bienvenido a la API de DarknessDev</h1>
                <p>Esta API ofrece varios servicios principales:</p>
                <div class="endpoint">
                    <h2>1. Conversión de Códigos Hexadecimales a Nombres de Colores</h2>
                    <p>Ruta: <code class="route">/color?hex=</code></p>
                    <p>Descripción: Este endpoint convierte un código hexadecimal de color en su nombre correspondiente en español.</p>
                    <p>Parámetro requerido: <strong>hex</strong>: El código hexadecimal del color (ejemplo: <code class="example">FF5733</code>).</p>
                    <p>Ejemplo de solicitud: <code class="example">GET /color?hex=FF5733</code></p>
                    <p>Respuesta esperada: El nombre del color en español.</p>
                </div>
                <div class="endpoint">
                    <h2>2. Conversión de Timestamp Unix a Tiempo Formateado</h2>
                    <p>Ruta: <code class="route">/timestamp?unix=</code></p>
                    <p>Descripción: Convierte un timestamp Unix a un formato legible.</p>
                    <p>Parámetro requerido: <strong>unix</strong>: El timestamp Unix en segundos.</p>
                    <p>Ejemplo de solicitud: <code class="example">GET /timestamp?unix=60</code></p>
                    <p>Respuesta esperada: El tiempo formateado.</p>
                </div>
                <div class="endpoint">
                    <h2>3. Diferencia de Días Entre Fechas</h2>
                    <p>Ruta: <code class="route">/datediff?date1=&date2=</code></p>
                    <p>Descripción: Calcula la diferencia en días entre dos fechas.</p>
                    <p>Parámetros requeridos: <strong>date1</strong> y <strong>date2</strong> en formato ISO.</p>
                    <p>Ejemplo de solicitud: <code class="example">GET /datediff?date1=2023-01-01&date2=2024-08-21</code></p>
                    <p>Respuesta esperada: La diferencia en días.</p>
                </div>
                <div class="endpoint">
                    <h2>4. Conversión de Unidades</h2>
                    <p>Ruta: <code class="route">/convertirunidad?valor=&de=&a=</code></p>
                    <p>Descripción: Convierte una cantidad de una unidad a otra.</p>
                    <p>Parámetros requeridos: <strong>valor</strong>, <strong>de</strong> y <strong>a</strong>.</p>
                    <p>Ejemplo de solicitud: <code class="example">GET /convertirunidad?valor=10&de=metros&a=pies</code></p>
                    <p>Respuesta esperada: La cantidad convertida.</p>
                </div>
                <div class="endpoint">
                    <h2>5. Unidades Disponibles</h2>
                    <p>Ruta: <code class="route">/unidades</code></p>
                    <p>Descripción: Devuelve una lista de todas las unidades disponibles.</p>
                    <p>Ejemplo de solicitud: <code class="example">GET /unidades</code></p>
                    <p>Respuesta esperada: Lista de unidades.</p>
                </div>
                <div class="endpoint">
                    <h2>6. Conversión de Texto a Código Morse</h2>
                    <p>Ruta: <code class="route">/morse?text=</code></p>
                    <p>Descripción: Convierte un texto en código morse.</p>
                    <p>Parámetro requerido: <strong>text</strong>.</p>
                    <p>Ejemplo de solicitud: <code class="example">GET /morse?text=Hola</code></p>
                    <p>Respuesta esperada: El código morse correspondiente.</p>
                </div>
                <div class="endpoint">
                    <h2>7. Generación de QR Codes</h2>
                    <p>Ruta: <code class="route">/qr?text=</code></p>
                    <p>Descripción: Genera un código QR basado en el texto proporcionado.</p>
                    <p>Parámetro requerido: <strong>text</strong>: El texto que deseas convertir en un código QR.</p>
                    <p>Ejemplo de solicitud: <code class="example">GET /qr?text=Lo que quieras convertir en QR</code></p>
                    <p>Respuesta esperada: Una imagen del código QR que representa el texto proporcionado.</p>
                </div>
            </div>

            <script>
                function toggleDarkMode() {
                    document.body.classList.toggle('dark-mode');
                    const button = document.querySelector('.button-bw');
                    button.textContent = document.body.classList.contains('dark-mode') ? 'Modo Claro' : 'Modo Oscuro';
                    const routes = document.querySelectorAll('.route');
                    const examples = document.querySelectorAll('.example');
                    routes.forEach(route => {
                        route.style.color = document.body.classList.contains('dark-mode') ? '#f5f5f5' : '#333';
                    });
                    examples.forEach(example => {
                        example.style.color = document.body.classList.contains('dark-mode') ? '#f5f5f5' : '#333';
                    });
                }
            </script>
        </body>
        </html>
    `);
});
    
// Endpoint para obtener las unidades disponibles
app.get('/unidades', (req, res) => {
    const unidadesList = Object.keys(availableUnits).map(unit => `• ${unit}`).join('<br>');
    const message = `Asegúrate de escribir las unidades correctamente, incluyendo acentos y tildes. Por ejemplo, se debe escribir 'kilómetros' con tilde, no 'kilometro'.<br><br>Unidades disponibles:<br>${unidadesList}`;
    res.send(message);
});

// Endpoint para obtener el nombre de un color
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

// Endpoint para convertir un timestamp Unix a tiempo formateado
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

// Endpoint para calcular la diferencia de días entre fechas
app.get('/datediff', (req, res) => {
    const { date1, date2 } = req.query;

    if (!date1 || !date2) {
        return res.status(400).send('Parámetros date1 y date2 son requeridos');
    }

    try {
        const d1 = moment(date1, 'YYYY-MM-DD');
        const d2 = moment(date2, 'YYYY-MM-DD');
        const diffInDays = d2.diff(d1, 'days');
        res.send(`Diferencia de días: ${diffInDays} días`);
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

// Endpoint para convertir texto a código morse
app.get('/morse', (req, res) => {
    const text = req.query.text;

    if (!text) {
        return res.status(400).send('Parámetro text es requerido');
    }

    const morseCode = morse.encode(text);
    res.send(morseCode);
});

// Nuevo endpoint para generar códigos QR
app.get('/qr', async (req, res) => {
    const text = req.query.text;

    if (!text) {
        return res.status(400).send('Parámetro text es requerido');
    }

    try {
        // Generar el código QR como una imagen en formato Data URL
        const qrCode = await QRCode.toDataURL(text);

        // Enviar la imagen del código QR como respuesta
        res.send(`<img src="${qrCode}">`);
    } catch (error) {
        res.status(500).send('Error al generar el código QR');
    }
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
