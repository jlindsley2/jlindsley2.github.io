var numSticks = null;
document.getElementById("take1").addEventListener("click", function() { bot(1); });
document.getElementById("take2").addEventListener("click", function() { bot(2); });
document.getElementById("take3").addEventListener("click", function() { bot(3); });


function newGame() {
	numSticks = parseInt(prompt("Please input the number of sticks you would like to start with (12-100)"));
	
	while (isNaN(numSticks) || numSticks < 12 || numSticks > 100) {
	numSticks = parseInt(prompt("Invalid input, please give a real number (12-100)"));
	}
	
	document.getElementById("lose").innerHTML =  "";
	document.getElementById("win").innerHTML = "";
	document.getElementById("numSticks").innerHTML = "";
	update(0);
}

function update(numTaken) {
	console.log("UPDATE: BOT HAS TAKEN " + numTaken + " STICKS.");
	numSticks -= numTaken;
	if (numSticks <= 0) {
		winGame();
	}
	document.getElementById("numSticks").innerHTML = '' + numSticks + " sticks remaining.";
}

function bot(numTaken) {
	console.log("Player picked up sticks: " + numTaken);
	numSticks -= numTaken;
	document.getElementById("numSticks").innerHTML = '' + numSticks + " sticks remaining.";
	if (numSticks <= 0) {
		loseGame();
	} else if (numSticks === 1) {
		update(1);
	} else if (numSticks < 5) {
		update(numSticks - 1);
	} else if ((numSticks%4) - 1 !== 0) {
		if ((numSticks%4) === 0) {
			update(3);
		} else {
			update((numSticks%4) - 1);
		}
	} else {
		update(Math.floor(Math.random() * 3) + 1);
	}
}

function loseGame() {
	document.getElementById("lose").innerHTML =  "You lost. The last stick was picked up by you. :(";
}

function winGame() {
	document.getElementById("win").innerHTML = "Congratulations, you beat the Stick Game AI!";
}