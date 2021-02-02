//Based on tutorial from http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/

//Create canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 245;
canvas.height = 350;
canv = document.getElementById("game-canvas").appendChild(canvas);

//Initialize variables
let gameStatus = ""; //Has player won or lost game yet
var coinsCaught = 0; //How many coins player has caught
let gameStart = false;
let spiderDrops = 0 //How many spiders have dropped
let dailyEvents = JSON.parse(localStorage.getItem('dailyEvents')); //Load daily events data
let enemyMove = {}
let enemySpeed = 2;
let objectIdCount = 1;

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "../images/explore-game-bg.png";

// Enemy constructor
class characterObject{
	constructor(characterID,characterImage,characterX,characterY,inputSpeed, inputMoveX, inputMoveY){
		this.id = characterID;
		this.objectID = objectIdCount;
		objectIdCount++;
		this.x = characterX;
		this.y = characterY;
		this.moveX = inputMoveX;
		this.moveY = inputMoveY;
		this.collision = -1;
		this.image = new Image();
		this.image.src = characterImage;
		this.speed = inputSpeed;
	}
	move(moveX,moveY){
		this.x += moveX;
		this.y += moveY;
	}
	changeDirection(inputX,inputY){
		this.moveX = inputX;
		this.moveY = inputY;
	}
}

let objects = []; // List of all objects
let enemies = []; // List of enemy objects

//Create instance of hear
let hero = new characterObject(objectIdCount,playerStats.image,canvas.width/2 - 40,canvas.height - 100,256,0,0)
objects.push(hero); // Add hero to list of objects

//Define variables to create enemies
let enemyList = [6,7,8,9,10,11];
let enemyCount = 4;

let chosenEnemy;

// Randomly select enemies
for (let i = 0; i < enemyCount; i++){
	let enemyID  = enemyList[Math.floor(Math.random()*enemyList.length)];//Random enemy ID from list

	for (j in enemyStats){//Find enemy data based on selected ID
		if (enemyStats[j]["enemyID"] == enemyID){
			chosenEnemy = enemyStats[j];
		};
	};

	let enemyImage = chosenEnemy.enemyImage;//Store image location in variable

	let randomX = Math.max(Math.random()*canvas.width - 70,0);//Random x coordinage
	let randomY = Math.max(Math.random()*canvas.height - 150,0);//Random y coordinate
	let randomMoveX = 2*Math.random() - 1;//Initial movement direction
	let randomMoveY = 2*Math.random() - 1;//Initial movement direction

	enemies[i] = new characterObject(i,enemyImage,randomX,randomY,256,randomMoveX,randomMoveY)//Create an instance of the enemy
	objects.push(enemies[i]); // Add enemy to list of objects

}

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

function collision(objectA,objectB){
	if(
		objectA.x <= (objectB.x + objectB.image.width)
		&& objectB.x <= (objectA.x + objectA.image.width)
		&& objectA.y <= (objectB.y + objectB.image.height)
		&& objectB.y <= (objectA.y + objectA.image.height)
	){
		objectA.collision = objectB.objectID;
		objectB.collision = objectA.objectID;
	}
}

// Update game objects
var update = function (modifier) {

	//Player inputs
	if ((37 in keysDown) && hero.x > 0) { // Player holding left
		hero.x -= hero.speed * modifier;
	}
	if ((38 in keysDown) && hero.y > 0) { // Player holding left
		hero.y -= hero.speed * modifier;
	}
	if (39 in keysDown && hero.x < canvas.width - hero.image.width) { // Player holding right
		hero.x += hero.speed * modifier;
	}
	if (40 in keysDown && hero.y < canvas.height - hero.image.height) { // Player holding right
		hero.y += hero.speed * modifier;
	}

	// Detect collisions
	for (i in objects){
		objects[i].collision = ""
	}

	for (i in enemies){
		for (j in enemies){
			if (i != j){
				collision(enemies[i],enemies[j])
			}
		}
	}

	//Enemy movement
	for (i in enemies){

		if(enemies[i].collision !=""){
			enemies[i].changeDirection(-enemies[i].moveX,-enemies[i].moveY);
		}

		if(
			enemies[i].y <=0
			|| enemies[i].y >= canvas.height - enemies[i].image.height
		){
			enemies[i].moveY = -enemies[i].moveY;
		}

		if(
			enemies[i].x <=0
			|| enemies[i].x >= canvas.width - enemies[i].image.width
		){
			enemies[i].moveX = -enemies[i].moveX;
		}

		enemies[i].move(enemies[i].moveX,enemies[i].moveY)
	}

};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	ctx.drawImage(hero.image, hero.x, hero.y);

	for (i in enemies){
		ctx.drawImage(enemies[i].image,enemies[i].x,enemies[i].y)
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


