
var playerStats;
var winstreakReward;

//Load player stats in localstorage
function loadPlayerStats(){
    var retrievedObject = localStorage.getItem('storedPlayerStats');
    playerStats = JSON.parse(retrievedObject);
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
    
    //Load data from local storage
    var retrievedObject = localStorage.getItem('battleSettings');

    //Parse the JSON data into an object
    battleSettings = JSON.parse(retrievedObject);

    if (!battleSettings.mandatory){

        //Increment the day by 1
        playerStats.day +=1

        //Determine if today has a scripted battle
        switch (playerStats.day){
            case 4:
                playerStats.scriptedBattle = "Boss1";break;
            case 8:
                playerStats.scriptedBattle = "Boss2";break;
            case 12:
                playerStats.scriptedBattle = "Boss3";break;
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
    };
}

//Function to check if a battle is active
function activeBattleCheck(){

    //Load data from local storage
    var retrievedObject = localStorage.getItem('battleStatusData');

    //Parse the JSON data into an object
    battleStatusData = JSON.parse(retrievedObject);

    //Check that we are on a normal game screen, not the settings screen
    if(document.body.contains(document.getElementById("game-div"))){

        if (battleStatusData.result == "active"){//Check if a battle is in progress
            window.location.href = "../battle/battle.html"//If in progress, go to battle
        }

    }
}

//Function to check if a mandatory narrative is active
function activeNarrativeCheck(){

    //Load data from local storage
    var retrievedObject = localStorage.getItem('battleSettings');

    //Parse the JSON data into an object
    battleSettings = JSON.parse(retrievedObject);

    //Check that we are on a normal game screen, not the settings screen
    if(document.body.contains(document.getElementById("game-div"))){

        //Check if we are already on the narrative screen
        if(!(window.location.href.indexOf("narrative") > -1)){

            if (battleSettings.postBattleNarrative && battleSettings.mandatory){//Check if a mandatory narrative is active
                console.log("narrative")
                window.location.href = "../narrative/narrative.html"//If in progress, go to battle
            }

        }

    }

}

//Function to check if today is a scripted battle
function scriptedBattleCheck(){

    if(playerStats.scriptedBattle){
        scriptedBattle = playerStats.scriptedBattle
        playerStats.scriptedBattle = false;
        localStorage.setItem('storedPlayerStats', JSON.stringify(playerStats));
        narrativeStore(scriptedBattle);
        //startBattle(enemyID, false, true)
    }

}

//Function to start a scripted fight
function narrativeStore(name){
    localStorage.setItem('scriptName', name);
    window.location.href = '../narrative/narrative.html'
};

function defaultLastPage(){//Default page behaviour is to store the current page in the list of last pages
    if(typeof page === 'undefined'){
        page = window.location.href;
    }
    lastPage(page);
}

//Store the prior pages in local storage
function lastPage(page){

    if (localStorage.getItem('lastPage') === null){//If no local storage, create new array
        pageList = [];
    }else{
        pageList = JSON.parse(localStorage.getItem('lastPage')); //If local storage exists, store it
    }
    
    pageList.unshift(page) //Add the new page to the front of the list

    if(pageList.length > 10){ //If the list is more than 10 items long, get rid of the oldest
        pageList.pop();
    }

    localStorage.setItem('lastPage', JSON.stringify(pageList)); //Store the updated list
}

function backButton(){//Navigate to the prior page
    window.location.href = JSON.parse(localStorage.getItem('lastPage'))[1]; //Uses [1] because [0] is the current page
}

//Start the battle
function startBattle(enemyList, escape = true, singleBattle = false, mandatory = false, postBattleNarrative = false, enemyChoiceType = "random"){

    battleSettings ={
        "escape":escape,
        "singleBattle":singleBattle,
        "mandatory":mandatory, //Was used to prevent player from leaving narrative page
        "postBattleNarrative":postBattleNarrative,
        "enemyChoiceType":enemyChoiceType
    }

    localStorage.setItem('battleSettings', JSON.stringify(battleSettings));

    battleStatusData ={
        battleTurn:0,
        winstreak:0
    }

    localStorage.setItem('battleStatusData', JSON.stringify(battleStatusData));

    localStorage.setItem('enemyList',enemyList)
    localStorage.setItem('winstreakReward',winstreakReward)

    lastPage(page);
    window.location.href = "../battle/battle.html"
    
}

//Player gets three daily leaf coins
function dailyLeafCoins(){
    //Calculate how many of each coin to add
    treeLeafCoin =3

    //Add to player's stats
    playerStats["leafcoin"] +=treeLeafCoin;

    localStorage.setItem('storedPlayerStats', JSON.stringify(playerStats));
    playerSetup();
    setStats();
}

//Blink leafcoins when low
function leafcoinAlert(){
    window.addEventListener(
        "load", function(){
                var f = document.getElementById('leaf-coin');
                setInterval(
                    function(){
                        //If color = red, set white, otherwise set red
                        if(playerStats.leafcoin == 0){
                            f.style.color = (f.style.color == 'red' ? 'white' : 'red');
                        }else{
                            f.style.color = 'white'
                        }
                    }
                , 1000);
            }

    , false);
}

//Heal player for 1 leaf coin
function healMax(){

    if (playerStats.leafcoin > 0){
        playerStats.leafcoin-=1;
        playerStats.health = playerStats.maxhealth ;
    }
    
    //Store the updated data object in local storage, after turning the JSON to a string
    localStorage.setItem('storedPlayerStats', JSON.stringify(playerStats));

    playerSetup();
    setStats();
}

function startExplore(inputEnemies, inputEnemyCount){
    let exploreData = {};
    exploreData.enemyList = inputEnemies;
    exploreData.enemyCount = inputEnemyCount;
    localStorage.setItem('exploreData', JSON.stringify(exploreData));
};

window.onload = loadPlayerStats();
window.onload = activeBattleCheck();//Check for active battle on page load
window.onload = playerSetup();
window.onload = setStats();
window.onload = scriptedBattleCheck();
window.onload = leafcoinAlert();
window.onload = activeNarrativeCheck();
window.onload = defaultLastPage();