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
    document.getElementById("player-health").innerHTML =stats.health + '/' +  stats.maxhealth;
    document.getElementById("player-armor").innerHTML = stats.armor;
    document.getElementById("player-status").innerHTML = stats.status;

    //Set the coin balances equal to the loaded variables
    document.getElementById("acorn-coin").innerHTML = stats.acorncoin;
    document.getElementById("mushroom-coin").innerHTML = stats.mushroomcoin;
    document.getElementById("bearclaw-coin").innerHTML = stats.bearclawcoin;
    document.getElementById("leaf-coin").innerHTML = stats.leafcoin;

    //Set the player image to their costume
    document.getElementById("character-image").src = stats.image;

}

//Function that sets text on the website equal to various enemy stat variables
function setEnemyStats(stats, image){

    document.getElementById("enemy-name").innerHTML = stats.name;
    document.getElementById("enemy-health").innerHTML = stats.health + '/' + stats.maxhealth;
    document.getElementById("enemy-armor").innerHTML = stats.armor;
    document.getElementById("enemy-status").innerHTML = stats.status;

    document.getElementById("enemy-image").src = image; //Set the image source equal to the nth item in the picture list, where n is the value of the dropdown
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
    costImages()

}

function costImages(){
    //Get a list of all attack uttons
    list = document.getElementsByClassName('attack-link');

    for (index = 0; index < list.length; ++index){ //For each attack button
        element = list[index]; //Store the attack button
        abilityName = element.innerHTML //Get the text in the attack button
        console.log(abilityName)

        if (abilityName.includes('{gr}')){ //Check if the text contains the cost
            replaceTextWithImage("{gr}","../images/leaf-coin.png",element,abilityName)
        }
        if (abilityName.includes('{r}')){ //Check if the text contains the cost
            replaceTextWithImage("{r}","../images/acorn-coin.png",element,abilityName)
        }
        if (abilityName.includes('{s}')){ //Check if the text contains the cost
            replaceTextWithImage("{s}","../images/mushroom-coin.png",element,abilityName)
        }
        if (abilityName.includes('{g}')){ //Check if the text contains the cost
            replaceTextWithImage("{g}","../images/bearclaw-coin.png",element,abilityName)
        }
        
    }
}

function replaceTextWithImage(textInput,imageInput,element,abilityName){
    if (abilityName.includes(textInput)){ //Check if the text contains the cost
        var costCount = abilityName.match(new RegExp(textInput, "g"))//Number of cost images

        element.innerHTML = abilityName.replaceAll(textInput,"");//Remove the cost text

        var div = document.createElement("div");//Create a div to store the cost images
        element.appendChild(div);

        for(i in costCount){//Add a cost image for each one removed

            var elem = document.createElement("img");
            elem.setAttribute("src", imageInput);
            elem.setAttribute("height", "30");
            elem.setAttribute("width", "30");
            elem.setAttribute("class", "ability-cost");

            div.appendChild(elem);
        }
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