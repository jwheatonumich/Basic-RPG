//Add random numbers of coins to the player's inventory
function sleep() {
    
    playerStats["day"] +=1;
    playerStats["caveday"] = 0; //Let the player steal another bear coin

    //Raise stats if silver reactor is charged
    if(playerStats["ship-mushroomcoin"] >= 10){ //If health is less than 100%
        playerStats.attack +=1;
        playerStats.defense +=1;
        playerStats.endurance +=1
        playerStats["maxhealth"] = 4 * playerStats["endurance"]
    }

    //Heal if red reactor is charged
    if(playerStats.health < playerStats.maxhealth && playerStats["ship-acorncoin"] >= 10){ //If health is less than 100%
        playerStats.health = Math.floor(playerStats.maxhealth); //Heal to 100% of max health
    }


    localStorage.setItem('sleep','true');
    localStorage.setItem('storedPlayerStats', JSON.stringify(playerStats));
    playerSetup(); //Pull updated stats from local storage
    setStats(); //Update stats on page
    window.location.href = "../spaceship/spaceship.html"
}

//Function to check if a battle is active
function activeBattleCheck(){

    //Load data from local storage
    var retrievedObject = localStorage.getItem('battleStatusData');

    //Parse the JSON data into an object
    battleStatusData = JSON.parse(retrievedObject);

    if (battleStatusData.inProgress){//Check if a battle is in progress
        window.location.href = "../battle/battle.html"//If in progress, go to battle
    }
}

window.onload = activeBattleCheck();//Check for active battle on page load
