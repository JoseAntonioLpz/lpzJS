(function(){
	var nav = document.getElementById('nav_lpz');
	if(nav){
		latNav(nav);
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
 	nav.style.backgroundColor = nav.dataset.cnav;

 	var llogo = document.getElementsByClassName('logo_lpz');
 	for (let logo of llogo) {
 		logo.style.backgroundColor = nav.dataset.clogo;
	 	logo.style.width = '100%';
	 	logo.style.height = '150px';
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

	var la = document.getElementsByTagName('a');
    for(let a of la){
		a.style.display = 'block';
		a.style.height = '40px';
		a.style.borderBottom = '1px solid black';
		a.style.lineHeight = '40px';
		a.style.paddingLeft = '10px';
		a.style.textDecoration = 'none';

		a.addEventListener("mouseover", function(){
			this.style.backgroundColor = nav.dataset.chover;
		});

		a.addEventListener("mouseout", function(){
			this.style.backgroundColor = nav.dataset.cnav;
		});
    }

    var close = document.getElementById('close_lpz');

    close.style.position = 'absolute';
    close.style.left = '0';
    close.style.backgroundImage = "url('" + close.dataset.img + "')";
    close.style.width = '50px';
    close.style.height = '50px';
    close.style.backgroundRepeat = "no-repeat";
    close.style.backgroundPosition = "center center";
    close.style.backgroundSize = "contain";

    var open = document.getElementById('open_lpz');

    open.style.backgroundImage = "url('" + open.dataset.img + "')";
    open.style.width = '50px';
    open.style.height = '50px';
    open.style.backgroundRepeat = "no-repeat";
    open.style.backgroundPosition = "center center";
    open.style.backgroundSize = "contain";

    open.addEventListener('click', function(){
    	var pos = (-1) * screen.width;
    	var id = setInterval(frame, 1);
    	function frame() {
		    if (pos >= 0) {
		    	nav.style.left = '0px';
		      	clearInterval(id);
		    } else {
		      	pos = pos + 20;
		      	nav.style.left = pos + 'px';
		    }
		  }
    });

    close.addEventListener('click', function(){
    	var pos = 0;
    	var id = setInterval(frame, 1);
    	function frame() {
		    if (pos <= (-1) * screen.width) {
		      	nav.style.left = (-1) * screen.width + 'px';
		      	clearInterval(id);
		    } else {
		      	pos = pos - 20;
		      	nav.style.left = pos + 'px';
		    }
		  }
    });
}
