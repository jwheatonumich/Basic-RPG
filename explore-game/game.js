//Based on tutorial from http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/

//Create canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 245;
canvas.height = 350;
canv = document.getElementById("game-canvas").appendChild(canvas);

//Initialize variables
fallSpeed = 2; //Base speed things fall
gameStatus = ""; //Has player won or lost game yet
var coinsCaught = 0; //How many coins player has caught
gameStart = false;
spiderDrops = 0 //How many spiders have dropped
var dailyEvents = JSON.parse(localStorage.getItem('dailyEvents')); //Load daily events data


// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "../images/explore-game-bg.png";

// Character image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = playerStats.image;

// Game objects
var hero = {
	speed: 256, // movement in pixels per second
	x: canvas.width/2 - 40,
	y: canvas.height - 100
};

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

//Detect if touch device
function isTouchDevice() {
	return (('ontouchstart' in window) ||
	   (navigator.maxTouchPoints > 0) ||
	   (navigator.msMaxTouchPoints > 0));
  };

if(!isTouchDevice()){
	document.getElementById("touch-controls").parentElement.removeChild(document.getElementById("touch-controls"));
}else{
	//Handle touch controls
	document.getElementById("move-left").addEventListener("touchstart", touchDownLeft);
	document.getElementById("move-left").addEventListener("touchend", touchUpLeft);
	document.getElementById("move-right").addEventListener("touchstart", touchDownRight);
	document.getElementById("move-right").addEventListener("touchend", touchUpRight);
	document.getElementById("move-up").addEventListener("touchstart", touchDownUp);
	document.getElementById("move-up").addEventListener("touchend", touchUpUp);
	document.getElementById("move-down").addEventListener("touchstart", touchDownDown);
	document.getElementById("move-down").addEventListener("touchend", touchUpDown);
}

//Functions to move left and right
function touchDownLeft(e) {

		keysDown[[37]] = true;

};

function touchUpLeft(e) {

	delete keysDown[[37]];

};

function touchDownUp(e) {

	keysDown[[38]] = true;

};

function touchUpUp(e) {

delete keysDown[[38]];

};

function touchDownRight(e) {

	keysDown[[39]] = true;

};

function touchUpRight(e) {

	delete keysDown[[39]];
};

function touchDownDown(e) {

	keysDown[[40]] = true;

};

function touchUpDown(e) {

	delete keysDown[[40]];
};


// Update game objects
var update = function (modifier) {

	if ((37 in keysDown) && hero.x > 0) { // Player holding left
		hero.x -= hero.speed * modifier;
	}
	if ((38 in keysDown) && hero.y > 0) { // Player holding left
		hero.y -= hero.speed * modifier;
	}
	if (39 in keysDown && hero.x < canvas.width - heroImage.width) { // Player holding right
		hero.x += hero.speed * modifier;
	}
	if (40 in keysDown && hero.y < canvas.height - heroImage.height) { // Player holding right
		hero.y += hero.speed * modifier;
	}
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

};

var renderStartScreen = function (){

	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	if(playerStats.health <= 0){
		ctx.fillText("Heal before playing", 20, 32);
	}
	else {
		ctx.fillText("Click to start", 60, 32);
	}
}

// The main game loop
var main = function () {

	if(!gameStart){

		startScreen();

	}else{

		var now = Date.now();
		var delta = now - then;

		update(delta / 1000);
		render();

		then = now;

		if (gameStatus == "lose"){
			endGame();
			return
		}
		
		if (gameStatus == "win"){
			endGame();
			return
		}

		// Request to do this again ASAP
		requestAnimationFrame(main);
	}
};

var startScreen = function () {

	renderStartScreen();

	if (37 in keysDown || 38 in keysDown || 39 in keysDown || 40 in keysDown){
		
		if(playerStats.health > 0){

			delete keysDown[[37]];
			delete keysDown[[38]];
			delete keysDown[[39]];
			delete keysDown[[40]];
			
			gameStart = true
		}

	}

	requestAnimationFrame(main);

}

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!

then = Date.now();
//startScreen();

main();



