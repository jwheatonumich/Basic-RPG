//Load player stats in localstorage
var retrievedObject = localStorage.getItem('storedPlayerStats');
var playerStats = JSON.parse(retrievedObject);

//Relative link back to this page
var page = "../squirrel-arena/arena.html";

//Array of enemy names
var enemies = ["A Squirrel","Two Squirrels"];

//Where in the enemy list squirrels start
var enemyStart = 0;

//Array of enemy images
var pictureList = {
    "A Squirrel":"../images/squirrel-avatar-mini.png",
    "Two Squirrels":"../images/two-squirrels-mini.png" 
};

//Function to calculate max health from endurance
function healthCalc(){
    playerStats["maxhealth"] = 4 * playerStats["endurance"]
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

window.onload = popDropdown();//Populate dropdown on page load
window.onload = selectImage();//Set the image to the default choice on page load