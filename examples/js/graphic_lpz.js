/*
*
* AUTHOR: José Antonio López López
* GITHUB: https://github.com/JoseAntonioLpz
* REPOSITORY: https://github.com/JoseAntonioLpz/lpzJS
* LICENSE: MIT
* 
*/
(function(){

	var all = document.getElementsByTagName('canvas');

	for(let canvas of all){
		switch(canvas.className){
			case 'graphic_bar_lpz':
				graphicBar(canvas);
				break;
			case 'circle_lpz':
				circle(canvas);
				break;
			case 'graphic_lpz':
				graphic(canvas);
				break;		
		}
	}

}());

function graphic(canvas){
	let cvx = canvas.getContext('2d');

	let cHeight = canvas.height;
	let cWidth = canvas.width;

	cvx.clearRect(0, 0, cWidth, cHeight);

	let data = JSON.parse(canvas.dataset.json);
	let title = (canvas.dataset.title != undefined) ? canvas.dataset.title : '';
	let color = (canvas.dataset.color != undefined) ? canvas.dataset.color : 'blue';

	let values = [];
	data.forEach(function(object){
		values.push(object.value);
	});

	let maxVal = Math.max(...values);

	cvx.beginPath();
	cvx.strokeStyle = "black";
	cvx.moveTo(25,10);
	cvx.lineTo(25, cHeight - 15);
	cvx.lineTo(cWidth, cHeight - 15);
	cvx.stroke();

	cvx.beginPath();
	cvx.font = "10px Arial";
	cvx.fillText(maxVal, 0 , 20);

	cvx.beginPath();
	cvx.font = "10px Arial";
	cvx.fillText(maxVal / 2, 0 , (cHeight - 15)/ 2);

	cvx.beginPath();
	cvx.font = "10px Arial";
	cvx.fillText(0, 0 , cHeight - 15);

	cvx.beginPath();
	cvx.fillText(title, 30 , 20);

	let x = 25;
	let lx = 25;
	let lh = (cHeight - 15) - (((data[0].value * (cHeight - 15)) / maxVal) - 15);

	let sep = (canvas.dataset.sep != undefined) ? canvas.dataset.sep : '55';

	data.forEach(function(object){

		let calcPos = (cHeight - 15) - (((object.value * (cHeight - 15)) / maxVal) - 15);

		cvx.beginPath();
		cvx.fillStyle = color;
		cvx.arc(x, calcPos, 3, 0, 2 * Math.PI, true);
		cvx.fill();

		cvx.beginPath();
		cvx.strokeStyle = color;
		cvx.moveTo(lx,lh);
		cvx.lineTo(x, calcPos);
		cvx.stroke();

		cvx.beginPath();
		cvx.fillStyle = "black";
		cvx.font = "10px Arial";
		cvx.fillText(object.name, x, cHeight);

		lx = x;
		lh = calcPos;
		x += parseInt(sep);
	});
}

function circle(canvas){
	let cvx = canvas.getContext('2d');

	let cHeight = canvas.height;
	let cWidth = canvas.width;

	cvx.clearRect(0, 0, cWidth, cHeight);

	let data = JSON.parse(canvas.dataset.json);
	let title = (canvas.dataset.title != undefined) ? canvas.dataset.title : '';

	var sum = 0; // La suma de todos lso values es el 100% que corresponde con 2 * Math.PI
	data.forEach(function(object){
		sum += parseInt(object.value);
	});

	let sAngle = 0;
	let eAngle = 0;

	let cont = 1;
	data.forEach(function(object){
		let percent = (( object.value * 100) / sum);
		eAngle += ((percent * 2) / 100) * Math.PI;

		cvx.beginPath();
		cvx.moveTo(cWidth / 2.5, cHeight / 2.5);
		cvx.fillStyle = object.color;
		cvx.arc(cWidth / 2.5,cHeight / 2.5, cWidth / 2.5, sAngle, eAngle, false);
		cvx.fill(); 
		cvx.save();

		sAngle = eAngle;

		cvx.beginPath();
		cvx.fillRect(cWidth - 65, -9 + (12 * cont), 10, 10);
		cvx.fillStyle = "black";
		cvx.font = "10px Arial";
		cvx.fillText(object.name, cWidth - 50, 0 + (12 * cont));
		cvx.restore();

		cont++;
	});

	cvx.beginPath();
	cvx.fillStyle = "black";
	cvx.font = "10px Arial";
	cvx.fillText(title, 0, cHeight - 20);
}

