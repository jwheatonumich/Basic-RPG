//Variables for Riku battle
var enemyListMushroom = [17];
var winstreakReward = "mushroomcoin";

//Relative link back to this page
var page = "../mushroom-master/train.html"

//Max stats for this trainer
var maxStats = 40

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

//Function to calculate max health from endurance
function healthCalc(){
    playerStats["maxhealth"] = 4 * playerStats["endurance"]
};

//Update image
function updateImage(){
    var dailyEvents = JSON.parse(localStorage.getItem('dailyEvents'));//Load daily event data

    if (dailyEvents.mushroomChallenge == true){//Check if mushroom trainer wants to fight
        //If mushroom trainer wants to fight, change his image, and clicking him starts fight
        document.getElementById("page-image").src = "../images/mushroom-man-fight.png"
        document.getElementById("mushroom-link").setAttribute('onClick',"startBattle(enemyListMushroom)");
    }
}

//Update cave image on page load
window.onload = updateImage()