//Check if there is stored data for player stats. Otherwise, start from level 1
if (localStorage.getItem("storedPlayerStats") === null) {
    //Set player and enemy stats
    var playerStats = {"name":"Fred", "health":100, "maxhealth":100, "attack":10, "defense":5, "experience":0 }

}else{
    //If using the stored file, retrieve it and convert the string into a JSON
    var retrievedObject = localStorage.getItem('storedPlayerStats');
    var playerStats = JSON.parse(retrievedObject);
}

//Load each player stat into a variable
function playerSetup() {
    playerName = playerStats.name;
    playerHealth = playerStats.health;
    playerMaxHealth = playerStats.maxhealth;
    playerAttack = playerStats.attack;
    playerDefense = playerStats.defense;
    leafCoin = playerStats.leafcoin;
}

//Function that sets text on the website equal to various stat variables
function setStats() {
    document.getElementById("player-name").innerHTML = playerName;
    document.getElementById("character-stats").innerHTML = 
        'Health: ' + playerHealth + '/' +  playerMaxHealth
    document.getElementById("leaf-coin").innerHTML = leafCoin;
}

//Populate player stats on page load
window.onload = playerSetup();
window.onload = setStats();