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

var enemyStun = 0;
var playerStun = 0;

var playerArmor = 0;
var enemyArmor = 0;

//Load data from either local storage or create if no local storage exists
function dataLoad(){

    //Retrieve player stats from local storage and convert the string into a JSON
    var retrievedObject = localStorage.getItem('storedPlayerStats');
    playerStats = JSON.parse(retrievedObject)

    stats = [
        {"name":"A Squirrel", "enemyID":"0001", "health":20, "maxhealth":20, "attack":10, "defense":5, "acorncoin":1, "mushroomcoin":0, "bearclawcoin":0 },
        {"name":"Two Squirrels", "enemyID":"0003", "health":40, "maxhealth":40, "attack":20, "defense":5, "acorncoin":3,"mushroomcoin":0, "bearclawcoin":0 } ,
        {"name":"Little Mushroom", "enemyID":"0002", "health":80, "maxhealth":80, "attack":30, "defense":15, "acorncoin":0, "mushroomcoin":1, "bearclawcoin":0 } ,
        {"name":"Tall Mushroom", "enemyID":"0003", "health":120, "maxhealth":120, "attack":40, "defense":15, "acorncoin":0, "mushroomcoin":3, "bearclawcoin":0 } ,
        {"name":"Blackbear", "enemyID":"0004", "health":160, "maxhealth":160, "attack":40, "defense":40, "acorncoin":0, "mushroomcoin":0, "bearclawcoin":1 }
    ]
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
    enemyName = stats[level].name;
    enemyHealth = stats[level].health;
    enemyMaxHealth = stats[level].maxhealth;
    enemyAttack = stats[level].attack;
    enemyDefense = stats[level].defense;
    enemyAcornCoin = stats[level].acorncoin;
    enemyMushroomCoin = stats[level].mushroomcoin;
    enemyBearclawCoin = stats[level].bearclawcoin;

    enemyPowerlevel = 5*(enemyMaxHealth/4 + enemyAttack + enemyDefense)/(playerMaxHealth/4 + playerAttack + playerDefense);
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
function attack(ability) {

    //Troubleshooting
    console.log(ability)

    //Check if player or enemy is dead before running the battle function
    if(playerHealth>0 && enemyHealth>0){
        
        //Pre damage ability effects
        switch (ability) {
            case "None": attackMultiplier = 1; defenseMultiplier = 1; break;
            case "Charge": attackMultiplier = 1.2; defenseMultiplier = 0.8; break;
            case "Block": attackMultiplier = 0.8; defenseMultiplier = 1.2; break;
            case "QuickAttack": attackMultiplier = 2; defenseMultiplier = 0; break;
            case "Powerup": playerAttack = playerAttack * 1.2; break;
            case "Shield": playerArmor += 5; break;
        }

        //Calculate player and enemy attack
        var playerDamage = Math.max(Math.floor(Math.random()*2*playerAttack*attackMultiplier - enemyDefense*enemyDefenseMultiplier),1);
        var enemyDamage = Math.max(Math.floor(Math.random()*2*enemyAttack*enemyAttackMultiplier - playerDefense*defenseMultiplier),1);

        //Abilities that set damage to zero
        if(enemyStun == 1){
            enemyDamage = 0;
        }
        if(
            playerStun == 1||
            ability == "Powerup"||
            ability == "Shield"
        )
        {
            playerDamage = 0;
        }

        //Abilities that only last one turn
        enemyStun = 0;
        playerStun = 0;

        //After damage ability effects
        switch(ability){
            case "Powerup": playerDamage = 0; break; //Don't do any damage if powering up
            case "Stun": enemyStun = 1;playerDamage = 0; break; //Is enemy stunned next round, don't do damage this round
        }

        //Update health and armor based on damage
        playerArmor = Math.max(playerArmor - enemyDamage,0); //Damage goes to armor first
        enemyArmor = Math.max(enemyArmor - playerDamage,0);
        playerHealth -= Math.max((enemyDamage - playerArmor),0); //Remainind damage goes to health
        enemyHealth -= Math.max((playerDamage - enemyArmor),0);

        //Store the text that will display this turn
        battleText = `You deal ` + playerDamage + ` damage to the enemy.<br>
        The enemy deals ` + enemyDamage +` damage to you.`;
        

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