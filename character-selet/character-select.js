//Store images and links for options
let option1Link = document.getElementById("option1-link");
let option2Link = document.getElementById("option2-link");
let option3Link = document.getElementById("option3-link");
let option1Image = document.getElementById("option1-image");
let option2Image = document.getElementById("option2-image");
let option3Image = document.getElementById("option3-image");
let option1Text = document.getElementById("option1-text");
let option2Text = document.getElementById("option2-text");
let option3Text = document.getElementById("option3-text");

//Randomly select the species that will appear
function selectSpecies(){
    let speciesList = []
    let species1
    let species2
    let species3

    //Create a list of species
    for (let i in speciesData){
        speciesList.push(i)
    }

    //Select first species
    species1 = speciesList[Math.floor(Math.random() * speciesList.length)];
    
    //Select second species, can't match first species
    do{species2 = speciesList[Math.floor(Math.random() * speciesList.length)]}
    while (species1===species2 || species2 === null);

    //Select third species, can't equal first two species
    do{species3 = speciesList[Math.floor(Math.random() * speciesList.length)]}
    while (species1===species3 || species2===species3 || species3 === null);

    return [species1, species2, species3];
};

//Function capitalizes the first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

//Set images and text on page to match selected species
function setOptions(options){
    option1Image.src = speciesData[options[0]].imageLeft;
    option2Image.src = speciesData[options[1]].imageLeft;
    option3Image.src = speciesData[options[2]].imageLeft;
    option1Text.innerHTML = capitalizeFirstLetter(options[0]);
    option2Text.innerHTML = capitalizeFirstLetter(options[1]);
    option3Text.innerHTML = capitalizeFirstLetter(options[2]);
}

//Select a species by clicking it
function clickOption(option){
    if(option == "option1"){
        option1Link.setAttribute("class", "option-link-selected");
        option2Link.setAttribute("class", "option-link");
        option3Link.setAttribute("class", "option-link");
        species = speciesOptions[0];
        speciesImage = speciesData[speciesOptions[0]].imageLeft;
    }
    if(option == "option2"){
        option2Link.setAttribute("class", "option-link-selected");
        option1Link.setAttribute("class", "option-link");
        option3Link.setAttribute("class", "option-link");
        species = speciesOptions[1];
        speciesImage = speciesData[speciesOptions[1]].imageLeft;
    }
    if(option == "option3"){
        option3Link.setAttribute("class", "option-link-selected");
        option2Link.setAttribute("class", "option-link");
        option1Link.setAttribute("class", "option-link");
        species = speciesOptions[2];
        speciesImage = speciesData[speciesOptions[2]].imageLeft;
    }

    //Set player species and associated image
    playerStats.species = species ;
    playerStats.image = speciesImage ;

    //Store the updated data object in local storage, after turning the JSON to a string
    localStorage.setItem('storedPlayerStats', JSON.stringify(playerStats));
}

let speciesOptions = selectSpecies();
setOptions(speciesOptions)