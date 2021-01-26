func = {};

func.determineEnemyAbility = function(enemyBattleStats){

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

};

func.determineEnemyStunned = function(enemyAbility, enemyBattleStats){

    if(enemyBattleStats.stun == 1){
        enemyAbility = abilityData["stunned"]; //If yes, swich the ability used to the stunned ability
    }
    return enemyAbility
};

func.determinePlayerStunned = function(playerAbility, playerBattleStats){

    if(playerBattleStats.stun == 1){
        playerAbility = "stunned"; //If yes, swich the ability used to the stunned ability
    }
    return playerAbility
};

func.storeDefaultStatus = function(){
    battleStatusData.result = "";
    initializeFunc.storeJSON(battleStatusData, 'battleStatusData')
};

func.storeDefaultSettings = function(){
    battleSettingData.escape = true;
    battleSettingData.singleBattle = false;
    battleSettingData.mandatory = false;
    initializeFunc.storeJSON(battleSettingData, 'battleSettings')
};

func.flee = function(playerAlive,battleStatusData,escapeSetting,playerBattleStats){
    if(playerBattleStats.health <= 0){

        //Game is over, go to start screen
        func.gameOver();
        window.location.href = localStorage.getItem("lastPage");//Exit to the prior page
        return true;

    } else if(!playerAlive){

        //Battle is no longer active
        func.storeDefaultStatus()

        //Go to prior page
        window.location.href = localStorage.getItem("lastPage");//Exit to the prior page
        return true;

    }else if(battleStatusData.result == "win"){

        func.storeDefaultStatus() //Don't save battle progress when you exit
        func.storeDefaultSettings() //Load default settings into global variables
        window.location.href = localStorage.getItem("lastPage"); //Exit to the prior page
        return true;

    } else if(!escapeSetting){

        //Update the battle text for the current turn
        battleText = "You cannot flee this battle!";
        document.getElementById("battle-text-div").innerHTML = battleText;
        return false;

    } else{ //Player attempts to flee from battle
        
        var fleeChance = Math.random(); //Determines flee success

        if (fleeChance > 0.5){//If flee successful, leave battle
            
            [playerBattleStats, enemyBattleStats] = func.battleCleanup(playerBattleStats, enemyBattleStats); //Save changes to player stats
            func.storeDefaultStatus(); //Don't save the battle progress when you exit
            func.storeDefaultSettings();//Load default settings into global variables
            window.location.href = localStorage.getItem("lastPage");//Exit to the prior page

            console.log(battleStatusData.result);

            return true;

        } else{ //If flee not successful, player stunned for a round of battle

            playerBattleStats.stun = 1;
            return false;

        };
    };
};

func.empty = function(){};//Empty function used when player cannot attack

func.gameOver = function(){

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
    //battleStatusData.inProgress = false;
    battleStatusData.result = "";


    //Store daily events in local storage
    localStorage.setItem('battleStatusData',  JSON.stringify(battleStatusData));

    //Load settings into global variables
    battleSettingData.escape = true;
    battleSettingData.singleBattle = false;
    battleSettingData.mandatory = false;

    localStorage.setItem('battleSettings',  JSON.stringify(battleSettingData));

    //Can't load a new enemy
    document.getElementById("restart-button").setAttribute('onClick',"func.empty();");

    //Back button redirects to spaceship
    document.getElementById("back-button").setAttribute('onClick',"location.href='../spaceship-inside/control.html';");

    //Set the control screen text
    localStorage.setItem('controlScriptName', 'Dead');
    
    return; //Stop the function

};

func.battleCleanup = function(playerBattleStats, enemyBattleStats){

        //Save health and xp after battle ends
        if (playerBattleStats.health < 0) {playerBattleStats.health = 0};
        playerStats.health = playerBattleStats.health ;
        playerStats.acorncoin = playerBattleStats.acorncoin; 
        playerStats.mushroomcoin = playerBattleStats.mushroomcoin; 
        playerStats.bearclawcoin = playerBattleStats.bearclawcoin; 
        playerStats.leafcoin = playerBattleStats.leafcoin; 
    
        initializeFunc.storeJSON(playerStats, 'storedPlayerStats'); //Store updated player data in local storage
    
        //Reset variables at the end of battle
        playerBattleStats.armor = 0;
        enemyBattleStats.armor = 0;
        playerBattleStats.poison = 0;
        enemyBattleStats.poison = 0;
        enemyBattleStats.status = "";
        playerBattleStats.status = "";
        playerBattleStats.battleTurn = 1;

        return [playerBattleStats, enemyBattleStats];

};

