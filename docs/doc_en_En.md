# Documentation

[![License](img/license-mit.svg)](https://www.mit.edu/~amini/LICENSE.md)
[![npm version](img/npm.svg)](https://www.npmjs.com/package/@joseantoniolpz/lpzjs)

[Example of use](https://joseantoniolpz.github.io/lpzJS/examples)

The development of lpzJS is non-profit, however you can evaluate to donate if the project help you. This gesture help us a lot.
[Donate for the project](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QVT9FUB3ABCJS&source=url)

This library is in a early stage of his development, if you find a bug, please tell us for fixed it.

If you do a new funcionality or improve some of the current, maybe, you are interesented in add to the repository, you are free to do or not. If you do, you help this project and someone that need it.

Until now, this library support:

- [Graph](#graph)
- [Progress Bar](#barras-de-progreso)
- [Timer](#temporizador)
- [Navigation utilities](#navegación)

## Instalation

You can install this library downloading this repository and importing the JS files in your project, also you can download the repository via *npm* by:

- Command line:
```BASH
npm install @joseantoniolpz/lpzjs@1.0.4
```

- A file **package.json**
```JSON
{
	"dependencies": {
		"@joseantoniolpz/lpzjs": "1.0.4"
	}
}

```

A folder will be downloaded called *node-modules*.

_optionally_: Extract the JS files and import in your project, later, delete the rest of the folder to save space in your project.

## Graph

You can draw different types of graphics using this library:

- [Bar graph](#bar-graph)
- [Circle graph](#circle-graph)
- [Lineal graph](#gráficas-lineales)

### Bar graph

For create a bar graph, you will need to add a element **canvas** with the class *graphic_bar_lpz* in your HTML document, we recommended to establish a widht and height that suits yours needs.

For draw the graph, we have to pass a JSON, for that, we use the atribute *data-json*, the structure is as follow:

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

We can pass aditional atributes for customize our graph, this is the optional atributes:

- data-min -> Set the minimun width of the bars (by default *20*).
- data-max -> Set the maximun width of the bars (by default *30*).
- data-sep -> Set the separation between the bars (by default *10*).
- data-color -> Set the bars' color (by default *blue*).
- data-valcol -> Set the value's color (by default *white*).
- data-title -> Set a title to the graph (by default *empty*).

Here an example of a complete canvas element:
```html
<canvas class='graphic_bar_lpz' width='500' height='300' data-json='[{"name":"January","value":100},
{"name":"Febrary","value":300},{"name":"March","value":200},{"name":"April","value":200},
{"name":"May","value":400},{"name":"June","value":200},{"name":"July","value":200},
{"name":"August","value":200},{"name":"September","value":200},{"name":"October","value":350},
{"name":"November","value":200},{"name":"December","value":200}]' data-min='20' data-max='30' 
data-sep='10' data-color='blue' data-valcol='white' data-title='Cherries per square meter'></canvas>
```

### Circle graph

Coming soon
