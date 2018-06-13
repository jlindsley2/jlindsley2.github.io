var numSticks = null;
document.getElementById("take1").addEventListener("click", function() { bot(1); });
document.getElementById("take2").addEventListener("click", function() { bot(2); });
document.getElementById("take3").addEventListener("click", function() { bot(3); });

// Set up the new game
function newGame() {
	document.getElementById("game-board").style.display = "none";
	document.getElementById("play-again").style.display = "none";
	numSticks = parseInt(prompt("Please input the number of sticks you would like to start with (12-100)"));
	document.getElementById("game-board").style.display = "inline";
	document.getElementById("buttons").style.display = "inline";
	
	while (isNaN(numSticks) || numSticks < 12 || numSticks > 100) {
		numSticks = parseInt(prompt("Invalid input, please give a real number (12-100)"));
	}
	
	document.getElementById("message").innerHTML = "";
	update(0);
}

function update(numTaken) {
	if (numTaken !== 0) {console.log("UPDATE: BOT HAS TAKEN " + numTaken + " STICKS.");}
	numSticks -= numTaken;
	if (numSticks <= 0) {
		wonGame(true);
		return;
	}
	if (numTaken === 0) {
		setTimeout(function() {document.getElementById("message").innerHTML = '<h3>' + numSticks + " sticks remaining</h3><br><br><br><br<br><br><br><br><br>";}, 1000);
	} else if (numSticks !== 0) {
		setTimeout(function() {document.getElementById("message").innerHTML = '<h3>' + numSticks + " sticks remaining</h3><br><br><br> Opponent picked up: " + numTaken + "<br><br><br><br>";}, 1000);
	}
}

function bot(numTaken) {
	console.log("Player picked up sticks: " + numTaken);
	numSticks -= numTaken;
	document.getElementById("buttons").style.display = "none";
	if (numSticks <= 0) {
		wonGame(false);
		return;
	}
	
	setTimeout(function() {document.getElementById("message").innerHTML = '<h3>' + numSticks + " sticks remaining </h3><br><br><br> You picked up: " + numTaken + "<br><br><br><br>";}, 25);
	setTimeout(function() {
	if (numSticks === 1) {
		update(1);
		return;
	} 
	setTimeout(function() {document.getElementById("buttons").style.display = "inline";}, 1500);
	if (numSticks < 5) {
		update(numSticks - 1);
	} else if ((numSticks%4) - 1 !== 0) {
		if ((numSticks%4) === 0) {
			update(3);
		} else {
			update((numSticks%4) - 1);
		}
	} else {
		update(Math.floor(Math.random() * 3) + 1);
	}}, 450);
}



function wonGame(flag) {
	console.log("wonGame called with: " + flag);
	document.getElementById("buttons").style.display = "none";
	
	if (flag) {
		document.getElementById("message").innerHTML = "Congratulations, you beat the Stick Game AI!<br><br><br><br>Do you think you can win again?<br><br><br>";
	} else {
		document.getElementById("message").innerHTML =  "You lost. The last stick was picked up by you. <br><br><br>:(<br><br><br>Want to try again?<br><br><br>";
	}
	document.getElementById("play-again").style.display = "inline";
}

function info() {
	alert("The Game of Sticks (or 21 sticks), is a two player game. Each player takes turns picking up 1-3 sticks, and the player to pick up the last stick is the loser. (At least in this version of the game)");
}

function lose() {
	alert("This was an idea I first learned about in discrete math a year ago. It was also the ONLY time since then that I've personally seen a practical use for mathematical induction. Essentially, the outcome of the game is determined by the first move.");
}

function badDisplay() {
	alert("If you've visited this page before, try clearing your cookies. It is also possible the website just recently updated and all the files aren't ready yet. Otherwise, there may be a flaw in the design. If this is the case, please take a screen shot and show it to Jacob Lindsley to see if it can be resolved. Please include screen dimensions, browser, and browser version.");
}