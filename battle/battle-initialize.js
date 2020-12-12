//Check if there is stored data for player stats. Otherwise, start from level 1
if (localStorage.getItem("storedPlayerStats") === null) {
    //Set player and enemy stats
    var playerStats = {"name":"Fred", "health":100, "maxhealth":100, "attack":10, "defense":5, "experience":0 }

}else{
    //If using the stored file, retrieve it and convert the string into a JSON
    var retrievedObject = localStorage.getItem('storedPlayerStats');
    var playerStats = JSON.parse(retrievedObject)
}

var stats = [
    {"name":"Enemy1", "enemyID":"0001", "health":50, "maxhealth":50, "attack":10, "defense":5, "experience":1 },
    {"name":"Enemy2", "enemyID":"0002", "health":100, "maxhealth":100, "attack":15, "defense":7, "experience":2 } ,
    {"name":"Enemy3", "enemyID":"0003", "health":200, "maxhealth":200, "attack":20, "defense":10, "experience":4 } ,
]

//Set the various fields on the webpage as it loads
window.onload = playerSetup();
window.onload = enemySetup();
window.onload = setStats();
