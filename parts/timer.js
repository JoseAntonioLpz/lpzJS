(function(){
	function index(){
		var all = document.getElementsByTagName('canvas');

		for(let canvas of all){
			switch(canvas.className){
				case 'timer_lpz':
					timer(canvas);
					break;		
			}
		}
	}
	index();
	setInterval(index,1000);
}());

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
