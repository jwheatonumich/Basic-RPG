//Global Variables
var level = localStorage.getItem('chosenEnemy'); //Get the enemy choice based on local storage
var enemyImageSelect = localStorage.getItem('enemyImageSelect');
var playerStats = {};
var stats = [];

var enemyName = "";
var enemyHealth = 0;
var enemyMaxHealth = 0;
var enemyAttack = 0;
var enemyDefense = 0;
var enemyAcornCoin = 0;
var enemyMushroomCoin = 0
var enemyBearclawCoin = 0

var playerName = "";
var playerHealth = 0;
var playerMaxHealth = 0;
var playerAttack = 0;
var playerDefense = 0;
var playerAcornCoin = 0
var playerMushroomCoin = 0;
var playerBearclawCoin = 0;

var battleText = ``;
var attackMultiplier = 1;
var defenseMultiplier = 1;

//Load data from either local storage or create if no local storage exists
function dataLoad(){
    //Check if there is stored data for player stats. Otherwise, start from level 1
    if (localStorage.getItem("storedPlayerStats") === null) {
        //Set player and enemy stats
        playerStats = {"name":"Fred", "health":100, "maxhealth":100, "attack":10, "defense":5, "acorncoin":0, "mushroomcoin":0, "bearclawcoin":0, "leafcoin":10}

    }else{
        //If using the stored file, retrieve it and convert the string into a JSON
        var retrievedObject = localStorage.getItem('storedPlayerStats');
        playerStats = JSON.parse(retrievedObject)
    }

    stats = [
        {"name":"Wimpy Wombat", "enemyID":"0001", "health":50, "maxhealth":50, "attack":10, "defense":5, "acorncoin":1, "mushroomcoin":0, "bearclawcoin":0 },
        {"name":"Ordinary Otter", "enemyID":"0002", "health":100, "maxhealth":100, "attack":15, "defense":7, "acorncoin":2, "mushroomcoin":0, "bearclawcoin":0 } ,
        {"name":"Significant Squirrel", "enemyID":"0003", "health":200, "maxhealth":200, "attack":20, "defense":10, "acorncoin":0,"mushroomcoin":1, "bearclawcoin":0 } ,
        {"name":"Precarious Porcupine", "enemyID":"0003", "health":50, "maxhealth":50, "attack":100, "defense":10, "mushroomcoin":1,"acorncoin":2, "bearclawcoin":0 } 
    ]
}

//Enemy Setup
function enemySetup() {
    enemyName = stats[level].name;
    enemyHealth = stats[level].health;
    enemyMaxHealth = stats[level].maxhealth;
    enemyAttack = stats[level].attack;
    enemyDefense = stats[level].defense;
    enemyAcornCoin = stats[level].acorncoin;
    enemyMushroomCoin = stats[level].mushroomcoin;
    enemyBearclawCoin = stats[level].bearclawcoin;
}

//Player Setup
function playerSetup() {
    playerName = playerStats.name;
    playerHealth = playerStats.health;
    playerMaxHealth = playerStats.maxhealth;
    playerAttack = playerStats.attack;
    playerDefense = playerStats.defense;
    playerAcornCoin = playerStats.acorncoin;
    playerMushroomCoin = playerStats.mushroomcoin;
    playerBearclawCoin = playerStats.bearclawcoin;
    playerLeafCoin = playerStats.leafcoin;
}

//Function that sets text on the website equal to various stat variables
function setStats() {
    
    document.getElementById("player-name").innerHTML = playerName;
    document.getElementById("player-health").innerHTML = playerHealth + '/' +  playerMaxHealth;

    document.getElementById("enemy-name").innerHTML = enemyName;
    document.getElementById("enemy-health").innerHTML = enemyHealth + '/' + enemyMaxHealth;

    document.getElementById("enemy-image").src = enemyImageSelect; //Set the image source equal to the nth item in the picture list, where n is the value of the dropdown

    //Set the coin balances equal to the loaded variables
    document.getElementById("acorn-coin").innerHTML = playerAcornCoin;
    document.getElementById("mushroom-coin").innerHTML = playerMushroomCoin;
    document.getElementById("bearclaw-coin").innerHTML = playerBearclawCoin;
    document.getElementById("leaf-coin").innerHTML = playerLeafCoin;
}

//Function to check if the battle is over
function battleStatus(){
    if (playerHealth <= 0){
        battleText = `Game Over<br><br>`;
        battleCleanup();
    }

    if (enemyHealth <= 0){
        battleText = `Enemy Defeated<br><br>`;
        playerAcornCoin += enemyAcornCoin;
        playerMushroomCoin += enemyMushroomCoin;
        playerBearclawCoin += enemyBearclawCoin;
        battleCleanup();
    }
}

//At the end of the battle, save variables back to JSON and save JSON to local storage
function battleCleanup(){
    //Save health and xp after battle ends
    if (playerHealth < 0) {playerHealth = 0};
    playerStats.health = playerHealth ;
    playerStats.acorncoin = playerAcornCoin; 
    playerStats.mushroomcoin = playerMushroomCoin; 
    playerStats.bearclawcoin = playerBearclawCoin; 

    //Store the updated data object in local storage, after turning the JSON to a string
    localStorage.setItem('storedPlayerStats', JSON.stringify(playerStats));
}

//Script that is run when clicking the attack button
function attack() {
    //Check if player or enemy is dead before running the battle function
    if(playerHealth>0 && enemyHealth>0){
        
        //Determine which ability was chosen
        var abilitySelect = document.getElementById("ability");
        var chosenAbility = abilitySelect.value;

        //Determine multiplier if using a multiplier ability
        switch (chosenAbility) {
            case "None": attackMultiplier = 1; defenseMultiplier = 1; break;
            case "Charge": attackMultiplier = 1.2; defenseMultiplier = 0.8; break;
            case "Block": attackMultiplier = 0.8; defenseMultiplier = 1.2; break;
        }

        console.log(chosenAbility);
        console.log(attackMultiplier);
        console.log(defenseMultiplier);

        //Calculate player and enemy attack
        var playerDamage = Math.max(Math.floor(Math.random()*2*playerAttack*attackMultiplier - enemyDefense),1);
        var enemyDamage = Math.max(Math.floor(Math.random()*2*enemyAttack - playerDefense*defenseMultiplier),1);

        //Update health based on damage
        playerHealth -= enemyDamage;
        enemyHealth -= playerDamage;

        //Store the text that will display this turn
        battleText = `You deal ` + playerDamage + ` damage to the enemy.<br>
        The enemy deals ` + enemyDamage +` damage to you.`;
        

        battleStatus();

        //Update text on site based on new health
        setStats();
    }

    //Update the battle text for the current turn
    document.getElementById("battle-text-div").innerHTML = battleText;
}