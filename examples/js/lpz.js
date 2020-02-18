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

	var nav = document.getElementById('nav_lpz');
	if(nav){
		latNav(nav);
	}

	var but = document.getElementById('top_but_lpz');
	if(but){
		topBut(but);
	}

	var mbut = document.getElementById('multi_but_lpz');
	if(mbut){
		multiBut(mbut);
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
	cvx.fillStyle = (canvas.dataset.cfont != undefined) ? canvas.dataset.cfont : 'black';
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

function latNav(nav){
	
	nav.style.width = (nav.dataset.width != undefined) ? nav.dataset.width : screen.width * 0.75 + 'px';
 	nav.style.height = screen.height + 'px';
 	nav.style.margin = '0';
 	nav.style.border = '1px solid black';
 	nav.style.position = 'fixed';
	nav.style.left = (-1) * screen.width + 'px';
 	nav.style.top = '0px';
 	nav.style.backgroundColor = (nav.dataset.cnav != undefined) ? nav.dataset.cnav : 'white';
 	nav.style.boxShadow = '0 8px 16px 0 rgba(0,0,0,0.2)';

 	var llogo = document.getElementsByClassName('logo_lpz');
 	for (let logo of llogo) {
 		logo.style.backgroundColor = (logo.dataset.clogo != undefined) ? logo.dataset.clogo : 'white';
	 	logo.style.width = '100%';
	 	logo.style.height = '150px';
	 	logo.style.backgroundImage = "url('" + logo.dataset.img + "')";
    	logo.style.backgroundRepeat = "no-repeat";
    	logo.style.backgroundPosition = "center center";
    	logo.style.backgroundSize = "cover";
 	}
 	
 	var sup = document.getElementsByClassName('sup_lpz');
 	for (let elem of sup) {
	    elem.style.width = '100%';
	    elem.style.height = 'auto';
	    elem.style.borderBottom = '1px solid black';
	}

 	var inf = document.getElementsByClassName('inf_lpz');
 	for (let elem of inf) {
	    elem.style.width = '100%';
	    elem.style.height = 'auto';
	}

	var la = nav.getElementsByTagName('a');
    for(let a of la){
		a.style.display = 'block';
		a.style.height = '40px';
		a.style.borderBottom = '1px solid black';
		a.style.lineHeight = '40px';
		a.style.paddingLeft = (nav.dataset.sep != undefined) ? nav.dataset.sep : '10px';
		a.style.textDecoration = 'none';
		a.style.color = (nav.dataset.fcolor != undefined) ? nav.dataset.fcolor : 'blue';

		a.addEventListener("mouseover", function(){
			this.style.backgroundColor = (nav.dataset.chover != undefined) ? nav.dataset.chover : 'white';
		});

		a.addEventListener("mouseout", function(){
			this.style.backgroundColor = (nav.dataset.cnav != undefined) ? nav.dataset.cnav : 'white';
		});
    }

    var close = document.getElementById('close_lpz');

    //close.style.position = 'absolute';
    //close.style.left = '0';
    close.style.backgroundImage = "url('" + close.dataset.img + "')";
    close.style.backgroundRepeat = "no-repeat";
    close.style.backgroundPosition = "center center";
    close.style.backgroundSize = "contain";
    close.style.width = (close.dataset.width != undefined) ? close.dataset.width : '50px';
    close.style.height = (close.dataset.height != undefined) ? close.dataset.height : '50px';

    close.addEventListener('click', function(){
    	var pos = 0;
    	var id = setInterval(function(){pos = openAnimation(nav, pos, (-1) * screen.width, id, false)}, 1);

    	pos = openAnimation(nav, pos, (-1) * screen.width, id, false);
    });

    var open = document.getElementById('open_lpz');

    open.style.backgroundImage = "url('" + open.dataset.img + "')";
    open.style.backgroundRepeat = "no-repeat";
    open.style.backgroundPosition = "center center";
    open.style.backgroundSize = "contain";
    open.style.width = (open.dataset.width != undefined) ? open.dataset.width : '50px';
    open.style.height = (open.dataset.height != undefined) ? open.dataset.height : '50px';

    open.addEventListener('click', function(){
    	var pos = (-1) * screen.width;
    	var id = setInterval(function(){pos = openAnimation(nav, pos, 0, id, true)}, 1);

    	pos = openAnimation(nav, pos, 0, id, true);

    });
}

function openAnimation(elem, pos, posF, id, op) {
	let res = (op) ? 35 : -20;
	pos = pos + res;

	if ((op && pos >= posF) || (!op && pos <= posF)) {
	  	elem.style.left = posF + 'px';
	  	clearInterval(id);
	} else {
	  	elem.style.left = pos + 'px';
	}

	return pos;
}

function topBut(but){

	but.style.width = (but.dataset.width != undefined) ? but.dataset.width : '50px';
	but.style.height = (but.dataset.width != undefined) ? but.dataset.width : '50px';
	but.style.backgroundColor = (but.dataset.color) ? but.dataset.color : 'orange';
	but.style.position = 'fixed';
	but.style.bottom = (but.dataset.posy != undefined) ? but.dataset.posy : '20px';
	but.style.right = (but.dataset.posx != undefined) ? but.dataset.posx : '20px';
	but.style.borderRadius = '50%';
	but.style.boxShadow = '0 8px 16px 0 rgba(0,0,0,0.2)';

	but.style.backgroundImage = "url('" + but.dataset.img + "')";
    but.style.backgroundRepeat = "no-repeat";
    but.style.backgroundPosition = "center center";
    but.style.backgroundSize = "contain";

	but.addEventListener('click', function(){
		var posAct = window.scrollY;
		var vel = (but.dataset.vel != undefined) ? but.dataset.vel : 150;
		var id = setInterval(function(){posAct = scrollTopAnimate(posAct, id, vel)}, 1);

		posAct = scrollTopAnimate(posAct, id, vel);
	});
}

function scrollTopAnimate(posAct, id, vel){
	posAct = posAct - vel;
	if(posAct <= 0){
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	  	clearInterval(id);
	}else{
		document.body.scrollTop = posAct;
		document.documentElement.scrollTop = posAct;
	}
	return posAct;
}

function multiBut(but){
	but.style.width = (but.dataset.width != undefined) ? but.dataset.width : '50px';
	but.style.height = (but.dataset.width != undefined) ? but.dataset.width : '50px';
	but.style.backgroundColor = (but.dataset.color) ? but.dataset.color : 'orange';
	but.style.position = 'fixed';
	but.style.bottom = (but.dataset.posy != undefined) ? but.dataset.posy : '20px';
	but.style.right = (but.dataset.posx != undefined) ? but.dataset.posx : '20px';
	but.style.borderRadius = '50%';
	but.style.boxShadow = '0 8px 16px 0 rgba(0,0,0,0.2)';

	but.style.backgroundImage = "url('" + but.dataset.img + "')";
    but.style.backgroundRepeat = "no-repeat";
    but.style.backgroundPosition = "center center";
    but.style.backgroundSize = "contain";

    but.dataset.click = true;

    var al = but.getElementsByTagName('a');

    var pos = 60;
    for(a of al){
    	a.style.position = 'absolute';
    	a.style.bottom = '-100px';
    	a.style.right = '5px';
    	a.style.display = 'block';
    	a.style.width = '40px';
    	a.style.height = '40px';
    	a.style.borderRadius = '50%';
    	a.style.backgroundColor = (but.dataset.color) ? but.dataset.color : 'orange';
    	a.style.boxShadow = '0 8px 16px 0 rgba(0,0,0,0.2)';
    	a.dataset.pos = pos;
    	pos += 50;

    	a.style.backgroundImage = "url('" + a.dataset.img + "')";
	    a.style.backgroundRepeat = "no-repeat";
	    a.style.backgroundPosition = "center center";
	    a.style.backgroundSize = "contain";
    }

    but.addEventListener('click', function(){
    	console.log('click');
    	if(but.dataset.click == 'true'){
    		but.dataset.click = 'false';
    		for(a of al){
	    		a.style.bottom = a.dataset.pos + 'px';
		    }
    	}else{
    		but.dataset.click = 'true';
    		for(a of al){
	    		a.style.bottom = '-100px';
		    }
    	}
    });
}