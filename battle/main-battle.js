//Global Variables
var chosenEnemy = localStorage.getItem('chosenEnemy'); //Get the enemy choice based on local storage
var enemyImageSelect = localStorage.getItem('enemyImageSelect');
var playerStats = {};
var enemyStats = [];

var enemyName = "";
var enemyHealth = 0;
var enemyMaxHealth = 0;
var enemyAttack = 0;
var enemyDefense = 0;
var enemyAcornCoin = 0;
var enemyMushroomCoin = 0
var enemyBearclawCoin = 0

var enemyPowerlevel = 0

var playerName = "";
var playerSpecies = "";
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
var enemyAttackMultiplier = 1;
var enemyDefenseMultiplier = 1;

var playerStatus = ""
var playerStun = 0;
var playerPoison = 0;

var enemyStatus = ""
var enemyStun = 0;
var enemyPoison = 0;

var playerArmor = 0;
var enemyArmor = 0;

var playerAbility1 = "";
var playerAbility2 = "";
var playerAbility3 = "";
var playerAbility4 = "";

var enemyAbility1 = "";
var enemyAbility2 = "";
var enemyAbility3 = "";
var enemyAbility4 = "";

var battleTurn = 1


//Load data from either local storage or create if no local storage exists
function dataLoad(){

    //Retrieve player stats from local storage and convert the string into a JSON
    var retrievedObject = localStorage.getItem('storedPlayerStats');
    playerStats = JSON.parse(retrievedObject)

}

//Player Setup
function playerSetup() {
    playerName = playerStats.name;
    playerSpecies = playerStats.species;

    playerHealth = playerStats.health;
    playerMaxHealth = playerStats.maxhealth;
    playerAttack = playerStats.attack;
    playerDefense = playerStats.defense;

    playerAcornCoin = playerStats.acorncoin;
    playerMushroomCoin = playerStats.mushroomcoin;
    playerBearclawCoin = playerStats.bearclawcoin;
    playerLeafCoin = playerStats.leafcoin;

}

//Enemy Setup
function enemySetup() {
    enemyName = enemyStats[chosenEnemy].name;
    enemyHealth = enemyStats[chosenEnemy].health;
    enemyMaxHealth = enemyStats[chosenEnemy].maxhealth;
    enemyAttack = enemyStats[chosenEnemy].attack;
    enemyDefense = enemyStats[chosenEnemy].defense;
    enemyAcornCoin = enemyStats[chosenEnemy].acorncoin;
    enemyMushroomCoin = enemyStats[chosenEnemy].mushroomcoin;
    enemyBearclawCoin = enemyStats[chosenEnemy].bearclawcoin;

    enemyPowerlevel = 5*(enemyMaxHealth/4 + enemyAttack + enemyDefense)/(playerMaxHealth/4 + playerAttack + playerDefense);
}

//Function that sets text on the website equal to various stat variables
function setStats() {
    
    document.getElementById("player-name").innerHTML = playerName;
    document.getElementById("player-health").innerHTML = playerHealth + '/' +  playerMaxHealth;
    document.getElementById("player-armor").innerHTML = playerArmor;
    document.getElementById("player-status").innerHTML = playerStatus;

    document.getElementById("enemy-name").innerHTML = enemyName;
    document.getElementById("enemy-health").innerHTML = enemyHealth + '/' + enemyMaxHealth;
    document.getElementById("enemy-armor").innerHTML = enemyArmor;
    document.getElementById("enemy-status").innerHTML = enemyStatus;

    document.getElementById("enemy-image").src = enemyImageSelect; //Set the image source equal to the nth item in the picture list, where n is the value of the dropdown

    //Set the coin balances equal to the loaded variables
    document.getElementById("acorn-coin").innerHTML = playerAcornCoin;
    document.getElementById("mushroom-coin").innerHTML = playerMushroomCoin;
    document.getElementById("bearclaw-coin").innerHTML = playerBearclawCoin;
    document.getElementById("leaf-coin").innerHTML = playerLeafCoin;

    //Set the player image to their costume
    document.getElementById("character-image").src = playerStats.image;

    //Set the enemy powerlevel
    document.getElementById("powerlevel").value = enemyPowerlevel
}

