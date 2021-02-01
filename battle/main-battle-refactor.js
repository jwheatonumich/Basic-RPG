func = {};

//If running in node, export all functions
if (typeof exports === 'object'){
    module.exports = {func}
}

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
    if(battleStatusData.result == "game over"){

        //Game is over, go to start screen
        func.gameOver();
        window.location.href = localStorage.getItem("lastPage");//Exit to the prior page
        return true;

    }else if(battleStatusData.result == "win"){

        func.storeDefaultStatus() //Don't save battle progress when you exit
        func.storeDefaultSettings() //Load default settings into global variables
        window.location.href = localStorage.getItem("lastPage"); //Exit to the prior page
        return true;

    }else if(!escapeSetting){

        //Update the battle text for the current turn
        battleText = "You cannot flee this battle!";
        document.getElementById("battle-text-div").innerHTML = battleText;
        return true;

    }else if(battleStatusData.result == "lose"){

        [playerBattleStats, enemyBattleStats] = func.battleCleanup(playerBattleStats, enemyBattleStats); //Save changes to player stats
        func.storeDefaultStatus() //Don't save battle progress when you exit
        func.storeDefaultSettings() //Load default settings into global variables
        window.location.href = localStorage.getItem("lastPage");//Exit to the prior page
        return true;

    }else{ //Player attempts to flee from battle
        
        var fleeChance = Math.random(); //Determines flee success

        if (fleeChance > 0.5){//If flee successful, leave battle
            
            [playerBattleStats, enemyBattleStats] = func.battleCleanup(playerBattleStats, enemyBattleStats); //Save changes to player stats
            func.storeDefaultStatus(); //Don't save the battle progress when you exit
            func.storeDefaultSettings();//Load default settings into global variables
            window.location.href = localStorage.getItem("lastPage");//Exit to the prior page

            return true;

        } else{ //If flee not successful, player stunned for a round of battle

            battleData.battleTextArray[6] = "You fail to flee."
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
        sleep:false,
        acornCatch:true
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
    playerBattleStats.attackMultiplier = parseFloat(abilityData[playerAbility]["selfAttackMultiplier"]*enemyAbility["opponentAttackMultiplier"]);
    playerBattleStats.defenseMultiplier = parseFloat(abilityData[playerAbility]["selfDefenseMultiplier"]*enemyAbility["opponentDefenseMultiplier"]);
    enemyBattleStats.attackMultiplier = parseFloat(abilityData[playerAbility]["opponentAttackMultiplier"]*enemyAbility["selfAttackMultiplier"]);
    enemyBattleStats.defenseMultiplier = parseFloat(abilityData[playerAbility]["opponentDefenseMultiplier"]*enemyAbility["selfDefenseMultiplier"]); 

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

func.resetBattleText = function(playerBattleStats,enemyBattleStats,battleData){

    //Clear the battle text
    battleData.battleText = "";
    battleData.battleTextArray = [,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,]

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

    battleData.battleTextArray[4] = func.arrayToString([
        `You strike fast with `,
        abilityData[playerAbility]["name"],
        `. The enemy takes `,
        playerAttackDamage,
        ` damage.`
    ]);

    return [enemyBattleStats,battleData]

};

func.enemyPriorityAttack = function(enemyAttackDamage,enemyAbility,playerBattleStats,battleData){

    playerBattleStats = func.dealDamage(enemyAttackDamage, playerBattleStats);

    battleData.battleTextArray[5] = func.arrayToString([
        `The enemy strike fast with `,
        enemyAbility["name"],
        `. You take `,
        enemyAttackDamage,
        ` damage.`
    ]);

    return [playerBattleStats,battleData]

};

func.executePlayerAttack = function(playerAttackDamage,playerAbility,abilityData,enemyBattleStats,battleData){

    enemyBattleStats = func.dealDamage(playerAttackDamage, enemyBattleStats);

    battleData.battleTextArray[6] = func.arrayToString([
        `You use `,
        abilityData[playerAbility]["name"],
        `. The enemy takes `,
        playerAttackDamage,
        ` damage.`
    ]);

    if(Math.floor(abilityData[playerAbility]["leech"]*playerAttackDamage) > 0){
        battleData.battleTextArray[6] = func.arrayToString([
            `You use `,
            abilityData[playerAbility]["name"],
            '. ',
            `You leech `,
            Math.floor(abilityData[playerAbility]["leech"]*playerAttackDamage),
            ' armor from your opponent.'
        ])
    }   

    return [enemyBattleStats,battleData]

};

func.executeEnemyAttack = function(enemyAttackDamage,enemyAbility,playerBattleStats,battleData){

    playerBattleStats = func.dealDamage(enemyAttackDamage, playerBattleStats);

    battleData.battleTextArray[7] = func.arrayToString([
        `The enemy uses `,
        enemyAbility["name"],
        `. You take `,
        enemyAttackDamage,
        ` damage.`
    ])

    if(Math.floor(enemyAbility["leech"]*enemyAttackDamage) > 0){
        battleData.battleTextArray[7] = func.arrayToString([
            `The enemy uses `,
            enemyAbility["name"],
            '. ',
            `The enemy leeches `,
            Math.floor(enemyAbility["leech"]*enemyAttackDamage),
            ' armor from you.'
        ])
    }   

    return [playerBattleStats,battleData]

};

func.calculatePlayerPoison = function(playerAbility,abilityData,battleData,enemyBattleStats,playerAbilityPoison){

    enemyBattleStats.poison += playerAbilityPoison;

    if(playerAbilityPoison!=0){battleData.battleTextArray[8] = `You poison the enemy!`};

    return [enemyBattleStats,battleData]

};

func.calculateEnemyPoison = function(enemyAbility,battleData,playerBattleStats,enemyAbilityPoison){

    playerBattleStats.poison += enemyAbilityPoison;

    if(enemyAbilityPoison!=0){battleData.battleTextArray[9] = `The enemy poisons you!`};

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
        playerBattleStats.attack *= abilityData[playerAbility]["selfAttack"];
        battleData.battleTextArray[10] = `You have increased your attack.`;
    };
    if (abilityData[playerAbility]["selfDefense"] !== null) {
        playerBattleStats.defense *= abilityData[playerAbility]["selfDefense"];
        battleData.battleTextArray[11] = `You have increased your defense.`;
    };
    if (abilityData[playerAbility]["opponentAttack"] !== null) {
        enemyBattleStats.attack *= abilityData[playerAbility]["opponentAttack"];
        battleData.battleTextArray[12] = `You have decreased your opponent's attack.`;
    };
    if (abilityData[playerAbility]["opponentDefense"] !== null) {
        enemyBattleStats.defense *= abilityData[playerAbility]["opponentDefense"];
        battleData.battleTextArray[13] = `You have decreased your opponent's defense.`;
    };

    if (enemyAbility["selfAttack"] !== null) {
        enemyBattleStats.attack *= enemyAbility["selfAttack"];
        battleData.battleTextArray[14] = `Your opponent increased their attack.`;
    };
    if (enemyAbility["selfDefense"] !== null) {
        enemyBattleStats.defense *= enemyAbility["selfDefense"];
        battleData.battleTextArray[15] = `Your opponent increased their defense`;
    };
    if (enemyAbility["opponentAttack"] !== null) {
        playerBattleStats.attack *= enemyAbility["opponentAttack"];
        battleData.battleTextArray[16] = `Your opponent decreased your attack`;
    };
    if (enemyAbility["opponentDefense"] !== null) {
        playerBattleStats.defense *= enemyAbility["opponentDefense"];
        battleData.battleTextArray[17] = `Your opponent decreased your defense`;
    };

    return battleData
};

func.setPoisonStunBattletext = function(playerBattleStats,enemyBattleStats, battleData){
    if(playerBattleStats.poison>0){battleData.battleTextArray[18] = `Poison deals you `+playerBattleStats.poison+` damage`};
    if(enemyBattleStats.poison>0){battleData.battleTextArray[19] = `Poison deals the enemy `+enemyBattleStats.poison+` damage`};
    if(playerBattleStats.stun==1){battleData.battleTextArray[20] = `You have been stunned!`};
    if(enemyBattleStats.stun==1){battleData.battleTextArray[21] = `The enemy has been stunned!`};

    return battleData;
};

func.loseBattle = function(battleStatusData, enemyBattleStats, battleSettingData){

    //Clear enemy stats and image on the page
    setEnemyStats({name:"None",health:0,maxhealth:0,armor:0,status:"",enemyPowerlevel:0},"../images/blank.png");

    //Attack buttons stop working
    stopPlayerAttack();

    //Reset player status and enemy health
    [battleStatusData, enemyBattleStats] = func.resetBattleStatus(battleStatusData, enemyBattleStats)

    func.storeDefaultSettings();

    //Save player and enemy stats in local storage
    initializeFunc.saveProgress(chosenEnemy,playerBattleStats,enemyBattleStats,battleStatusData);

    return [battleStatusData, enemyBattleStats, battleSettingData];
};

func.resetBattleStatus = function(battleStatusData, enemyBattleStats){
    battleStatusData.playerAlive = false
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
        battleData.battleTextArray[28] = `You win `+winstreakList[battleStatusData.winstreak-1]+' extra '+rewardName+` as a win streak bonus!`;
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

func.healWithLeafcoin = function(){
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

}

func.battleReset = function(playerBattleStats,enemyBattleStats, battleData, battleStatusData, battleSettingData){

    if(battleStatusData.result == "game over"){

        battleData.battleText = "You are dead and have no leaf coins. Click back to respawn.";
        document.getElementById("battle-text-div").innerHTML = battleData.battleText; 


    }else if(battleStatusData.result == "active"){//Can't reset if player and enemy are both alive

        battleData.battleText = "The current enemy is still alive!";
        document.getElementById("battle-text-div").innerHTML = battleData.battleText; 

    }else if(battleStatusData.result == "lose"){//Can update if player is dead or repeatable battle
        
        func.healWithLeafcoin()

        initializeFunc.restartBattle();
        pageSetup();
    
    }else if(!battleSettingData.singleBattle){//Can update if player is dead or repeatable battle
        initializeFunc.restartBattle();
        pageSetup();
    
    }else {//Can't repeat if not a repeatable battle

        battleData.battleText = "There are no more enemies to fight!";
        document.getElementById("battle-text-div").innerHTML = battleData.battleText;

    };

};

func.determineBattleResult = function(battleStatusData){

    if(playerBattleStats.health <= 0 && playerBattleStats.leafcoin <= 0){

        battleStatusData.result = "game over"

    }else if(playerBattleStats.health <= 0){

        battleStatusData.result = "lose"

    }else if(enemyBattleStats.health <= 0){

        battleStatusData.result = "win"

    }else{

        battleStatusData.result = "active" 

    }

    initializeFunc.storeJSON(battleStatusData, 'battleStatusData')

    return battleStatusData

}

func.arrayToString = function (array, breaks){

    let outputString = ""

    for (i in array){

        if(array[i] != undefined){


            tempString = array[i]

            if(breaks){tempString += "<br>"}

            outputString += tempString

        }

    }

    return outputString

};

func.resetStun = function(enemyBattleStats,playerBattleStats){

    //Abilities that only last one turn
    enemyBattleStats.stun = 0;
    playerBattleStats.stun = 0;
    
}

func.resetStatus = function(enemyBattleStats,playerBattleStats){

    //Clear player and enemy status
    enemyBattleStats.status = "";
    playerBattleStats.status = "";

}

func.initializeBattle = function(playerBattleStats,enemyBattleStats,battleData){

    //Reset single turn effects including stun, player status, and battle text
    [playerBattleStats,enemyBattleStats,battleData] = func.resetBattleText(playerBattleStats,enemyBattleStats,battleData)
    func.resetStatus(enemyBattleStats,playerBattleStats);

    return [playerBattleStats,enemyBattleStats,battleData]
}

func.determineAbilities = function(playerAbility,enemyBattleStats,playerBattleStats){
    enemyAbility = func.determineEnemyAbility(enemyBattleStats); //Randomly assign enemy's ability this turn
    enemyAbility = func.determineEnemyStunned(enemyAbility, enemyBattleStats); //If enemy is stunned, overwrite enemy ability
    playerAbility = func.determinePlayerStunned(playerAbility, playerBattleStats); //If player is stunned, overwrite player ability

    return [enemyAbility, playerAbility]
}

func.battleCalculations = function(playerAbility, enemyAbility, abilityData, playerBattleStats, enemyBattleStats){
    //Set attack and defense multipliers for this turn based on player and enemy abilities
    [playerBattleStats, enemyBattleStats] = func.setPlayerMultipliers(playerAbility, enemyAbility, abilityData, playerBattleStats, enemyBattleStats);
        
    //Determine if either player's attack had priority
    let [playerPriority, enemyPriority] = [abilityData[playerAbility]["priority"],enemyAbility["priority"]];

    //Set player/enemy armor, attack damage, and poison
    playerBattleStats.armor += abilityData[playerAbility]["armor"];
    if(abilityData[playerAbility]["armor"]>0){
        battleData.battleTextArray[2] = `You gain `+abilityData[playerAbility]["armor"]+' armor.';
    }

    enemyBattleStats.armor += enemyAbility["armor"];
    if(enemyAbility["armor"]>0){
        battleData.battleTextArray[3] = `Your opponent gains `+enemyAbility["armor"]+' armor.';
    }

    playerAttackDamage = func.calculatePlayerAttack(playerBattleStats,enemyBattleStats);
    enemyAttackDamage = func.calculateEnemyAttack(playerBattleStats,enemyBattleStats);

    //Add armor for leech attcks
    playerBattleStats.armor += Math.floor(abilityData[playerAbility]["leech"]*playerAttackDamage);

    enemyBattleStats.armor += Math.floor(enemyAbility["leech"]*enemyAttackDamage);

    playerAttackDamage = func.playerZeroDamage(playerAbility, abilityData, playerBattleStats, playerAttackDamage);
    enemyAttackDamage = func.enemyZeroDamage(enemyAbility, enemyBattleStats, enemyAttackDamage);

    playerAbilityPoison = abilityData[playerAbility]["poison"];
    enemyAbilityPoison = enemyAbility["poison"];

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

    //Reset stuns
    func.resetStun(enemyBattleStats,playerBattleStats);

    //Determine if player/enemy are stunned next turn
    enemyBattleStats = func.calculateEnemyStunned(abilityData, playerAbility,enemyBattleStats)
    playerBattleStats = func.calculatePlayerStunned(enemyAbility, playerBattleStats)
}

func.executeTurnEnd = function(){
    //Ending the turn if the player died but has leaf coin
    if(battleStatusData.result == "lose"){

        [battleStatusData, enemyBattleStats, battleSettingData] = func.loseBattle(battleStatusData, enemyBattleStats, battleSettingData);

        battleData.battleText = "Your health has been reduced to zero.<br>Click 'Restart' to heal and battle again or 'Back' to exit.";

    //Ending the turn if the player died with no leaf coin
    }else if(battleStatusData.result == "game over"){

        battleData.battleText = "Your health has been reduced to zero. You have no leaf coins to heal.<br>Click 'Back' to respawn.";

        stopPlayerAttack();//Player can't attack

        func.gameOver();

    }else if(battleStatusData.result == "win"){//Ending the turn if the player lived


        battleStatusData.winstreak += 1;
        battleData.battleTextArray[29] = "Your win streak is "+battleStatusData.winstreak+".";

        func.rewardBattleText(winstreakReward, winstreakList, battleSettingData, battleData, battleStatusData,playerBattleStats)[0];

        stopPlayerAttack();

        enemyBattleStats = func.calculateWinstreakReward(enemyBattleStats, winstreakList, winstreakReward,battleStatusData);

        [playerBattleStats, enemyBattleStats] = func.updatePlayerCoins(playerBattleStats,enemyBattleStats);

        setStats(playerBattleStats);
        setEnemyStats(enemyBattleStats,chosenEnemy["enemyImage"]);

    }
}

func.checkAbilityCost = function(playerAbility){

    //Check if player has coins to pay for their attack

    let playerHasCoins = true; //Defaults to yes since not all attacks have a cost


    //Check if ability requires acorn coins
    if(abilityData[playerAbility].hasOwnProperty("acorncoin")){
        //If yes, check if player has enough acorn coins
        if(playerBattleStats["acorncoin"] >= abilityData[playerAbility]["acorncoin"]){
            //If yes, subtract the acorn coins from player stats
            playerBattleStats["acorncoin"] -= abilityData[playerAbility]["acorncoin"];

        } else{
            //If player doesn't have enough acorn coins, return false
            playerHasCoins = false;
        }
    }

    if(abilityData[playerAbility].hasOwnProperty("mushroomcoin")){
        if(playerBattleStats["mushroomcoin"] >= abilityData[playerAbility]["mushroomcoin"]){
            playerBattleStats["mushroomcoin"] -= abilityData[playerAbility]["mushroomcoin"];

        } else{
            playerHasCoins = false;
        }
    }

    if(abilityData[playerAbility].hasOwnProperty("bearclawcoin")){
        if(playerBattleStats["mushroomcoin"] >= abilityData[playerAbility]["mushroomcoin"]){
            playerBattleStats["mushroomcoin"] -= abilityData[playerAbility]["mushroomcoin"];

        } else{
            playerHasCoins = false;
        }
    }

    if(abilityData[playerAbility].hasOwnProperty("leafcoin")){
        if(playerBattleStats["leafcoin"] >= abilityData[playerAbility]["leafcoin"]){
            playerBattleStats["leafcoin"] -= abilityData[playerAbility]["leafcoin"];

        } else{
            playerHasCoins = false;
        }
    }

    //Save any changes to player coins
    func.updateCoins(playerBattleStats, playerStats);

    return playerHasCoins;

}

func.updateCoins = function(playerBattleStats, playerStats){

    //Save player coin totals in battle to player stats
    playerStats.acorncoin = playerBattleStats.acorncoin; 
    playerStats.mushroomcoin = playerBattleStats.mushroomcoin; 
    playerStats.bearclawcoin = playerBattleStats.bearclawcoin; 
    playerStats.leafcoin = playerBattleStats.leafcoin; 

    initializeFunc.storeJSON(playerStats, 'storedPlayerStats'); //Store updated player data in local storage
}

func.battleHeal = function(playerBattleStats, enemyBattleStats, playerAbility, enemyAbility){

    if(abilityData[playerAbility]["heal"]){
        
        //How much did player heal?
        var playerHeal = Math.min(playerBattleStats.health + playerBattleStats.maxhealth * abilityData[playerAbility]["heal"],playerBattleStats.maxhealth) - playerBattleStats.health
        //Heal
        playerBattleStats.health = Math.min(playerBattleStats.health + playerBattleStats.maxhealth * abilityData[playerAbility]["heal"],playerBattleStats.maxhealth)
        //Update battle text
        battleData.battleTextArray[0] = `You gain `+playerHeal+' life.';
    }

    if(enemyAbility["heal"]){
        var enemyHeal = Math.min(enemyBattleStats.health + enemyBattleStats.maxhealth * enemyAbility["heal"], enemyBattleStats.maxhealth) - enemyBattleStats.health
        enemyBattleStats.health = Math.min(enemyBattleStats.health + enemyBattleStats.maxhealth * enemyAbility["heal"], enemyBattleStats.maxhealth)
        battleData.battleTextArray[1] = `Your enemy gains `+enemyHeal+' life.';
    }

    return [playerBattleStats,enemyBattleStats]

}

func.attack = function(playerAbility){

    //Reset any temporary variables for the battle
    [playerBattleStats,enemyBattleStats,battleData] = func.initializeBattle(playerBattleStats,enemyBattleStats,battleData)

    //Determine if player is trying to flee the battle
    if(playerAbility == "flee"){
        let fleeSuccessful = func.flee(battleStatusData.playerAlive,battleStatusData,battleSettingData.escape,playerBattleStats);

        if (fleeSuccessful){
            return;
        }

    }

    //Determine abilities player and enemy used
    [enemyAbility, playerAbility] = func.determineAbilities(playerAbility,enemyBattleStats,playerBattleStats);

    //Check if player has required resources to use their selected ability
    if(!func.checkAbilityCost(playerAbility)){
        setBattleText("You don't have enough coins to use this ability.")
        return;
    }

    //Healing abilities
    [playerBattleStats,enemyBattleStats] = func.battleHeal(playerBattleStats, enemyBattleStats, playerAbility, enemyAbility)

    //Battle calculations
    func.battleCalculations(playerAbility, enemyAbility, abilityData, playerBattleStats, enemyBattleStats);

    //Set battle text for stat changes, poison, and stun
    battleData = func.setStatChanges(abilityData, playerAbility, enemyAbility, battleData, playerBattleStats, enemyBattleStats);
    battleData = func.setPoisonStunBattletext(playerBattleStats,enemyBattleStats, battleData);

    battleStatusData.battleTurn +=1;

    //Update stats on page
    setStats(playerBattleStats);
    setEnemyStats(enemyBattleStats,chosenEnemy["enemyImage"]);

    //Determine the battle result
    battleStatusData = func.determineBattleResult(battleStatusData);

    //End the turn
    func.executeTurnEnd();

    //Convert battle text array to a string
    if(battleData.battleText == ""){battleData.battleText = func.arrayToString(battleData.battleTextArray, true)};

    //Save progress
    initializeFunc.saveProgress(chosenEnemy,playerBattleStats,enemyBattleStats,battleStatusData)

    //Display the battle text string on the page
    setBattleText(battleData.battleText); 

    //Generate reward images
    if (enemyBattleStats.health <= 0 && playerBattleStats.health > 0){

        func.generateRewardImages(enemyBattleStats);

    };

}