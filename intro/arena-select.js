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
    //Choose squirrel as the enemy
    localStorage.setItem('chosenEnemy', 0);
    //Select the squirrel image
    localStorage.setItem('enemyImageSelect', '../images/squirrel-avatar-mini.png');
    //Navigate to the battle page
    window.location.href = "../intro-battle/battle.html";
    //Setup which page the battle will redirect to when it is done
    lastPage(page);
}