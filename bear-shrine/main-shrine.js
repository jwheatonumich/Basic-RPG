var playerHealth = 0;

var healText = ``;

function healMax(){
    //Save health and xp after battle ends
    if (playerStats.bearclawcoin >= 10 && playerStats.costume != "bear"){
        playerStats.bearclawcoin-=10;
        playerStats.costume = "bear" ;
        playerStats.image = "../images/blackbear.png" ;
    }
    

    //Store the updated data object in local storage, after turning the JSON to a string
    localStorage.setItem('storedPlayerStats', JSON.stringify(playerStats));

    playerSetup();
    setStats();
}