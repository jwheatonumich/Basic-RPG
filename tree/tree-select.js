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
    playerAcornCoin = playerStats.acorncoin;
    playerMushroomCoin = playerStats.mushroomcoin;
    playerBearclawCoin = playerStats.bearclawcoin;
    leafCoin = playerStats.leafcoin;
}

//Function that sets text on the website equal to various stat variables
function setStats() {
    
    document.getElementById("acorn-coin").innerHTML = playerAcornCoin;
    document.getElementById("mushroom-coin").innerHTML = playerMushroomCoin;
    document.getElementById("bearclaw-coin").innerHTML = playerBearclawCoin;
    document.getElementById("leaf-coin").innerHTML = leafCoin;
}

//Add random numbers of coins to the player's inventory
function shakeTree() {
    //Calculate how many of each coin to add
    var treeAcornCoin = Math.floor(Math.random()*10 + 1)
    var treeMushroomCoin = 0
    var treeBearclawCoin =  0
    var treeLeafCoin = Math.floor(Math.random()*6 + 5)

    //Add to player's stats
    playerStats["acorncoin"] +=treeAcornCoin;
    playerStats["mushroomcoin"] +=treeMushroomCoin;
    playerStats["bearclawcoin"] +=treeBearclawCoin;
    playerStats["leafcoin"] +=treeLeafCoin;

    //Text explaining they got items
    document.getElementById("textbox").innerHTML = 'You shake the tree and coins fall to the ground!<br>'

    //Loop to create acorn icons
    var i = 1;
    while (i <= treeAcornCoin){

        //Create the images
        var elem = document.createElement("img");
        elem.src = '../images/acorn-coin.png';
        elem.setAttribute("class", "item");

        //Append the images
        document.getElementById("textbox").appendChild(elem);
        i++;
    }

    //Loop to create mushroom icons
    var i = 1;
    while (i <= treeMushroomCoin){

        //Create the images
        var elem = document.createElement("img");
        elem.src = '../images/mushroom-coin.png';
        elem.setAttribute("class", "item");

        //Append the images
        document.getElementById("textbox").appendChild(elem);
        i++;
    }

    //Loop to create bearclaw icons
    var i = 1;
    while (i <= treeBearclawCoin){

        //Create the images
        var elem = document.createElement("img");
        elem.src = '../images/bearclaw-coin.png';
        elem.setAttribute("class", "item");

        //Append the images
        document.getElementById("textbox").appendChild(elem);
        i++;
    }

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
        shakeTree()
        playerStats["treeday"] = playerStats["day"]
    }else{
        document.getElementById("textbox").innerHTML = 'You shake the tree but nothing falls out. Try again tomorrow.<br>'
    }

}

//Populate player stats on page load
window.onload = playerSetup();
window.onload = setStats();