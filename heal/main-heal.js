var playerHealth = 0;

var healText = ``;

function healMax(){
    //Save health and xp after battle ends
    playerStats.health = playerStats.maxhealth ;

    //Store the updated data object in local storage, after turning the JSON to a string
    localStorage.setItem('storedPlayerStats', JSON.stringify(playerStats));
}