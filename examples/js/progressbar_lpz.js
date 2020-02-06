(function(){

	var all = document.getElementsByTagName('canvas');

	for(let canvas of all){
		switch(canvas.className){
			case 'progress_bar_lpz':
				progressBar(canvas);
				break;
			case 'progress_circle_lpz':
				progressCircle(canvas, 2, false);
				break;
			case 'progress_half_circle_lpz':
				progressCircle(canvas, -1, true);
				break;			
		}
	}

}());

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