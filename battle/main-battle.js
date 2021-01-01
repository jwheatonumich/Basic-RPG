//Global Variables
var enemyListText = localStorage.getItem('enemyList');//Load possible enemy IDs
var enemyList = enemyListText.split(",").map(x=>+x);//Convert string to an array of numbers

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
var playerLeafCoin = 0;

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

var enemyAbility = "";

var battleTurn = 1

var winStreak = 0;


//Load player data from local storage
function dataLoad(){

    //Retrieve player stats from local storage and convert the string into a JSON
    var retrievedObject = localStorage.getItem('storedPlayerStats');
    playerStats = JSON.parse(retrievedObject)

}

//Select enemy from list of possible enemies
function selectEnemy(){

    //Select a random enemy ID from the enemyList array
    enemyID = enemyList[Math.floor(Math.random()*enemyList.length)];

    //Find and store the enemy that matches the ID
    for (i in enemyStats){
        if (enemyStats[i]["enemyID"] == enemyID){
            chosenEnemy = enemyStats[i];
        };
    };

    //Troubleshooting
    console.log(enemyID);
    console.log(chosenEnemy);
};

//Store relevant player stats in variables
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

//Store relevant enemy stats in variables
function enemySetup() {
    enemyName = chosenEnemy.stats.name;
    enemyHealth = chosenEnemy.stats.health;
    enemyMaxHealth = chosenEnemy.stats.maxhealth;
    enemyAttack = chosenEnemy.stats.attack;
    enemyDefense = chosenEnemy.stats.defense;
    enemyAcornCoin = chosenEnemy.stats.acorncoin;
    enemyMushroomCoin = chosenEnemy.stats.mushroomcoin;
    enemyBearclawCoin = chosenEnemy.stats.bearclawcoin;

    //Load ability probabilities
    enemyAbility1Prob = chosenEnemy.stats.ability1prob;
    enemyAbility2Prob = chosenEnemy.stats.ability2prob + enemyAbility1Prob;
    enemyAbility3Prob = chosenEnemy.stats.ability3prob + enemyAbility2Prob;
    enemyAbility4Prob = chosenEnemy.stats.ability4prob + enemyAbility3Prob;

    enemyPowerlevel = 20*(enemyMaxHealth/4 + enemyAttack + enemyDefense)/(playerMaxHealth/4 + playerAttack + playerDefense);
}

//Function that sets text on the website equal to various stat variables
function setStats() {
    
    document.getElementById("player-name").innerHTML = playerName;
    document.getElementById("player-health").innerHTML = playerHealth + '/' +  playerMaxHealth;
    document.getElementById("player-armor").innerHTML = playerArmor;
    document.getElementById("player-status").innerHTML = playerStatus;

    //Set the coin balances equal to the loaded variables
    document.getElementById("acorn-coin").innerHTML = playerAcornCoin;
    document.getElementById("mushroom-coin").innerHTML = playerMushroomCoin;
    document.getElementById("bearclaw-coin").innerHTML = playerBearclawCoin;
    document.getElementById("leaf-coin").innerHTML = playerLeafCoin;

    //Set the player image to their costume
    document.getElementById("character-image").src = playerStats.image;

}

function setEnemyStats(){

    
    document.getElementById("enemy-name").innerHTML = enemyName;
    document.getElementById("enemy-health").innerHTML = enemyHealth + '/' + enemyMaxHealth;
    document.getElementById("enemy-armor").innerHTML = enemyArmor;
    document.getElementById("enemy-status").innerHTML = enemyStatus;

    document.getElementById("enemy-image").src = chosenEnemy["enemyImage"]; //Set the image source equal to the nth item in the picture list, where n is the value of the dropdown

    //Set the enemy powerlevel
    document.getElementById("powerlevel").value = enemyPowerlevel
    document.getElementById("powerlevel2").value = enemyPowerlevel - 10
    document.getElementById("powerlevel3").value = enemyPowerlevel - 20
    document.getElementById("powerlevel4").value = enemyPowerlevel - 30
};

