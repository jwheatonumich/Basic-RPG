//Load player stats in localstorage
var retrievedObject = localStorage.getItem('storedPlayerStats');
var playerStats = JSON.parse(retrievedObject);

////Start Battle

//Function to set the link on the 'Back' button
function lastPage(page){
    localStorage.setItem('lastPage', page);
}

//Start the battle
function startBattle(){
    localStorage.setItem('chosenEnemy', 0);
    window.location.href = "../intro-battle/battle.html";
    lastPage(page);
}