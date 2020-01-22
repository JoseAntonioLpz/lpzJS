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
			case 'progress_bar_lpz':
				progressBar(canvas);
				break;
			case 'progress_circle_lpz':
				progressCircle(canvas, 2, false);
				break;
			case 'progress_half_circle_lpz':
				progressCircle(canvas, -1, true);
				break;
			case 'timer_lpz':
				timer(canvas);
				setInterval(indexTimer,1000);
				break;					
		}
	}

}());

function indexTimer(){
	var all = document.getElementsByClassName('timer_lpz');
	for(let canvas of all){
		timer(canvas);	
	}
}

function graphic(canvas){
	let cvx = canvas.getContext('2d');

	let cHeight = canvas.height;
	let cWidth = canvas.width;

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
		cvx.moveTo(canvas.width / 2.5,canvas.height / 2.5);
		cvx.fillStyle = object.color;
		cvx.arc(canvas.width / 2.5,canvas.height / 2.5, canvas.width / 2.5, sAngle, eAngle, false);
		cvx.fill(); 
		cvx.save();

		sAngle = eAngle;

		cvx.beginPath();
		cvx.fillRect(canvas.width - 65, -9 + (12 * cont), 10, 10);
		cvx.fillStyle = "black";
		cvx.font = "10px Arial";
		cvx.fillText(object.name, canvas.width - 50, 0 + (12 * cont));
		cvx.restore();

		cont++;
	});

	cvx.beginPath();
	cvx.fillStyle = "black";
	cvx.font = "10px Arial";
	cvx.fillText(title, 0, canvas.height - 20);
}

function graphicBar(canvas){

	let cvx = canvas.getContext('2d');
	
	let cWidth = canvas.width;
	let cHeight = canvas.height;
	let title = (canvas.dataset.title != undefined) ? canvas.dataset.title : '';

	cvx.fillStyle = "black";
	cvx.font = "10px Arial";
	cvx.fillText(title, 10 , 10);

	cvx.beginPath();
	cvx.moveTo(0,0);
	cvx.lineTo(0, cHeight - 15);
	cvx.lineTo(cWidth, cHeight - 15);
	cvx.stroke();

	let data = JSON.parse(canvas.dataset.json);
	let values = [];

	data.forEach(function(object){
		values.push(object.value);
	});

	let sep = (canvas.dataset.sep != undefined) ? parseInt(canvas.dataset.sep) : 10;
	let maxVal = Math.max(...values);
	let cut = ((cWidth - (sep * (data.length + 1))) / data.length);

	let min = (canvas.dataset.min != undefined) ? canvas.dataset.min : 20;
	let max = (canvas.dataset.max != undefined) ? canvas.dataset.max : 30;

	if(min > cut){
		cut = parseInt(min);
	}else if(max < cut){
		cut = parseInt(max);
	};

	let possAct = sep;

	let color = (canvas.dataset.color != undefined) ? canvas.dataset.color : 'blue';
	let valcol = (canvas.dataset.valcol != undefined) ? canvas.dataset.valcol : 'white';

	data.forEach(function(object){
		let height = (object.value * (cHeight - 15)) / maxVal;

		cvx.fillStyle = color;
		cvx.fillRect(possAct, (cHeight - 15)- height, cut, height);

		cvx.fillStyle = "black";
		cvx.font = "10px Arial";
		cvx.fillText(object.name.substring(0,6), possAct , cHeight - 5);
		cvx.save();

		cvx.fillStyle = valcol;
		cvx.font = "10px Arial";
		cvx.textAlign = 'center';
		cvx.fillText(object.value, possAct + (cut / 2), cHeight - height);
		cvx.restore();

		possAct = possAct + cut + sep;
	});
}
function progressCircle(canvas, multiplier, clock){

	let cvx = canvas.getContext('2d');
	let cHeight = canvas.height;
	let cWidth = canvas.width;
	let text = canvas.dataset.text;
	let percent = canvas.dataset.percent;
	let color = (canvas. dataset.color != undefined) ? canvas. dataset.color : 'blue';
	let font = (canvas.dataset.font != undefined) ? canvas.dataset.font : '10px Arial';
	let bulk = (canvas.dataset.bulk != undefined) ? canvas.dataset.bulk : '5';
	let mostrate = (canvas.dataset.mostrate != undefined) ? canvas.dataset.mostrate : '0';

	cvx.beginPath();
	cvx.lineWidth = bulk;
	cvx.strokeStyle = color;
	cvx.arc(cWidth / 2, ((cHeight + parseInt(bulk)) - 10) / 2,(cWidth - 15)/ 2, 0, ((percent * multiplier) / 100) * Math.PI, clock);
	cvx.stroke();

	switch(mostrate){
		case '0':
			text += " " + percent + "%";
			break;
		case '1':
			text = percent + "%";
			break;
		case '2':
			break;
		case '3':
			text = "";
			break;	
		default:
			text += " " + percent + "%";
			console.error('data-mostrate is incorrect. The default value is 0. The value must be 0, 1, 2, 3');
			break; 
	}

	cvx.beginPath();
	cvx.font = font;
	cvx.textAlign = 'center';
	cvx.textBaseline = 'middle';
	cvx.fillText(text, cWidth / 2, cHeight / 2);
}

