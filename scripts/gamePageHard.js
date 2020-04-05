miniGame.pages['gamePageHard'] = (function(model, screens, graphics, input) {
    var keyboard = input.Keyboard(),
        mouse = input.Mouse(),
		cancelNextRequest = false,
        lastTimeStamp = performance.now(),
        canvas = document.getElementById("canvas-main"),
        context = canvas.getContext('2d'),
        tile = {
            x: 0,
            y: 0,
            imageSRC: "",
        },
        image,
        tiles = [];

	//------------------------------------------------------------------
	//
	// All one-time game page initialization is performed here.
	function initialize() {
        imgNum = -1;
        //console.log(context.canvas.width, context.canvas.height);
        
        for(let i=0; i<4; i++){
            for(let j=0; j<4; j++){
                imgNum += 1;
                tile = {x:j*160, y:i*160, imageSRC:'images/Tile128-'+imgNum+'.png'};
                tiles.push(tile);
            }
        }

        //console.log(tiles);

		keyboard.registerCommand(KeyEvent.DOM_VK_ESCAPE, function() {
			//
			// Stop the game loop by canceling the request for the next animation frame
			cancelNextRequest = true;
			//
			// Then, return to the main menu
			screens.showScreen('menuPage');
		});
    }
    
    function drawTile(tileOBJ) {
        //console.log(tileOBJ);

        let image = new Image();
        image.src = tileOBJ.imageSRC;
        image.src = tileOBJ.imageSRC;

        context.save();

        context.drawImage(
            image,
            tileOBJ.x,
            tileOBJ.y,
            160, 160);
        
        context.beginPath();
        context.lineWidth = '3';
        context.strokeStyle = 'white';
        context.rect(tileOBJ.x, tileOBJ.y, 160, 160);
        context.stroke();
        
        context.restore();
    }
        
    // function drawBoard() {
    //     for (let row = 0; row < length; row++) {
    //         for (let col = 0; col < length; col++) {
    //             if (board[row][col].index !== -1) {
    //                 graphics.drawTile({
    //                     x: board[row][col].x,
    //                     y: board[row][col].y
    //                 },
    //                 board[row][col].image,
    //                 board[row][col].w);
    //             }
    //         }
    //     }
    // }

	//------------------------------------------------------------------
	//
	// Input is procesed here.
	//
	//------------------------------------------------------------------
	function processInput(elapsedTime) {
        keyboard.update(elapsedTime);
        mouse.update(elapsedTime);
		model.processInput(elapsedTime);
	}

	//------------------------------------------------------------------
	//
	// The game model is updated here.
	//
	//------------------------------------------------------------------
	function update(elapsedTime) {
		model.update(elapsedTime);
	}

	//------------------------------------------------------------------
	//
	// The game model is rendered here.
	//
	//------------------------------------------------------------------
	function render() {
		//graphics.clear();
        //model.render();

        for(let i=0;i<tiles.length-1;i++){
            drawTile(tiles[i]);
        }
	}

	//------------------------------------------------------------------
	//
	// This is the Game Loop function!
	//
	//------------------------------------------------------------------
	function gameLoop(time) {
		var elapsedTime = time - lastTimeStamp;

		processInput(elapsedTime);
		update(elapsedTime);
		lastTimeStamp = time;

		render();

		//
		// Cancel the next animation if the user has pressed the ESC key, returning them
		// to the main menu.
		if (!cancelNextRequest) {
			requestAnimationFrame(gameLoop);
		}
	}

	function run() {
		model.initialize();
		lastTimeStamp = performance.now();
		//
		// Start the animation loop
		cancelNextRequest = false;
		requestAnimationFrame(gameLoop);
	}

	return {
		initialize : initialize,
		run : run
	};
}(miniGame.model, miniGame.screens, miniGame.graphics, miniGame.input));
