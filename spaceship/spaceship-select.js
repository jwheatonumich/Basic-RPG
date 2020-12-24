//Load player stats in localstorage
var retrievedObject = localStorage.getItem('storedPlayerStats');
var playerStats = JSON.parse(retrievedObject)

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

//Add random numbers of coins to the player's inventory
function sleep() {
    
    playerStats["day"] +=1;
    playerStats["caveday"] = 0; //Let the player steal another bear coin
    if(playerStats.health < playerStats.maxhealth/2){ //If health is less than 50%
        playerStats.health = Math.floor(playerStats.maxhealth/2); //Heal to 50% of max health
    }
    document.getElementById("textbox").innerHTML = 'Day '+ playerStats["day"] + '<br><br>You wake up. You don\'t feel very refreshed.<br><br> Where is the coffee?'
    localStorage.setItem('storedPlayerStats', JSON.stringify(playerStats));
    playerSetup(); //Pull updated stats from local storage
    setStats(); //Update stats on page
}

//Transform back to original alien
function repairDNA(){
    //Save health and xp after battle ends
    playerStats.species = "gremlin" ;
    playerStats.image = "../images/little-goblin.png" ;
    

    //Store the updated data object in local storage, after turning the JSON to a string
    localStorage.setItem('storedPlayerStats', JSON.stringify(playerStats));

    playerSetup();
    setStats();
}

//Populate player stats on page load
window.onload = playerSetup();
window.onload = setStats();