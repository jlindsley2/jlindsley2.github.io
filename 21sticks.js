//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
////////   _____          __  __ ______    ____  ______    _____ _______ _____ _____ _  __ _____  ////////
////////  / ____|   /\   |  \/  |  ____|  / __ \|  ____|  / ____|__   __|_   _/ ____| |/ // ____| ////////
//////// | |  __   /  \  | \  / | |__    | |  | | |__    | (___    | |    | || |    | ' /| (___   ////////
//////// | | |_ | / /\ \ | |\/| |  __|   | |  | |  __|    \___ \   | |    | || |    |  <  \___ \  ////////
//////// | |__| |/ ____ \| |  | | |____  | |__| | |       ____) |  | |   _| || |____| . \ ____) | ////////
////////  \_____/_/    \_\_|  |_|______|  \____/|_|      |_____/   |_|  |_____\_____|_|\_\_____/  ////////
////////                                                                                          ////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * This covers all of the javascript used for the 21Sticks site, currently found on https://jlindsley2.github.io/21sticks.html
 * for the time being. This manages the event listeners, user input, dialogues, and the bot.
 * 
 * @author Jacob Lindsley
 */

// Initialize the listeners and numSticks global variable
var numSticks = null;
document.getElementById("take1").addEventListener("click", function() { bot(1); });
document.getElementById("take2").addEventListener("click", function() { bot(2); });
document.getElementById("take3").addEventListener("click", function() { bot(3); });

/** Sets up new game. Resets(hides) elements, takes input for new number of sticks, error handles user input */
function newGame() {
	document.getElementById("game-board").style.display = "none"; // Hide the game board
	document.getElementById("play-again").style.display = "none"; // Hide the "play again" button displayed at end of game
	numSticks = prompt("Please input the number of sticks you would like to start with (12-100)");
	if (numSticks === null) { // If user "cancelled" the alert window, numSticks is null
		return; // If user cancelled, return immediately and cancel starting a new game
	}
	numSticks = parseInt(numSticks); // User didn't cancel, attempt to parseInt the input
	
	while (isNaN(numSticks) || numSticks < 12 || numSticks > 100) { // While input isn't a real number within given range, keep asking for correct input
		numSticks = prompt("Invalid input, please give a real number (12-100)"); // Prompt for valid input
		if (numSticks === null) { // If ever null, user has cancelled the alert. Exit immediately
			return;
		}
		numSticks = parseInt(numSticks);
	}
	
	// If code gets to here, correct input has been received. Ready to set up the game. Show the game board, and start match
	document.getElementById("game-board").style.display = "block";
	document.getElementById("buttons").style.display = "inline";
	
	document.getElementById("message").innerHTML = "";
	update(0);
}

/** Update is called once in the beginning to display the starting message, then updates after the BOT took its turn.
 * The message displayed is just before the PLAYER's turn.
 * The function updates the number of sticks before the player's turn, then displays message of bot's last move.
 * @param {number} numTaken - The number of sticks just taken by the BOT
 */
function update(numTaken) {
	numSticks -= numTaken;
	
	// You gaze into the abyss of <br>s. The abyss gazes back.
	if (numTaken === 0) { // Message for start of game
		document.getElementById("message").innerHTML = '<h3>' + numSticks + " sticks remaining</h3><br><br><br><br<br><br><br><br><br>";
	} else if (numSticks !== 0) {
		setTimeout(function() { // Delay message before players turn
			document.getElementById("message").innerHTML = '<h3>' + numSticks + " sticks remaining</h3><br><br><br> Opponent picked up: " + numTaken + "<br><br><br><br>";
			}, 750);
	}
}

/** BOT is called to process the bot's turn, after the player moves. Updates numSticks, hides buttons, checks for game-ending condition,
 * displays player's last move, determines the bot's move, then delays when move is shown and when buttons return for player input on player's next turn.
 * @param {number} numTaken - The number of sticks just taken by the PLAYER
 */