function graphicBar(canvas){

	let cvx = canvas.getContext('2d');
	
	let cWidth = canvas.width;
	let cHeight = canvas.height;
	
	cvx.clearRect(0, 0, cWidth, cHeight);

	let title = (canvas.dataset.title != undefined) ? canvas.dataset.title : '';

	cvx.fillStyle = "black";
	cvx.font = "10px Arial";
	cvx.fillText(title, 25 , 12);

	cvx.beginPath();
	cvx.moveTo(0,0);
	if(canvas.dataset.lline == undefined || canvas.dataset.lline == '1')
		cvx.lineTo(0, cHeight - 15);
	else
		cvx.moveTo(0, cHeight - 15);

	if(canvas.dataset.bline == undefined || canvas.dataset.bline == '1')
		cvx.lineTo(cWidth, cHeight - 15);
	
	cvx.strokeStyle = (canvas.dataset.bcolor != undefined) ? canvas.dataset.bcolor : "black";
	cvx.stroke();

	let data = JSON.parse(canvas.dataset.json);
	let values = [];

	let cont_val = 0;

  	data.forEach(function(object){
    	values.push(object.value);
    	cont_val++;
  	});

	let maxVal = Math.max(...values);
	let initialH = 1;
	let initialRest = maxVal;
	let rest = maxVal / 4;

	cvx.beginPath();
	for (var i = 0; i < 4; i++) {

		cvx.moveTo(0,initialH);

		cvx.lineTo(cWidth, initialH);
		cvx.lineWidth = 1;
		cvx.strokeStyle = "#e1e1e1";
		cvx.stroke();

		cvx.fillStyle = "#e1e1e1";
		cvx.font = "10px Arial";
		cvx.textAlign = 'center';

		cvx.fillText(initialRest, 10, initialH + 12);

		initialRest -= rest;
		initialH += ((cHeight - 15) / 4);
	}
	cvx.closePath();

	let calc_min_max =  (cWidth / cont_val) - 10;
  	let min = (canvas.dataset.min != undefined) ? canvas.dataset.min : calc_min_max;
  	let max = (canvas.dataset.max != undefined) ? canvas.dataset.max : calc_min_max;

	let calc_sep = (cWidth / cont_val) - max;
  	let sep = (canvas.dataset.sep != undefined) ? parseInt(canvas.dataset.sep) : calc_sep;

	let cut = ((cWidth - (sep * (data.length + 1))) / data.length);

	if(min > cut){
		cut = parseInt(min);
	}else if(max < cut){
		cut = parseInt(max);
	};

	let possAct = sep;

	let color = (canvas.dataset.color != undefined) ? canvas.dataset.color : 'blue';
	let valcol = (canvas.dataset.valcol != undefined) ? canvas.dataset.valcol : 'white';

	cvx.beginPath();
	data.forEach(function(object){
		let height = (object.value * (cHeight - 15)) / maxVal;

		cvx.fillStyle = color;
		cvx.fillRect(possAct, (cHeight - 15)- height, cut, height);

		cvx.fillStyle = "black";
		cvx.font = "10px Arial";
		cvx.textAlign = 'center';
		let name = (canvas.dataset.sbs != undefined) ? object.name.substring(0,parseInt(canvas.dataset.sbs)) : object.name;
		cvx.fillText(name, possAct + (cut / 2) , cHeight - 5);
		cvx.save();

		cvx.fillStyle = valcol;
		cvx.font = "10px Arial";
		cvx.textAlign = 'center';
		cvx.fillText(object.value, possAct + (cut / 2), cHeight - height);
		cvx.restore();

		possAct = possAct + cut + sep;
	});
	cvx.closePath();
}