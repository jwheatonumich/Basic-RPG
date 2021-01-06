//Variables for Riku battle
var enemyListSquirrel = [18];
var winstreakReward = "bearclawcoin";

//Relative link back to this page
var page = "../squirrel-master/train.html";

//Array of enemy images
var pictureList = [
    "../images/squirrel-avatar-mini.png",
    "../images/two-squirrels-mini.png" 
];

var maxStats = 25

//function to set player stats based on the button clicked
function acornTraining(stat){
    if (playerStats["acorncoin"] >= 3 &&  playerStats[stat] < maxStats){
        playerStats[stat] +=1;
        playerStats["acorncoin"] -=3;
        healthCalc();
        localStorage.setItem('storedPlayerStats', JSON.stringify(playerStats));
        playerSetup();
        setStats();
    } 
}

//Function to calculate max health from endurance
function healthCalc(){
    playerStats["maxhealth"] = 4 * playerStats["endurance"]
};

//Update  image
function updateImage(){
    var dailyEvents = JSON.parse(localStorage.getItem('dailyEvents'));//Load daily event data

    if (dailyEvents.squirrelChallenge == true){//Check if squirrel master wants to fight
        //If squirrel master wants to fight, change his image, and clicking him starts fight
        document.getElementById("page-image").src = "../images/squirrel-trainer-fight.png"
        document.getElementById("squirrel-link").setAttribute('onClick',"startBattle(enemyListSquirrel)");
    }
}

//Update cave image on page load
window.onload = updateImage()