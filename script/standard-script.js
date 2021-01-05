
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
    day = playerStats.day;
}

//Function that sets text on the website equal to various stat variables
function setStats() {
    
    document.getElementById("player-name").innerHTML = playerName;
    document.getElementById("character-stats").innerHTML = 
        'Day: ' + day + '<br />' +
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

    //Raise stats if silver reactor is charged
    if(playerStats["ship-mushroomcoin"] >= 10){ //If health is less than 100%
        playerStats.attack +=1;
        playerStats.defense +=1;
        playerStats.endurance +=1
        playerStats["maxhealth"] = 4 * playerStats["endurance"]
    }

    //Heal if red reactor is charged
    if(playerStats.health < playerStats.maxhealth && playerStats["ship-acorncoin"] >= 10){ //If health is less than 100%
        playerStats.health = Math.floor(playerStats.maxhealth); //Heal to 100% of max health
    }

    //Random events
    var eventCheck;//Used to calculate whether events happen

    var dailyEvents = {} //Empty object to hold events

    //Squirrel Challenge
    eventCheck = Math.random()
    console.log(eventCheck);
    if (eventCheck < 0.05){
        dailyEvents.squirrelChallenge=true;
    }else{
        dailyEvents.squirrelChallenge=false;
    }

    //Mushroom Challenge
    eventCheck = Math.random()
    if (eventCheck < 0.05){
        dailyEvents.mushroomChallenge=true;
    }else{
        dailyEvents.mushroomChallenge-false;
    }
    
    //Riku Battle
    eventCheck = Math.random()
    if (eventCheck < 0.05){
        dailyEvents.rikuBattle=true;
    }else{
        dailyEvents.rikuBattle=false;
    }

    //Great Tree Leaf
    eventCheck = Math.random()
    if (eventCheck < 0.25){
        dailyEvents.freeLeaf=true;
    }else{
        dailyEvents.freeLeaf=false;
    }

    //Spore Day, Free Training
    eventCheck = Math.random()
    if (eventCheck < 0.25){
        dailyEvents.sporeDay=true;
    }else{
        dailyEvents.sporeDay=false;
    }
    
    //Sleeping Bear
    eventCheck = Math.random()
    if (eventCheck < 0.25){
        dailyEvents.sleepingBear=true;
    }else{
        dailyEvents.sleepingBear=false;
    }

    //Enraged Squirrels
    eventCheck = Math.random()
    if (eventCheck < 0.1){
        dailyEvents.enragedSquirrels=true;
    }else{
        dailyEvents.enragedSquirrels=false;
    }

    //Enraged Mushrooms
    eventCheck = Math.random()
    if (eventCheck < 0.1){
        dailyEvents.enragedMushrooms=true;
    }else{
        dailyEvents.enragedMushrooms=false;
    }

    //Enraged Bears
    eventCheck = Math.random()
    if (eventCheck < 0.1){
        dailyEvents.enragedBears=true;
    }else{
        dailyEvents.enragedBears=false;
    }

    //Store all daily event outcomes
    localStorage.setItem('dailyEvents',JSON.stringify(dailyEvents));

    localStorage.setItem('sleep','true');
    localStorage.setItem('storedPlayerStats', JSON.stringify(playerStats));
    playerSetup(); //Pull updated stats from local storage
    setStats(); //Update stats on page
    window.location.href = "../spaceship/spaceship.html"
}

//Function to check if a battle is active
function activeBattleCheck(){

    //Load data from local storage
    var retrievedObject = localStorage.getItem('battleStatusData');

    //Parse the JSON data into an object
    battleStatusData = JSON.parse(retrievedObject);

    if (battleStatusData.inProgress){//Check if a battle is in progress
        window.location.href = "../battle/battle.html"//If in progress, go to battle
    }
}

window.onload = activeBattleCheck();//Check for active battle on page load
window.onload = playerSetup();
window.onload = setStats();
