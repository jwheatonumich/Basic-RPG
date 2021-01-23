//----------------------LOAD DATA FUNCTIONS----------------------------

//Loads JSON data from local storage into an object
function loadJSON(jsonName){
    let retrievedObject = localStorage.getItem(jsonName);
    let parsedObject = JSON.parse(retrievedObject);
    return parsedObject;
};

//Loads list data from local storage into a list
function loadList(listName){
    let retrievedObject = localStorage.getItem(listName);
    let parsedObject = retrievedObject.split(",").map(x=>+x);
    return parsedObject
}

//----------------------STORE DATA FUNCTIONS----------------------------

//Store an object as a JSON in local storage
function storeJSON(objectName, JSONName){
    localStorage.setItem(JSONName, JSON.stringify(objectName));
}

//----------------------SETUP BATTLE FUNCTIONS----------------------------

//Select enemy
function selectEnemy(list,battleStatus,enemyStats){

    let enemyID = list[Math.floor(Math.random()*list.length)];//Determine a random enemy from the list of enemies

    //If battle is in progress, use saved date
    if (battleStatus.inProgress){
        enemyID = battleStatus.enemyID;
    };

    //Lookup enemy in object using selected ID
    for (i in enemyStats){
        if (enemyStats[i]["enemyID"] == enemyID){
            chosenEnemy = enemyStats[i];
            battleStatus.enemyID = enemyStats[i].enemyID
        };
    };

    storeJSON(battleStatusData, 'battleStatusData');

    return chosenEnemy
}

//Store player stats in an object
function playerSetup(playerStats,battleStatus){

    //Load base player stats
    playerBattleStats = playerStats;

    playerBattleStats.armor = 0;
    playerBattleStats.stun = 0;
    playerBattleStats.poison = 0;

    playerBattleStats.attackMultiplier = 1;
    playerBattleStats.defenseMultiplier = 1;

    playerBattleStats.status = "";

    //If battle is in-progress, override with in-progress stats
    if(battleStatus.inProgress){
        playerBattleStats.health = battleStatus.playerHealth;
        playerBattleStats.poison = battleStatus.playerPoison;
        playerBattleStats.stun = battleStatus.playerStun;
        playerBattleStats.status = battleStatus.playerStatus;

        playerBattleStats.battleTurn = battleStatus.battleTurn;
        playerBattleStats.winstreak = battleStatus.winstreak;
    };

    return playerBattleStats
};

//Store enemy stats in an object
function enemySetup(enemyStats,battleStatusData,playerStats){

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
    if(battleStatusData.inProgress){

        tempStats.health = battleStatusData.enemyHealth;
        tempStats.poison = battleStatusData.enemyPoison;
        tempStats.stun = battleStatusData.enemyStun;
        tempStats.status = battleStatusData.enemyStatus;

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
function setEnemyAbilities(stats){

    stats.enemyAbility1 = abilityData[speciesData[stats.species]["attack1Name"]];
    stats.enemyAbility2 = abilityData[speciesData[stats.species]["attack2Name"]];
    stats.enemyAbility3 = abilityData[speciesData[stats.species]["attack3Name"]];
    stats.enemyAbility4 = abilityData[speciesData[stats.species]["attack4Name"]];

    return stats
};

//Load player abilities into the object with other player stats
function setPlayerAbilities(playerStats){
    playerStats.playerAbility1 = abilityData[speciesData[playerStats.species].attack1Name];
    playerStats.playerAbility2 = abilityData[speciesData[playerStats.species].attack2Name];
    playerStats.playerAbility3 = abilityData[speciesData[playerStats.species].attack3Name];
    playerStats.playerAbility4 = abilityData[speciesData[playerStats.species].attack4Name];

    return playerStats
};

function setBattleData(){
    battleData = {}
    battleData.battleText = `Press an attack button to begin.`;

    return battleData;
};

function setBattleStatusData(battleStatusData){

    battleStatusData.inProgress = true;
    battleStatusData.result = "active";

    storeJSON(battleStatusData, 'battleStatusData');

    return battleStatusData

}

function saveProgress(chosenEnemy,playerBattleStats,enemyBattleStats){

    battleStatusData.enemyID = chosenEnemy.enemyID;
    battleStatusData.playerHealth = playerBattleStats.health;
    battleStatusData.enemyHealth = enemyBattleStats.health;
    battleStatusData.playerPoison = playerBattleStats.poison;
    battleStatusData.enemyPoison = enemyBattleStats.poison;
    battleStatusData.playerStun = playerBattleStats.stun;
    battleStatusData.enemyStun = enemyBattleStats.stun;
    battleStatusData.playerStatus = playerBattleStats.status;
    battleStatusData.enemyStatus = enemyBattleStats.status;

    //Save battle status array in local storage
    localStorage.setItem('battleStatusData',  JSON.stringify(battleStatusData));

    return battleStatusData;
};


//----------------------LOAD DATA AND SETUP BATTLE----------------------------

function initializeBattle(){

    //Load data from local storage
    battleSettingData = loadJSON('battleSettings');
    battleStatusData = loadJSON('battleStatusData');
    playerStats = loadJSON('storedPlayerStats');
    enemyList = loadList('enemyList')
    winstreakReward = localStorage.getItem('winstreakReward')

    winstreakList = [0,0,1,0,2,0,0,0,0,10];

    chosenEnemy = selectEnemy(enemyList,battleStatusData,enemyStats) //Select enemy

    let playerBattleStats = playerSetup(playerStats,battleStatusData); //Populate player data for battle

    playerBattleStats = setPlayerAbilities(playerBattleStats); //Setup player abilities

    enemyBattleStats = enemySetup(chosenEnemy.stats,battleStatusData,playerBattleStats) //Populate enemy data for battle

    enemyBattleStats = setEnemyAbilities(enemyBattleStats); //Setup enemy abilities

    let battleData = setBattleData();

    battleStatusData = setBattleStatusData(battleStatusData);

    battleStatusData = saveProgress(chosenEnemy,playerBattleStats,enemyBattleStats)

}

function restartBattle(){
    
        let chosenEnemy = selectEnemy(enemyList,battleStatusData,enemyStats) //Select enemy
    
        let playerBattleStats = playerSetup(playerStats,battleStatusData); //Populate player data for battle
    
        playerBattleStats = setPlayerAbilities(playerBattleStats); //Setup player abilities
    
        enemyBattleStats = enemySetup(chosenEnemy.stats,battleStatusData,playerBattleStats) //Populate enemy data for battle
    
        enemyBattleStats = setEnemyAbilities(enemyBattleStats); //Setup enemy abilities
    
        battleStatusData = setBattleStatusData(battleStatusData);

        let battleData = setBattleData();
};

window.onload = initializeBattle();

