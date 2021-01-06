//Global Variables
var enemyListText = localStorage.getItem('enemyList');//Load possible enemy IDs
var enemyList = enemyListText.split(",").map(x=>+x);//Convert string to an array of numbers

var battleStatusData = {
    "inProgress":true,
    "battleTurn":1,
    "winstreak":0,
    "enemyID":1,
    "playerHealth":39,
    "enemyHealth":29,
    "playerPoison":0,
    "enemyPoison":0,
    "playerStun":0,
    "enemyStun":0,
    "playerStatus":"",
    "enemyStatus":""
};

var winstreakList = [0,0,1,0,2,0,0,0,0,10];//Rewards player gets for beating sequential enemies
var winstreakReward = localStorage.getItem('winstreakReward');//Type of rewards for winstreaks

var playerStats = {};
var enemyStats = [];

var enemyName = "";
var enemyHealth = 0;
var enemyMaxHealth = 0;
var enemyAttack = 0;
var enemyDefense = 0;
var enemyAcornCoin = 0;
var enemyMushroomCoin = 0;
var enemyBearclawCoin = 0;
var enemyAbilityPoison

var enemyPowerlevel = 0;

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
var playerAbilityPoison

var battleText = ``;
var attackMultiplier = 1;
var defenseMultiplier = 1;
var enemyAttackMultiplier = 1;
var enemyDefenseMultiplier = 1;

var playerStatus = "";
var playerStun = 0;
var playerPoison = 0;
var playerPriority = false;

var enemyStatus = "";
var enemyStun = 0;
var enemyPoison = 0;
var enemyPriority = false;

var playerArmor = 0;
var enemyArmor = 0;

var playerDamage = 0;
var enemyDamage = 0;

var playerAttackDamage;
var enemyAttackDamage;

var playerAbility1 = "";
var playerAbility2 = "";
var playerAbility3 = "";
var playerAbility4 = "";

var enemyAbility1 = "";
var enemyAbility2 = "";
var enemyAbility3 = "";
var enemyAbility4 = "";

var enemyAbility = "";

var battleTurn = 1;

var winstreak = 0;


//Load the battle status from local storage and save as a variable
function battleStatusLoad(){
    var retrievedObject = localStorage.getItem('battleStatusData');
    battleStatusData = JSON.parse(retrievedObject);
};

//Load player data from local storage
function dataLoad(){

    //Retrieve player stats from local storage and convert the string into a JSON
    var retrievedObject = localStorage.getItem('storedPlayerStats');
    playerStats = JSON.parse(retrievedObject);

};

//Select enemy from list of possible enemies
function selectEnemy(){

    //Select a random enemy ID from the enemyList array
    enemyID = enemyList[Math.floor(Math.random()*enemyList.length)];

    //If battle is in progress, use saved date
    if (battleStatusData.inProgress){
        enemyID = battleStatusData.enemyID;
    };

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

    //If battle is in progress, use saved date
    if (battleStatusData.inProgress){
        playerHealth = battleStatusData.playerHealth;
        playerPoison = battleStatusData.playerPoison;
        playerStun = battleStatusData.playerStun;
        playerStatus = battleStatusData.playerStatus;

        battleTurn = battleStatusData.battleTurn;
        winstreak = battleStatusData.winstreak;
    };

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

    //If battle is in progress, use saved date
    if (battleStatusData.inProgress){
        enemyHealth = battleStatusData.enemyHealth;
        enemyPoison = battleStatusData.enemyPoison;
        enemyStun = battleStatusData.enemyStun;
        enemyStatus = battleStatusData.enemyStatus;
    };

    //Load ability probabilities
    enemyAbility1Prob = chosenEnemy.stats.ability1prob;
    enemyAbility2Prob = chosenEnemy.stats.ability2prob + enemyAbility1Prob;
    enemyAbility3Prob = chosenEnemy.stats.ability3prob + enemyAbility2Prob;
    enemyAbility4Prob = chosenEnemy.stats.ability4prob + enemyAbility3Prob;

    enemyPowerlevel = 20*(enemyMaxHealth/4 + enemyAttack + enemyDefense)/(playerMaxHealth/4 + playerAttack + playerDefense);

    //Save the battle status in local storage
    saveProgress();
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
    document.getElementById("powerlevel").value = enemyPowerlevel;
    document.getElementById("powerlevel2").value = enemyPowerlevel - 10;
    document.getElementById("powerlevel3").value = enemyPowerlevel - 20;
    document.getElementById("powerlevel4").value = enemyPowerlevel - 30;
};