func.setPlayerMultipliers = function(playerAbility, enemyAbility, abilityData, playerBattleStats, enemyBattleStats){
    playerBattleStats.attackMultiplier = parseInt(abilityData[playerAbility]["selfAttackMultiplier"]*enemyAbility["opponentAttackMultiplier"]);
    playerBattleStats.defenseMultiplier = parseInt(abilityData[playerAbility]["selfDefenseMultiplier"]*enemyAbility["opponentDefenseMultiplier"]);
    enemyBattleStats.attackMultiplier = parseInt(abilityData[playerAbility]["opponentAttackMultiplier"]*enemyAbility["selfAttackMultiplier"]);
    enemyBattleStats.defenseMultiplier = parseInt(abilityData[playerAbility]["opponentDefenseMultiplier"]*enemyAbility["selfDefenseMultiplier"]); 

    return [playerBattleStats, enemyBattleStats];
};

func.calculatePlayerAttack = function(playerBattleStats,enemyBattleStats){
    playerAttackDamage = Math.max(Math.floor(
        //Avg damage of 1, central outcomes more likely
        1.25 * Math.random()*playerBattleStats.attack*playerBattleStats.attackMultiplier 
        + 0.5 * Math.random()*playerBattleStats.attack*playerBattleStats.attackMultiplier
        + 0.25 * Math.random()*playerBattleStats.attack*playerBattleStats.attackMultiplier

        //Avg block of 0.5, central outcomes more likely
        - .75 * enemyBattleStats.defense*enemyBattleStats.defenseMultiplier
        -.25 * enemyBattleStats.defense*enemyBattleStats.defenseMultiplier
        ),1);//Minimum of one damage

        return playerAttackDamage
};

func.calculateEnemyAttack = function(playerBattleStats,enemyBattleStats){
    enemyAttackDamage = Math.max(Math.floor(
        //Avg damage of 1, central outcomes more likely
        1.25 * Math.random()*enemyBattleStats.attack*enemyBattleStats.attackMultiplier
        + 0.5 * Math.random()*enemyBattleStats.attack*enemyBattleStats.attackMultiplier
        + 0.25 * Math.random()*enemyBattleStats.attack*enemyBattleStats.attackMultiplier

        //Avg block of 0.5, central outcomes more likely
        - .75 * playerBattleStats.defense*playerBattleStats.defenseMultiplier
        - .25 * playerBattleStats.defense*playerBattleStats.defenseMultiplier
        ),1);//Minimum of one damage

        return enemyAttackDamage;
};

func.playerZeroDamage = function(playerAbility, abilityData, playerBattleStats, playerAttackDamage){
//Determine if player should deal zero damage this turn
    if(
        playerBattleStats.stun == 1 ||
        abilityData[playerAbility]["skipAttack"] == true
    ){
        playerAttackDamage = 0;
    };

    return playerAttackDamage;
};

func.enemyZeroDamage = function(enemyAbility, enemyBattleStats, enemyAttackDamage){
//Determine if the enemy should deal zero damage this turn
    if(
        enemyBattleStats.stun == 1 ||
        enemyAbility["skipAttack"] == true
    ){
        enemyAttackDamage = 0;
    };

    return enemyAttackDamage;
};

func.resetSingleTurnEffects = function(playerBattleStats,enemyBattleStats,battleData){
    //Abilities that only last one turn
    enemyBattleStats.stun = 0;
    playerBattleStats.stun = 0;

    //Clear player and enemy status
    enemyBattleStats.status = "";
    playerBattleStats.status = "";

    //Clear the battle text
    battleData.battleText = "";

    return [playerBattleStats,enemyBattleStats,battleData]
};

