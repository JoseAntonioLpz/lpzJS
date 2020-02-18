$(document).ready(function(){

	//CREATE A NEW CANVAS
	$.ajax({
		method: "GET",
  		url: "http://localhost:8079/proyectos/pruebas/lpzJS/examples/j.json",
		dataType: "json"
	}).done(function(data){
		console.log(data);
		var string = "<canvas id='pp' class='circle_lpz' width='300' height='300' data-json='" + JSON.stringify(data) + "' data-title='cerezas por metro cuadrado'></canvas>";
		let canvas = $(string);
		$("#top_but_lpz").before(canvas);
		canvas = document.getElementById('pp');
		circle(canvas);
	}).fail(function(){
		console.log("fail");
	});

	//UPDATE CANVAS
	$.ajax({
		method: "GET",
  		url: "http://localhost:8079/proyectos/pruebas/lpzJS/examples/u.json",
		dataType: "json"
	}).done(function(data){
		$('#circle').attr('data-json', JSON.stringify(data));
		console.log($('#circle').data('json'));
		let canvas = document.getElementById('circle');
		console.log(canvas);
		circle(canvas);
	}).fail(function(){
		console.log("fail");
	});
	
	$.ajax({
		method: "GET",
  		url: "http://localhost:8079/proyectos/pruebas/lpzJS/examples/j.json",
		dataType: "json"
	}).done(function(data){
		console.log(data);
		var string = "<canvas id='pp' class='circle_lpz' width='300' height='300' data-json='" + JSON.stringify(data) + "' data-title='cerezas por metro cuadrado'></canvas>";
		let canvas = $(string);
		$("#top_but_lpz").before(canvas);
		canvas = document.getElementById('pp');
		circle(canvas);
	}).fail(function(){
		console.log("fail");
	});

});