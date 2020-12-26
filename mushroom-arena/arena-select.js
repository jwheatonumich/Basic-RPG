//Load player stats in localstorage
var retrievedObject = localStorage.getItem('storedPlayerStats');
var playerStats = JSON.parse(retrievedObject)

//Relative link back to this page
var page = "../mushroom-arena/arena.html"

//Array of enemy names
var enemies = ["Little Mushroom","Tall Mushroom"];

//Where in the enemy list mushrooms start
var enemyStart = 2

//Array of enemy images
var pictureList = {
    "Little Mushroom":"../images/little-mushroom.png",
    "Tall Mushroom":"../images/tall-mushroom.png"
};

//Load each player stat into a variable
function playerSetup() {
    playerName = playerStats.name;
    playerHealth = playerStats.health;
    playerMaxHealth = playerStats.maxhealth;
    playerAttack = playerStats.attack;
    playerDefense = playerStats.defense;
    playerEndurance = playerStats.endurance;
    acornCoin = playerStats.acorncoin; 
    mushroomCoin = playerStats.mushroomcoin;
    bearclawCoin = playerStats.bearclawcoin;
    leafCoin = playerStats.leafcoin;
}

//Function that sets text on the website equal to various stat variables
function setStats() {
    
    document.getElementById("player-name").innerHTML = playerName;
    document.getElementById("character-stats").innerHTML = 
        'Health: ' + playerHealth + '/' +  playerMaxHealth + '<br />' +
        'Attack: ' + playerAttack + '<br />' +
        'Defense: ' + playerDefense + '<br />' +
        'Endurance: ' + playerEndurance + '<br />';
    document.getElementById("acorn-coin").innerHTML = acornCoin;
    document.getElementById("mushroom-coin").innerHTML = mushroomCoin;
    document.getElementById("bearclaw-coin").innerHTML = bearclawCoin;
    document.getElementById("leaf-coin").innerHTML = leafCoin;

    //Set the player image to their costume
    document.getElementById("character-image").src = playerStats.image;
}

//Populate player stats on page load
window.onload = playerSetup();
window.onload = setStats();

//Populate dropdown on page load
window.onload = popDropdown();
window.onload = selectImage();//Set the image to the default choice on page load