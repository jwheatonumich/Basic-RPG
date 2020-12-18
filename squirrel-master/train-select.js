//Load player stats in localstorage
var retrievedObject = localStorage.getItem('storedPlayerStats');
var playerStats = JSON.parse(retrievedObject)

function acornTraining(stat){
    if (playerStats["acorncoin"] >= 3){
        playerStats[stat] +=1;
        playerStats["acorncoin"] -=3;
        localStorage.setItem('storedPlayerStats', JSON.stringify(playerStats));
        playerSetup();
        setStats();
    } 
}

function mushroomTraining(stat){
    if (playerStats["mushroomcoin"] >= 2){
        playerStats[stat] +=1;
        playerStats["mushroomcoin"] -=2;
        localStorage.setItem('storedPlayerStats', JSON.stringify(playerStats));
        playerSetup();
        setStats();
    } 
}

function bearclawTraining(stat){
    if (playerStats["bearclawcoin"] >= 1){
        playerStats[stat] +=1;
        playerStats["bearclawcoin"] -=1;
        localStorage.setItem('storedPlayerStats', JSON.stringify(playerStats));
        playerSetup();
        setStats();
    } 
}

//Load each player stat into a variable
function playerSetup() {
    playerName = playerStats.name;
    playerHealth = playerStats.health;
    playerMaxHealth = playerStats.maxhealth;
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
        'Health: ' + playerHealth
    document.getElementById("acorn-coin").innerHTML = playerAcornCoin;
    document.getElementById("mushroom-coin").innerHTML = playerMushroomCoin;
    document.getElementById("bearclaw-coin").innerHTML = playerBearclawCoin;
    document.getElementById("leaf-coin").innerHTML = leafCoin;
}

//Populate dropdown on page load
//window.onload = popDropdown();

//Populate player stats on page load
window.onload = playerSetup();
window.onload = setStats();