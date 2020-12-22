//Load player stats in localstorage
var retrievedObject = localStorage.getItem('storedPlayerStats');
var playerStats = JSON.parse(retrievedObject)

//Relative link back to this page
var page = "../squirrel-master/train.html"

//Array of enemy names
var enemies = ["A Squirrel","Two Squirrels"];

//Where in the enemy list squirrels start
var enemyStart = 0

//Array of enemy images
var pictureList = [
    "../images/squirrel-avatar-mini.png",
    "../images/two-squirrels-mini.png" 
];

var maxStats = 25

//function to set player stats based on the button clicked
function acornTraining(stat){
    if (playerStats["acorncoin"] >= 3 &&  playerStats[stat] < maxStats){
        playerStats[stat] +=1;
        playerStats["acorncoin"] -=3;
        healthCalc();
        localStorage.setItem('storedPlayerStats', JSON.stringify(playerStats));
        playerSetup();
        setStats();
    } 
}

//function to set player stats based on the button clicked
function mushroomTraining(stat){
    if (playerStats["mushroomcoin"] >= 2 &&  playerStats[stat] < maxStats){
        playerStats[stat] +=1;
        playerStats["mushroomcoin"] -=2;
        healthCalc();
        localStorage.setItem('storedPlayerStats', JSON.stringify(playerStats));
        playerSetup();
        setStats();
    } 
}

//function to set player stats based on the button clicked
function bearclawTraining(stat){
    if (playerStats["bearclawcoin"] >= 1 &&  playerStats[stat] < maxStats){
        playerStats[stat] +=1;
        playerStats["bearclawcoin"] -=1;
        healthCalc();
        localStorage.setItem('storedPlayerStats', JSON.stringify(playerStats));
        playerSetup();
        setStats();
    } 
}

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

//Populate dropdown on page load
window.onload = popDropdown();
window.onload = selectImage();//Set the image to the default choice on page load