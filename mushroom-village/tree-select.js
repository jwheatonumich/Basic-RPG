//Relative link back to this page
var page = "../mushroom-village/mushroom-village.html"

//Increase player stats by 1
function shakeTree() {

    //Add to player's stats
    playerStats["endurance"] +=1;
    playerStats["attack"] +=1;
    playerStats["defense"] +=1;
    playerStats["maxhealth"] = 4*playerStats["endurance"]

    //Text explaining stat increase
    document.getElementById("textbox").innerHTML = 'You inhale some of the spores and feel a little funny. Your stats increase!<br>'

    //Save and update new stats
    localStorage.setItem('storedPlayerStats', JSON.stringify(playerStats));
    playerSetup();
    setStats();
}

//Function that gets run when the tree is shaken. Can only be used once each day.
function onceDaily(){
    var dailyEvents = JSON.parse(localStorage.getItem('dailyEvents'));//Load daily event data
    if(dailyEvents.sporeDay == true){
        dailyEvents.sporeDay = false;//Prevent player from taking again
        localStorage.setItem('dailyEvents',JSON.stringify(dailyEvents));//Save in local storage

        shakeTree();
    }else{
        document.getElementById("textbox").innerHTML = 'You shake the tree but nothing falls out. Try again tomorrow.<br>';
    }
    //Update the page image
    updateImage();
};

//Update image
function updateImage(){
    var dailyEvents = JSON.parse(localStorage.getItem('dailyEvents'));//Load daily event data

    if (dailyEvents.sporeDay == true){//Check if mushroom has spores
        //If the player gets a free leaf, use the leaf image
        document.getElementById("page-image").src = "../images/mushroom-village-spores.png"
    }else{
        //Otherwise use the normal image
        document.getElementById("page-image").src = "../images/mushroom-village.png"
    }
}

//Update tree image on page load
window.onload = updateImage()