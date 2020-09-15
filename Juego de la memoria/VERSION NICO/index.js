let intentos = 0;

const colours = ['20c997', 'e83e8c', '28a745', '6c757d', 'ffc107', '6f42c1', 'dc143c', 'fd7e14'];

const load = () => {
	intentos = 0;
	document.querySelector("#score").innerHTML = "Cantidad de intentos: " + intentos;
	
	let boardsize = colours.length / 2; //El tablero sera de YxY, siendo Y la mitad de los colores
	let gameboard = document.querySelector("#gameboard"); //Selecciono el tablero
	
	gameboard.innerHTML = "";
	
	let gamecolours = colours.concat(colours); //Creo una variable del 2ble de colores
	
	let buttons_code = "";
	
	let fila = boardsize;
	///////////////////////// esto no entendi
	for(i = 0; i < (boardsize * boardsize); i++) { //creo todos los casilleros		
		fila = fila % boardsize;
		
		if(fila == 0) {
			buttons_code += "<section class='filas'>"; //abro la seccion de la fila
		}
	
		
		let index = Math.floor(Math.random() * gamecolours.length); //selecciono un color aleatorio
		
		//creo el boton del casillero
		buttons_code += "<button id='btn" + i + "'type='button' data-colour='" + gamecolours[index] + "' class='button button-closed'></button>";
		
		gamecolours.splice(index, 1); //Borro el color ya usado		
		
		fila++;
		if (fila == boardsize) {
			buttons_code += "</section>"; //cierro la seccion de la fila
		}
	}
	/////////////////////////
	
	//inserto el codigo del tablero
	gameboard.innerHTML = buttons_code;	
	
	//a cada boton le genero el evento
	document.querySelectorAll('.button').forEach(button => {
		button.addEventListener('click', event => {
			buttonClick(event.target);
		})
	});   
}

const buttonClick = (sender) => {
	//si el boton esta cerrado
	if(sender.classList.contains('button-closed')) {
		//compruebo que haya menos de 2 abiertos
		let opened = document.querySelectorAll('.button-opened').length;
		if(opened < 2) {
			sender.style.backgroundColor = "#" + sender.dataset.colour;
			sender.classList.remove('button-closed');
			sender.classList.add('button-opened');
			
			if(opened == 1) {
				intentos++;
				document.querySelector("#score").innerHTML = "Cantidad de intentos: " + intentos;
				
				let buttons = document.querySelectorAll('.button-opened');
				if(buttons[0].dataset.colour == buttons[1].dataset.colour) {
					setTimeout(function(){ 
						buttons[0].classList.remove('button-opened');
						buttons[1].classList.remove('button-opened');
						buttons[0].classList.add('hidden');
						buttons[1].classList.add('hidden');
						
						let restantes = document.querySelectorAll('.button-closed').length;
						if(restantes == 0) {
							alert("Has terminado el juego en " + intentos + " intentos!");
							load();
						}
					}, 500);
				} else {					
					setTimeout(function(){ 
						buttons[0].classList.remove('button-opened');
						buttons[1].classList.remove('button-opened');						
						buttons[0].classList.add('button-closed');
						buttons[1].classList.add('button-closed');
						buttons[0].style.backgroundColor = "#FFFFFF";
						buttons[1].style.backgroundColor = "#FFFFFF";
					}, 750);
				}
			}
		}
	}
}