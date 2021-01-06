var maxStats = 50

//Variables for Riku battle
var enemyListRiku = [16];
var winstreakReward = "bearclawcoin";

//Relative link back to this page
var page = "../riku-training/train.html"

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

//function to set player stats based on the button clicked
function mushroomTraining(stat){
    if (playerStats["mushroomcoin"] >= 2 &&  playerStats[stat] < maxStats){
        playerStats[stat] +=1;
        playerStats["mushroomcoin"] -=2;
        healthCalc();
        localStorage.setItem('storedPlayerStats', JSON.stringify(playerStats));
        playerSetup();
        setStats();
    } 
}

//function to set player stats based on the button clicked
function bearclawTraining(stat){
    if (playerStats["bearclawcoin"] >= 1 &&  playerStats[stat] < maxStats){
        playerStats[stat] +=1;
        playerStats["bearclawcoin"] -=1;
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

//Update Riku's image
function updateImage(){
    var dailyEvents = JSON.parse(localStorage.getItem('dailyEvents'));//Load daily event data

    if (dailyEvents.rikuBattle == true){//Check if riku wants to fight
        //If riku wants to fight, change his image, and clicking him starts fight
        document.getElementById("page-image").src = "../images/bearsuit-avatar-fight.png"
        document.getElementById("riku-link").setAttribute('onClick',"startBattle(enemyListRiku)");
    }
}

//Update cave image on page load
window.onload = updateImage()