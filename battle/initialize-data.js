initializeFunc = {}

//----------------------LOAD DATA FUNCTIONS----------------------------

//Loads JSON data from local storage into an object
initializeFunc.loadJSON = function(jsonName){
    let retrievedObject = localStorage.getItem(jsonName);
    let parsedObject = JSON.parse(retrievedObject);
    return parsedObject;
};

//Loads list data from local storage into a list
initializeFunc.loadList = function(listName){
    let retrievedObject = localStorage.getItem(listName);
    let parsedObject = retrievedObject.split(",").map(x=>+x);
    return parsedObject
}

//----------------------STORE DATA FUNCTIONS----------------------------

//Store an object as a JSON in local storage
initializeFunc.storeJSON = function(objectName, JSONName){
    localStorage.setItem(JSONName, JSON.stringify(objectName));
}

//----------------------SETUP BATTLE FUNCTIONS----------------------------

//Select enemy
initializeFunc.selectEnemy = function(list,battleStatus,enemyStats){

    let enemyID = list[Math.floor(Math.random()*list.length)];//Determine a random enemy from the list of enemies

    //If battle is in progress, use saved date
    if (battleStatusData.result == "active"){
        enemyID = battleStatus.enemyID;
    };

    //Lookup enemy in object using selected ID
    for (i in enemyStats){
        if (enemyStats[i]["enemyID"] == enemyID){
            chosenEnemy = enemyStats[i];
            battleStatus.enemyID = enemyStats[i].enemyID
        };
    };

    initializeFunc.storeJSON(battleStatusData, 'battleStatusData');

    return chosenEnemy
}

//Store player stats in an object
initializeFunc.playerSetup = function(playerStats,battleStatus){

    playerBattleStats = {};

    //Load base player stats
    for (i in playerStats){
        playerBattleStats[i] = playerStats[i];
    }
    

    playerBattleStats.armor = 0;
    playerBattleStats.stun = 0;
    playerBattleStats.poison = 0;

    playerBattleStats.attackMultiplier = 1;
    playerBattleStats.defenseMultiplier = 1;

    playerBattleStats.status = "";

    //If battle is in-progress, override with in-progress stats
    if(battleStatusData.result == "active"){
        playerBattleStats.health = battleStatus.playerHealth;
        playerBattleStats.poison = battleStatus.playerPoison;
        playerBattleStats.stun = battleStatus.playerStun;
        playerBattleStats.status = battleStatus.playerStatus;
        playerBattleStats.attack = battleStatusData.playerAttack;
        playerBattleStats.defense = battleStatusData.playerDefense;
        playerBattleStats.attackMultiplier = battleStatusData.playerAttackMultiplier;
        playerBattleStats.defenseMultiplier = battleStatusData.playerDefenseMultiplier;
        playerBattleStats.armor = battleStatusData.playerArmor;

        playerBattleStats.battleTurn = battleStatus.battleTurn;
        playerBattleStats.winstreak = battleStatus.winstreak;
    };

    return playerBattleStats
};

