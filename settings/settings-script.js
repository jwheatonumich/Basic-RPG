//Load player data into a variable from local storage
var retrievedObject = localStorage.getItem('storedPlayerStats');
var playerStats = JSON.parse(retrievedObject)

//Function to set player stats variable to new game stats
function dataLoad(){
    playerStats = {"name":"Fred", "health":100, "maxhealth":100, "attack":10, "defense":5,  
    "day":1, "caveday":0,"treeday":0,
    "acorncoin":0, "mushroomcoin":0, "bearclawcoin":0, "leafcoin":10}
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

//Function that gets called when the new game button is clicked
function newGame(){
    dataLoad();
    dataStore();
    setStats();
};

//Load current player stats when the page loads
window.onload = setStats();