function progressBar(canvas){

	let cvx = canvas.getContext('2d');
	let cHeight = canvas.height;
	let cWidth = canvas.width;
	let text = canvas.dataset.text;
	let percent = canvas.dataset.percent;
	let color = (canvas. dataset.color != undefined) ? canvas. dataset.color : 'cyan';
	let ctext = (canvas.dataset.ctext != undefined) ? canvas.dataset.ctext : 'black';
	let cpercent = (canvas.dataset.cpercent != undefined) ? canvas.dataset.cpercent : 'black';
	let font = (canvas.dataset.font != undefined) ? canvas.dataset.font : '10px Arial';

	cvx.moveTo(0,0);

	cvx.beginPath();
	cvx.rect(0,0,cWidth,cHeight);
	cvx.stroke();

	cvx.beginPath();
	cvx.fillStyle = color;
	cvx.fillRect(0,0, cWidth * (percent / 100), cHeight);

	cvx.beginPath();
	cvx.font = font;
	cvx.textBaseline = 'middle';
	cvx.fillStyle = ctext;
	cvx.fillText(text, 10, cHeight / 2);

	cvx.beginPath();
	cvx.fillStyle = cpercent;
	cvx.fillText(percent + '%', cWidth - 30, cHeight / 2);
}
function timer(canvas){

	cvx = canvas.getContext('2d');
	
	let cWidth = canvas.width;
	let cHeight =  canvas.height; 
	let font = canvas.dataset.font;
	let format = canvas.dataset.format; 
	let date = Date.parse(canvas.dataset.time);
	let now = Date.now();
	let diff = date - now;


	let sec = Math.floor(diff/1000);
	let min = Math.floor(sec/60);
	sec = sec % 60;
	let hours = Math.floor(min/60);
	min = min % 60;
	if(format == '0'){
		var days = Math.floor(hours/24);
		hours = hours % 24;
	}
	

	sec = (sec.toString().length >= 2) ? sec : '0' + sec.toString();
	min = (min.toString().length >= 2) ? min : '0' + min.toString();
	hours = (hours.toString().length >= 2) ? hours : '0' + hours.toString();

	cvx.clearRect(0, 0, cWidth, cHeight);

	/*cvx.beginPath();
	cvx.rect(0,0,cWidth,cHeight);
	cvx.stroke();*/

	let text = '';
	switch(format){
		case '0':
			text = days + ' days ' + hours + ':' + min + ':' + sec;
			break;
		case '1':
			text = hours + ':' + min + ':' + sec;
			break;
		default:
			text = days + ' days ' + hours + ':' + min + ':' + sec;
			break;	
	}

	cvx.beginPath();
	cvx.font = (font != undefined) ? font : '10px Arial';
	cvx.textBaseline = 'middle';
	cvx.textAlign = 'center';
	cvx.fillText(text, cWidth / 2 , cHeight / 2);
}
