
$(document).ready(function() {

var audio = new Audio('./media/static.mp3');
var audioToggle = new Audio('./media/longStatic.mp3');
var tinFoilHat = true;
var currentPic = "1";
var offset = 0;

$("#disabler").click(tinFoilHatToggle);

setInterval(showPic, 10000);

function tinFoilHatToggle() {
	if (tinFoilHat === true) {
		audioToggle.play();
		setTimeout(function() {$('#disableSloth').show();}, offset);
		setTimeout(function() {$('#disableSloth').hide();}, offset + 2500);
	}
	tinFoilHat = !tinFoilHat;
	
}

function showPic() {
	console.log("step1");
	if (tinFoilHat === true) {
		audio.play();
		offset = Math.floor(Math.random() * 3);
		currentPic = (Math.floor(Math.random() * 11) + 1);
		setTimeout(function() {$('#' + currentPic.toString()).show();}, offset);
		setTimeout(function() {$('#' + currentPic.toString()).hide();}, offset + 60);
		console.log("step2 " + offset + " " + currentPic);
	}
	
}

});