//Load player stats in localstorage
var retrievedObject = localStorage.getItem('storedPlayerStats');
var playerStats = JSON.parse(retrievedObject)

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

//Add random numbers of coins to the player's inventory
function shakeTree() {
    //Calculate how many of each coin to add
    var treeAcornCoin = 0
    var treeMushroomCoin = 0
    var treeBearclawCoin =  0
    var treeLeafCoin = 1

    //Add to player's stats
    playerStats["acorncoin"] +=treeAcornCoin;
    playerStats["mushroomcoin"] +=treeMushroomCoin;
    playerStats["bearclawcoin"] +=treeBearclawCoin;
    playerStats["leafcoin"] +=treeLeafCoin;

    //Text explaining they got items
    document.getElementById("textbox").innerHTML = 'You shake the tree and coins fall to the ground!<br>'

    //Loop to create leaf icons
    var i = 1;
    while (i <= treeLeafCoin){

        //Create the images
        var elem = document.createElement("img");
        elem.src = '../images/leaf-coin.png';
        elem.setAttribute("class", "item");

        //Append the images
        document.getElementById("textbox").appendChild(elem);
        i++;
    }

    localStorage.setItem('storedPlayerStats', JSON.stringify(playerStats));
    playerSetup();
    setStats();
}

//Function that gets run when the tree is shaken. Can only be used once each day.
function onceDaily(){
    if(playerStats["day"] > playerStats["treeday"]){
        playerStats["treeday"] = playerStats["day"]
        shakeTree()
    }else{
        document.getElementById("textbox").innerHTML = 'You shake the tree but nothing falls out. Try again tomorrow.<br>'
    }

}

//Populate player stats on page load
window.onload = playerSetup();
window.onload = setStats();