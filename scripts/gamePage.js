miniGame.pages['gamePage'] = (function(model, screens, graphics, input) {
	var keyboard = input.Keyboard(),
		cancelNextRequest = false,
		lastTimeStamp = performance.now();

	//------------------------------------------------------------------
	//
	// All one-time game page initialization is performed here.
	function initialize() {
		console.log('game initializing...');

		keyboard.registerCommand(KeyEvent.DOM_VK_ESCAPE, function() {
			//
			// Stop the game loop by canceling the request for the next animation frame
			cancelNextRequest = true;
			//
			// Then, return to the main menu
			screens.showScreen('menuPage');
		});
	}

	//------------------------------------------------------------------
	//
	// Input is procesed here.
	//
	//------------------------------------------------------------------
	function processInput(elapsedTime) {
		keyboard.update(elapsedTime);
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
		graphics.clear();
		model.render();
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
