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
	
	let cWidth = (canvas.dataset.widthbar != 'auto') ? canvas.dataset.widthbar : parent_width;
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
	let parent_width = canvas.parentElement.clientWidth;
	let ajustW = 25;
	let ajustH = 10;
	
	let cWidth = (canvas.dataset.widthbar != 'auto') ? canvas.dataset.widthbar : parent_width;
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

			    	//node.style.position = "absolute";
					node.style.backgroundColor = 'rgba(255,255,255,0.8)';
					node.style.border = '1px solid #bebebe';
					node.style.textAlign = 'center';
					node.style.borderRadius = '5px';
					node.style.padding= '7px';
					node.style.fontWeight = 'bold';

					canvas.parentElement.appendChild(node);

					if(canvas.dataset.popabs != undefined || canvas.dataset.popabs == "false"){
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