//Initialize variables
var narrativeScript = ""
var narrativeImage = ""
var narrativeButtonName = ""
var narrativeButtonClick = ""

//Load script name and store data associated with that script
    // Find script name
    var needle = localStorage.getItem('scriptName');;

    // Iterate over all of the scripts
    for (var i = 0; i < narrativeJSON.length; i++){
        // Find the script that matches the script name
        if (narrativeJSON[i].scriptName == needle){

            //Store the JSON data from the scirpt we find into variables
            narrativeScript = narrativeJSON[i].script;
            narrativeImage = narrativeJSON[i].image;
            narrativeButtonName = narrativeJSON[i].buttonName;
            narrativeButtonClick = narrativeJSON[i].buttonClick;
            narrativeHeal = narrativeJSON[i].heal;
            mandatory = narrativeJSON[i].mandatory;
        }
    }

//Create the page from the variables we loaded
function narrative(script, image, buttonName, buttonClick,heal=false,mandatory=false){

    var buttonClickFunction = "";

    //If the narrative includes a heal, add heal to the function the button will execute
    if(heal){
        buttonClickFunction = "heal();";
    };

    //Append the function this narrative performs to be added to the button
    buttonClickFunction = buttonClickFunction.concat(buttonClick);

    //Setup the image
    var elem = document.createElement("img");
    elem.src = image; //Source equal to input
    elem.id = "page-image";

    //Add the image to page
    document.getElementById("game-div").appendChild(elem);

    //Setup the narrative text
    var para = document.createElement("P");
    var text = document.createTextNode(script);
    para.appendChild(text);

    //Add the text to page
    document.getElementById("game-div").appendChild(para);

    //Setup the button
    var button = document.createElement("input"); //Buttons are inputs
    button.type = "button" //Make it a button
    button.setAttribute('class', 'button'); //Add the class for button formatting
    button.setAttribute('value',buttonName); //Set the text in the button
    button.setAttribute('onClick', buttonClickFunction); //Set the code it runs

    //Add the button to page
    document.getElementById("game-div").appendChild(button);

    //If this is a mandatory battle
    if(mandatory){
        //Load battle settings data
        battleSettings = JSON.parse(localStorage.getItem('battleSettings'));
        //Set battlesettings to mandatory
        battleSettings.mandatory = true
        localStorage.setItem('battleSettings', JSON.stringify(battleSettings));
    }
}

//Used if a narrative includes a heal
function heal(){
    playerStats.health = playerStats.maxhealth ;
    localStorage.setItem('storedPlayerStats', JSON.stringify(playerStats));

}

window.onload = narrative(narrativeScript,narrativeImage,narrativeButtonName,narrativeButtonClick,narrativeHeal,mandatory);