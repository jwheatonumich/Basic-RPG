//Add random numbers of coins to the player's inventory
function shakeTree() {
    //Calculate how many of each coin to add
    var treeLeafCoin = 1;

    //Add to player's stats
    playerStats["leafcoin"] +=treeLeafCoin;

    //Text explaining they got items
    document.getElementById("textbox").innerHTML = 'You shake the tree and coins fall to the ground!<br>'

    //Loop to create leaf icons
    var i = 1;
    while (i <= treeLeafCoin){

        //Create the images
        var elem = document.createElement("img");
        elem.src = '../images/leaf-coin.png';
        elem.setAttribute("class", "item");

        //Append the images
        document.getElementById("textbox").appendChild(elem);
        i++;
    }

    localStorage.setItem('storedPlayerStats', JSON.stringify(playerStats));
    playerSetup();
    setStats();
}

//Function that gets run when the tree is shaken. Can only be used once each day.
function onceDaily(){
    var dailyEvents = JSON.parse(localStorage.getItem('dailyEvents'));//Load daily event data
    if(dailyEvents.freeLeaf == true){
        dailyEvents.freeLeaf = false;//Prevent player from taking again
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

    if (dailyEvents.freeLeaf == true){//Check if player gets a free leaf
        //If the player gets a free leaf, use the leaf image
        document.getElementById("page-image").src = "../images/bountiful-tree-leaves.png"
    }else{
        //Otherwise use the normal image
        document.getElementById("page-image").src = "../images/bountiful-tree.png"
    }
}

//Update tree image on page load
window.onload = updateImage()