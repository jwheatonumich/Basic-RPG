//Blink leafcoins when low
function leafcoinAlert(){
    window.addEventListener(
        "load", function(){
                var f = document.getElementById('leaf-coin');
                setInterval(
                    function(){
                        //If color = red, set white, otherwise set red
                        if(playerStats.leafcoin == 0){
                            f.style.color = (f.style.color == 'red' ? 'white' : 'red');
                        }else{
                            f.style.color = 'white'
                        }
                    }
                , 1000);
            }

    , false);
}

//Function that sets text on the website equal to various player stat variables
function setStats(stats) {
    
    document.getElementById("player-name").innerHTML = stats.name;
    document.getElementById("player-health").innerHTML =" ("+ stats.health + '/' +  stats.maxhealth + ") ";
    document.getElementById("player-armor").innerHTML = " (" + stats.armor + ") ";
    document.getElementById("player-status").innerHTML = stats.status;

    //Set the coin balances equal to the loaded variables
    document.getElementById("acorn-coin").innerHTML = stats.acorncoin;
    document.getElementById("mushroom-coin").innerHTML = stats.mushroomcoin;
    document.getElementById("bearclaw-coin").innerHTML = stats.bearclawcoin;
    document.getElementById("leaf-coin").innerHTML = stats.leafcoin;

    //Set the player image to their costume
    document.getElementById("character-image").src = stats.image;

    //Set the player health and armor bars
    document.getElementById("player-health-bar").value = stats.health;
    document.getElementById("player-health-bar").max = stats.maxhealth;
    document.getElementById("player-armor-bar").value = stats.armor;
    document.getElementById("player-armor-bar").max = stats.maxhealth;

}

//Function that sets text on the website equal to various enemy stat variables
function setEnemyStats(stats, image){

    document.getElementById("enemy-name").innerHTML = stats.name;
    document.getElementById("enemy-health").innerHTML = " (" + stats.health + '/' + stats.maxhealth + ") ";
    document.getElementById("enemy-armor").innerHTML = " (" + stats.armor + ") ";
    document.getElementById("enemy-status").innerHTML = stats.status;

    document.getElementById("enemy-image").src = image;

    //Set the enemy health and armor bars
    document.getElementById("enemy-health-bar").value = stats.health;
    document.getElementById("enemy-health-bar").max = stats.maxhealth;
    document.getElementById("enemy-armor-bar").value = stats.armor;
    document.getElementById("enemy-armor-bar").max = stats.maxhealth;
};

function setEnemyPowerlevel(stats){

    //Set the enemy powerlevel
    document.getElementById("powerlevel").value = stats.enemyPowerlevel;
    document.getElementById("powerlevel2").value = stats.enemyPowerlevel - 10;
    document.getElementById("powerlevel3").value = stats.enemyPowerlevel - 20;
    document.getElementById("powerlevel4").value = stats.enemyPowerlevel - 30;

}

//Function to prevent player from using attack links
function stopPlayerAttack(){

     //Abilities use the empty function while player is dead
     document.getElementById("attack1").setAttribute('onClick',"func.empty();");
     document.getElementById("attack2").setAttribute('onClick',"func.empty();");
     document.getElementById("attack3").setAttribute('onClick',"func.empty();");
     document.getElementById("attack4").setAttribute('onClick',"func.empty();");  

}

function setBattleText(battletext){
    document.getElementById("battle-text-div").innerHTML = battletext;
}

//Function that sets up player's attack buttons
function setPlayerAbilityButtons(playerStats){

    let attack1 = abilityData[speciesData[playerStats.species].attack1Name];
    let attack2 = abilityData[speciesData[playerStats.species].attack2Name];
    let attack3 = abilityData[speciesData[playerStats.species].attack3Name];
    let attack4 = abilityData[speciesData[playerStats.species].attack4Name];

    let attacks = [attack1,attack2,attack3,attack4];

    //Set ability button text
    document.getElementById("attack1").innerHTML = speciesData[playerStats.species].attack1DisplayName;
    document.getElementById("attack2").innerHTML = speciesData[playerStats.species].attack2DisplayName;
    document.getElementById("attack3").innerHTML = speciesData[playerStats.species].attack3DisplayName;
    document.getElementById("attack4").innerHTML = speciesData[playerStats.species].attack4DisplayName;

    //Set the onclick for each ability to the correct attack function based on the player's species
    document.getElementById("attack1").setAttribute("onClick", speciesData[playerStats.species].attack1);
    document.getElementById("attack2").setAttribute("onClick", speciesData[playerStats.species].attack2);
    document.getElementById("attack3").setAttribute("onClick", speciesData[playerStats.species].attack3);
    document.getElementById("attack4").setAttribute("onClick", speciesData[playerStats.species].attack4);

    //Replace cost text with images
    var list, index, element, abilityName;

    //Add cost images
    costImages(attacks)

}

function costImages(attacks){

    //Get a list of all attack buttons
    list = document.getElementsByClassName('attack-link');

    for (index = 0; index < list.length - 1; ++index){ //For each attack button
        let element = list[index]; //Store the attack button
        let ability = attacks[index]; //Store the ability associated with the attack button
        let div = document.createElement("div");//Create a div to store the cost images
        element.appendChild(div);//Append the newly created div to the attack button

        //Add cost images
        replaceTextWithImage("leafcoin","../images/leaf-coin.png",ability,div)
        replaceTextWithImage("acorncoin","../images/acorn-coin.png",ability,div)
        replaceTextWithImage("mushroomcoin","../images/mushroom-coin.png",ability,div)
        replaceTextWithImage("bearclawcoin","../images/bearclaw-coin.png",ability,div)
    }
}

function replaceTextWithImage(textInput,imageInput,ability,div){

    var costCount = 0; //Default to not needing any of the input cost

    if(ability.hasOwnProperty(textInput)){//If this ability uses the input cost
        costCount = ability[textInput]//Determine how many of the cost are needed
    } 
        
        for(let step = 0; step < costCount; step++){//Add the input image for each cost

            var elem = document.createElement("img");
            elem.setAttribute("src", imageInput);
            elem.setAttribute("height", "30");
            elem.setAttribute("width", "30");
            elem.setAttribute("class", "ability-cost");

            div.appendChild(elem); //Append the images to the input div
        }

}

function pageSetup(){
    leafcoinAlert();
    setStats(playerBattleStats);
    setEnemyStats(enemyBattleStats,chosenEnemy["enemyImage"]);
    setEnemyPowerlevel(chosenEnemy.stats);
    setPlayerAbilityButtons(playerBattleStats);
    setBattleText(battleData.battleText);

    if(playerBattleStats.health <= 0){stopPlayerAttack();}
}

window.onload = pageSetup();