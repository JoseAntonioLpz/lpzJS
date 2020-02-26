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

  window.addEventListener('resize', resizeCanvas, false);

  resizeCanvas();

  function resizeCanvas() {
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
  }

}());

function graphic(canvas){

	let cvx = canvas.getContext('2d');

	let parent_width = canvas.parentElement.clientWidth;
	
	let cWidth = (canvas.dataset.widthbar != 'auto') ? parseInt(canvas.dataset.widthbar) : parent_width;
	canvas.width = cWidth;
	let cHeight = canvas.height;

	cvx.clearRect(0, 0, cWidth, cHeight);

	let data = JSON.parse(canvas.dataset.json);
	let title = (canvas.dataset.title != undefined) ? canvas.dataset.title : '';
	let color = (canvas.dataset.color != undefined) ? canvas.dataset.color : 'blue';

	let values = [];
	let cont_val = 0;
	data.forEach(function(object){
		values.push(object.value);
		cont_val++;
	});

	let maxVal = Math.max(...values);
	maxVal += Math.min(...values);

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

	let calc_sep = (cWidth / cont_val);
  	let sep = (canvas.dataset.sep != undefined) ? parseInt(canvas.dataset.sep) : calc_sep;

  	let rects = [];

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

		let valueText = (object.valueText) ? object.valueText : "";

		rects.push({x:x, y:calcPos, data:valueText});

		lx = x;
		lh = calcPos;
		x += parseInt(sep);
	});
	cvx.closePath();
	if(canvas.dataset.popup === 'false' || canvas.dataset.popup === undefined){
		return;
	}

	canvas.addEventListener('mousemove', function(e){

		var node = document.getElementById('popup'), 
		rect = this.getBoundingClientRect(),
		x = e.clientX - rect.left,
		y = e.clientY - rect.top,
		i = 0, r;

		while(r = rects[i++]) {
		    if((x >= r.x - 3 && x <= r.x + 3) && (y >= r.y - 3 && y <= r.y + 3)){
		    	if(r.data == ""){
		    		if(node){
		    			node.remove();
		    		}
		    		break;
		    	}

		    	if(!node){
		    		node = document.createElement("div");

			    	node.innerHTML = r.data; 
			    	node.id = "popup";
			    	node.dataset.x = x;
			    	node.dataset.y = y;

					node.style.backgroundColor = 'rgba(255,255,255,0.8)';
					node.style.border = '1px solid #bebebe';
					node.style.textAlign = 'center';
					node.style.borderRadius = '5px';
					node.style.padding= '7px';
					node.style.fontWeight = 'bold';

					canvas.parentElement.appendChild(node);

					if(canvas.dataset.popabs != undefined){
			    		node.style.position = "absolute";
			    		document.addEventListener('mousemove', function(el){
		 					node.style.left = (window.event.clientX + 10)+ 'px';
		 					node.style.top = (window.event.clientY + 0)+ 'px';
		 				});
			    	}
			    	break;
		    	}else{
		    		node.innerHTML = r.data;
		    	}
		    }else if(node && ((node.dataset.x <= r.x + 3 && node.dataset.x >= r.x - 3) 
		    	&& (node.dataset.y <= r.y + 3  && node.dataset.y >= r.y - 3))){
		    	node.remove();
		    }
		}
	});
	canvas.addEventListener('mouseout', function(e){
		var node = document.getElementById('popup');
		if(node){
			node.remove();
		}
	});
}

