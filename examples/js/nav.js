(function(){
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
    open.style.width = '50px';
    open.style.height = '50px';

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
	but.style.width = '50px';
	but.style.height = '50px';
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