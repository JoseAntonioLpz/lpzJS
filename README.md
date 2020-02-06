# Documentación

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

## Instalación

Puedes descargar esta libreria descargando este repositorio directamente desde github e importando los archivos js que vayas a utilizar en tu proyecto, tambien puedes descargarte el repositorio usando *npm* mediante la siguiente linea de comandos:

- Desde linea de comandos:
```BASH
npm install @joseantoniolpz/lpzjs@1.0.4
```

- Desde un archivo **package.json**
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

- data-min -> establece la anchura mínima de las barras (Por defecto *20*).
- data-max -> establece la anchura máxima de la barras (Por defecto *30*).
- data-sep -> establece la separación entre barras (Por defecto *10*).
- data-color -> establece el color de las barras (Por defecto *blue*).
- data-valcol -> establece el color de los valores (Por defecto *white*).
- data-title -> establece un título para la gráfica (Por defecto *vacío*).

Aquí un ejemplo de un elemento canvas completo:
```html
<canvas class='graphic_bar_lpz' width='500' height='300' data-json='[{"name":"Enero","value":100},
{"name":"Febrero","value":300},{"name":"Marzo","value":200},{"name":"Abril","value":200},
{"name":"Mayo","value":400},{"name":"Junio","value":200},{"name":"Julio","value":200},
{"name":"Agosto","value":200},{"name":"Septiembre","value":200},{"name":"Octubre","value":350},
{"name":"Noviembre","value":200},{"name":"Diciembre","value":200}]' data-min='20' data-max='30' 
data-sep='10' data-color='blue' data-valcol='white' data-title='cerezas por metro cuadrado'></canvas>
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

Puedes dibujar diferentes tipos de gráficas usando esta librería:

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

- data-bulk -> establece el grosor de la circunferencia (Por defecto *5*).
- data-color -> establece el color de la barra (Por defecto *blue*).
- data-mostrate -> establece la manera de visualizar los resultados, pueden tomar los siguientes valores (Por defecto *0*).
	- 0 -> Muestra el texto y el porcentaje
	- 1 -> Muestra el porcentaje
	- 2 -> Muestra el texto
	- 3 -> No muestra nada
- data-font -> establece la fuente del texto (Por defecto *10px Arial*).

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

Para crear una barra de progreso semi-circular basta con añadir un elemento **canvas** a nuestros HTML y dándole la clase **timer_lpz**, para una correcta visualización recomendamos darle un widht y un height que se adapte a nuestras necesidades.

Para pintar la barra debemos pasarle un porcentaje y un texto, para ello usaremos:

- data-time -> Debemos pasarle una fecha en formato yyyy-MM-dd (Ejemplo 2020-11-24).

Podemos pasarle datos adicionales al canvas para personalizarlo a nuestro gusto, estos campos son opcionales:

- data-format -> establece el formate de salido de los datos (Por defecto *0*).
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
- data-vel -> Establece la velocidad de la animación de la acción (Por defecto 150).
- data-img -> Establece la imagen de fondo de nuestro botón.

Podemos colocar nuestro botón en la pantalla usando los siguiente atributos (Teniendo en cuenta que la posicion 0,0 es la esquina inferior derecha):
- data-posx -> Posicion en el eje X de la pantalla (Por defecto: 20px).
- data-posy -> Posicion en el eje Y de la pantalla (Por defecto: 20px).

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

- data-posx -> Posicion en el eje X de la pantalla (Por defecto: 20px).
- data-posy -> Posicion en el eje Y de la pantalla (Por defecto: 20px).

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
