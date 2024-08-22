
# API de DarknessDev

![GitHub](https://img.shields.io/github/license/tu-usuario/tu-repositorio)
![GitHub issues](https://img.shields.io/github/issues/tu-usuario/tu-repositorio)
![GitHub forks](https://img.shields.io/github/forks/tu-usuario/tu-repositorio)
![GitHub stars](https://img.shields.io/github/stars/tu-usuario/tu-repositorio)

## Descripción

La **API de DarknessDev** es una API RESTful desarrollada en **Node.js** que proporciona una serie de servicios útiles para desarrolladores y usuarios. Esta API permite realizar conversiones de colores, timestamps, diferencias de fechas, unidades de medida y texto a código morse. Su diseño modular y fácil de usar la convierte en una herramienta valiosa para cualquier aplicación que requiera estas funcionalidades.

## Índice

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Uso](#uso)
- [Endpoints](#endpoints)
- [Ejemplos de Uso](#ejemplos-de-uso)
- [Manejo de Errores](#manejo-de-errores)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

## Características

- **Conversión de Códigos Hexadecimales a Nombres de Colores**: Convierte códigos hexadecimales en nombres de colores en español.
- **Conversión de Timestamps Unix a Formato Legible**: Transforma timestamps Unix en un formato que muestra días, horas, minutos y segundos.
- **Cálculo de Diferencia de Días Entre Fechas**: Calcula la diferencia en días entre dos fechas proporcionadas.
- **Conversión de Unidades de Medida**: Permite la conversión entre diferentes unidades de medida (longitud, masa, volumen, etc.).
- **Conversión de Texto a Código Morse**: Convierte cualquier texto en su representación en código morse.
- **Listado de Unidades Disponibles**: Proporciona una lista completa de unidades que pueden ser utilizadas para la conversión.

## Tecnologías

Esta API está construida utilizando las siguientes tecnologías:

- **Node.js**: Entorno de ejecución para JavaScript en el lado del servidor.
- **Express**: Framework web para Node.js que facilita la creación de aplicaciones y APIs.
- **Color**: Paquete para manipular y convertir colores.
- **Color-Namer**: Paquete que permite obtener el nombre de un color a partir de su código hexadecimal.
- **Moment**: Biblioteca para el manejo de fechas y tiempos en JavaScript.
- **Convert-Units**: Paquete para realizar conversiones entre diferentes unidades de medida.
- **Morse**: Paquete que convierte texto a código morse.
- **Dotenv**: Paquete para cargar variables de entorno desde un archivo `.env`.

## Instalación

Para instalar las dependencias necesarias, sigue estos pasos:

1. Clona el repositorio en tu máquina local:
   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git

Navega al directorio del proyecto:
bash
cd tu-repositorio

Instala las dependencias necesarias utilizando npm:
bash
npm install

Uso
Para iniciar el servidor, utiliza el siguiente comando en la raíz de tu proyecto:
bash
node index.js

El servidor se ejecutará en http://localhost:3000. Puedes acceder a los diferentes endpoints utilizando herramientas como Postman, Insomnia o simplemente a través de tu navegador.
Endpoints
1. Conversión de Códigos Hexadecimales a Nombres de Colores
Ruta: /color?hex=
Método: GET
Parámetro:
hex: (string) Código hexadecimal del color (ejemplo: FF5733).
Respuesta: Devuelve el nombre del color en español.
2. Conversión de Timestamp Unix a Tiempo Formateado
Ruta: /timestamp?unix=
Método: GET
Parámetro:
unix: (integer) Timestamp Unix en segundos (ejemplo: 60).
Respuesta: Devuelve un string formateado que muestra el tiempo en días, horas, minutos y segundos.
3. Diferencia de Días Entre Fechas
Ruta: /datediff?date1=&date2=
Método: GET
Parámetros:
date1: (string) Primera fecha en formato ISO (ejemplo: 2023-01-01).
date2: (string) Segunda fecha en formato ISO (ejemplo: 2024-08-21).
Respuesta: Devuelve la diferencia en días entre las dos fechas.
4. Conversión de Unidades
Ruta: /convertirunidad?valor=&de=&a=
Método: GET
Parámetros:
valor: (number) Cantidad a convertir (ejemplo: 10).
de: (string) Unidad de origen (ejemplo: metros).
a: (string) Unidad de destino (ejemplo: pies).
Respuesta: Devuelve la cantidad convertida a la unidad de destino.
5. Conversión de Texto a Código Morse
Ruta: /morse?text=
Método: GET
Parámetro:
text: (string) Texto a convertir a código morse (ejemplo: Hola).
Respuesta: Devuelve el texto en su representación en código morse.
6. Unidades Disponibles
Ruta: /unidades
Método: GET
Respuesta: Devuelve una lista de todas las unidades disponibles para la conversión.
Ejemplos de Uso
Obtener el nombre de un color:
text
GET /color?hex=FF5733

Convertir un timestamp Unix:
text
GET /timestamp?unix=60

Calcular la diferencia de días:
text
GET /datediff?date1=2023-01-01&date2=2024-08-21

Convertir unidades:
text
GET /convertirunidad?valor=10&de=metros&a=pies

Convertir texto a código morse:
text
GET /morse?text=Hola

Manejo de Errores
La API maneja errores comunes y devuelve mensajes claros. Algunos ejemplos de errores que puedes encontrar son:
Parámetro faltante: Si no se proporciona un parámetro requerido, la API devolverá un mensaje indicando que el parámetro es necesario.
Código hexadecimal inválido: Si se proporciona un código hexadecimal no válido, la API devolverá un mensaje de error correspondiente.
Fechas inválidas: Si las fechas proporcionadas no están en el formato correcto o no son válidas, se devolverá un mensaje de error.
Contribuciones
Las contribuciones son bienvenidas. Si deseas contribuir a este proyecto, por favor sigue estos pasos:
Haz un fork del repositorio.
Crea una nueva rama (git checkout -b feature/nueva-funcionalidad).
Realiza tus cambios y haz commit (git commit -m 'Añadir nueva funcionalidad').
Envía tu rama (git push origin feature/nueva-funcionalidad).
Abre un Pull Request.
Licencia
Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles. ¡Gracias por usar la API de DarknessDev! Si tienes alguna pregunta o sugerencia, no dudes en abrir un issue en el repositorio.
text

### Notas

- Asegúrate de reemplazar `tu-usuario` y `tu-repositorio` con tu nombre de usuario y el nombre del repositorio en los enlaces de los badges.
- Personaliza cualquier sección según las características específicas de tu API y tu estilo de documentación.
- Puedes agregar más detalles o secciones según sea necesario, como "FAQ" o "Roadmap" si planeas agregar más funcionalidades en el futuro.