//Load player and enemy abilities based on their species
function setAbilities(){
    //Set the attack button text based on the species
    document.getElementById("attack1").innerHTML = speciesData[playerSpecies].attack1DisplayName;
    document.getElementById("attack2").innerHTML = speciesData[playerSpecies].attack2DisplayName;
    document.getElementById("attack3").innerHTML = speciesData[playerSpecies].attack3DisplayName;
    document.getElementById("attack4").innerHTML = speciesData[playerSpecies].attack4DisplayName;

    //Set the onclick for each ability to the correct attack function based on the player's species
    document.getElementById("attack1").setAttribute("onClick", speciesData[playerSpecies].attack1);
    document.getElementById("attack2").setAttribute("onClick", speciesData[playerSpecies].attack2);
    document.getElementById("attack3").setAttribute("onClick", speciesData[playerSpecies].attack3);
    document.getElementById("attack4").setAttribute("onClick", speciesData[playerSpecies].attack4);

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
        battleCleanup();
    }

    if (enemyHealth <= 0){
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

    storePlayerStats();

    //Reset variables at the end of battle
    playerArmor = 0;
    enemyArmor = 0;
    playerPoison = 0;
    enemyPoison = 0;
    enemyStatus = "";
    playerStatus = "";
    battleTurn = 1;
};

//Store player stats in local storage
function storePlayerStats(){
    //Store the updated data object in local storage, after turning the JSON to a string
    localStorage.setItem('storedPlayerStats', JSON.stringify(playerStats));
};

//Clear the battle text
function resetText(){
    document.getElementById("battle-text-div").innerHTML = "Click an attack to begin.";
};

//Setup back button
function backButton(buttonClick){
    //document.getElementById("back-button").setAttribute('onClick', "location.href=\"" + buttonClick + "\";"); //Set the code it runs
};

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

    //Generate a new set of daily events and save to local storage
    //dailyEventGenerator();

    //Reset player stats
    playerStats.acorncoin = 0;
    playerStats.attack = 10;
    playerStats.bearclawcoin = 0;
    playerStats.caveday = 0;
    playerStats.day = 1;
    playerStats.defense = 10;
    playerStats.endurance = 10;
    playerStats.health = 40;
    playerStats.image = "../images/little-goblin.png";
    playerStats.leafcoin = 3;
    playerStats.maxhealth = 40;
    playerStats.mushroomcoin = 0;
    playerStats.species = "gremlin";
    playerStats.treeday = 0;

    //Store the updated data object in local storage, after turning the JSON to a string
    localStorage.setItem('storedPlayerStats', JSON.stringify(playerStats));

    //Can't load a new enemy
    document.getElementById("restart-button").setAttribute('onClick',"empty();");

    //Back button redirects to spaceship
    document.getElementById("back-button").setAttribute('onClick',"location.href='../spaceship-inside/control.html';");

    //Set the control screen text
    localStorage.setItem('controlScriptName', 'Dead');
    
    return; //Stop the function
}

//Function to handle saving battle status if battle isn't over
function saveProgress(){

    if(playerHealth > 0 && enemyHealth > 0){//If battle is in progress
        //Save battle status in array
        battleStatusData.inProgress = true;
        battleStatusData.battleTurn = battleTurn;
        battleStatusData.winstreak = winstreak;
        battleStatusData.enemyID = enemyID;
        battleStatusData.playerHealth = playerHealth;
        battleStatusData.enemyHealth = enemyHealth;
        battleStatusData.playerPoison = playerPoison;
        battleStatusData.enemyPoison = enemyPoison;
        battleStatusData.playerStun = playerStun;
        battleStatusData.enemyStun = enemyStun;
        battleStatusData.playerStatus = playerStatus;
        battleStatusData.enemyStatus = enemyStatus;

    }else{ //If battle is not in progress
        battleStatusData.inProgress = false;//Set battle status to false
    };

    //Save battle status array in local storage
    localStorage.setItem('battleStatusData',  JSON.stringify(battleStatusData));
};

//Define an empty function
function empty(){console.log('empty')};

//Update enemy armor and health based on enemy damage
function playerDealDamage(damageType){
    enemyArmor = Math.max(enemyArmor - damageType,0);//Damage goes to armor first
    enemyHealth -= Math.max((damageType - enemyArmor),0);//Remaining damage goes to health
};

