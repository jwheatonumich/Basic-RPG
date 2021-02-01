var playerHealth = 0;

var healText = ``;

function transform(){
    //Save health and xp after battle ends
    if (playerStats.acorncoin >= 50 && playerStats.species != "squirrel"){
        playerStats.acorncoin -= 50;
        playerStats.species = "squirrel" ;
        playerStats.image = "../images/squirrel-avatar.png" ;
        playerStats.squirrelunlock = true;
    }
    

    //Store the updated data object in local storage, after turning the JSON to a string
    localStorage.setItem('storedPlayerStats', JSON.stringify(playerStats));

    playerSetup();
    setStats();
}