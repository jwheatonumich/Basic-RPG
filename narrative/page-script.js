function narrative(script, image){

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
}

var narrativeScript = localStorage.getItem('script');
var narrativeImage = localStorage.getItem('narrative-image');

window.onload = narrative(narrativeScript,narrativeImage);