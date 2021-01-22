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
function selectEnemy(list,battleStatus){

    let enemyID = list[Math.floor(Math.random()*list.length)];//Determine a random enemy from the list of enemies

    //If battle is in progress, use saved date
    if (battleStatus.inProgress){
        enemyID = battleStatus.enemyID;
    };

    //Lookup enemy in object using selected ID
    for (i in enemyStats){
        if (enemyStats[i]["enemyID"] == enemyID){
            chosenEnemy = enemyStats[i];
        };
    };

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
function enemySetup(enemyStats,battleStatus,playerStats){

    //Load base enemy stats
    enemyBattleStats = enemyStats

    enemyBattleStats.armor = 0;
    enemyBattleStats.stun = 0;
    enemyBattleStats.poison = 0;

    enemyBattleStats.attackMultiplier = 1;
    enemyBattleStats.defenseMultiplier = 1;

    enemyBattleStats.status = "";

    //If battle is in-progress, override with in-progress stats
    if(battleStatus.inProgress){

        enemyBattleStats.health = battleStatusData.enemyHealth;
        enemyBattleStats.poison = battleStatusData.enemyPoison;
        enemyBattleStats.stun = battleStatusData.enemyStun;
        enemyBattleStats.status = battleStatusData.enemyStatus;

    }

    //Calculate and store probabilities of using each ability
    enemyBattleStats.enemyAbility1Prob = enemyStats.ability1prob;
    enemyBattleStats.enemyAbility2Prob = enemyStats.ability2prob + enemyStats.ability1prob;
    enemyBattleStats.enemyAbility3Prob = enemyStats.ability3prob + enemyStats.ability1prob + enemyStats.ability2prob;
    enemyBattleStats.enemyAbility4Prob = enemyStats.ability4prob + enemyStats.ability1prob + enemyStats.ability2prob + enemyStats.ability3prob;

    //Calculate and store enemy power level
    enemyBattleStats.enemyPowerlevel = 20*(enemyStats.maxhealth/4 + enemyStats.attack + enemyStats.defense)/(playerStats.maxhealth/4 + playerStats.attack + playerStats.defense);

    return enemyBattleStats
};

//Load enemy abilities into the object with other enemy stats
function setEnemyAbilities(enemyStats){

    enemyStats.enemyAbility1 = abilityData[speciesData[enemyStats.species]["attack1Name"]];
    enemyStats.enemyAbility2 = abilityData[speciesData[enemyStats.species]["attack2Name"]];
    enemyStats.enemyAbility3 = abilityData[speciesData[enemyStats.species]["attack3Name"]];
    enemyStats.enemyAbility4 = abilityData[speciesData[enemyStats.species]["attack4Name"]];

    return enemyStats
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
    battleData.battleText = ``;

    return battleData;
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

    let chosenEnemy = selectEnemy(enemyList,battleStatusData) //Select enemy

    let playerBattleStats = playerSetup(playerStats,battleStatusData); //Populate player data for battle

    playerBattleStats = setPlayerAbilities(playerBattleStats); //Setup player abilities

    let enemyBattleStats = enemySetup(chosenEnemy.stats,battleStatusData,playerBattleStats) //Populate enemy data for battle

    enemyBattleStats = setEnemyAbilities(enemyBattleStats); //Setup enemy abilities

    let battleData = setBattleData();

}

window.onload = initializeBattle();

