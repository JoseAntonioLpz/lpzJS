# Documentación 1.1.0

[![License](img/license-mit.svg)](https://www.mit.edu/~amini/LICENSE.md)
[![npm version](img/npm.svg)](https://www.npmjs.com/package/@joseantoniolpz/lpzjs)
[![languje](img/js.svg)](https://www.javascript.com/)
[![donate](img/donate.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QVT9FUB3ABCJS&source=url)

[Ejemplo de uso](https://joseantoniolpz.github.io/lpzJS/examples)

El desarrollo de lpzJS es sin animo de lucro, no obstante considere donar si el proyecto le ha ayudado en el desarrollo de su aplicación, nos ayudaría muchisimo.
[Donar al proyecto](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QVT9FUB3ABCJS&source=url)
	
Esta librería aún se encuentra en una fase temprana de su desarrollo, si encuentras algún error por favor comunicanoslo para 
solucionarlo lo mas tempranamente posible.

Si añades una funcionalidad nueva o mejoras alguna ya existente tal vez te interese agregarla al repositorio, eres libre de hacerlo o no. Haciendolo ayudarías a este proyecto y a las personas que necesiten usarlo.

Hasta el momento esta librería da soporte para:

- [Gráficas](#gráficas)
- [Barras de progreso](#barras-de-progreso)
- [Temporizadores](#temporizador)
- [Utilidades de navegación](#navegación)
- [¿Como usar Ajax?](#ajax)

## Instalación

Puedes instalar esta libreria descargando este repositorio directamente e importando los archivos js que vayas a utilizar en tu proyecto, tambien puedes descargarte el repositorio usando *npm* mediante:

- Línea de comandos:
```BASH
npm install @joseantoniolpz/lpzjs@1.0.4
```

- Un archivo **package.json**
```JSON
{
	"dependencies": {
		"@joseantoniolpz/lpzjs": "1.0.4"
	}
}

```

Se le descargará en una carpeta llamada *node-modules*. 

_opcionalmente_: Extraiga de ella los js necesarios e importelos en su proyecto luego elimine el resto de la carpeta para ahorrar espacio en su proyecto.

## Gráficas

Puedes dibujar diferentes tipos de gráficas usando esta librería:

- [Gráficas de barras](#gráficas-de-barras)
- [Gráficas circulares](#gráficas-circulares)
- [Gráficas de lineales](#gráficas-lineales)

### Gráficas de barras

Para crear una gráfica de barras basta con añadir un elemento **canvas** a nuestros HTML y dándole la clase *graphic_bar_lpz*, para una correcta visualización recomendamos darle un widht y un height que se adapte a nuestras necesidades.

Para pintar la gráfica debemos pasarle un JSON, para ello usaremos data-json, la estructura del JSON es la siguiente:

```
	[
		{
			"name": "{string}",
			"value": {int}
		},
		{
			"name": "{string}",
			"value": {int}
		}, 
		... 
		{
			"name": "{string}",
			"value": {int}
		}
	]
```	

Podemos pasarle datos adicionales al canvas para personalizarlo a nuestro gusto, estos campos son opcionales:

- data-min -> Establece la anchura mínima de las barras (Por defecto se calcula automaticamente).
- data-max -> Establece la anchura máxima de la barras (Por defecto se calcula automaticamente).
- data-sep -> Establece la separación entre barras (Por defecto se calcula automaticamente).
- data-color -> Establece el color de las barras (Por defecto *blue*).
- data-valcol -> Establece el color de los valores (Por defecto *white*).
- data-title -> Establece un título para la gráfica (Por defecto *vacío*).
- data-sbs -> Establece los caracteres máximos de los nombres de las columnas.
- data-bcolor -> Establece el color de las lineas delimitadoras (Por defecto *black*).
- data-lline -> Si vale 1 se visualiza la linea derecha, si vale 0 no (Por defecto *1*).
- data-bline -> Si vale 1 se visualiza la linea inferior, si vale 0 no (Por defecto *1*).

Aquí un ejemplo de un elemento canvas completo:
```html
<canvas class='graphic_bar_lpz' width='500' height='300' data-json='[{"name":
"Enero","value":100},{"name":"Febrero","value":300},{"name":"Marzo","value":200}
,{"name":"Abril","value":200},{"name":"Mayo","value":400},{"name":"Junio",
"value":200}]' data-min='20' data-max='40' data-sep="15" data-color='blue' 
data-valcol='white' data-title='Cerezas por metro cuadrado' data-bcolor='red' 
data-lline='1' data-bline='1' data-sbs="6"></canvas>

<canvas class='graphic_bar_lpz' width='500' height='300' data-json='[{"name":
"Enero","value":100},{"name":"Febrero","value":300},{"name":"Marzo","value":200},
{"name":"Abril","value":200},{"name":"Mayo","value":400},{"name":"Junio","value":200}]'
 data-color='green' data-valcol='white' data-title='Cerezas por metro cuadrado' 
 data-bcolor='red' data-lline='0' data-sbs="20"></canvas>
```

### Gráficas circulares

Para crear una gráfica circular basta con añadir un elemento **canvas** a nuestros HTML y dándole la clase **circle_lpz**, para una correcta visualización recomendamos darle un widht y un height que se adapte a nuestras necesidades, teniendo en cuenta que vamos a dibujar una grárfica circular, deberíamos de usar un canvas cuadrado (dandole el mismo valor al widht y al height).

Para pintar la gráfica debemos pasarle un JSON, para ello usaremos data-json, la estructura del JSON es la siguiente:

```
	[
		{
			"name": "{string}",
			"value": {int},
			"color": "{string}"
		},
		{
			"name": "{string}",
			"value": {int},
			"color": "{string}"
		}, 
		... 
		{
			"name": "{string}",
			"value": {int},
			"color": "{string}"
		}
	]
```	

Podemos pasarle datos adicionales al canvas para personalizarlo a nuestro gusto, estos campos son opcionales:

- data-title -> establece un título para la gráfica (Por defecto *vacío*).

Aquí un ejemplo de un elemento canvas completo:	

```html
<canvas class='circle_lpz' width='300' height='300' data-json='[{"name":"Enero","value":400, 
"color": "red"},{"name":"Febrero","value":300, "color": "blue"},{"name":"Marzo","value":200, 
"color": "green"},{"name":"Abril","value":200, "color": "yellow"},{"name":"Mayo","value":333, 
"color": "orange"}]' data-title='cerezas por metro cuadrado'></canvas>
```
### Gráficas lineales

Para crear una gráfica circular basta con añadir un elemento **canvas** a nuestros HTML y dándole la clase **graphic_lpz**, para una correcta visualización recomendamos darle un widht y un height que se adapte a nuestras necesidades.

Para pintar la gráfica debemos pasarle un JSON, para ello usaremos data-json, la estructura del JSON es la siguiente:

```
	[
		{
			"name": "{string}",
			"value": {int}
		},
		{
			"name": "{string}",
			"value": {int}
		}, 
		... 
		{
			"name": "{string}",
			"value": {int}"
		}
	]
```	

Podemos pasarle datos adicionales al canvas para personalizarlo a nuestro gusto, estos campos son opcionales:

- data-sep -> establece la separación entre barras (Por defecto *10*).
- data-color -> establece el color de las barras (Por defecto *blue*).
- data-title -> establece un título para la gráfica (Por defecto *vacío*).

Aquí un ejemplo de un elemento canvas completo:	

```html
<canvas class='graphic_lpz' width='500' height='200' data-json='[{"name":"Enero","value":100},
{"name":"Febrero","value":300},{"name":"Marzo","value":200},{"name":"Abril","value":200},
{"name":"Mayo","value":400},{"name":"Junio","value":200},{"name":"Julio","value":500},
{"name":"Agosto","value":150}]' data-sep='55' data-title='cerezas por metro cuadrado'
 data-color='blue'></canvas>
```

## Barras de progreso

Puedes dibujar diferentes tipos de barras de progreso usando esta librería:

- [Barras de progreso lineales](#barras-de-progreso-lineales)
- [Barras de progreso circulares](#barras-de-progreso-circulares)
- [Barras de progreso semi-circulares](#barras-de-progreso-semi-circulares)

### Barras de progreso lineales

Para crear una barra de progreso lineal basta con añadir un elemento **canvas** a nuestros HTML y dándole la clase **progress_bar_lpz**, para una correcta visualización recomendamos darle un widht y un height que se adapte a nuestras necesidades (Se recomienda un height pequeño).

Para pintar la barra debemos pasarle un porcentaje y un texto, para ello usaremos:

- data-percent -> Debemos pasarle un número entero (Ejemplo 25).
- data-text -> Debemos pasarle un cadena (Ejemplo Fuerza).

Podemos pasarle datos adicionales al canvas para personalizarlo a nuestro gusto, estos campos son opcionales:

- data-ctext -> establece el color del texto (Por defecto *black*).
- data-color -> establece el color de la barra (Por defecto *cyan*).
- data-cpercent -> establece el color del porcentaje (Por defecto *black*).
- data-font -> establece la fuente del texto (Por defecto *10px Arial*).

Aquí un ejemplo de un elemento canvas completo:

```html
<canvas class='progress_bar_lpz' width='200' height='20' data-text='Fuerza' data-percent='25' 
data-color='green' data-ctext='white' data-cpercent='black' data-font='10px Arial'></canvas>
```

### Barras de progreso circulares

Para crear una barra de progreso circular basta con añadir un elemento **canvas** a nuestros HTML y dándole la clase **progress_circle_lpz**, para una correcta visualización recomendamos darle un widht y un height que se adapte a nuestras necesidades, teniendo en cuanta que deberiamos usar un canvas cuadrado (mismo width y height).

Para pintar la barra debemos pasarle un porcentaje y un texto, para ello usaremos:

- data-percent -> Debemos pasarle un número entero (Ejemplo 60).
- data-text -> Debemos pasarle un cadena (Ejemplo Fuerza).

Podemos pasarle datos adicionales al canvas para personalizarlo a nuestro gusto, estos campos son opcionales:

- data-bulk -> Establece el grosor de la circunferencia (Por defecto *5*).
- data-color -> Establece el color de la circunferencia (Por defecto *blue*).
- data-cfont -> Establece el color de la fuente (Por defecto *black*).
- data-mostrate -> Establece la manera de visualizar los resultados, pueden tomar los siguientes valores (Por defecto *0*).
	- 0 -> Muestra el texto y el porcentaje
	- 1 -> Muestra el porcentaje
	- 2 -> Muestra el texto
	- 3 -> No muestra nada
- data-font -> Establece la fuente del texto (Por defecto *10px Arial*).

Aquí un ejemplo de un elemento canvas completo:

```html
<canvas class='progress_circle_lpz' width='100' height='100' data-text='Fuerza' 
data-percent='60' data-color='red' data-font='20px Arial' data-bulk='5' data-mostrate='1'></canvas>
```

### Barras de progreso semi-circulares

Para crear una barra de progreso semi-circular basta con añadir un elemento **canvas** a nuestros HTML y dándole la clase **progress_half_circle_lpz**, para una correcta visualización recomendamos darle un widht y un height que se adapte a nuestras necesidades, teniendo en cuanta que deberiamos usar un canvas cuadrado (mismo width y height).

Para pintar la barra debemos pasarle un porcentaje y un texto, para ello usaremos:

- data-percent -> Debemos pasarle un número entero (Ejemplo 60).
- data-text -> Debemos pasarle un cadena (Ejemplo Fuerza).

Podemos pasarle datos adicionales al canvas para personalizarlo a nuestro gusto, estos campos son opcionales:

- data-bulk -> establece el grosor de la circunferencia (Por defecto *5*).
- data-color -> establece el color de la barra (Por defecto *blue*).
- data-cfont -> Establece el color de la fuente (Por defecto *black*).
- data-mostrate -> establece la manera de visualizar los resultados, pueden tomar los siguientes valores (Por defecto *0*).
	- 0 -> Muestra el texto y el porcentaje
	- 1 -> Muestra el porcentaje
	- 2 -> Muestra el texto
	- 3 -> No muestra nada
- data-font -> establece la fuente del texto (Por defecto *10px Arial*).

Aquí un ejemplo de un elemento canvas completo:

```html
<canvas class='progress_half_circle_lpz' width='100' height='100' data-text='Fuerza' 
data-percent='60' data-color='red' data-font='12px Arial' data-bulk='5' data-mostrate='2'></canvas>
```

## Temporizador

Para crear un temporizador basta con añadir un elemento **canvas** a nuestros HTML y dándole la clase **timer_lpz**, para una correcta visualización recomendamos darle un widht y un height que se adapte a nuestras necesidades.

Para pintar el temporizador debemos pasarle una fecha, para ello usaremos:

- data-time -> Debemos pasarle una fecha en formato yyyy-MM-dd (Ejemplo 2020-11-24).

Podemos pasarle datos adicionales al canvas para personalizarlo a nuestro gusto, estos campos son opcionales:

- data-format -> establece el formato de salida de los datos (Por defecto *0*).
	- 0 -> Muestra los datos añadiendo los dias. (Ejemplo 345 days 15:26:08).
	- 1 -> Muestra los datos sin los dias. (Ejemplo 2158:26:08).
- data-font -> establece la fuente del texto (Por defecto *10px Arial*).

Aquí un ejemplo de un elemento canvas completo:


```html
<canvas class='timer_lpz' width='200' height='50' data-time='2020-11-24' 
data-font='20px Bangers' data-format='0'></canvas>
```

## Navegación

lpzJS brinda diferentes utilidades para la navegación de nuestro sitio:

- [Menú desplegable](#menú-desplegable)
- [Botón to Top](#botón-top)
- [Botón múltiple](#botón-múltiple)

### Menú desplegable

Para crear un menú desplegable basta con añadir un elemento **div** a nuestros HTML con el *id*: **nav_lpz**.

Podemos personalizar nuestro menú desplegable usando los siguiente atributos:

- data-width -> Establece la anchura de nuestro Menú (Por defecto el *75%* de la pantalla).
- data-cnav -> Establece el color de fondo de nuestro Menú (Por defecto *white*).
- data-chover -> Establece el color para cuando se hace hover sobre un elemento (Por defecto *white*).
- data-sep -> Establece la separación izquierda de los elementos del Menú (Por defecto *10px*).
- data-fcolor -> Establece la fuente de color de los elementos (Por defecto *blue*).

Dentro de este div damos soporte para añadir otros 3 divs diferentes dandoles las siguientes *clases*:

- logo_lpz -> Pensado para la parte superior del menú, podemos personalizar nuestro logo con los siguientes atributos:
	- data-clogo -> Establece el color de fondo de nuestro logo.
	- data-img -> Establece un imagen de fondo para nuestro logo.
- sup_lpz -> Pensado para la parte intermedia del menú, aqui meteremos nuestros enlaces.
- inf_lpz -> Pensado para la parte inferior del menú, aqui meteremos nuestros enlaces.

Para abrir y cerrar el menú se usan dos elementos, de cualquier tipo (recomendado *div*), que tengan los siguientes *id*:

- open_lpz -> Abre el Menú desplegable.
	- data-img -> Establece una imagen de fondo para nuestro botón.
	- data-width -> Establece el ancho de nuestro botón (Por defecto *50px*).
	- data-height -> Establece la altura de nuestro botón (Por defecto *50px*).
- close_lpz -> Cierra el Menú desplegable.
	- data-img -> Establece una imagen de fondo para nuestro botón.
	- data-width -> Establece el ancho de nuestro botón (Por defecto *50px*).
	- data-height -> Establece la altura de nuestro botón (Por defecto *50px*).	

Podemos colocar estos botones donde queramos en nuestro DOM.

Es muy normal que los elementos de los Menús desplegables tengan iconos, podemos agregarles iconos usando selectores CSS, aqui os dejamos un ejemplo de como hacerlo:

```css
/* ESTABLECE UN ICONO DE FONT AWESOME PARA TODOS LOS ELEMENTOS DEL MENÚ */
#nav_lpz a{
	position: relative;
}

#nav_lpz a:before{
	font-family: FontAwesome;
	content:"\f007";
	position: absolute;
	left: 2px;
}
```

Aquí un ejemplo de un Menú completo:

```html
<div id="nav_lpz" data-width="300px" data-cnav="white" data-chover="#aeea7c" 
data-sep="15px" data-fcolor="black">
		<div class="logo_lpz" data-clogo="#aeea7c" data-img='images/flor.jpg'>
			<div id="close_lpz" data-img='images/equis.png' data-width='50px' 
			data-height='50px'></div>
		</div>
		<div class="sup_lpz">
			<a href="#">Enlace 1</a>
			<a href="#">Enlace 2</a>
			<a href="#">Enlace 3</a>
		</div>
		<div class="inf_lpz">
			<a href="#">Enlace 4</a>
			<a href="#">Enlace 5</a>
		</div>
	</div>

	<div id="open_lpz" data-img='images/open.png' data-width='50px' 
	data-height='50px'></div>
```

### Botón to Top

Podemos crear un boton para navegar a la parte superior de nuestra web con un elemento **div** dandole el siguiente *id*: *top_but_lpz*, podemos personalizar el boton con los siguiente atributos:

- data-color -> Establece el color del boton (Por defecto *orange*).
- data-width -> Establece la anchura de nuestro botón, al ser circular tambien establece el alto (Por defecto *50px*).
- data-vel -> Establece la velocidad de la animación de la acción (Por defecto *150*).
- data-img -> Establece la imagen de fondo de nuestro botón.

Podemos colocar nuestro botón en la pantalla usando los siguiente atributos (Teniendo en cuenta que la posicion 0,0 es la esquina inferior derecha):
- data-posx -> Posicion en el eje X de la pantalla (Por defecto: *20px*).
- data-posy -> Posicion en el eje Y de la pantalla (Por defecto: *20px*).

Aquí un ejemplo de un Menú completo:

```html
<div id="top_but_lpz" data-color="blue" data-width='50px' data-vel='150' 
data-img='images/paloma.png' data-posx='100px' data-posy='20px'></div>
```

### Botón múltiple

Podemos crear un botón múltiple (al pulsarlo aparecen mas botones en nuestra pantalla) usando un elemento **div** y dandole el *id*: *multi_but_lpz*, una vez creado el div debemos crear elementos hijos del tipo *a*.

Podemos personalizar nuestro botón con los siguiente atributos:

- data-width -> Establece la anchura de nuestro botón, al ser circular tambien establece el alto (Por defecto *50px*).
- data-color -> Establece el color del boton (Por defecto *orange*).
- data-img -> Establece la imagen de fondo de nuestro botón.

Podemos colocar nuestro botón en la pantalla usando los siguiente atributos (Teniendo en cuenta que la posicion 0,0 es la esquina inferior derecha):

- data-posx -> Posicion en el eje X de la pantalla (Por defecto: *20px*).
- data-posy -> Posicion en el eje Y de la pantalla (Por defecto: *20px*).

Podemos establecer imagenes de fondo para nuestros enlaces usando el atributo:

- data-img -> Establece la imagen de fondo de nuestro botón.

Aquí un ejemplo de un Menú completo:

```html
<div id="multi_but_lpz" data-color="green" data-img='images/paloma.png' 
data-posx='20px' data-posy='20px'>
	<a href="#" data-img='images/paloma.png'></a>
	<a href="#" data-img='images/open.png'></a>
	<a href="#" data-img='images/equis.png'></a>
</div>
```

## AJAX

Podemos crear y actualizar nuestros objetos canvas usando AJAX:

Por ahora soporta (Se añadirá soporte para el resto pronto):

- graphic.js
- graphic.min.js
- lpz.js (Solo parte de graphic)
- lpz.min.js (Solo parte de graphic)

Para crear un nuevo elemento, debemos de hacer una petición AJAX y obtener un JSON con la estructura adecuada (Mirar documentación del elemento), una vez obtenido debemos insertar desde JS/JQuery un nuevo elemento canvas (Se recomienda darle un ID diferente para posterior selección) concatenandole el JSON en data-json, teniendo en cuenta que hay que transformar este JSON a cadena usando la función *JSON.stringify*, luego sólo quedaría llamar a la función correspondiente. A continuación ponemos un ejemplo de como sería el codigo completo:

```JavaScript
// EJEMPLO EN JQUERY

// Crear un nuevo objeto Canvas a traves de AJAX

$.ajax({
	method: "GET",
	url: "http://localhost:8079/proyectos/pruebas/lpzJS/examples/j.json",
	dataType: "json"
}).done(function(data){
	var string = "<canvas id='pp' class='circle_lpz' width='300' height='300' data-json='" + JSON.stringify(data) + "' data-title='cerezas por metro cuadrado'></canvas>";
	let canvas = $(string); // Se crea el canvas
	$("#top_but_lpz").before(canvas); // Se inserta el canvas en el DOM
}).fail(function(){
	console.log("fail");
}).always(function(){
	let canvas = document.getElementById('pp'); // Aunque usemos Jquery, seleccionar el elemento con JS, nos evitará problemas
	circle(canvas); // llamar a la función de pintado
});
```

Para actualizar un elemento, debemos de hacer una petición AJAX y obtener un JSON con la estructura adecuada (Mirar documentación del elemento), una vez obtenido debemos actualizar el atributo *data-json* desde JS/JQuery (Se recomienda haberle dado a nuestro canvas un ID para seleccionarlo), teniendo en cuenta que hay que transformar este JSON a cadena usando la función *JSON.stringify*, luego sólo quedaría llamar a la función correspondiente. A continuación ponemos un ejemplo de como sería el codigo completo:

```JavaScript
// Actualizar un objeto Canvas a traves de AJAX

$.ajax({
	method: "GET",
	url: "http://localhost:8079/proyectos/pruebas/lpzJS/examples/u.json",
	dataType: "json"
}).done(function(data){
	$('#circle').attr('data-json', JSON.stringify(data)); //Actualizar campo json-data
}).fail(function(){
	console.log("fail");
}).always(function(){
	let canvas = document.getElementById('circle'); // Aunque usemos Jquery, seleccionar el elemento con JS, nos evitará problemas
	circle(canvas); // llamar a la función de pintado
});
```
Aquí listamos las funciones para los diferentes tipos canvas:

- Graphics:
	- Gráficas: graphic(canvas);
	- Gráficas de barras: graphicBar(canvas);
	- Gráficas circulares: circle(canvas);
- ProgressBar: Proximamente