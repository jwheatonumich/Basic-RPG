//Array of enemy names
var enemies = ["Wimpy Wombat","Ordinary Otter","Significant Squirrel","Precarious Porcupine","Riku the Bear"];

//Array of enemy images
var pictureList = [
    "../images/wimpy-wombat.png",
    "../images/ordinary-otter.png",
    "../images/significant-squirrel.png",
    "../images/precarious-porcupine.png",
    "../images/bear-avatar.png" ];

//Store the dropdown element
selectMenu = document.getElementById("enemies")
enemyImage = document.getElementById("enemy-image")
enemyImageSelect = ""

//Create drop-down from enemy name array
function popDropdown() {
    index = 0
    for(element in enemies)
        {
        var opt = document.createElement("option");
        opt.value= index;
        opt.innerHTML = enemies[element];

        //Append to the dropdown
        selectMenu.appendChild(opt);
        index++;
        }
}

//Set the player's currency
function setStats() {

    //load stats from local storage and parse into a JSON
    var retrievedObject = localStorage.getItem('storedPlayerStats');
    var playerStats = JSON.parse(retrievedObject)

    //Load the coin balances into variables
    acornCoin = playerStats.acorncoin; 
    mushroomCoin = playerStats.mushroomcoin;
    bearclawCoin = playerStats.bearclawcoin;
    leafCoin = playerStats.leafcoin;

    //Set the coin balances equal to the loaded variables
    document.getElementById("acorn-coin").innerHTML = acornCoin;
    document.getElementById("mushroom-coin").innerHTML = mushroomCoin;
    document.getElementById("bearclaw-coin").innerHTML = bearclawCoin;
    document.getElementById("leaf-coin").innerHTML = leafCoin;
}

//Populate the enemy image based on the dropdown selection
function selectImage(){
    enemyImageSelect = pictureList[selectMenu.value]
    enemyImage.src = enemyImageSelect; //Set the image source equal to the nth item in the picture list, where n is the value of the dropdown
    localStorage.setItem('enemyImageSelect', enemyImageSelect);
};

//Start the battle
function startBattle(){
    var enemySelect = document.getElementById("enemies");
    var chosenEnemy = enemySelect.value;
    localStorage.setItem('chosenEnemy', chosenEnemy);
    window.location.href = "./battle.html"
}

//Populate dropdown on page load
window.onload = popDropdown();
window.onload = selectImage();//Set the image to the default choice on page load
window.onload = setStats();//Set the player's currency