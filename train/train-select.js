//Load player stats in localstorage
var retrievedObject = localStorage.getItem('storedPlayerStats');
var playerStats = JSON.parse(retrievedObject)

//Array of stats
var trainingOptions = ["Health","Attack","Defense"];
var trainingOutputs = ["maxhealth","attack","defense"]

//Store the dropdown element
selectMenu = document.getElementById("select-training")

//Create drop-down from enemy name array
function popDropdown() {
    for(element in trainingOptions)
        {
        var opt = document.createElement("option");
        opt.value= trainingOutputs[element];
        opt.innerHTML = trainingOptions[element];

        //Append to the dropdown
        selectMenu.appendChild(opt);
        }
}

function startTraining(){
    var trainingSelect = document.getElementById("select-training");
    var chosenTraining = trainingSelect.value;
    if (playerStats["acorncoin"] >= 5){
        playerStats[chosenTraining] +=1;
        playerStats["acorncoin"] -=5;
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
    
    document.getElementById("player-name").innerHTML = playerName;
    document.getElementById("character-stats").innerHTML = 
        'Health: ' + playerHealth + '/' +  playerMaxHealth + '<br />' +
        'Attack: ' + playerAttack + '<br />' +
        'Defense: ' + playerDefense
    document.getElementById("acorn-coin").innerHTML = playerAcornCoin;
    document.getElementById("mushroom-coin").innerHTML = playerMushroomCoin;
    document.getElementById("bearclaw-coin").innerHTML = playerBearclawCoin;
    document.getElementById("leaf-coin").innerHTML = leafCoin;
}

//Populate dropdown on page load
window.onload = popDropdown();

//Populate player stats on page load
window.onload = playerSetup();
window.onload = setStats();