func.dealDamage = function(damage, stats){
//Update enemy armor and health based on enemy damage
    stats.armor = Math.max(stats.armor - damage,0);//Damage goes to armor first
    stats.health -= Math.max((damage - stats.armor),0);//Remaining damage goes to health

    return stats;
};

func.playerPriorityAttack = function(playerAttackDamage,playerAbility,abilityData,enemyBattleStats,battleData){

    enemyBattleStats = func.dealDamage(playerAttackDamage, enemyBattleStats);

    battleData.battleText = battleData.battleText.concat(`You strike fast with `);
    battleData.battleText = battleData.battleText.concat(abilityData[playerAbility]["name"]);
    battleData.battleText = battleData.battleText.concat(`. The enemy takes `);
    battleData.battleText = battleData.battleText.concat(playerAttackDamage);
    battleData.battleText = battleData.battleText.concat(` damage.<br>`);

    return [enemyBattleStats,battleData]

};

func.enemyPriorityAttack = function(enemyAttackDamage,enemyAbility,playerBattleStats,battleData){

    playerBattleStats = func.dealDamage(enemyAttackDamage, playerBattleStats);

    battleData.battleText = battleData.battleText.concat(`The enemy strike fast with `);
    battleData.battleText = battleData.battleText.concat(enemyAbility["name"]);
    battleData.battleText = battleData.battleText.concat(`. You take `);
    battleData.battleText = battleData.battleText.concat(enemyAttackDamage);
    battleData.battleText = battleData.battleText.concat(` damage.<br>`);

    return [playerBattleStats,battleData]

};

func.executePlayerAttack = function(playerAttackDamage,playerAbility,abilityData,enemyBattleStats,battleData){

    enemyBattleStats = func.dealDamage(playerAttackDamage, enemyBattleStats);

    battleData.battleText = battleData.battleText.concat(`You use `);
    battleData.battleText = battleData.battleText.concat(abilityData[playerAbility]["name"]);
    battleData.battleText = battleData.battleText.concat(`. The enemy takes `);
    battleData.battleText = battleData.battleText.concat(playerAttackDamage);
    battleData.battleText = battleData.battleText.concat(` damage.<br>`);

    return [enemyBattleStats,battleData]

};

func.executeEnemyAttack = function(enemyAttackDamage,enemyAbility,playerBattleStats,battleData){

    playerBattleStats = func.dealDamage(enemyAttackDamage, playerBattleStats);

    battleData.battleText = battleData.battleText.concat(`The enemy uses `);
    battleData.battleText = battleData.battleText.concat(enemyAbility["name"]);
    battleData.battleText = battleData.battleText.concat(`. You take `);
    battleData.battleText = battleData.battleText.concat(enemyAttackDamage);
    battleData.battleText = battleData.battleText.concat(` damage.<br>`);

    return [playerBattleStats,battleData]

};

func.calculatePlayerPoison = function(playerAbility,abilityData,battleData,enemyBattleStats,playerAbilityPoison){

    enemyBattleStats.poison += playerAbilityPoison;

    if(playerAbilityPoison!=0){battleData.battleText = battleData.battleText.concat(`You poison the enemy!<br>`)};

    return [enemyBattleStats,battleData]

};

func.calculateEnemyPoison = function(enemyAbility,battleData,playerBattleStats,enemyAbilityPoison){

    playerBattleStats.poison += enemyAbilityPoison;

    if(enemyAbilityPoison!=0){battleData.battleText = battleData.battleText.concat(`The enemy poisons you!<br>`)};

    return [playerBattleStats,battleData]

};

func.deadNoDamage = function(playerBattleStats,enemyBattleStats, playerAttackDamage, enemyAttackDamage){
    if (playerBattleStats.health <= 0){
        playerAttackDamage = 0
    }
    if (enemyBattleStats.health <= 0){
        enemyAttackDamage = 0
    }
    return [playerAttackDamage,enemyAttackDamage]
};