//Update player armor and health based on enemy damage
function enemyDealDamage(damageType){
    playerArmor = Math.max(playerArmor - damageType,0); //Damage goes to armor first
    playerHealth -= Math.max((damageType - playerArmor),0); //Remaining damage goes to health
};

//Sets player/enemy damage to zero if they are dead
function deadNoDamage(){
    if (playerHealth <= 0){
        playerAttackDamage = 0
    }
    if (enemyHealth <= 0){
        enemyAttackDamage = 0
    }
}

//Script that is run when clicking the attack button
function attack(playerAbility) {

    //Check if the player is trying to run away
    //Called through the Back button
    if(playerAbility == "flee"){
        //If enemy is dead, leave the battle
        if (enemyHealth <= 0){

            //Don't save the battle progress when you exit
            battleStatusData.inProgress = false;
            localStorage.setItem('battleStatusData',  JSON.stringify(battleStatusData));

            //Exit to the prior page
            window.location.href = localStorage.getItem("lastPage");
            return; //Stop the function
        
        //If player is dead, game over
        }else if(playerHealth <= 0){
            gameOver();

        //If player and enemy are both alive, player has chance to flee
        }else
        {
            var fleeChance = Math.random();

            //If flee successful, leave battle
            if (fleeChance > 0.5){

                //Save changes to player stats
                battleCleanup();

                //Don't save the battle progress when you exit
                battleStatusData.inProgress = false;
                localStorage.setItem('battleStatusData',  JSON.stringify(battleStatusData));

                //Exit to the prior page
                window.location.href = localStorage.getItem("lastPage");
                return;//Stop the function

            //If flee not successful, player stunned for a round of battle
            }else{
                playerStun = 1;
            };
        };
    };

    //Randomly choose enemy's ability
    var enemyAbilityNumber = Math.random();

    //Determine which ability the enemy uses
    if(enemyAbilityNumber < enemyAbility1Prob){
        enemyAbility = enemyAbility1;
    }else if (enemyAbilityNumber < enemyAbility2Prob){
        enemyAbility = enemyAbility2;
    } else if(enemyAbilityNumber < enemyAbility3Prob){
        enemyAbility = enemyAbility3;
    } else{
        enemyAbility = enemyAbility4;
    };

    //Check if player is stunned
    if(playerStun == 1){
        playerAbility = "stunned"; //If yes, swich the ability used to the stunned ability
    }

    //Check if enemy is stunned
    if(enemyStun == 1){
        enemyAbility = abilityData["stunned"]; //If yes, swich the ability used to the stunned ability
    }

    //Set attack and defense multipliers for this turn
    attackMultiplier = abilityData[playerAbility]["selfAttackMultiplier"]*enemyAbility["opponentAttackMultiplier"];
    defenseMultiplier = abilityData[playerAbility]["selfDefenseMultiplier"]*enemyAbility["opponentDefenseMultiplier"];
    opponentAttackMultiplier = abilityData[playerAbility]["opponentAttackMultiplier"]*enemyAbility["selfAttackMultiplier"];
    opponentDefenseMultiplier = abilityData[playerAbility]["opponentDefenseMultiplier"]*enemyAbility["selfDefenseMultiplier"];

    //Determine if player's or enemy's attacks have priority
    playerPriority = abilityData[playerAbility]["priority"];
    enemyPriority = enemyAbility["priority"];

    //Check if player or enemy is dead before proceeding
    if(playerHealth>0 && enemyHealth>0){

        //Set armor before damage is dealt
        playerArmor += abilityData[playerAbility]["armor"];
        enemyArmor += enemyAbility["armor"];
        
        //Calculate player attack
        playerAttackDamage = Math.max(Math.floor(
            //Avg damage of 1, central outcomes more likely
            1.25 * Math.random()*playerAttack*attackMultiplier 
            + 0.5 * Math.random()*playerAttack*attackMultiplier 
            + 0.25 * Math.random()*playerAttack*attackMultiplier 

            //Avg block of 0.5, central outcomes more likely
            - .75 * enemyDefense*enemyDefenseMultiplier
            -.25 * enemyDefense*enemyDefenseMultiplier
            ),1);//Minimum of one damage

        //Calculate enemy attack
        enemyAttackDamage = Math.max(Math.floor(
            //Avg damage of 1, central outcomes more likely
            1.25 * Math.random()*enemyAttack*enemyAttackMultiplier 
            + 0.5 * Math.random()*enemyAttack*enemyAttackMultiplier 
            + 0.25 * Math.random()*enemyAttack*enemyAttackMultiplier 

            //Avg block of 0.5, central outcomes more likely
            - .75 * playerDefense*defenseMultiplier
            - .25 * playerDefense*defenseMultiplier
            ),1);//Minimum of one damage

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


        //Did player or enemy use abilities that poison?
        playerAbilityPoison = abilityData[playerAbility]["poison"];
        enemyAbilityPoison = enemyAbility["poison"];

        //Abilities that only last one turn
        enemyStun = 0;
        playerStun = 0;

        //Clear player and enemy status
        enemyStatus = "";
        playerStatus = "";

        //Clear the battle text
        battleText = "";

        //Player deals damage if they used a priority attack
        if(playerPriority){
            playerDealDamage(playerAttackDamage);

            battleText = battleText.concat(`You strike fast with `)
            battleText = battleText.concat(abilityData[playerAbility]["name"]);
            battleText = battleText.concat(`. The enemy takes `);
            battleText = battleText.concat(playerAttackDamage);
            battleText = battleText.concat(` damage.<br>`);
        };

        //Enemy deals damage if they used a priority attack
        if(enemyPriority){
            enemyDealDamage(enemyAttackDamage);

            battleText = battleText.concat(`The enemy strike fast with `);
            battleText = battleText.concat(enemyAbility["name"]);
            battleText = battleText.concat(`. You take `);
            battleText = battleText.concat(enemyAttackDamage);
            battleText = battleText.concat(` damage.<br>`);
        };

        //If either player is dead at this point, set their damage to zero for the remainder of the turn
        deadNoDamage();

        //If player didn't die from priority attack, stack any poison damage they deal
        if(playerHealth >= 0){
            //Add this turn's poison amount to existing poison on player and enemy
            enemyPoison += abilityData[playerAbility]["poison"];
        }

        //If enemy didn't die from priority attack, stack any poison damage they deal
        if(enemyHealth >= 0){
            playerPoison += enemyAbility["poison"];
        }

        //Player deals damage if they didn't use a priority attack
        //And if they didn't die from a priority attack
        if(!playerPriority && (playerAttackDamage != 0)){
            playerDealDamage(playerAttackDamage);

            battleText = battleText.concat(`You use `);
            battleText = battleText.concat(abilityData[playerAbility]["name"]);
            battleText = battleText.concat(`. The enemy takes `);
            battleText = battleText.concat(playerAttackDamage);
            battleText = battleText.concat(` damage.<br>`);
        };

        //Enemy deals damage if they didn't use a priority attack
        //And if they didn't die from a priority attack
        if(!enemyPriority && (enemyAttackDamage !=0)){
            enemyDealDamage(enemyAttackDamage);

            battleText = battleText.concat(`The enemy uses `);
            battleText = battleText.concat(enemyAbility["name"]);
            battleText = battleText.concat(`. You take `);
            battleText = battleText.concat(enemyAttackDamage);
            battleText = battleText.concat(` damage.<br>`);
        };

        //Deal poison damage
        if(playerPoison>0){
            enemyDealDamage(playerPoison);//Player takes poison damage
        };
        if(enemyPoison>0){
            playerDealDamage(enemyPoison);//Enemy takes poison damage
        };


        //Determine if enemy is stunned next turn
        enemyStun = Math.floor(Math.random()*(1/(1-abilityData[playerAbility]["stun"])));

        if(enemyStun == 1){
            enemyStatus = "Stunned";

            //Troubleshooting
            console.log("Enemy is stunned next round");
        };

        //Determine if player is stunned next turn
        playerStun = Math.floor(Math.random()*(1/(1-enemyAbility["stun"])));

        if(playerStun == 1){
            playerStatus = "Stunned";
            
            //Troubleshooting
            console.log("Player is stunned next round");
        };

        //Set player stats for future turns (if they were modified)
        //Add battle text describing the stat change
        if (abilityData[playerAbility]["selfAttack"] !== null) {
            playerAttack *= abilityData[playerAbility]["selfAttack"];
            battleText = battleText.concat(`You have increased your attack.`);
        };
        if (abilityData[playerAbility]["selfDefense"] !== null) {
            playerAttack *= abilityData[playerAbility]["selfDefense"];
            battleText = battleText.concat(`You have increased your defense.`);
        };
        if (abilityData[playerAbility]["opponentAttack"] !== null) {
            enemyAttack *= abilityData[playerAbility]["opponentAttack"];
            battleText = battleText.concat(`You have decreased your opponent's attack.`);
        };
        if (abilityData[playerAbility]["opponentDefense"] !== null) {
            enemyAttack *= abilityData[playerAbility]["opponentDefense"];
            battleText = battleText.concat(`You have decreased your opponent's defense.`);
        };

        //Set enemy stats for future turns (if they were modified)
        if (enemyAbility["selfAttack"] !== null) {
            enemyAttack *= enemyAbility["selfAttack"];
            battleText = battleText.concat(`Your opponent increased their attack.`);
        };
        if (enemyAbility["selfDefense"] !== null) {
            enemyAttack *= enemyAbility["selfDefense"];
            battleText = battleText.concat(`Your opponent increased their defense`);
        };
        if (enemyAbility["opponentAttack"] !== null) {
            playerAttack *= enemyAbility["opponentAttack"];
            battleText = battleText.concat(`Your opponent decreased your attack`);
        };
        if (enemyAbility["opponentDefense"] !== null) {
            playerAttack *= enemyAbility["opponentDefense"];
            battleText = battleText.concat(`Your opponent decreased your defense`);
        };

        //Add battle text for poison and stun
        if(playerAbilityPoison!=0){battleText = battleText.concat(`You poison the enemy!<br>`)};
        if(enemyAbilityPoison!=0){battleText = battleText.concat(`The enemy poisons you!<br>`)};
        if(playerPoison>0){battleText = battleText.concat(`Poison deals you `+playerPoison+` damage<br>`)};
        if(enemyPoison>0){battleText = battleText.concat(`Poison deals the enemy `+enemyPoison+` damage<br>`)};
        if(playerStun==1){battleText = battleText.concat(`You have been stunned!<br>`)};
        if(enemyStun==1){battleText = battleText.concat(`The enemy has been stunned!<br>`)};

        //Increment turn count
        battleTurn += 1;

        //Check if player or enemy is dead. Deal with battle text and loot.
        //battleStatus();

        //Update text on site based on new health
        setStats();
        setEnemyStats();

        //Save the battle status in local storage
        saveProgress();

    }

    //How to end the turn if player died
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
        winstreak = 0;

        //Check if player has a leaf coin to heal
        if(playerLeafCoin > 0){
            //Heal player for a leaf coin
            playerLeafCoin -= 1;
            playerHealth = playerMaxHealth;
            document.getElementById("player-health").innerHTML = playerHealth + '/' +  playerMaxHealth;
        
            battleText = "Your health has been reduced to zero. You use a leaf coin to heal.<br>Click Restart to battle again or back to exit.";
            
            //Update the battle text for the current turn
            document.getElementById("battle-text-div").innerHTML = battleText;

            battleCleanup(); //Update stats variables including coins
            setStats(); //Update stats on screen including coins

            //Set enemy health to 0 so you can flee
            enemyHealth = 0;
            //Also set loot to 0 so player doesn't get reward from fleeing
            enemyAcornCoin = 0;
            enemyMushroomCoin = 0;
            enemyBearclawCoin = 0;

        //If no leaf coin, game is over
        }else{
            battleText = "Your health has been reduced to zero. You have no leaf coins to heal!"
            
            //Update the battle text for the current turn
            document.getElementById("battle-text-div").innerHTML = battleText;

            gameOver();

        }

    //How to end turn if the player lived
    } else{

        //Calculate the win streak and append it to the battle text
        if (enemyHealth <= 0){

            //Increase win streak
            winstreak += 1;
            battleText = battleText.concat("Your win streak is "+winstreak+".<br>")
        }

        //Update the battle text for the current turn
        document.getElementById("battle-text-div").innerHTML = battleText;

        //Add loot icons if the enemy is dead
        if (enemyHealth <= 0 && playerHealth > 0){

            //Stop player from attacking while enemy is dead
            stopPlayerAttack();

            //Determine if player gets a winstreak reward
            if (winstreakReward == "acorncoin" && winstreakList[winstreak-1]){//If arena rewards acorn coins
                enemyAcornCoin += winstreakList[winstreak-1];//Add acorncoins according to the winstreak list
            };

            if (winstreakReward == "mushroomcoin" && winstreakList[winstreak-1]){
            };

            if (winstreakReward == "bearclawcoin" && winstreakList[winstreak-1]){
            };

            //Update player coins
            battleStatus()

            //Update text on site based on new health
            setStats();
            setEnemyStats();

            //Save the battle status in local storage
            saveProgress();

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

}


