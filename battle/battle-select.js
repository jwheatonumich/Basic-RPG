//Array of enemy names
var enemies = ["Enemy1","Enemy2","Enemy3"];

//Store the dropdown element
selectMenu = document.getElementById("enemies")

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

function startBattle(){
    var enemySelect = document.getElementById("enemies");
    var chosenEnemy = enemySelect.value;
    localStorage.setItem('chosenEnemy', chosenEnemy);
    window.location.href = "./battle.html"
}

//Populate dropdown on page load
window.onload = popDropdown();