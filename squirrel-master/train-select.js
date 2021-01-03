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