function circle(canvas){
	let cvx = canvas.getContext('2d');

	let parent_width = canvas.parentElement.clientWidth;
	let parent_height = canvas.parentElement.clientHeight;

	/*let cWidth = canvas.width;
	let cHeight = canvas.height;*/

	/*let cWidth = (canvas.dataset.widthbar != 'auto') ? canvas.dataset.widthbar : parent_width;
	canvas.width = cWidth;
	let cHeight = cWidth;
	canvas.height = cHeight;*/

	if(canvas.dataset.widthbar != 'auto'){
		cWidth = canvas.width;
		cHeight = canvas.height;
		canvas.height += 50;
	}else{
		cWidth = parent_width;
		cHeight = cWidth; //para que sea cuadrado
		canvas.width = cWidth;
		canvas.height = cHeight + 50;
	}

	console.log(cWidth);

	cvx.clearRect(0, 0, cWidth, cHeight);

	let data = JSON.parse(canvas.dataset.json);
	let title = (canvas.dataset.title != undefined) ? canvas.dataset.title : '';

	var sum = 0; // La suma de todos los values es el 100% que corresponde con 2 * Math.PI
	data.forEach(function(object){
		sum += parseInt(object.value);
	});

	let sAngle = 0;
	let eAngle = 0;

	let cont = 1;
	let rects = [];
	data.forEach(function(object){
		let percent = (( object.value * 100) / sum);
		eAngle += ((percent * 2) / 100) * Math.PI;

		cx = cWidth / 2;
		cy = cHeight / 2;
		r =  cWidth / 2

		cvx.beginPath();
		cvx.moveTo(cWidth / 2, cHeight / 2);
		cvx.fillStyle = object.color;
		//cvx.arc(cWidth / 2.5,cHeight / 2.5, cWidth / 2.5, sAngle, eAngle, false);
		cvx.arc(cx,cy,r, sAngle, eAngle, false);
		cvx.fill(); 
		//cvx.save();

		rects.push({color:object.color, name:object.name, value:object.value});

		sAngle = eAngle;

		cvx.beginPath();
		//cvx.fillRect(cWidth - 65, -9 + (12 * cont), 10, 10);
		cvx.fillRect(cWidth - 65, (cHeight + 50) - (12 * cont), 10, 10);
		cvx.fillStyle = "black";
		cvx.font = "10px Arial";
		//cvx.fillText(object.name, cWidth - 50, 0 + (12 * cont));
		cvx.fillText(object.name, cWidth - 50, (cHeight + 58) - (12 * cont));
		cvx.restore();

		cont++;
	});

	cvx.closePath();
	if(canvas.dataset.popup === 'false' || canvas.dataset.popup === undefined){
		return;
	}

	canvas.addEventListener('mousemove', function(e){

		var node = document.getElementById('popup'), 
		rect = this.getBoundingClientRect(),
		x = e.clientX - rect.left,
		y = e.clientY - rect.top,
		i = 0, re;

		let imageData = cvx.getImageData(x, y, 1, 1);
		let data = imageData.data;
		let r,g,b;

		for(j = 0, n = data.length; j < n; j += 4) {
			r = data[j];
			g = data[j+1];
			b = data[j+2];
		}

		let hex = rgbToHex([r,g,b]);

		while(re = rects[i++]) {
		    if(re.color == hex){
		    	if(!node){
		    		node = document.createElement("div");

			    	node.innerHTML = re.name + " " + re.value; 
			    	node.id = "popup";
			    	node.dataset.x = x;
			    	node.dataset.y = y;
			    	node.dataset.color = hex;

					node.style.backgroundColor = 'rgba(255,255,255,0.8)';
					node.style.border = '1px solid #bebebe';
					node.style.textAlign = 'center';
					node.style.borderRadius = '5px';
					node.style.padding= '7px';
					node.style.fontWeight = 'bold';

					canvas.parentElement.appendChild(node);

					if(canvas.dataset.popabs != undefined){
			    		node.style.position = "absolute";
			    		document.addEventListener('mousemove', function(el){
		 					node.style.left = (window.event.clientX + 10)+ 'px';
		 					node.style.top = (window.event.clientY + 0)+ 'px';
		 				});
			    	}
			    	break;
		    	}
		    }else if(node && node.dataset.color != hex){
		    	node.remove();
		    }
		}
	});

	canvas.addEventListener('mouseout', function(e){
		var node = document.getElementById('popup');
		if(node){
			node.remove();
		}
	});

	cvx.beginPath();
	cvx.fillStyle = "black";
	cvx.font = "10px Arial";
	cvx.fillText(title, 0, (cHeight + 50));
}

function rgbToHex(arr) {
  return "#" + ((1 << 24) + (arr[0] << 16) + (arr[1] << 8) + arr[2]).toString(16).slice(1);
}

