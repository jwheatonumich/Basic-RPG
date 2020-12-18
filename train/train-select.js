//Load player stats in localstorage
var retrievedObject = localStorage.getItem('storedPlayerStats');
var playerStats = JSON.parse(retrievedObject)

//function to set player stats based on the button clicked
function acornTraining(stat){
    if (playerStats["acorncoin"] >= 3){
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
    if (playerStats["mushroomcoin"] >= 2){
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
    if (playerStats["bearclawcoin"] >= 1){
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
    playerEndurance = playerStats.endurance;
    playerAttack = playerStats.attack;
    playerDefense = playerStats.defense;
    playerAcornCoin = playerStats.acorncoin;
    playerMushroomCoin = playerStats.mushroomcoin;
    playerBearclawCoin = playerStats.bearclawcoin;
    leafCoin = playerStats.leafcoin;
}

//Function that sets text on the website equal to various stat variables
function setStats() {
    
    document.getElementById("character-stats").innerHTML = 
        'Attack: ' + playerAttack + '<br />' +
        'Defense: ' + playerDefense + '<br />' +
        'Endurance: ' + playerEndurance + '<br />' +
        'Health: ' + playerMaxHealth
    document.getElementById("acorn-coin").innerHTML = playerAcornCoin;
    document.getElementById("mushroom-coin").innerHTML = playerMushroomCoin;
    document.getElementById("bearclaw-coin").innerHTML = playerBearclawCoin;
    document.getElementById("leaf-coin").innerHTML = leafCoin;
}

//Populate player stats on page load
window.onload = playerSetup();
window.onload = setStats();