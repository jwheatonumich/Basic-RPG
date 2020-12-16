//Global Variables
var level = localStorage.getItem('chosenEnemy') //Get the enemy choice based on local storage
var enemyImageSelect = localStorage.getItem('enemyImageSelect')

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

var battleText = ``;
var attackMultiplier = 1;
var defenseMultiplier = 1;

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

    document.getElementById("enemy-name").innerHTML = enemyName;
    document.getElementById("enemy-health").innerHTML = enemyHealth + '/' + enemyMaxHealth;

    document.getElementById("enemy-image").src = enemyImageSelect; //Set the image source equal to the nth item in the picture list, where n is the value of the dropdown
}

//Function to check if the battle is over
function battleStatus(){
    if (playerHealth <= 0){
        battleText = `Game Over<br><br>`;
        level = 1;
        battleCleanup();
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
    if (playerHealth < 0) {playerHealth = 0};
    playerStats.health = playerHealth ;
    playerStats.experience = playerExperience; 

    //Store the updated data object in local storage, after turning the JSON to a string
    localStorage.setItem('storedPlayerStats', JSON.stringify(playerStats));
}

//Script that is run when clicking the attack button
function attack() {
    //Check if player or enemy is dead before running the battle function
    if(playerHealth>0 && enemyHealth>0){
        
        //Determine which ability was chosen
        var abilitySelect = document.getElementById("ability");
        var chosenAbility = abilitySelect.value;

        //Determine multiplier if using a multiplier ability
        switch (chosenAbility) {
            case "None": attackMultiplier = 1; defenseMultiplier = 1; break;
            case "Charge": attackMultiplier = 1.2; defenseMultiplier = 0.8; break;
            case "Block": attackMultiplier = 0.8; defenseMultiplier = 1.2; break;
        }

        console.log(chosenAbility);
        console.log(attackMultiplier);
        console.log(defenseMultiplier);

        //Calculate player and enemy attack
        var playerDamage = Math.max(Math.floor(Math.random()*2*playerAttack*attackMultiplier - enemyDefense),1);
        var enemyDamage = Math.max(Math.floor(Math.random()*2*enemyAttack - playerDefense*defenseMultiplier),1);

        //Update health based on damage
        playerHealth -= enemyDamage;
        enemyHealth -= playerDamage;

        //Store the text that will display this turn
        battleText = `You deal ` + playerDamage + ` damage to the enemy.<br>
        The enemy deals ` + enemyDamage +` damage to you.`;
        

        battleStatus();

        //Update text on site based on new health
        setStats();
    }

    //Update the battle text for the current turn
    document.getElementById("battle-text-div").innerHTML = battleText;
}