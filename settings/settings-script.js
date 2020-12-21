//Load player data into a variable from local storage
var retrievedObject = localStorage.getItem('storedPlayerStats');
var playerStats = JSON.parse(retrievedObject)

//Function to set player stats variable to new game stats
function dataLoad(){
    playerStats = {"name":"Fred", "costume":"None", "image":"../images/little-goblin.png",
    "health":40, "maxhealth":40, "attack":10, "defense":10, "endurance":10, 
    "day":1, "caveday":0,"treeday":0,
    "acorncoin":0, "mushroomcoin":0, "bearclawcoin":0, "leafcoin":10}
    playerStats["name"] = document.getElementById("name").value
};

//Function to store player stats variable to local storage
function dataStore(){
    localStorage.setItem('storedPlayerStats', JSON.stringify(playerStats));
};

//Function that sets text on the website equal to various stat variables
function setStats() {
    
    document.getElementById("acorn-coin").innerHTML = playerStats["acorncoin"];
    document.getElementById("mushroom-coin").innerHTML = playerStats["mushroomcoin"];
    document.getElementById("bearclaw-coin").innerHTML = playerStats["bearclawcoin"];
    document.getElementById("leaf-coin").innerHTML = playerStats["leafcoin"];
}

//Data that gets sent to the narrative screen
var script = "Hello " + playerStats["name"] + '. Welcome to Creatura. You have been sent to this planet to subjugate the native lifeforms. Investigate the surrounding area and identify any threats. Should your DNA become corrupted, you can return to the ship to repair it.';
var image = "../images/spaceship-crash.png"

//Function that gets called when the new game button is clicked
function newGame(){
    dataLoad();
    dataStore();
    setStats();
    narrative(script, image)
    window.location.href = '../narrative/narrative.html';
};

//Load current player stats when the page loads
window.onload = setStats();