function setAbilities(){
    //Set the attack button images based on the species
    document.getElementById("attack-button-1").src = speciesData[playerSpecies]["attackbutton1"];
    document.getElementById("attack-button-2").src = speciesData[playerSpecies]["attackbutton2"];
    document.getElementById("attack-button-3").src = speciesData[playerSpecies]["attackbutton3"];
    document.getElementById("attack-button-4").src = speciesData[playerSpecies]["attackbutton4"];

    //Set the onclick for each ability to the correct attack function based on the player's species
    document.getElementById("attack1").setAttribute("onClick", speciesData[playerSpecies]["attack1"])
    document.getElementById("attack2").setAttribute("onClick", speciesData[playerSpecies]["attack2"])
    document.getElementById("attack3").setAttribute("onClick", speciesData[playerSpecies]["attack3"])
    document.getElementById("attack4").setAttribute("onClick", speciesData[playerSpecies]["attack4"])

    //Load player ability names
    playerAbility1 = abilityData[speciesData[playerSpecies]["attack1Name"]];
    playerAbility2 = abilityData[speciesData[playerSpecies]["attack2Name"]];
    playerAbility3 = abilityData[speciesData[playerSpecies]["attack3Name"]];
    playerAbility4 = abilityData[speciesData[playerSpecies]["attack4Name"]];

    //Load enemy ability names
    enemyAbility1 = abilityData[speciesData[enemyStats[chosenEnemy]["species"]]["attack1Name"]];
    enemyAbility2 = abilityData[speciesData[enemyStats[chosenEnemy]["species"]]["attack2Name"]];
    enemyAbility3 = abilityData[speciesData[enemyStats[chosenEnemy]["species"]]["attack3Name"]];
    enemyAbility4 = abilityData[speciesData[enemyStats[chosenEnemy]["species"]]["attack4Name"]];
    
}

