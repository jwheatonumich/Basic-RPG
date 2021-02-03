//Based on tutorial from http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/

//Load data from local storage
let retrievedObject = localStorage.getItem('exploreData');

//Parse the JSON data into an object
let exploreData = JSON.parse(retrievedObject);

//Create canvas
let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
canvas.width = 245;
canvas.height = 350;
canv = document.getElementById("game-canvas").appendChild(canvas);

//Initialize variables
let gameStatus = ""; //Has player won or lost game yet
let coinsCaught = 0; //How many coins player has caught
let gameStart = false;
let spiderDrops = 0 //How many spiders have dropped
let dailyEvents = JSON.parse(localStorage.getItem('dailyEvents')); //Load daily events data
let enemyMove = {}
let enemySpeed = 2;
let objectIdCount = 0;

// Background image
let bgReady = false;
let bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "../images/explore-game-bg.png";

// Enemy constructor
class characterObject{
	constructor(inputSpeciesID,characterImage,characterX,characterY,inputSpeed, inputMoveX, inputMoveY,inputName){
		
		this.objectID = objectIdCount;
		this.speciesID = inputSpeciesID;
		this.name = inputName;
		objectIdCount++;
		this.image = new Image();
		this.image.onload = function () {};
		this.image.src = characterImage;

		//X and Y location
		this.x = characterX;
		this.y = characterY;

		//X and Y velocity
		this.moveX = inputMoveX;
		this.moveY = inputMoveY;
		this.speed = inputSpeed;

		//Is the character touching another character, and which one
		this.collision = -1;

	}
	move(moveX,moveY){
		this.x += moveX;
		this.y += moveY;
	}
	changeDirection(inputX,inputY){
		this.moveX = inputX;
		this.moveY = inputY;
	}
	respawn(){
		this.x = Math.max(Math.random()*(canvas.width - 70),0);
		this.y = Math.max(Math.random()*(canvas.height - 200),0);
	}
}

let objects = []; // List of all objects
let enemies = []; // List of enemy objects

// Spawn game objects
function spawnObjects(){

	// Create instance of hero
	hero = new characterObject("empty",playerStats.image,canvas.width/2 - 40,canvas.height - 100,256,0,0,"player")
	objects.push(hero); // Add hero to list of objects

	//Define variables to create enemies
	let chosenEnemy;

	// Create instances of enemies
	for (let i = 0; i < exploreData.enemyCount; i++){
		let enemyID  = exploreData.enemyList[Math.floor(Math.random()*exploreData.enemyList.length)];//Random enemy ID from list

		for (j in enemyStats){//Find enemy data based on selected ID
			if (enemyStats[j]["enemyID"] == enemyID){
				chosenEnemy = enemyStats[j];
			};
		};

		let enemyImage = chosenEnemy.enemyImage;//Store image location in variable

		let randomX = Math.max(Math.random()*(canvas.width - 70),0);//Random x coordinage
		let randomY = Math.max(Math.random()*(canvas.height - 200),0);//Random y coordinate
		let randomMoveX = 2*Math.random() - 1;//Initial movement direction
		let randomMoveY = 2*Math.random() - 1;//Initial movement direction

		enemies[i] = new characterObject(enemyID,enemyImage,randomX,randomY,256,randomMoveX,randomMoveY,"enemy")//Create an instance of the enemy
		objects.push(enemies[i]); // Add enemy to list of objects
	}

}

function badSpawn(){

	for (i in objects){
		objects[i].collision = -1
	}

	for (let i in objects){
		for (let j in objects){
			if (i != j){

				collision(objects[i],objects[j])
				if(objects[i].collision != -1){
					console.log("respawn")
					objects[i].respawn();
					badSpawn();

				}
			}
		}
	}
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
	return objectA.collision;
}

// Determine what the input object is colliding with, output the collided object
function lookupCollide(collideInput){
	return objects[objects[collideInput].collision]
}

// Update game objects
function update(modifier) {

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
		objects[i].collision = -1
	}

	for (i in objects){
		for (j in objects){
			if (i != j){
				collision(objects[i],objects[j])
			}
		}
	}

	// Start Battle
	if (objects[0].collision != -1){
		enemyList = [];
		enemyList.push(lookupCollide(0).speciesID);
		gameStatus = "lose"
	}


	// Enemy movement
	for (i in enemies){

		if(enemies[i].collision !=-1){
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
function render() {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	ctx.drawImage(hero.image, hero.x, hero.y);

	for (i in enemies){
		ctx.drawImage(enemies[i].image,enemies[i].x,enemies[i].y)
	}

};

function renderStartScreen(){

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
function main(){

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

function startScreen() {

	renderStartScreen();

	badSpawn();

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
main();
spawnObjects();