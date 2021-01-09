//Relative link back to this page
var page = "../home/index.html"

//Update image
function updateImage(){
    var dailyEvents = JSON.parse(localStorage.getItem('dailyEvents'));//Load daily event data

    if (dailyEvents.freeLeaf == true){//Check if player gets a free leaf
        //If the player gets a free leaf, use the leaf image
        document.getElementById("tree").src = "../images/bountiful-tree-leaves.png"
    }else{
        //Otherwise use the normal image
        document.getElementById("tree").src = "../images/bountiful-tree.png"
    }

    if (dailyEvents.sporeDay == true){//Check if mushroom has spores
        //If the player gets a free leaf, use the leaf image
        document.getElementById("mushroom").src = "../images/mushroom-village-spores.png"
    }else{
        //Otherwise use the normal image
        document.getElementById("mushroom").src = "../images/mushroom-village.png"
    }

    if (dailyEvents.sleepingBear == false){//Check if bear is asleep
        //If the bear is awake, show the image with his eyes
        document.getElementById("cave").src = "../images/bear-cave-eyes.png"
    }else{
        document.getElementById("cave").src = "../images/bear-cave.png"
    }
}

//Update tree image on page load
window.onload = updateImage()