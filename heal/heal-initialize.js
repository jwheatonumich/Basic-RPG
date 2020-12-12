//Check if there is stored data for player stats. Otherwise, start from level 1
if (localStorage.getItem("storedPlayerStats") === null) {
    //Set player and enemy stats
    var playerStats = {"name":"Fred", "health":100, "maxhealth":100, "attack":10, "defense":5, "experience":0 }

}else{
    //If using the stored file, retrieve it and convert the string into a JSON
    var retrievedObject = localStorage.getItem('storedPlayerStats');
    var playerStats = JSON.parse(retrievedObject)
}