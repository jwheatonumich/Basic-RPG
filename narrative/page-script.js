function narrative(script, image, buttonName, buttonClick){

    //Setup the image
    var elem = document.createElement("img");
    elem.src = image; //Source equal to input
    elem.id = "page-image";

    //Add the image
    document.getElementById("game-div").appendChild(elem);

    //Setup the narrative text
    var para = document.createElement("P");
    var text = document.createTextNode(script);
    para.appendChild(text);

    //Add the text
    document.getElementById("game-div").appendChild(para);

    //Setup the button
    var button = document.createElement("input"); //Buttons are inputs
    button.type = "button" //Make it a button
    button.setAttribute('class', 'button'); //Add the class for button formatting
    button.setAttribute('value',buttonName); //Set the text in the button
    button.setAttribute('onClick', "location.href=" + buttonClick + ";"); //Set the code it runs


    //Add the button
    document.getElementById("game-div").appendChild(button);
}

var narrativeScript = localStorage.getItem('script');
var narrativeImage = localStorage.getItem('narrative-image');
var narrativeButtonName = localStorage.getItem('narrative-buttonName');
var narrativeButtonClick = localStorage.getItem('narrative-buttonClick');

window.onload = narrative(narrativeScript,narrativeImage,narrativeButtonName,narrativeButtonClick);