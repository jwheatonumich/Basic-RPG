//Function to deposit acorn coins in the red reactor
function redcoin() {
    if (playerStats["acorncoin"] >= 1 && playerStats["ship-acorncoin"] < 1){
        playerStats["ship-acorncoin"] +=1;
        playerStats["acorncoin"] -=1;
        localStorage.setItem('storedPlayerStats', JSON.stringify(playerStats));
        playerSetup();
        setStats();
    } 
}

//Function to deposit mushroom coins in the silver reactor
function silvercoin() {
    if (playerStats["mushroomcoin"] >= 1 && playerStats["ship-mushroomcoin"] < 10){
        playerStats["ship-mushroomcoin"] +=1;
        playerStats["mushroomcoin"] -=1;
        localStorage.setItem('storedPlayerStats', JSON.stringify(playerStats));
        playerSetup();
        setStats();
    } 
}

//Function to deposit bearclaw coins in the gold reactor
function goldcoin() {
    if (playerStats["bearclawcoin"] >= 1 && playerStats["ship-bearclawcoin"] < 10){
        playerStats["ship-bearclawcoin"] +=1;
        playerStats["bearclawcoin"] -=1;
        localStorage.setItem('storedPlayerStats', JSON.stringify(playerStats));
        playerSetup();
        setStats();
    } 
}