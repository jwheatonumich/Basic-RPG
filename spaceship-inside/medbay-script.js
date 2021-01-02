//Load player stats in localstorage
var retrievedObject = localStorage.getItem('storedPlayerStats');
var playerStats = JSON.parse(retrievedObject)

//Initial species selection
var transformSpecies = "gremlin"
var transformSpeciesImage = "../images/little-goblin.png"

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
    squirrelUnlock = playerStats.squirrelunlock;
    mushroomUnlock = playerStats.mushroomunlock;
    bearUnlock = playerStats.bearunlock;
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

//Transform to selected species
function repairDNA(){
    
    //Set player species and associated image
    playerStats.species = transformSpecies ;
    playerStats.image = transformSpeciesImage ;

    //Store the updated data object in local storage, after turning the JSON to a string
    localStorage.setItem('storedPlayerStats', JSON.stringify(playerStats));

    //Update the variables on playerStats
    playerSetup();

    //Update the image on the page
    setStats();
}

//Function to set species and image to match selected image
function setTransformSpecies(species, image, imageID){
    transformSpecies = species;
    transformSpeciesImage = image;

    //List of species images
    var gremlinImage = document.getElementById("gremlin-image")
    var squirrelImage = document.getElementById("squirrel-image")
    var mushroomImage = document.getElementById("mushroom-image")
    var bearImage = document.getElementById("bear-image")

    //Clear selection border around all species
    if (gremlinImage){ //Validate the image exists before trying to set it's class
        gremlinImage.setAttribute("class", "transform-image");
    }
    if (squirrelImage){
        squirrelImage.setAttribute("class", "transform-image");
    }
    if (mushroomImage){
        mushroomImage.setAttribute("class", "transform-image");
    }
    if (bearImage){
        bearImage.setAttribute("class", "transform-image");
    }

    //Add selection border around selected species
    document.getElementById(imageID).setAttribute("class", "transform-image-selected");
}

//Populate image links for each unlocked species
function unlockedSpecies(){
    //Populate gremlin image link
    var link = document.createElement('a');
    link.setAttribute("onClick", 'setTransformSpecies("gremlin","../images/little-goblin.png","gremlin-image");')

    var elem = document.createElement("img");
    elem.src = "../images/little-goblin.png";
    elem.setAttribute("class", "transform-image-selected");
    elem.setAttribute("id", "gremlin-image");

    link.appendChild(elem);

    document.getElementById("unlocked-species-div").appendChild(link);

    //If squirrel transform is unlocked, populate image link
    if (playerStats.squirrelunlock == true){

        var link = document.createElement('a');
        link.setAttribute("onClick", 'setTransformSpecies("squirrel", "../images/squirrel-avatar.png","squirrel-image");')

        var elem = document.createElement("img");
        elem.src = "../images/squirrel-avatar.png";
        elem.setAttribute("class", "transform-image");
        elem.setAttribute("id", "squirrel-image");

        link.appendChild(elem);

        document.getElementById("unlocked-species-div").appendChild(link);
    }   

    //If mushroom transform is unlocked, populate image link
    if (playerStats.mushroomunlock == true){

        var link = document.createElement('a');
        link.setAttribute("onClick", 'setTransformSpecies("mushroom", "../images/little-mushroom-scanner.png","mushroom-image");')

        var elem = document.createElement("img");
        elem.src = "../images/little-mushroom-scanner.png";
        elem.setAttribute("class", "transform-image");
        elem.setAttribute("id", "mushroom-image");

        link.appendChild(elem);

        document.getElementById("unlocked-species-div").appendChild(link);
    }   

    //If bear transform is unlocked, populate image link
    if (playerStats.bearunlock == true){

        var link = document.createElement('a');
        link.setAttribute("onClick", 'setTransformSpecies("bear", "../images/small-bear-avatar.png","bear-image");')

        var elem = document.createElement("img");
        elem.src = '../images/small-bear-avatar.png';
        elem.setAttribute("class", "transform-image");
        elem.setAttribute("id", "bear-image");

        link.appendChild(elem);

        document.getElementById("unlocked-species-div").appendChild(link);
    }   
}

//Populate player stats on page load
window.onload = playerSetup();
window.onload = setStats();
window.onload = unlockedSpecies();