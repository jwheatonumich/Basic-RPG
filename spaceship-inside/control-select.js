//Initialize variables
var narrativeScript = ""

//Load script name and store data associated with that script
    // Find script name
    var needle = localStorage.getItem('controlScriptName');;
    // Iterate over all of the scripts
    for (var i = 0; i < narrativeJSON.length; i++){
        // Find the script that matches the script name
        if (narrativeJSON[i].scriptName == needle){

            //Store the JSON data from the scirpt we find into variables
            narrativeScript = narrativeJSON[i].script;
        }
    }

//Create the page from the variables we loaded
function narrative(script){

    //Add the text to page
    document.getElementById("console-div").innerHTML = script;
}

//Function to load the back link to the back button
//Also resets the screen text
function backButton(){
    button = document.getElementById("back");
}

//Update control text in local storage based on new reactor level
function updateControl(){
    if(playerStats["ship-bearclawcoin"]>=10){
        controlStore('Crash4');
    } else if(playerStats["ship-mushroomcoin"]>=10){
        controlStore('Crash3');
    } else if(playerStats["ship-acorncoin"]>=10){
        controlStore('Crash2');
    } else{
        controlStore('Crash1');
    }
};

//Setup the script to load into the console on page load
window.onload = narrative(narrativeScript);

//Setup the script to load into the console on page load
window.onload = updateControl();

//Setup the back button script on page load
window.onload = backButton();