

//Set the various fields on the webpage as it loads
window.onload = dataLoad();
window.onload = selectEnemy();
window.onload = enemySetup();
window.onload = setStats();
window.onload =  setEnemyStats();
window.onload = backButton(localStorage.getItem("lastPage"));
window.onload = setAbilities() //Setup player's abilities and ability buttons
window.onload = noDoubleTap() //Prevent double taps
