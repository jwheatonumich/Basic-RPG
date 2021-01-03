//Load player stats in localstorage
var retrievedObject = localStorage.getItem('storedPlayerStats');
var playerStats = JSON.parse(retrievedObject);

//Relative link back to this page
var page = "../cave/cave.html";

//List of possible enemy IDs
var enemyListEasy = [12,12,12,13,13,14,15];

//Type of reward given for winstreaks in this arena
var winstreakReward = "bearclawcoin";

//Load each player stat into a variable
function playerSetup() {
    playerName = playerStats.name;
    playerHealth = playerStats.health;
    playerMaxHealth = playerStats.maxhealth;
    playerAttack = playerStats.attack;
    playerDefense = playerStats.defense;
    playerEndurance = playerStats.endurance;
    acornCoin = playerStats.acorncoin; 
    mushroomCoin = playerStats.mushroomcoin;
    bearclawCoin = playerStats.bearclawcoin;
    leafCoin = playerStats.leafcoin;
}

//Function that sets text on the website equal to various stat variables
function setStats() {
    
    document.getElementById("player-name").innerHTML = playerName;
    document.getElementById("character-stats").innerHTML = 
        'Health: ' + playerHealth + '/' +  playerMaxHealth + '<br />' +
        'Attack: ' + playerAttack + '<br />' +
        'Defense: ' + playerDefense + '<br />' +
        'Endurance: ' + playerEndurance + '<br />';
    document.getElementById("acorn-coin").innerHTML = acornCoin;
    document.getElementById("mushroom-coin").innerHTML = mushroomCoin;
    document.getElementById("bearclaw-coin").innerHTML = bearclawCoin;
    document.getElementById("leaf-coin").innerHTML = leafCoin;

    //Set the player image to their costume
    document.getElementById("character-image").src = playerStats.image;
}

//Update image
function updateImage(){
    if (playerStats["caveday"] >= 1){
        //Change the image after user tries to steal a coin
        document.getElementById("page-image").src = "../images/bear-cave-eyes.png"
    }
}

//Add random numbers of coins to the player's inventory
function enterCave(enemyList) {

    //Check if the user has entered the cave today
    if (playerStats["caveday"] < 1){

        //Make sure the player can't try to steal a coin again today
        playerStats["caveday"]=1;

        //Give the player a bearclaw coin
        playerStats["bearclawcoin"] +=1;

        //Text explaining they got items
        document.getElementById("textbox").innerHTML = 'As you enter the cave you see a shining object on the ground. As you pick it up, you hear growling and run!<br>'

        //Create the images
        var elem = document.createElement("img");
        elem.src = '../images/bearclaw-coin.png';
        elem.setAttribute("class", "item");

        //Append the images
        document.getElementById("textbox").appendChild(elem);

        //Change the image after user tries to steal a coin
        document.getElementById("page-image").src = "../images/bear-cave-eyes.png"

    }else{
        //Start the battle
        localStorage.setItem('enemyList',enemyList);
        localStorage.setItem('winstreakReward',winstreakReward)
        window.location.href = "../battle/battle.html";
        lastPage(page);
    }

    localStorage.setItem('storedPlayerStats', JSON.stringify(playerStats));
    playerSetup();
    setStats();
};

//Populate player stats on page load
window.onload = playerSetup();
window.onload = setStats();
window.onload = updateImage()