//Store enemy stats in an object
initializeFunc.enemySetup = function(enemyStats,battleStatusData,playerStats){

    let tempStats = {};

    //Load base enemy stats
    tempStats.name = enemyStats.name;
    tempStats.species = enemyStats.species;
    tempStats.health = enemyStats.health;
    tempStats.maxhealth = enemyStats.maxhealth;
    tempStats.attack = enemyStats.attack;
    tempStats.defense = enemyStats.defense;
    tempStats.acorncoin = enemyStats.acorncoin;
    tempStats.mushroomcoin = enemyStats.mushroomcoin;
    tempStats.bearclawcoin = enemyStats.bearclawcoin;

    tempStats.armor = 0;
    tempStats.stun = 0;
    tempStats.poison = 0;

    tempStats.attackMultiplier = 1;
    tempStats.defenseMultiplier = 1;

    tempStats.status = "";

    //If battle is in-progress, override with in-progress stats
    if(battleStatusData.result == "active"){

        tempStats.health = battleStatusData.enemyHealth;
        tempStats.poison = battleStatusData.enemyPoison;
        tempStats.stun = battleStatusData.enemyStun;
        tempStats.status = battleStatusData.enemyStatus;
        tempStats.attack = battleStatusData.enemyAttack;
        tempStats.defense = battleStatusData.enemyDefense;
        tempStats.attackMultiplier = battleStatusData.enemyAttackMultiplier;
        tempStats.defenseMultiplier = battleStatusData.enemyDefenseMultiplier;
        tempStats.armor = battleStatusData.enemyArmor;

    }

    //Calculate and store probabilities of using each ability
    tempStats.enemyAbility1Prob = chosenEnemy.stats.ability1prob;
    tempStats.enemyAbility2Prob = chosenEnemy.stats.ability2prob + chosenEnemy.stats.ability1prob;
    tempStats.enemyAbility3Prob = chosenEnemy.stats.ability3prob + chosenEnemy.stats.ability1prob + chosenEnemy.stats.ability2prob;
    tempStats.enemyAbility4Prob = chosenEnemy.stats.ability4prob + chosenEnemy.stats.ability1prob + chosenEnemy.stats.ability2prob + chosenEnemy.stats.ability3prob;

    //Calculate and store enemy power level
    chosenEnemy.stats.enemyPowerlevel = 20*(chosenEnemy.stats.maxhealth/4 + chosenEnemy.stats.attack + chosenEnemy.stats.defense)/(playerStats.maxhealth/4 + playerStats.attack + playerStats.defense);

    return tempStats
};

//Load enemy abilities into the object with other enemy stats
initializeFunc.setEnemyAbilities = function(stats){

    stats.enemyAbility1 = abilityData[speciesData[stats.species]["attack1Name"]];
    stats.enemyAbility2 = abilityData[speciesData[stats.species]["attack2Name"]];
    stats.enemyAbility3 = abilityData[speciesData[stats.species]["attack3Name"]];
    stats.enemyAbility4 = abilityData[speciesData[stats.species]["attack4Name"]];

    return stats
};

//Load player abilities into the object with other player stats
initializeFunc.setPlayerAbilities = function(playerStats){
    playerStats.playerAbility1 = abilityData[speciesData[playerStats.species].attack1Name];
    playerStats.playerAbility2 = abilityData[speciesData[playerStats.species].attack2Name];
    playerStats.playerAbility3 = abilityData[speciesData[playerStats.species].attack3Name];
    playerStats.playerAbility4 = abilityData[speciesData[playerStats.species].attack4Name];

    return playerStats
};

//Set initial battle text
initializeFunc.setBattleData = function(){
    battleData = {}
    battleData.battleText = `Press an attack button to begin.`;
    battleData.battleTextArray = [,,,,,,,,,,,,,,,,,,,,,,,,,,,,,];

    return battleData;
};

//Add 'result' and 'playerAlive' default values if none exist
initializeFunc.setBattleStatusData = function(battleStatusData){

    if (!battleStatusData.hasOwnProperty("result")){
        battleStatusData.result = "active";
    }

    if (!battleStatusData.hasOwnProperty("playerAlive")){
        battleStatusData.playerAlive = true 
    }

    initializeFunc.storeJSON(battleStatusData, 'battleStatusData');

    return battleStatusData

}

