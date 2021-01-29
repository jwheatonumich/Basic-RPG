//Based on tutorial from http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/

//Create canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 260;
canvas.height = 350;
document.getElementById("game-canvas").appendChild(canvas);

//Initialize variables
fallSpeed = 2;
gameOver = false;

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "../images/acorn-drop-bg.png";

// Character image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "../images/acorn-drop-character.png";

// Spider image
var spiderReady = false;
var spiderImage = new Image();
spiderImage.onload = function () {
	spiderReady = true;
};
spiderImage.src = "../images/acorn-drop-spider.png";

// Coin image
var coinReady = false;
var coinImage = new Image();
coinImage.onload = function () {
	coinReady = true;
};
coinImage.src = "../images/acorn-drop-coin.png";

// Game objects
var hero = {
	speed: 256, // movement in pixels per second
	x: canvas.width/2 - 40,
	y: canvas.height - 100
};
var spider = {
	x: 0,
	y: 0
};
var coin = {
	x: 0,
	y: 0
};
var coinsCaught = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the coin when the player catches it
var resetCoin = function () {

	// Throw the coin somewhere on the screen randomly
	coin.x = (Math.random() * (canvas.width - coinImage.width));
    coin.y = 0;
    
    coinFallSpeed = fallSpeed + 2*Math.random()
};

var resetSpider = function () {

	// Throw the coin somewhere on the screen randomly
	spider.x = (Math.random() * (canvas.width - spiderImage.width));
    spider.y = 0;
    
    spiderFallSpeed = fallSpeed + 2*Math.random()
};

// Update game objects
var update = function (modifier) {

	if (37 in keysDown && hero.x > 0) { // Player holding left
		hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown && hero.x < canvas.width - 100) { // Player holding right
		hero.x += hero.speed * modifier;
	}

    coin.y += coinFallSpeed;

    spider.y += spiderFallSpeed;

	// Did player catch coin?
	if (
		hero.x <= (coin.x + coinImage.width)
		&& coin.x <= (hero.x + heroImage.width)
		&& hero.y <= (coin.y + coinImage.height)
        && coin.y <= (hero.y + coinImage.height)
	) {
		++coinsCaught;
		resetCoin();
    };

    //Did coin touch ground?
    if (
        coin.y + 30 > canvas.height
	) {
		resetCoin();
    };
    
    //Did player touch spider?
    if (
		hero.x <= (spider.x + 100)
		&& spider.x <= (hero.x + 80)
		&& hero.y <= (spider.y + 100)
        && spider.y <= (hero.y + 100)
	) {
        resetSpider();
        gameOver = true;
    };
    
    //Did player touch spider?
    if (
        spider.y + 100 > canvas.height
    ) {
        resetSpider();
    };
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (coinReady) {
		ctx.drawImage(coinImage, coin.x, coin.y);
    }
    
    if (spiderReady) {
		ctx.drawImage(spiderImage, spider.x, spider.y);
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Coins caught: " + coinsCaught, 32, 32);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

    if (gameOver == true){
        return
    }

	// Request to do this again ASAP
    requestAnimationFrame(main);
    
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
resetCoin();
resetSpider();
main();
