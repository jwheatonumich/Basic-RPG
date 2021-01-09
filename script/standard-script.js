var playerStats;
var winstreakReward;

//Load player stats in localstorage
function loadPlayerStats(){
    var retrievedObject = localStorage.getItem('storedPlayerStats');
    playerStats = JSON.parse(retrievedObject)
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
    day = playerStats.day;
}

//Function that sets text on the website equal to various stat variables
function setStats() {
        if(document.getElementById("player-name")){//Only run if on a page with player name
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
}

//Add random numbers of coins to the player's inventory
function sleep() {
    
    //Increment the day by 1
    playerStats.day +=1

    //Determine if today has a scripted battle
    switch (playerStats.day){
        case 4:
            playerStats.scriptedBattle = [19];break;
        case 8:
            playerStats.scriptedBattle = [19];break;
        case 12:
            playerStats.scriptedBattle = [19];break;
        default:
            playerStats.scriptedBattle = false;break;
    }

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

    dailyEventGenerator();

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

//Function to check if today is a scripted battle
function scriptedBattleCheck(){

    if(playerStats.scriptedBattle){
        enemyID = playerStats.scriptedBattle
        playerStats.scriptedBattle = false;
        localStorage.setItem('storedPlayerStats', JSON.stringify(playerStats));
        startBattle(enemyID, false, true)
    }

}

//Function to start a scripted fight
function narrativeStore(name){
    localStorage.setItem('scriptName', name);
    window.location.href = '../narrative/narrative.html'
};

//Function to set the link on the 'Back' button
function lastPage(page){
    localStorage.setItem('lastPage', page);
}

//Start the battle
function startBattle(enemyList, escape = true, singleBattle = false){

    battleSettings ={
        "escape":escape,
        "singleBattle":singleBattle
    }

    localStorage.setItem('battleSettings', JSON.stringify(battleSettings));

    localStorage.setItem('enemyList',enemyList)
    localStorage.setItem('winstreakReward',winstreakReward)

    window.location.href = "../battle/battle.html"
    lastPage(page);
}

//Blink leafcoins when low
function leafcoinAlert(){

    window.addEventListener("load", function() 
        {
            if(playerStats.leafcoin == 0){
                var f = document.getElementById('leaf-coin');
                setInterval(function() {
                    f.style.color = (f.style.color == 'red' ? 'white' : 'red');
        }
    , 1000);
}
    }, false);

}

window.onload = loadPlayerStats();
window.onload = activeBattleCheck();//Check for active battle on page load
window.onload = playerSetup();
window.onload = setStats();
window.onload = scriptedBattleCheck();
window.onload = leafcoinAlert();