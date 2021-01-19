//Relative link back to this page
var page = "../cave/cave.html";

//List of possible enemy IDs
var enemyListEasy = [12,12,12,13,13,14,15];

//Type of reward given for winstreaks in this arena
var winstreakReward = "bearclawcoin";

//Update image
function updateImage(){
    var dailyEvents = JSON.parse(localStorage.getItem('dailyEvents'));//Load daily event data

    if (dailyEvents.sleepingBear == false){//Check if bear is asleep
        //If the bear is awake, show the image with his eyes
        document.getElementById("page-image").src = "../images/bear-cave-eyes.png"
    }else{
        document.getElementById("page-image").src = "../images/bear-cave.png"
    }

    if (dailyEvents.rikuBattle == true){//Check if bear is asleep
        //If the bear is awake, show the image with his eyes
        document.getElementById("riku").src = "../images/bearsuit-avatar-fight.png"
    }
}

//Add random numbers of coins to the player's inventory
function enterCave(enemyList) {

    var dailyEvents = JSON.parse(localStorage.getItem('dailyEvents'));//Load daily event data

    //Check if the user has entered the cave today
    if (dailyEvents.sleepingBear == true){

        //Make sure the player can't try to steal a coin again today
        dailyEvents.sleepingBear = false
        localStorage.setItem('dailyEvents',JSON.stringify(dailyEvents));

        //Give the player a bearclaw coin
        playerStats["bearclawcoin"] +=1;

        //Text explaining they got items
        document.getElementById("textbox").innerHTML = 'As you enter the cave you see a shining object on the ground. As you pick it up, you hear growling and run!<br>'

        //Create the images
        var elem = document.createElement("img");
        elem.src = '../images/bearclaw-coin.png';
        elem.setAttribute("class", "item");

        //Append the images
        document.getElementById("textbox").appendChild(elem);

        //Change the image after user tries to steal a coin
        document.getElementById("page-image").src = "../images/bear-cave-eyes.png"

    }else{

        battleSettings ={
            "escape":true,
            "singleBattle":false,
            "mandatory":false, //Was used to prevent player from leaving narrative page
            "postBattleNarrative":false
        }
    
        localStorage.setItem('battleSettings', JSON.stringify(battleSettings));

        //Start the battle
        localStorage.setItem('enemyList',enemyList);
        localStorage.setItem('winstreakReward',winstreakReward)
        window.location.href = "../battle/battle.html";
        lastPage(page);
    }

    localStorage.setItem('storedPlayerStats', JSON.stringify(playerStats));
    playerSetup();
    setStats();
};

//Update cave image on page load
window.onload = updateImage()