function bot(numTaken) {
	numSticks -= numTaken;
	document.getElementById("buttons").style.display = "none"; // Hide buttons, stop player input until next player turn
	if (numSticks <= 0) {
		wonGame(false);
		return;
	}
	
	setTimeout(function() { // Display player's last move
		document.getElementById("message").innerHTML = '<h3>' + numSticks + " sticks remaining </h3><br><br><br> You picked up: " + numTaken + "<br><br><br><br>";
		}, 25);
		
	setTimeout(function() {
		if (numSticks === 1) { // If one stick left, player wins
			wonGame(true);
			return;
		} 
		setTimeout(function() { // Bring back buttons after 1000ms for player's next move
			document.getElementById("buttons").style.display = "inline";
			}, 1000);
		
		/** **SPOILER** In order to win, the bot needs the player to be left with one stick. In order to satisfy this condition, the bot must leave the player with 5 sticks
		 * first. To fit this pattern, the bot needs the player to be left with a certain x number of sticks, given by {x ∈ Z⁺ | (x%4)-1 = 0}. 
		 * If at any point the player is left with a number of sticks that exists in this set, the bot can ensure all future number of sticks left to the player
		 * will ALWAYS be the nearest lesser number in the set, all the way until the player is left with 1 stick. The proof for this is left as an exercise for the reader.
		 * If the bot can not put the player in this position, it will choose a random number of sticks, acting randomly until a chance to enter the pattern arises(If it all).*/
		if ((numSticks%4) - 1 !== 0) {
			if ((numSticks%4) === 0) { // Because of the offset of -1, any time this condition is met, it explicitly calls 3 rather than -1 if this wasn't properly handled
				update(3);
			} else {
				update((numSticks%4) - 1); // Chooses the number needed to leave the player with the next lesser number in the abovementioned set
			}
		} else { // The bot itself is stuck within the set, pick randomly as long as the bot can't force the player into it
			update(Math.floor(Math.random() * 3) + 1);
	}}, 450);
}


/** wonGame is called when an end-game condition is met. Hide the buttons so player input stops, display win/loss message, and show button to play again 
 * @param {boolean} flag - True means the player won the game, false the player lost
 */
function wonGame(flag) {
	document.getElementById("buttons").style.display = "none"; // Hide buttons and stop player input. Otherwise, player can win game, click to pick up another stick, then have winGame called for a lost game
	
	// More <br>s!
	if (flag) { // Win message
		document.getElementById("message").innerHTML = "Congratulations, you beat the Stick Game AI!<br><br><br><br>Do you think you can win again?<br><br><br>";
	} else { // Lose message
		document.getElementById("message").innerHTML =  "You lost. The last stick was picked up by you. <br><br><br>:(<br><br><br>Want to try again?<br><br><br>";
	}
	document.getElementById("play-again").style.display = "inline"; // Show new game button
}

/** This function explains the rules of the game*/
function info() {
	alert("The Game of Sticks (or 21 sticks), is a two player game. Each player takes turns picking up 1-3 sticks, and the player to pick up the last stick is the loser. (At least in this version of the game)");
}

/** This function explains a little more about the game, without giving much help*/
function lose() {
	alert("This was an idea I first learned about in discrete math a year ago. It was also the ONLY time since then that I've personally seen a practical use for mathematical induction. The outcome of the game is determined by the first move. Believe it or not, the bot only follows two instructions the entire game.");
}

/** This function contains instructions in case the display gets messed up */
function badDisplay() {
	alert("If you've visited this page before, try clearing your cookies. It is also possible the website just recently updated and all the files aren't ready yet. Otherwise, there may be a flaw in the design. If this is the case, please take a screen shot and show it to Jacob Lindsley to see if it can be resolved. Please include screen dimensions, browser, and browser version. (If you are using Internet Explorer or Microsoft Edge, it is time for you to switch)");
}