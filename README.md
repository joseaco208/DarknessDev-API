
text
# DarknessDev API

![GitHub](https://img.shields.io/github/license/joseaco208/DarknessDev-API)
![GitHub issues](https://img.shields.io/github/issues/joseaco208/DarknessDev-API)
![GitHub forks](https://img.shields.io/github/forks/joseaco208/DarknessDev-API)
![GitHub stars](https://img.shields.io/github/stars/joseaco208/DarknessDev-API)

## Descripción

La **DarknessDev API** es una API RESTful desarrollada en **Node.js** que proporciona una serie de servicios útiles para desarrolladores y usuarios. Esta API permite realizar conversiones de colores, timestamps, diferencias de fechas, unidades de medida y texto a código morse. Su diseño modular y fácil de usar la convierte en una herramienta valiosa para cualquier aplicación que requiera estas funcionalidades.

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
- [Despliegue en Render](#despliegue-en-render)

## Características

- Conversión de códigos hexadecimales a nombres de colores.
- Conversión de timestamps Unix a un formato legible.
- Cálculo de la diferencia en días entre dos fechas.
- Conversión de unidades de medida.
- Conversión de texto a código morse.
- Listado de unidades disponibles.

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

Para instalar y configurar el proyecto, sigue estos pasos:

1. **Clona el repositorio** en tu máquina local:
   ```bash
   git clone https://github.com/joseaco208/DarknessDev-API.git

Navega al directorio del proyecto:
bash
cd DarknessDev-API

Instala las dependencias necesarias utilizando npm:
bash
npm install express color color-namer moment convert-units morse dotenv

Uso
Para iniciar el servidor localmente, utiliza el siguiente comando en la raíz de tu proyecto:
bash
node index.js

El servidor se ejecutará en http://localhost:3000. Puedes acceder a los diferentes endpoints utilizando herramientas como Postman, Insomnia o simplemente a través de tu navegador.
Endpoints
1. Conversión de Códigos Hexadecimales a Nombres de Colores
Ruta: /color?hex=
Método: GET
Parámetro: hex (ejemplo: FF5733)
Respuesta: Devuelve el nombre del color en español.
2. Conversión de Timestamp Unix a Tiempo Formateado
Ruta: /timestamp?unix=
Método: GET
Parámetro: unix (ejemplo: 60)
Respuesta: Devuelve un string formateado que muestra el tiempo en días, horas, minutos y segundos.
3. Diferencia de Días Entre Fechas
Ruta: /datediff?date1=&date2=
Método: GET
Parámetros: date1, date2 (ejemplo: 2023-01-01)
Respuesta: Devuelve la diferencia en días entre las dos fechas.
4. Conversión de Unidades
Ruta: /convertirunidad?valor=&de=&a=
Método: GET
Parámetros: valor, de, a (ejemplo: 10, metros, pies)
Respuesta: Devuelve la cantidad convertida a la unidad de destino.
5. Conversión de Texto a Código Morse
Ruta: /morse?text=
Método: GET
Parámetro: text (ejemplo: Hola)
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
Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.
Despliegue en Render
Para desplegar la DarknessDev API en Render, sigue estos pasos:
Fork del repositorio: Ve a la página del repositorio en GitHub y haz clic en "Fork" para crear una copia en tu cuenta.
Crea una cuenta en Render: Si no tienes una cuenta, regístrate en Render.
Conecta tu cuenta de GitHub: En Render, ve a "Dashboard" y selecciona "New" > "Web Service".
Selecciona tu fork: Elige tu fork de la DarknessDev API en la lista de repositorios.
Configura el servicio:
Nombre del servicio: Asigna un nombre a tu servicio.
Región: Elige la región donde deseas desplegar tu servicio.
Tipo de servicio: Selecciona "Node".
Comando de inicio: Especifica el comando para iniciar la API, que debe ser:
bash
node index.js

Variables de entorno: Si tu aplicación utiliza un archivo .env, asegúrate de agregar las variables de entorno necesarias en la sección correspondiente de Render.
Despliega tu servicio: Haz clic en "Create Web Service". Render comenzará a construir y desplegar tu API.
Accede a tu API: Una vez que el despliegue esté completo, Render te proporcionará una URL donde podrás acceder a tu API.
Contacto
Si tienes alguna pregunta o sugerencia, no dudes en contactarme a través de Discord: darknessdev.
¡Gracias por usar la DarknessDev API! Si tienes alguna pregunta o sugerencia, no dudes en abrir un issue en el repositorio.
