//Add random numbers of coins to the player's inventory
function sleep() {
    
    playerStats["day"] +=1;
    playerStats["caveday"] = 0; //Let the player steal another bear coin
    if(playerStats.health < playerStats.maxhealth/2){ //If health is less than 50%
        playerStats.health = Math.floor(playerStats.maxhealth/2); //Heal to 50% of max health
    }
    localStorage.setItem('sleep','true');
    localStorage.setItem('storedPlayerStats', JSON.stringify(playerStats));
    playerSetup(); //Pull updated stats from local storage
    setStats(); //Update stats on page
    window.location.href = "../spaceship/spaceship.html"
}