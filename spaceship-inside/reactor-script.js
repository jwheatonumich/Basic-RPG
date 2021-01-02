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

        //Text explaining you deposited a coin
        document.getElementById("textbox").innerHTML = "You have deposited a red isotope in the red reactor.";

    }else if(playerStats["acorncoin"] < 1){//Error message if you don't have any acorn coins
        document.getElementById("textbox").innerHTML = "You don't have any red isotopes.";
    }else{//Error message if the reactor is full
        document.getElementById("textbox").innerHTML = "The reactor is already full.";
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

        //Text explaining you deposited a coin
        document.getElementById("textbox").innerHTML = "You have deposited a silver isotope in the silver reactor.";
        
    }else if(playerStats["mushroomcoin"] < 1){ //Error message if you don't have any mushroom coins
        document.getElementById("textbox").innerHTML = "You don't have any silver isotopes.";
    }else{//Error message if the reactor is full
        document.getElementById("textbox").innerHTML = "The reactor is already full.";
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

        //Text explaining you deposited a coin
        document.getElementById("textbox").innerHTML = "You have deposited a gold isotope in the gold reactor.";

    }else if(playerStats["bearclawcoin"] < 1){ //Error message if you don't have any bearclaw coins
        document.getElementById("textbox").innerHTML = "You don't have any gold isotopes.";
    }else{//Error message if the reactor is full
        document.getElementById("textbox").innerHTML = "The reactor is already full.";
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