func.calculateEnemyStunned = function(abilityData, playerAbility, enemyBattleStats){
    if(abilityData[playerAbility]["stun"] >= Math.random()){
        enemyBattleStats.stun = 1
    } else{
        enemyBattleStats.stun = 0
    }

    if(enemyBattleStats.stun == 1){
        enemyBattleStats.status = "Stunned";
    };

    return enemyBattleStats
};

func.calculatePlayerStunned = function(enemyAbility, playerBattleStats){
    if(enemyAbility["stun"] >= Math.random()){
        playerBattleStats.stun = 1
    } else{
        playerBattleStats.stun = 0
    }

    if(playerBattleStats.stun == 1){
        playerBattleStats.status = "Stunned";
    };

    return playerBattleStats
};

func.setStatChanges = function(abilityData, playerAbility, enemyAbility, battleData, playerBattleStats, enemyBattleStats){
    if (abilityData[playerAbility]["selfAttack"] !== null) {
        playerBattleStats.attackMultiplier *= abilityData[playerAbility]["selfAttack"];
        battleData.battleText = battleData.battleText.concat(`You have increased your attack.<br>`);
    };
    if (abilityData[playerAbility]["selfDefense"] !== null) {
        playerBattleStats.defenseMultiplier *= abilityData[playerAbility]["selfDefense"];
        battleData.battleText = battleData.battleText.concat(`You have increased your defense.<br>`);
    };
    if (abilityData[playerAbility]["opponentAttack"] !== null) {
        enemyBattleStats.attackMultiplier *= abilityData[playerAbility]["opponentAttack"];
        battleData.battleText = battleData.battleText.concat(`You have decreased your opponent's attack.<br>`);
    };
    if (abilityData[playerAbility]["opponentDefense"] !== null) {
        enemyBattleStats.defenseMultiplier *= abilityData[playerAbility]["opponentDefense"];
        battleData.battleText = battleData.battleText.concat(`You have decreased your opponent's defense.<br>`);
    };

    if (enemyAbility["selfAttack"] !== null) {
        enemyBattleStats.attack *= enemyAbility["selfAttack"];
        battleData.battleText = battleData.battleText.concat(`Your opponent   attack.<br>`);
    };
    if (enemyAbility["selfDefense"] !== null) {
        enemyBattleStats.defense *= enemyAbility["selfDefense"];
        battleData.battleText = battleData.battleText.concat(`Your opponent increased their defense<br>`);
    };
    if (enemyAbility["opponentAttack"] !== null) {
        playerBattleStats.attack *= enemyAbility["opponentAttack"];
        battleData.battleText = battleData.battleText.concat(`Your opponent decreased your attack<br>`);
    };
    if (enemyAbility["opponentDefense"] !== null) {
        playerBattleStats.defense *= enemyAbility["opponentDefense"];
        battleData.battleText = battleData.battleText.concat(`Your opponent decreased your defense<br>`);
    };

    return battleData
};

func.setPoisonStunBattletext = function(playerBattleStats,enemyBattleStats, battleData){
    if(playerBattleStats.poison>0){battleData.battleText = battleData.battleText.concat(`Poison deals you `+playerBattleStats.poison+` damage<br>`)};
    if(enemyBattleStats.poison>0){battleData.battleText = battleData.battleText.concat(`Poison deals the enemy `+enemyBattleStats.poison+` damage<br>`)};
    if(playerBattleStats.stun==1){battleData.battleText = battleData.battleText.concat(`You have been stunned!<br>`)};
    if(enemyBattleStats.stun==1){battleData.battleText = battleData.battleText.concat(`The enemy has been stunned!<br>`)};

    return battleData;
};

func.loseBattle = function(battleStatusData, enemyBattleStats){

    //Clear enemy stats and image on the page
    setEnemyStats({name:"None",health:0,maxhealth:0,armor:0,status:"",enemyPowerlevel:0},"../images/blank.png");

    //Attack buttons stop working
    stopPlayerAttack();

    //Reset player status and enemy health
    [battleStatusData, enemyBattleStats] = func.resetBattleStatus(battleStatusData, enemyBattleStats)

    //Save player and enemy stats in local storage
    initializeFunc.saveProgress(chosenEnemy,playerBattleStats,enemyBattleStats,battleStatusData);

    return [battleStatusData, enemyBattleStats];
};

