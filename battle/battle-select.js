//Array of enemy names
var enemies = ["Wimpy Wombat","Ordinary Otter","Significant Squirrel","Precarious Porcupine"];

//Array of enemy images
var pictureList = [
    "./wimpy-wombat.png",
    "./ordinary-otter.png",
    "./significant-squirrel.png",
    "./wimpy-wombat.png" ];

//Store the dropdown element
selectMenu = document.getElementById("enemies")
enemyImage = document.getElementById("enemy-image")

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

//Populate the enemy image based on the dropdown selection
function selectImage(){
    enemyImage.src = pictureList[selectMenu.value]; //Set the image source equal to the nth item in the picture list, where n is the value of the dropdown
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