initializeFunc.updateBattleStatusData = function(chosenEnemy,playerBattleStats,enemyBattleStats,battleStatusData){
    battleStatusData.enemyID = chosenEnemy.enemyID;
    battleStatusData.playerHealth = playerBattleStats.health;
    battleStatusData.enemyHealth = enemyBattleStats.health;
    battleStatusData.playerPoison = playerBattleStats.poison;
    battleStatusData.enemyPoison = enemyBattleStats.poison;
    battleStatusData.playerStun = playerBattleStats.stun;
    battleStatusData.enemyStun = enemyBattleStats.stun;
    battleStatusData.playerStatus = playerBattleStats.status;
    battleStatusData.enemyStatus = enemyBattleStats.status;
    battleStatusData.playerAttack = playerBattleStats.attack;
    battleStatusData.enemyAttack = enemyBattleStats.attack;
    battleStatusData.playerDefense = playerBattleStats.defense;
    battleStatusData.enemyDefense = enemyBattleStats.defense;
    battleStatusData.playerAttackMultiplier = playerBattleStats.attackMultiplier;
    battleStatusData.enemyAttackMultiplier = enemyBattleStats.attackMultiplier;
    battleStatusData.playerDefenseMultiplier = playerBattleStats.defenseMultiplier;
    battleStatusData.enemyDefenseMultiplier = enemyBattleStats.defenseMultiplier;
    battleStatusData.playerArmor = playerBattleStats.armor;
    battleStatusData.enemyArmor = enemyBattleStats.armor;


    return battleStatusData;
}

//Save battle status data to local storage
initializeFunc.saveProgress = function(chosenEnemy,playerBattleStats,enemyBattleStats,battleStatusData){

    battleStatusData = initializeFunc.updateBattleStatusData(chosenEnemy,playerBattleStats,enemyBattleStats,battleStatusData)

    //Save battle status array in local storage
    localStorage.setItem('battleStatusData',  JSON.stringify(battleStatusData));

    return battleStatusData;
};

//----------------------LOAD DATA AND SETUP BATTLE----------------------------

initializeFunc.initializeBattle = function(){

    //Load data from local storage
    battleSettingData = initializeFunc.loadJSON('battleSettings');
    battleStatusData = initializeFunc.loadJSON('battleStatusData');
    playerStats = initializeFunc.loadJSON('storedPlayerStats');
    enemyList = initializeFunc.loadList('enemyList')
    winstreakReward = localStorage.getItem('winstreakReward')

    winstreakList = [0,0,1,0,2,0,0,0,0,10];

    chosenEnemy = initializeFunc.selectEnemy(enemyList,battleStatusData,enemyStats) //Select enemy

    let playerBattleStats = initializeFunc.playerSetup(playerStats,battleStatusData); //Populate player data for battle

    playerBattleStats = initializeFunc.setPlayerAbilities(playerBattleStats); //Setup player abilities

    enemyBattleStats = initializeFunc.enemySetup(chosenEnemy.stats,battleStatusData,playerBattleStats) //Populate enemy data for battle

    enemyBattleStats = initializeFunc.setEnemyAbilities(enemyBattleStats); //Setup enemy abilities

    let battleData = initializeFunc.setBattleData();

    battleStatusData = initializeFunc.setBattleStatusData(battleStatusData);

    battleStatusData = initializeFunc.saveProgress(chosenEnemy,playerBattleStats,enemyBattleStats,battleStatusData);

}

initializeFunc.restartBattle = function(){
    
        let chosenEnemy = initializeFunc.selectEnemy(enemyList,battleStatusData,enemyStats) //Select enemy
    
        let playerBattleStats = initializeFunc.playerSetup(playerStats,battleStatusData); //Populate player data for battle
    
        playerBattleStats = initializeFunc.setPlayerAbilities(playerBattleStats); //Setup player abilities
    
        enemyBattleStats = initializeFunc.enemySetup(chosenEnemy.stats,battleStatusData,playerBattleStats) //Populate enemy data for battle
    
        enemyBattleStats = initializeFunc.setEnemyAbilities(enemyBattleStats); //Setup enemy abilities
    
        battleStatusData = initializeFunc.setBattleStatusData(battleStatusData);

        let battleData = initializeFunc.setBattleData();

        battleStatusData.result = "active";
};

//If running in a browser, initialize the battle
if (typeof exports !== 'object'){
    window.onload = initializeFunc.initializeBattle();
}

//If running in node, export all functions
if (typeof exports === 'object'){
    module.exports = {initializeFunc}
}