func.resetBattleStatus = function(battleStatusData, enemyBattleStats){
    battleStatusData.playerAlive = false
    battleStatusData.result = "lose";
    battleStatusData.winstreak = 0;
    enemyBattleStats.health = enemyBattleStats.maxhealth;

    return [battleStatusData, enemyBattleStats];
}

func.rewardBattleText = function(winstreakReward, winstreakList, battleSettingData, battleData, battleStatusData,playerBattleStats){
    
    let rewardName

    switch (winstreakReward){
        case 'acorncoin':
            rewardName = 'acorn coin(s)';
            break;
        case 'mushroomcoin':
            rewardName = 'mushroom coin(s)';
            break;
        case 'bearclawcoin':
            rewardName = 'bearclaw coin(s)';
            break;
    }

    //Add battletext describing the winstreak prize
    if (winstreakList[battleStatusData.winstreak-1] > 0){//Only if they win at least one coin as a winstreak prize
        playerBattleStatsplayerBattleStatsplayerBattleStatsplayerBattleStats = battleData.battleText.concat(`You win `+winstreakList[battleStatusData.winstreak-1]+' extra '+rewardName+` as a win streak bonus!<br>`);
    };

    //Redirect the player to the post battle narrative, if it exists
    if(battleSettingData.postBattleNarrative){
        playerBattleStats.scriptedBattle = battleSettingData.postBattleNarrative;

        localStorage.setItem('scriptName',battleSettingData.postBattleNarrative); //Store the narrative that comes after the fight

        localStorage.setItem('lastPage',  "../narrative/narrative.html");
    };

    return [battleData, playerBattleStats];
};

func.calculateWinstreakReward = function(enemyBattleStats, winstreakList, winstreakReward,battleStatusData){
    if (winstreakReward == "acorncoin" && winstreakList[battleStatusData.winstreak-1]){//If arena rewards acorn coins
        enemyBattleStats.acorncoin += winstreakList[battleStatusData.winstreak-1];//Add acorncoins according to the winstreak list
    };

    if (winstreakReward == "mushroomcoin" && winstreakList[battleStatusData.winstreak-1]){
        enemyBattleStats.mushroomcoin += winstreakList[battleStatusData.winstreak-1];//Add acorncoins according to the winstreak list
    };

    if (winstreakReward == "bearclawcoin" && winstreakList[battleStatusData.winstreak-1]){
        enemyBattleStats.bearclawcoin += winstreakList[battleStatusData.winstreak-1];//Add acorncoins according to the winstreak list
    };

    return enemyBattleStats
};

func.updatePlayerCoins = function(playerBattleStats,enemyBattleStats){
    if (playerBattleStats.health <= 0){

        [playerBattleStats, enemyBattleStats] = func.battleCleanup(playerBattleStats, enemyBattleStats)

    }

    if (enemyBattleStats.health <= 0){

        playerBattleStats.acorncoin += enemyBattleStats.acorncoin;
        playerBattleStats.mushroomcoin += enemyBattleStats.mushroomcoin;
        playerBattleStats.bearclawcoin += enemyBattleStats.bearclawcoin;

        [playerBattleStats, enemyBattleStats] = func.battleCleanup(playerBattleStats, enemyBattleStats)
    }

    return [playerBattleStats, enemyBattleStats];
};

