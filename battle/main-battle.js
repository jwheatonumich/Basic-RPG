//Global Variables
var level = localStorage.getItem('chosenEnemy') //Get the enemy choice based on local storage

var enemyName = "";
var enemyHealth = 0;
var enemyMaxHealth = 0;
var enemyAttack = 0;
var enemyDefense = 0;
var enemyExperience = 0;

var playerName = "";
var playerHealth = 0;
var playerMaxHealth = 0;
var playerAttack = 0;
var playerDefense = 0;
var playerExperience = 0;

var battleText = ``

//Enemy Setup
function enemySetup() {
    enemyName = stats[level].name;
    enemyHealth = stats[level].health;
    enemyMaxHealth = stats[level].maxhealth;
    enemyAttack = stats[level].attack;
    enemyDefense = stats[level].defense;
    enemyExperience = stats[level].experience;
}

//Player Setup
function playerSetup() {
    playerName = playerStats.name;
    playerHealth = playerStats.health;
    playerMaxHealth = playerStats.maxhealth;
    playerAttack = playerStats.attack;
    playerDefense = playerStats.defense;
    playerExperience = playerStats.experience; 
}

//Function that sets text on the website equal to various stat variables
function setStats() {
    
    document.getElementById("player-name").innerHTML = playerName;
    document.getElementById("player-health").innerHTML = playerHealth + '/' +  playerMaxHealth;
    document.getElementById("player-attack").innerHTML = playerAttack;
    document.getElementById("player-defense").innerHTML = playerDefense;
    document.getElementById("player-experience").innerHTML = playerExperience;

    document.getElementById("enemy-name").innerHTML = enemyName;
    document.getElementById("enemy-health").innerHTML = enemyHealth + '/' + enemyMaxHealth;
    document.getElementById("enemy-attack").innerHTML = enemyAttack;
    document.getElementById("enemy-defense").innerHTML = enemyDefense;
    document.getElementById("enemy-experience").innerHTML = enemyExperience;
}

//Function to check if the battle is over
function battleStatus(){
    if (playerHealth <= 0){
        battleText = `Game Over<br><br>`;
        level = 1;
    }

    if (enemyHealth <= 0){
        battleText = `Enemy Defeated<br><br>`;
        level += 1;
        playerExperience += enemyExperience;
        battleCleanup();
    }
}

//At the end of the battle, save variables back to JSON and save JSON to local storage
function battleCleanup(){
    //Save health and xp after battle ends
    playerStats.health = playerHealth ;
    playerStats.experience = playerExperience; 

    //Store the updated data object in local storage, after turning the JSON to a string
    localStorage.setItem('storedPlayerStats', JSON.stringify(playerStats));
}

//Script that is run when clicking the attack button
function attack() {

    //Calculate player and enemy attack
    var playerDamage = Math.max(Math.floor(Math.random()*2*playerAttack - playerDefense),0);
    var enemyDamage = Math.max(Math.floor(Math.random()*2*enemyAttack - enemyDefense),0);

    //Update health based on damage
    playerHealth -= enemyDamage;
    enemyHealth -= playerDamage;

    //Store the text that will display this turn
    battleText = `You deal ` + playerDamage + ` damage to the enemy.<br>
    The enemy deals ` + enemyDamage +` damage to you.`;

    battleStatus();

    //Update text on site based on new health
    setStats();

    //Update the battle text for the current turn
    document.getElementById("battle-text-div").innerHTML = battleText;
}