//Load player data into a variable from local storage
var retrievedObject = localStorage.getItem('storedPlayerStats');
var playerStats = JSON.parse(retrievedObject)
var battleStatusData = ""

//Function to set player stats variable to new game stats
function dataLoad(){
    playerStats = {"name":"Fred", "species":"gremlin", "image":"../images/little-goblin.png",
    "health":40, "maxhealth":40, "attack":10, "defense":10, "endurance":10, 
    "day":1, "caveday":0,"treeday":0,
    "acorncoin":0, "mushroomcoin":0, "bearclawcoin":0, "leafcoin":0,
    "ship-acorncoin":0,"ship-mushroomcoin":0,"ship-bearclawcoin":0,
    "squirrelunlock":false,"mushroomunlock":false,"bearunlock":false}
    playerStats["name"] = document.getElementById("name").value

    battleStatusData = {
        "inProgress":false
    };

    battleSettings ={
        "escape":true,
        "singleBattle":false,
        "mandatory":false
    };

    dailyEvents ={
        sleep:true,
        acornCatch:true
    };

};

//Function to store player stats variable to local storage
function dataStore(){
    localStorage.setItem('storedPlayerStats', JSON.stringify(playerStats));

    localStorage.setItem('battleStatusData',  JSON.stringify(battleStatusData));

    localStorage.setItem('battleSettings',  JSON.stringify(battleSettings));

    localStorage.setItem('dailyEvents',  JSON.stringify(dailyEvents));

    localStorage.removeItem('lastPage')

    //Store the script for the console
    controlStore("Crash1");
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
    setMandatoryPage('../character-select/character-select.html');
};

//Load current player stats when the page loads
window.onload = setStats();