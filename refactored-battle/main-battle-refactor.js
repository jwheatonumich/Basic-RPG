function determineEnemyAbility(enemyBattleStats){

    //Randomly choose enemy's ability
    let enemyAbilityNumber = Math.random();
    let enemyAbility;

    //Determine which ability the enemy uses
    if(enemyAbilityNumber < enemyBattleStats.enemyAbility1Prob){
        enemyAbility = enemyBattleStats.enemyAbility1;
    }else if (enemyAbilityNumber < enemyBattleStats.enemyAbility2Prob){
        enemyAbility = enemyBattleStats.enemyAbility2;
    } else if(enemyAbilityNumber < enemyBattleStats.enemyAbility3Prob){
        enemyAbility = enemyBattleStats.enemyAbility3;
    } else{
        enemyAbility = enemyBattleStats.enemyAbility4;
    };

    return enemyAbility;

}

function determineEnemyStunned(enemyBattleStats){

    if(enemyBattleStats.stun == 1){
        let enemyAbility = abilityData["stunned"]; //If yes, swich the ability used to the stunned ability
        return enemyAbility
    }

};

function determinePlayerStunned(playerBattleStats){
    if(playerBattleStats.stun == 1){
        playerAbility = "stunned"; //If yes, swich the ability used to the stunned ability
    }
}

function storeDefaultStatus(){
    battleStatusData.inProgress = false;
    storeJSON(battleStatusData, 'battleStatusData')
};

function storeDefaultSettings(){
    battleSettingData.escape = true;
    battleSettingData.singleBattle = false;
    battleSettingData.mandatory = false;
    storeJSON(battleSettingData, 'battleSettings')
};

function flee(playerAlive,battleResult,escapeSetting){
    if(!playerAlive){

        gameOver();
        return "Player was dead, game over"; //Stop the function

    } else if(battleResult == "win"){

        storeDefaultStatus() //Don't save battle progress when you exit
        storeDefaultSettings() //Load default settings into global variables
        window.location.href = localStorage.getItem("lastPage"); //Exit to the prior page
        return "Player won battle, succesfully left"; //Stop the function

    } else if(!escapeSetting){

        //Update the battle text for the current turn
        battleText = "You cannot flee this battle!";
        document.getElementById("battle-text-div").innerHTML = battleText;
        return "Battle in progress, no escape allowed"; //Stop the function

    } else{ //Player attempts to flee from battle
        
        var fleeChance = Math.random(); //Determines flee success

        if (fleeChance > 0.5){//If flee successful, leave battle

            battleCleanup(); //Save changes to player stats
            storeDefaultStatus(); //Don't save the battle progress when you exit
            storeDefaultSettings();//Load default settings into global variables
            window.location.href = localStorage.getItem("lastPage");//Exit to the prior page
            return "Battle in progress, player succesfully escaped";//Stop the function

        } else{ //If flee not successful, player stunned for a round of battle

            playerStun = 1;
            return "Battle in progress, player tried and failed to escape";//Stop the function

        };
    };
};

function gameOver(){
    console.log("Game Over")

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

    //Set daily events for first day
    dailyEvents ={
        sleep:false
    };

    //Store daily events in local storage
    localStorage.setItem('dailyEvents',  JSON.stringify(dailyEvents));

    //Set battle status to false to prevent from being redirected into battle
    battleStatusData.inProgress = false;

    //Store daily events in local storage
    localStorage.setItem('battleStatusData',  JSON.stringify(battleStatusData));

    //Load settings into global variables
    battleSettingData.escape = true;
    battleSettingData.singleBattle = false;
    battleSettingData.mandatory = false;

    localStorage.setItem('battleSettings',  JSON.stringify(battleSettingData));

    //Can't load a new enemy
    document.getElementById("restart-button").setAttribute('onClick',"empty();");

    //Back button redirects to spaceship
    document.getElementById("back-button").setAttribute('onClick',"location.href='../spaceship-inside/control.html';");

    //Set the control screen text
    localStorage.setItem('controlScriptName', 'Dead');
    
    return; //Stop the function

};

function battleCleanup(){

        //Save health and xp after battle ends
        if (playerBattleStats.health < 0) {playerBattleStats.health = 0};
        playerStats.health = playerBattleStats.health ;
        playerStats.acorncoin = playerBattleStats.acorncoin; 
        playerStats.mushroomcoin = playerBattleStats.mushroomcoin; 
        playerStats.bearclawcoin = playerBattleStats.bearclawcoin; 
        playerStats.leafcoin = playerBattleStats.leafcoin; 
    
        storeJSON(playerStats, 'storedPlayerStats'); //Store updated player data in local storage
    
        //Reset variables at the end of battle
        playerBattleStats.armor = 0;
        enemyBattleStats.armor = 0;
        playerBattleStats.poison = 0;
        enemyBattleStats.poison = 0;
        enemyBattleStats.status = "";
        playerBattleStats.status = "";
        playerBattleStats.battleTurn = 1;

};

function attack(playerAbility){

    if(playerAbility == "flee"){ //If player tries to flee
        flee(playerBattleStats.health>0,battleResult,battleSettings.escape)
    }

    let enemyAbility = determineEnemyAbility(enemyStats); //Randomly assign enemy's ability this turn
    enemyAbility = determineEnemyStunned(enemyBattleStats); //If enemy is stunned, overwrite enemy ability
    playerAbility = determinePlayerStunned(playerBattleStats); //If player is stunned, overwrite player ability
}