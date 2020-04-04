miniGame.pages['menuPage'] = (function(screens) {

	function initialize() {
		//
		// Setup each of menu events for the screens
		document.getElementById('id-new-game').addEventListener(
			'click',
			function() {screens.showScreen('gamePage'); });

		document.getElementById('id-high-scores').addEventListener(
			'click',
			function() { screens.showScreen('page-highscores'); });

		document.getElementById('id-help').addEventListener(
			'click',
			function() { screens.showScreen('page-help'); });

		document.getElementById('id-about').addEventListener(
			'click',
			function() { screens.showScreen('page-about'); });
	}

	function run() {
		//
		// I know this is empty, there isn't anything to do.
	}

	return {
		initialize : initialize,
		run : run
	};
}(miniGame.screens));