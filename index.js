require('dotenv').config(); 
const express = require('express');
const Color = require('color');
const colorNamer = require('color-namer');
const moment = require('moment');

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
    // Agrega más traducciones según sea necesario
};

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
    `);
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
        res.send(`Diferencia de días: ${diffInDays} días`);
    } catch (error) {
        res.status(400).send('Fechas inválidas');
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