//Function to check if the battle is over
function battleStatus(){
    if (playerHealth <= 0){
        battleText = battleText.concat(`Your health is zero. You pass out.<br>`);
        battleCleanup();
    }

    if (enemyHealth <= 0){
        battleText = battleText.concat(`Enemy defeated!<br>`);
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

    //Reset variables at the end of battle
    playerArmor = 0;
    enemyStatus = "";
    playerStatus = "";

    //Store the updated data object in local storage, after turning the JSON to a string
    localStorage.setItem('storedPlayerStats', JSON.stringify(playerStats));
}

//Script that is run when clicking the attack button
function attack(playerAbility) {

    //Set multipliers for this turn
    attackMultiplier = abilityData[playerAbility]["selfAttackMultiplier"];
    defenseMultiplier = abilityData[playerAbility]["selfDefenseMultiplier"];
    opponentAttackMultiplier = abilityData[playerAbility]["opponentAttackMultiplier"];
    opponentDefenseMultiplier = abilityData[playerAbility]["opponentDefenseMultiplier"];

    //Set stats for future turns (if they were modified)
    if (abilityData[playerAbility]["selfAttack"] !== null) {
        playerAttack *= abilityData[playerAbility]["selfAttack"];
    };
    if (abilityData[playerAbility]["selfDefense"] !== null) {
        playerAttack *= abilityData[playerAbility]["selfDefense"];
    };
    if (abilityData[playerAbility]["opponentAttack"] !== null) {
        enemyAttack *= abilityData[playerAbility]["opponentAttack"];
    };
    if (abilityData[playerAbility]["opponentDefense"] !== null) {
        enemyAttack *= abilityData[playerAbility]["opponentDefense"];
    };

    //Set armor
    playerArmor += abilityData[playerAbility]["armor"];

    //Check if player or enemy is dead before running the battle function
    if(playerHealth>0 && enemyHealth>0){

        //Troubleshooting
        console.log("Turn:",battleTurn);
        
        //Calculate player and enemy attack
        var playerAttackDamage = Math.max(Math.floor(Math.random()*2*playerAttack*attackMultiplier - enemyDefense*enemyDefenseMultiplier),1);
        var enemyAttackDamage = Math.max(Math.floor(Math.random()*2*enemyAttack*enemyAttackMultiplier - playerDefense*defenseMultiplier),1);

        //Check if player should deal zero damage this round
        if(
            playerStun == 1|| //Was player stunned last round
            abilityData[playerAbility]["skipAttack"] == true //Did the player use an ability that skips their attack
        ){
            playerAttackDamage = 0;
        };

        //Did enemy get poisoned this turn
        enemyPoison += abilityData[playerAbility]["poison"]

        //Calculate total damage dealt by player and enemy
        var playerDamage = playerAttackDamage + enemyPoison;
        var enemyDamage = enemyAttackDamage + playerPoison;

        //Check if enemy should deal zero damage this round
        if(enemyStun == 1){ //Was enemy stunned last round
            enemyDamage = 0;
        };

        //Abilities that only last one turn
        enemyStun = 0;
        playerStun = 0;

        //Clear the status line
        enemyStatus = "";

        //Update health and armor based on damage
        playerArmor = Math.max(playerArmor - enemyDamage,0); //Damage goes to armor first
        enemyArmor = Math.max(enemyArmor - playerDamage,0);
        playerHealth -= Math.max((enemyDamage - playerArmor),0); //Remaining damage goes to health
        enemyHealth -= Math.max((playerDamage - enemyArmor),0);

        //Determine if enemy is stunned next turn
        enemyStun = Math.floor(Math.random()*(1/(1-abilityData[playerAbility]["stun"])))
        if(enemyStun == 1){
            enemyStatus = "Stunned"
        };
        
        //Store the text that will display this turn
        battleText = `You attack the enemy for `;
        battleText = battleText.concat(playerAttackDamage);
        battleText = battleText.concat(` damage.<br>`);
        if(playerPoison>0){battleText = battleText.concat(`Poison deals you `+playerPoison+` damage<br>`)};
        battleText = battleText.concat(`The enemy attacks you or `);
        battleText = battleText.concat(enemyAttackDamage);
        battleText = battleText.concat(` damage.<br>`);
        if(enemyPoison>0){battleText = battleText.concat(`Poison deals the enemy `+enemyPoison+` damage<br>`)};
        
        //Change turn
        battleTurn += 1;

        battleStatus();

        //Update text on site based on new health
        setStats();

    }

    //Update the battle text for the current turn
    document.getElementById("battle-text-div").innerHTML = battleText;

    //Add loot icons if the enemy is dead
    if (enemyHealth <= 0){
        //Loop to create acorn icons
        var i = 1;
        while (i <= enemyAcornCoin){

            //Create the images
            var elem = document.createElement("img");
            elem.src = '../images/acorn-coin.png';
            elem.setAttribute("class", "item");

            //Append the images
            document.getElementById("battle-text-div").appendChild(elem);
            i++;
        }
        
        //Loop to create mushroom icons
        var i = 1;
        while (i <= enemyMushroomCoin){

            //Create the images
            var elem = document.createElement("img");
            elem.src = '../images/mushroom-coin.png';
            elem.setAttribute("class", "item");

            //Append the images
            document.getElementById("battle-text-div").appendChild(elem);
            i++;
        }

        //Loop to create bearclaw icons
        var i = 1;
        while (i <= enemyBearclawCoin){

            //Create the images
            var elem = document.createElement("img");
            elem.src = '../images/bearclaw-coin.png';
            elem.setAttribute("class", "item");

            //Append the images
            document.getElementById("battle-text-div").appendChild(elem);
            i++;
        }

    }
}

//Clear the battle text
function resetText(){
    document.getElementById("battle-text-div").innerHTML = "Click the 'Attack' button to begin.";
}

//Setup back button
function backButton(buttonClick){
    document.getElementById("back-button").setAttribute('onClick', "location.href=\"" + buttonClick + "\";"); //Set the code it runs
}