function graphicBar(canvas){

	let cvx = canvas.getContext('2d');
	let parent_width = canvas.parentElement.clientWidth;
	let ajustW = 25;
	let ajustH = 10;
	
	let cWidth = (canvas.dataset.widthbar != 'auto') ? parseInt(canvas.dataset.widthbar) : parent_width;
	canvas.width = cWidth;
	let cHeight = canvas.height;
	
	cvx.clearRect(0, 0, cWidth, cHeight);

	let title = (canvas.dataset.title != undefined) ? canvas.dataset.title : '';

	cvx.fillStyle = "black";
	cvx.font = "10px Arial";
	cvx.fillText(title, 35 , 22);

	cvx.beginPath();
	cvx.moveTo(ajustW,ajustH);
	if(canvas.dataset.lline == undefined || canvas.dataset.lline == '1')
		cvx.lineTo(ajustW, cHeight - 15);
	else
		cvx.moveTo(ajustW, cHeight - 15);

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
	let minVal = Math.min(...values);
	maxVal += minVal
	let initialH = ajustH;
	let initialRest = maxVal;
	let rest = maxVal / 4;

	cvx.beginPath();
	for (var i = 0; i < 4; i++) {

		cvx.moveTo(25,initialH);

		cvx.lineTo(cWidth, initialH);
		cvx.lineWidth = 1;
		cvx.strokeStyle = "#e1e1e1";
		cvx.stroke();

		cvx.fillStyle = "#e1e1e1";
		cvx.font = "10px Arial";
		cvx.textAlign = 'center';

		cvx.fillText(initialRest, ajustH, initialH + 3);

		initialRest -= rest;
		initialH += ((cHeight - ajustH - 15) / 4);
	}
	cvx.closePath();

	let calc_min_max =  (cWidth / cont_val) - 10;
  	let min = (canvas.dataset.min != undefined) ? canvas.dataset.min : calc_min_max;
  	let max = (canvas.dataset.max != undefined) ? canvas.dataset.max : calc_min_max;

	let calc_sep = (cWidth / cont_val) - max;
  	let sep = (canvas.dataset.sep != undefined) ? parseInt(canvas.dataset.sep) : calc_sep;

  	let aj = ajustW / cont_val;

	let cut = ((cWidth - (sep * (data.length + 1))) / data.length);

	if(min > cut){
		cut = parseInt(min) - aj;
	}else if(max < cut){
		cut = parseInt(max) - aj;
	};

	let possAct = sep + ajustW;

	let color = (canvas.dataset.color != undefined) ? canvas.dataset.color : 'blue';
	let valcol = (canvas.dataset.valcol != undefined) ? canvas.dataset.valcol : 'white';
	let cgrad = canvas.dataset.cgrad;

	let rects = [];

	cvx.beginPath();
	data.forEach(function(object){
		let height = (object.value * (cHeight - ajustH - 15)) / maxVal;

		if(cgrad == undefined){
			cvx.fillStyle = color;
		}else{
			grad = cvx.createLinearGradient(0,cHeight,0,0);
			grad.addColorStop(0,cgrad);
			grad.addColorStop(1,color);
			cvx.fillStyle = grad;
		}
		
		cvx.fillRect(possAct, (cHeight - 15)- height, cut, height);

		let valueText = (object.valueText) ? object.valueText : "";

		rects.push({x:possAct, y:(cHeight - 15)- height, w:cut, h:height, data:valueText});

		cvx.fillStyle = "#888888";
		cvx.font = "12px Sans-serif";
		cvx.textAlign = 'center';
		let name = (canvas.dataset.sbs != undefined) ? object.name.substring(0,parseInt(canvas.dataset.sbs)) : object.name;
		cvx.fillText(name, possAct + (cut / 2) , cHeight - 2);
		cvx.save();

		if(canvas.dataset.valvis == "true"){
			cvx.fillStyle = valcol;
			cvx.font = "12px Sans-serif";
			cvx.textAlign = 'center';
			cvx.fillText(object.value, possAct + (cut / 2), cHeight - height);
		}
		
		cvx.restore();

		possAct = possAct + cut + sep;
	});
	cvx.closePath();
	if(canvas.dataset.popup === 'false' || canvas.dataset.popup === undefined){
		return;
	}

	canvas.addEventListener('mousemove', function(e){

		var node = document.getElementById('popup'), 
		rect = this.getBoundingClientRect(),
		x = e.clientX - rect.left,
		y = e.clientY - rect.top,
		i = 0, r;

		while(r = rects[i++]) {
		    var iX = r.x;
		    var fX = r.x + r.w;

		    var iY = r.y;
		    var fY = r.y + r.h;

		    if((x >= iX && x <= fX) && (y >= iY && y <= fY)){
		    	if(r.data == ""){
		    		if(node){
		    			node.remove();
		    		}
		    		break;
		    	}

		    	if(!node){
		    		node = document.createElement("div");

			    	node.innerHTML = r.data; 
			    	node.id = "popup";
			    	node.dataset.x = x;
			    	node.dataset.y = y;

					node.style.backgroundColor = 'rgba(255,255,255,0.8)';
					node.style.border = '1px solid #bebebe';
					node.style.textAlign = 'center';
					node.style.borderRadius = '5px';
					node.style.padding= '7px';
					node.style.fontWeight = 'bold';

					canvas.parentElement.appendChild(node);

					if(canvas.dataset.popabs != undefined){
			    		node.style.position = "absolute";
			    		document.addEventListener('mousemove', function(el){
		 					node.style.left = (window.event.clientX + 10)+ 'px';
		 					node.style.top = (window.event.clientY + 0)+ 'px';
		 				});
			    	}
			    	break;
		    	}else{
		    		node.innerHTML = r.data;
		    	}
		    }else if(node && ((node.dataset.x >= iX && node.dataset.x <= fX) 
		    	&& (node.dataset.y >= iY && node.dataset.y <= fY))){
		    	node.remove();
		    }
		}
	});

	canvas.addEventListener('mouseout', function(e){
		var node = document.getElementById('popup');
		if(node){
			node.remove();
		}
	});
}