func.generateRewardImages = function(enemyBattleStats){
            //Loop to create acorn icons
            var i = 1;
            while (i <= enemyBattleStats.acorncoin){

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
            while (i <= enemyBattleStats.mushroomcoin){

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
            while (i <= enemyBattleStats.bearclawcoin){

                //Create the images
                var elem = document.createElement("img");
                elem.src = '../images/bearclaw-coin.png';
                elem.setAttribute("class", "item");

                //Append the images
                document.getElementById("battle-text-div").appendChild(elem);
                i++;
            }
};

func.battleReset = function(playerBattleStats,enemyBattleStats, battleData, battleStatusData, battleSettingData){

    if(enemyBattleStats.health > 0 && playerBattleStats.health > 0){//Can't reset if player and enemy are both alive

        battleData.battleText = "The current enemy is still alive!";
        document.getElementById("battle-text-div").innerHTML = battleData.battleText; 

    }else if((battleStatusData.result == "lose") || (!battleSettingData.singleBattle)){//Can update if player is dead or repeatable battle
        initializeFunc.restartBattle();
        pageSetup();
    
    }else {//Can't repeat if not a repeatable battle

        battleData.battleText = "There are no more enemies to fight!";
        document.getElementById("battle-text-div").innerHTML = battleData.battleText;

    };
};

func.attack = function(playerAbility){

    if(playerAbility == "flee"){ //If player tries to flee
        let fleeSuccessful = func.flee(battleStatusData.playerAlive,battleStatusData,battleSettingData.escape,playerBattleStats);

        if (fleeSuccessful){
            return;
        }

    }

    let enemyAbility = func.determineEnemyAbility(enemyBattleStats); //Randomly assign enemy's ability this turn
    enemyAbility = func.determineEnemyStunned(enemyAbility, enemyBattleStats); //If enemy is stunned, overwrite enemy ability
    playerAbility = func.determinePlayerStunned(playerAbility, playerBattleStats); //If player is stunned, overwrite player ability

    //Set attack and defense multipliers for this turn based on player and enemy abilities
    [playerBattleStats, enemyBattleStats] = func.setPlayerMultipliers(playerAbility, enemyAbility, abilityData, playerBattleStats, enemyBattleStats);
    
    //Determine if either player's attack had priority
    let [playerPriority, enemyPriority] = [abilityData[playerAbility]["priority"],enemyAbility["priority"]];


    if(playerBattleStats.health > 0 && enemyBattleStats.health > 0){ //Execute only if neither player nor enemy is dead

        //Set player/enemy armor, attack damage, and poison
        playerBattleStats.armor += abilityData[playerAbility]["armor"];
        enemyBattleStats.armor += enemyAbility["armor"];

        playerAttackDamage = func.calculatePlayerAttack(playerBattleStats,enemyBattleStats);
        enemyAttackDamage = func.calculateEnemyAttack(playerBattleStats,enemyBattleStats);

        playerAttackDamage = func.playerZeroDamage(playerAbility, abilityData, playerBattleStats, playerAttackDamage);
        enemyAttackDamage = func.enemyZeroDamage(enemyAbility, enemyBattleStats, enemyAttackDamage);
    
        playerAbilityPoison = abilityData[playerAbility]["poison"];
        enemyAbilityPoison = enemyAbility["poison"];

        //Reset single turn effects including stun, player status, and battle text
        [playerBattleStats,enemyBattleStats,battleData] = func.resetSingleTurnEffects(playerBattleStats,enemyBattleStats,battleData)

        //Player and enemy deal any priority attack damage
        if (playerPriority){
            [enemyBattleStats,battleData] = func.playerPriorityAttack(playerAttackDamage,playerAbility,abilityData,enemyBattleStats,battleData);
        };

        if(enemyPriority){
            [playerBattleStats,battleData] = func.enemyPriorityAttack(enemyAttackDamage,enemyAbility,playerBattleStats,battleData);
        }

        //Set player/enemy damage to zero if they are dead
        [playerAttackDamage,enemyAttackDamage] = func.deadNoDamage(playerBattleStats,enemyBattleStats, playerAttackDamage, enemyAttackDamage);
    
        //Player and enemy calculate poison damage
        if (playerBattleStats.health >= 0){
            [enemyBattleStats,battleData] = func.calculatePlayerPoison(playerAbility,abilityData,battleData,enemyBattleStats,playerAbilityPoison);
        };

        if(enemyBattleStats.health >= 0){
            [playerBattleStats,battleData] = func.calculateEnemyPoison(enemyAbility,battleData,playerBattleStats,enemyAbilityPoison);
        }

        //Player and enemy deal non-priority attack damage
        if (!playerPriority && (playerAttackDamage != 0)){
            [enemyBattleStats,battleData] = func.executePlayerAttack(playerAttackDamage,playerAbility,abilityData,enemyBattleStats,battleData);
        };

        if(!enemyPriority && (enemyAttackDamage !=0)){
            [playerBattleStats,battleData] = func.executeEnemyAttack(enemyAttackDamage,enemyAbility,playerBattleStats,battleData);
        }

        //Deal poison damage
        if(enemyBattleStats.poison>0){
            func.dealDamage(enemyBattleStats.poison, enemyBattleStats);//Player takes poison damage
        };

        if(playerBattleStats.poison>0){
            func.dealDamage(playerBattleStats.poison, playerBattleStats);//Enemy takes poison damage
        };

        //Determine if player/enemy are stunned next turn
        enemyBattleStats = func.calculateEnemyStunned(abilityData, playerAbility,enemyBattleStats)
        playerBattleStats = func.calculatePlayerStunned(enemyAbility, playerBattleStats)

        //Set battle text 
        battleData = func.setStatChanges(abilityData, playerAbility, enemyAbility, battleData, playerBattleStats, enemyBattleStats);
        battleData = func.setPoisonStunBattletext(playerBattleStats,enemyBattleStats, battleData);
    
        battleStatusData.battleTurn +=1;

        //Update stats on page
        setStats(playerBattleStats);
        setEnemyStats(enemyBattleStats,chosenEnemy["enemyImage"]);

        //Save battle status array in local storage
        initializeFunc.saveProgress(chosenEnemy,playerBattleStats,enemyBattleStats,battleStatusData)

        //Ending the turn if the player died
        if(playerBattleStats.health <= 0){

            [battleStatusData, enemyBattleStats] = func.loseBattle(battleStatusData, enemyBattleStats);

            //Revive if player has a leaf coin
            if(playerBattleStats.leafcoin > 0){

                playerBattleStats.leafcoin -= 1;
                playerBattleStats.health = playerBattleStats.maxhealth;

                battleData.battleText = "Your health has been reduced to zero. You use a leaf coin to heal.<br>Click Restart to battle again or back to exit.";
                setBattleText(battleData.battleText);

                [playerBattleStats, enemyBattleStats] = func.battleCleanup(playerBattleStats, enemyBattleStats);
                setStats(playerBattleStats);
                initializeFunc.saveProgress(chosenEnemy,playerBattleStats,enemyBattleStats,battleStatusData)

                enemyBattleStats.health = 0;
                enemyBattleStats.acorncoin = 0;
                enemyBattleStats.mushroomcoin = 0;
                enemyBattleStats.bearclawcoin = 0;

            }else{ //Game over if player has no leaf cons
                battleData.battleText = "Your health has been reduced to zero. You use a leaf coin to heal.<br>Click Restart to battle again or back to exit.";
                setBattleText(battleData.battleText);
    
                func.gameOver();
            };

        //Ending the turn if the player lived
        }else{ 

            if(enemyBattleStats.health <= 0){

                battleStatusData.result = "win"
                battleStatusData.winstreak += 1
                battleData.battleText = battleData.battleText.concat("Your win streak is "+battleStatusData.winstreak+".<br>")

                func.rewardBattleText(winstreakReward, winstreakList, battleSettingData, battleData, battleStatusData,playerBattleStats)[0];

            }else{

            battleStatusData.result = "active"

            }

            initializeFunc.saveProgress(chosenEnemy,playerBattleStats,enemyBattleStats,battleStatusData)

        }

        setBattleText(battleData.battleText);

        if (enemyBattleStats.health <= 0 && playerBattleStats.health > 0){

            stopPlayerAttack();

            enemyBattleStats = func.calculateWinstreakReward(enemyBattleStats, winstreakList, winstreakReward,battleStatusData);

            [playerBattleStats, enemyBattleStats] = func.updatePlayerCoins(playerBattleStats,enemyBattleStats);

            setStats(playerBattleStats);
            setEnemyStats(enemyBattleStats,chosenEnemy["enemyImage"]);

            initializeFunc.saveProgress(chosenEnemy,playerBattleStats,enemyBattleStats,battleStatusData)

            func.generateRewardImages(enemyBattleStats);

        };

    };

}

//If running in node, export all functions
if (typeof exports === 'object'){
    module.exports = {func}
}
