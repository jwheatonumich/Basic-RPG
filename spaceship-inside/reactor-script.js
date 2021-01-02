//Function to deposit acorn coins in the red reactor
function redcoin() {
    if (playerStats["acorncoin"] >= 1 && playerStats["ship-acorncoin"] < 10){

        //Add coin to ship
        playerStats["ship-acorncoin"] +=1;
        playerStats["acorncoin"] -=1;
        localStorage.setItem('storedPlayerStats', JSON.stringify(playerStats));
        playerSetup();
        setStats();

        //Update reacor image to new level
        reactorLevels()

    } 
    //Update the control text based on new reactor level
    updateControl();
}

//Function to deposit mushroom coins in the silver reactor
function silvercoin() {
    if (playerStats["mushroomcoin"] >= 1 && playerStats["ship-mushroomcoin"] < 10){
        playerStats["ship-mushroomcoin"] +=1;
        playerStats["mushroomcoin"] -=1;
        localStorage.setItem('storedPlayerStats', JSON.stringify(playerStats));
        playerSetup();
        setStats();

        //Update reacor image to new level
        reactorLevels()
        
    } 
    //Update the control text based on new reactor level
    updateControl();
}

//Function to deposit bearclaw coins in the gold reactor
function goldcoin() {
    if (playerStats["bearclawcoin"] >= 1 && playerStats["ship-bearclawcoin"] < 10){
        playerStats["ship-bearclawcoin"] +=1;
        playerStats["bearclawcoin"] -=1;
        localStorage.setItem('storedPlayerStats', JSON.stringify(playerStats));
        playerSetup();
        setStats();

        //Update reacor image to new level
        reactorLevels()

    } 
    //Update the control text based on new reactor level
    updateControl();
}

//Update battery power levels
function reactorLevels(){
            var percentFilled = (.05+(playerStats["ship-acorncoin"])/12)*100;
            document.getElementById("red-reactor").style.backgroundImage = "linear-gradient(to top, rgba(0,0,0,0) "+percentFilled+"%, white 0%)";

            percentFilled = (.05+(playerStats["ship-mushroomcoin"])/12)*100;
            document.getElementById("silver-reactor").style.backgroundImage = "linear-gradient(to top, rgba(0,0,0,0) "+percentFilled+"%, white 0%)";

            percentFilled = (.05+(playerStats["ship-bearclawcoin"])/12)*100;
            document.getElementById("gold-reactor").style.backgroundImage = "linear-gradient(to top, rgba(0,0,0,0) "+percentFilled+"%, white 0%)";
}

//Update control text in local storage based on new reactor level
function updateControl(){
    if(playerStats["ship-bearclawcoin"]>=10){
        controlStore('Crash4');
    } else if(playerStats["ship-mushroomcoin"]>=10){
        controlStore('Crash3');
    } else if(playerStats["ship-acorncoin"]>=10){
        controlStore('Crash2');
    }
};

window.onload = reactorLevels();