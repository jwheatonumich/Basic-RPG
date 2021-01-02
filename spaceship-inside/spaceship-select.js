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
    squirrelUnlock = playerStats.squirrelunlock;
    mushroomUnlock = playerStats.mushroomunlock;
    bearUnlock = playerStats.bearunlock;
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

function unlockedSpecies(){
    //Populate gremlin image
    var elem = document.createElement("img");
    elem.src = "../images/little-goblin.png";
    elem.setAttribute("class", "item");
    document.getElementById("unlocked-species-div").appendChild(elem);

    //If squirrel transform is unlocked, populate bear image
    if (playerStats.squirrelunlock = true){
        var elem = document.createElement("img");
        elem.src = "../images/squirrel-avatar.png";
        elem.setAttribute("class", "item");
        document.getElementById("unlocked-species-div").appendChild(elem);
    }   

    //If mushroom transform is unlocked, populate bear image
    if (playerStats.mushroomunlock = true){
        var elem = document.createElement("img");
        elem.src = "../images/little-mushroom-scanner.png";
        elem.setAttribute("class", "item");
        document.getElementById("unlocked-species-div").appendChild(elem);
    }   

    //If bear transform is unlocked, populate bear image
    if (playerStats.bearunlock = true){
        var elem = document.createElement("img");
        elem.src = '../images/small-bear-avatar.png';
        elem.setAttribute("class", "item");
        document.getElementById("unlocked-species-div").appendChild(elem);
    }   
}

//Populate player stats on page load
window.onload = playerSetup();
window.onload = setStats();
window.onload = unlockedSpecies();