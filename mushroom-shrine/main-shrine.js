var playerHealth = 0;

var healText = ``;

//Relative link back to this page
var page = "../mushroom-shrine/shrine.html"

function healMax(){
    //Save health and xp after battle ends
    if (playerStats.mushroomcoin > 25 && playerStats.costume != "mushroom"){
        playerStats.mushroomcoin-=25;
        playerStats.costume = "mushroom" ;
        playerStats.image = "../images/little-mushroom-scanner.png" ;
    }
    

    //Store the updated data object in local storage, after turning the JSON to a string
    localStorage.setItem('storedPlayerStats', JSON.stringify(playerStats));

    playerSetup();
    setStats();
}