//Load player and enemy abilities based on their species
function setAbilities(){
    //Set the attack button text based on the species
    document.getElementById("attack1").innerHTML = speciesData[playerSpecies].attack1DisplayName;
    document.getElementById("attack2").innerHTML = speciesData[playerSpecies].attack2DisplayName;
    document.getElementById("attack3").innerHTML = speciesData[playerSpecies].attack3DisplayName;
    document.getElementById("attack4").innerHTML = speciesData[playerSpecies].attack4DisplayName;

    //Set the onclick for each ability to the correct attack function based on the player's species
    document.getElementById("attack1").setAttribute("onClick", speciesData[playerSpecies].attack1)
    document.getElementById("attack2").setAttribute("onClick", speciesData[playerSpecies].attack2)
    document.getElementById("attack3").setAttribute("onClick", speciesData[playerSpecies].attack3)
    document.getElementById("attack4").setAttribute("onClick", speciesData[playerSpecies].attack4)

    //Load player ability names
    playerAbility1 = abilityData[speciesData[playerSpecies].attack1Name];
    playerAbility2 = abilityData[speciesData[playerSpecies].attack2Name];
    playerAbility3 = abilityData[speciesData[playerSpecies].attack3Name];
    playerAbility4 = abilityData[speciesData[playerSpecies].attack4Name];

    //Load enemy ability names
    enemyAbility1 = abilityData[speciesData[chosenEnemy.stats.species]["attack1Name"]];
    enemyAbility2 = abilityData[speciesData[chosenEnemy.stats.species]["attack2Name"]];
    enemyAbility3 = abilityData[speciesData[chosenEnemy.stats.species]["attack3Name"]];
    enemyAbility4 = abilityData[speciesData[chosenEnemy.stats.species]["attack4Name"]];
    
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

//End of battle steps - save stats to local storage, reset temp statuses
function battleCleanup(){
    //Save health and xp after battle ends
    if (playerHealth < 0) {playerHealth = 0};
    playerStats.health = playerHealth ;
    playerStats.acorncoin = playerAcornCoin; 
    playerStats.mushroomcoin = playerMushroomCoin; 
    playerStats.bearclawcoin = playerBearclawCoin; 
    playerStats.leafcoin = playerLeafCoin; 

    //Store the updated data object in local storage, after turning the JSON to a string
    localStorage.setItem('storedPlayerStats', JSON.stringify(playerStats));

    //Reset variables at the end of battle
    playerArmor = 0;
    enemyArmor = 0;
    playerPoison = 0;
    enemyPoison = 0;
    enemyStatus = "";
    playerStatus = "";
    battleTurn = 1;

}

//Clear the battle text
function resetText(){
    document.getElementById("battle-text-div").innerHTML = "Click an attack to begin.";
}

//Setup back button
function backButton(buttonClick){
    document.getElementById("back-button").setAttribute('onClick', "location.href=\"" + buttonClick + "\";"); //Set the code it runs
}

//Function that prevents player from using the attack links
function stopPlayerAttack(){

    //Abilities use the empty function while player is dead
    document.getElementById("attack1").setAttribute('onClick',"empty();");
    document.getElementById("attack2").setAttribute('onClick',"empty();");
    document.getElementById("attack3").setAttribute('onClick',"empty();");
    document.getElementById("attack4").setAttribute('onClick',"empty();");
}

//What happens when player dies without a way to heal
function gameOver(){

    //Reset player stats
    playerStats.acorncoin = 0;
    playerStats.attack = 10;
    playerStats.bearunlock = false;
    playerStats.bearclawcoin = 0;
    playerStats.caveday = 0;
    playerStats.day = 1;
    playerStats.defense = 10;
    playerStats.endurance = 10;
    playerStats.health = 40;
    playerStats.image = "../images/little-goblin.png";
    playerStats.leafcoin = 0;
    playerStats.maxhealth = 40;
    playerStats.mushroomcoin = 0;
    playerStats.mushroomunlock = false;
    playerStats.species = "gremlin"
    playerStats.squirrelunlock = false;
    playerStats.treeday = 0

    //Store the updated data object in local storage, after turning the JSON to a string
    localStorage.setItem('storedPlayerStats', JSON.stringify(playerStats));

    //Can't load a new enemy
    document.getElementById("restart-button").setAttribute('onClick',"empty();");

    //Back button redirects to spaceship
    document.getElementById("back-button").setAttribute('onClick',"location.href='../spaceship/spaceship.html';");

    //Store a value in local storage indicating player just died
    localStorage.setItem('playerDead', true);
}

//Define an empty function
function empty(){console.log('empty')};

//Prevent double tapping, to prevent accidental zooms
function noDoubleTap(){
    var time_stamp = 0; // Or Date.now()
    window.addEventListener("touchstart", function(event_) {
        if (event_.timeStamp - time_stamp < 300) { // A tap that occurs less than 300 ms from the last tap will trigger a double tap. This delay may be different between browsers.
            event_.preventDefault();
            return false;
        }
        time_stamp = event_.timeStamp;
    });
}

//Script that is run when clicking the attack button
function attack(playerAbility) {

    //Randomly choose enemy's ability
    var enemyAbilityNumber = Math.random();

    //Determine which ability the enemy uses
    if(enemyAbilityNumber < enemyAbility1Prob){
        enemyAbility = enemyAbility1
    }else if (enemyAbilityNumber < enemyAbility2Prob){
        enemyAbility = enemyAbility2
    } else if(enemyAbilityNumber < enemyAbility3Prob){
        enemyAbility = enemyAbility3
    } else{
        enemyAbility = enemyAbility4
    };

    //Check if player is stunned
    if(playerStun == 1){
        playerAbility = "stunned" //If yes, swich the ability used to the stunned ability
    }

    //Check if enemy is stunned
    if(enemyStun == 1){
        enemyAbility = abilityData["stunned"] //If yes, swich the ability used to the stunned ability
    }

        //Set attack and defense multipliers for this turn
        attackMultiplier = abilityData[playerAbility]["selfAttackMultiplier"]*enemyAbility["opponentAttackMultiplier"];
        defenseMultiplier = abilityData[playerAbility]["selfDefenseMultiplier"]*enemyAbility["opponentDefenseMultiplier"];
        opponentAttackMultiplier = abilityData[playerAbility]["opponentAttackMultiplier"]*enemyAbility["selfAttackMultiplier"];
        opponentDefenseMultiplier = abilityData[playerAbility]["opponentDefenseMultiplier"]*enemyAbility["selfDefenseMultiplier"];
    
        //Set player stats for future turns (if they were modified)
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
    
        //Set enemy stats for future turns (if they were modified)
        if (enemyAbility["selfAttack"] !== null) {
            enemyAttack *= enemyAbility["selfAttack"];
        };
        if (enemyAbility["selfDefense"] !== null) {
            enemyAttack *= enemyAbility["selfDefense"];
        };
        if (enemyAbility["opponentAttack"] !== null) {
            playerAttack *= enemyAbility["opponentAttack"];
        };
        if (enemyAbility["opponentDefense"] !== null) {
            playerAttack *= enemyAbility["opponentDefense"];
        };

    //Check if player or enemy is dead before running the battle function
    if(playerHealth>0 && enemyHealth>0){

        //Set armor before damage is dealt
        playerArmor += abilityData[playerAbility]["armor"];
        enemyArmor += enemyAbility["armor"];
        
        //Calculate player and enemy attack
        var playerAttackDamage = Math.max(Math.floor(
            //Avg damage of 1, central outcomes more likely
            1.25 * Math.random()*playerAttack*attackMultiplier 
            + 0.5 * Math.random()*playerAttack*attackMultiplier 
            + 0.25 * Math.random()*playerAttack*attackMultiplier 

            //Avg block of 0.5, central outcomes more likely
            - .75 * enemyDefense*enemyDefenseMultiplier
            -.25 * enemyDefense*enemyDefenseMultiplier
            ),1);

        var enemyAttackDamage = Math.max(Math.floor(
            //Avg damage of 1, central outcomes more likely
            1.25 * Math.random()*enemyAttack*enemyAttackMultiplier 
            + 0.5 * Math.random()*enemyAttack*enemyAttackMultiplier 
            + 0.25 * Math.random()*enemyAttack*enemyAttackMultiplier 

            //Avg block of 0.5, central outcomes more likely
            - .75 * playerDefense*defenseMultiplier
            - .25 * playerDefense*defenseMultiplier
            ),1);

        //Troubleshooting
        console.log("Player attack damage: ",playerAttackDamage);
        console.log("Enemy attack damage: ",enemyAttackDamage);

        //Add armor for leech attcks
        playerArmor += Math.floor(abilityData[playerAbility]["leech"]*playerAttackDamage);
        enemyArmor += Math.floor(enemyAbility["leech"]*enemyAttackDamage);

        //Check if player should deal zero damage this round
        if(
            playerStun == 1 ||
            abilityData[playerAbility]["skipAttack"] == true //Did the player use an ability that skips their attack
        ){
            playerAttackDamage = 0;
        };

        //Check if enemy should deal zero damage this round
        if(
            enemyStun == 1|| //Was player stunned last round
            enemyAbility["skipAttack"] == true //Did the player use an ability that skips their attack
        ){ //Was enemy stunned last round
            enemyAttackDamage = 0;
        };

        //Did enemy get poisoned this turn
        enemyPoison += abilityData[playerAbility]["poison"]
        playerPoison += enemyAbility["poison"]

        //Calculate total damage dealt by player and enemy
        var playerDamage = playerAttackDamage + enemyPoison;
        var enemyDamage = enemyAttackDamage + playerPoison;



        //Abilities that only last one turn
        enemyStun = 0;
        playerStun = 0;

        //Clear the status line
        enemyStatus = "";
        playerStatus = "";

        //Update health and armor based on damage
        playerArmor = Math.max(playerArmor - enemyDamage,0); //Damage goes to armor first
        enemyArmor = Math.max(enemyArmor - playerDamage,0);
        playerHealth -= Math.max((enemyDamage - playerArmor),0); //Remaining damage goes to health
        enemyHealth -= Math.max((playerDamage - enemyArmor),0);

        //Determine if enemy is stunned next turn
        enemyStun = Math.floor(Math.random()*(1/(1-abilityData[playerAbility]["stun"])))
        if(enemyStun == 1){
            enemyStatus = "Stunned"

            //Troubleshooting
            console.log("Enemy is stunned next round")
        };

        //Determine if player is stunned next turn
        playerStun = Math.floor(Math.random()*(1/(1-enemyAbility["stun"])))
        if(playerStun == 1){
            playerStatus = "Stunned"
            
            //Troubleshooting
            console.log("Player is stunned next round")
        };

        //Store the text that will display this turn
        battleText = `You use `
        battleText = battleText.concat(abilityData[playerAbility]["name"]);
        battleText = battleText.concat(`. The enemy takes `);
        battleText = battleText.concat(playerAttackDamage);
        battleText = battleText.concat(` damage.<br>`);
        battleText = battleText.concat(`The enemy uses `);
        battleText = battleText.concat(enemyAbility["name"]);
        battleText = battleText.concat(`. You take `);
        battleText = battleText.concat(enemyAttackDamage);
        battleText = battleText.concat(` damage.<br>`);
        if(playerPoison>0){battleText = battleText.concat(`Poison deals you `+playerPoison+` damage<br>`)};
        if(enemyPoison>0){battleText = battleText.concat(`Poison deals the enemy `+enemyPoison+` damage<br>`)};
        if(playerStun==1){battleText = battleText.concat(`You have been stunned!<br>`)};
        if(enemyStun==1){battleText = battleText.concat(`The enemy has been stunned!<br>`)};
        
        //Change turn
        battleTurn += 1;

        battleStatus();

        //Update text on site based on new health
        setStats();
        setEnemyStats();

    }

    if (playerHealth <= 0){

        //Clear enemy info
        document.getElementById("enemy-name").innerHTML = "None";
        document.getElementById("enemy-health").innerHTML = "";
        document.getElementById("enemy-armor").innerHTML = "";
        document.getElementById("enemy-status").innerHTML = "";
        document.getElementById("enemy-image").src = "../images/blank.png";

        //Prevent player from attacking
        stopPlayerAttack();

        //End win streak
        winStreak = 0;

        if(playerLeafCoin > 0){
            //Heal player for a leaf coin
            playerLeafCoin -= 1;
            playerHealth = playerMaxHealth;
            document.getElementById("player-health").innerHTML = playerHealth + '/' +  playerMaxHealth;
        
            battleText = "Your health has been reduced to zero. You use a leaf coin to heal.<br>Click Restart to battle again or back to exit.";
            
            battleCleanup(); //Update stats variables including coins
            setStats(); //Update stats on screen including coins
            
        }else{
            battleText = "Your health has been reduced to zero. You have no leaf coins to heal!"
            gameOver();
            //Add code to reset player stats including coins and day, and redirect to ship

        }

    };

    //Win streaks
    if (enemyHealth <= 0){

        //Increase win streak
        winStreak += 1;
        battleText = battleText.concat("Your win streak is "+winStreak+".<br>")
    }

    //Update the battle text for the current turn
    //Needs to go before coins are appended, otherwise it will erase them
    document.getElementById("battle-text-div").innerHTML = battleText;

    //Add loot icons if the enemy is dead
    if (enemyHealth <= 0 && playerHealth > 0){

        //Stop player from attacking while enemy is dead
        stopPlayerAttack();

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


