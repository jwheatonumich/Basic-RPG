//Transform back to original alien
function repairDNA(){
    //Save health and xp after battle ends
    playerStats.species = "gremlin" ;
    playerStats.image = "../images/little-goblin.png" ;
    

    //Store the updated data object in local storage, after turning the JSON to a string
    localStorage.setItem('storedPlayerStats', JSON.stringify(playerStats));

    playerSetup();
    setStats();
}

//Add random numbers of coins to the player's inventory
function dailyLeafCoins() {

    //Calculate how many of each coin to add
    var treeLeafCoin =3

    //Add to player's stats
    playerStats["leafcoin"] +=treeLeafCoin;

    //Loop to create leaf icons
    var i = 1;
    while (i <= treeLeafCoin){

        //Create the images
        var elem = document.createElement("img");
        elem.src = '../images/leaf-coin.png';
        elem.setAttribute("class", "item");

        //Append the images
        document.getElementById("textbox").appendChild(elem);
        i++;
    }

    localStorage.setItem('storedPlayerStats', JSON.stringify(playerStats));
    playerSetup();
    setStats();
}

//If player came to this page by sleeping, print the sleep text
function sleepText(){

    //Local storage that tracks if the player just slept
    var sleep = localStorage.getItem('sleep');

    //Check if the player slept
    if(sleep =="true"){

        console.log("test")
        
        //Print standard new day texg
        var sleepText = 'Day '+ playerStats["day"] + 
        '<br><br>You find 3 leaf coins have dropped to the ground while you slept.<br><br>';

        //If player charged red reactor, state that they are healed
        if(playerStats["ship-acorncoin"] >= 10){
            sleepText = sleepText.concat('You drink a cup of coffee and feel refreshed. Your health increases to 100%!<br><br>');
        };

        //If player charged silver reactor, state that they are healed
        if(playerStats["ship-mushroomcoin"] >= 10){
            sleepText = sleepText.concat('You workout in the gravity chamber. Your stats increase by 1!<br><br>');
        };

        document.getElementById("textbox").innerHTML = sleepText;
        sleep = "false";
        localStorage.setItem('sleep',sleep);

        dailyLeafCoins();
    }
}



//Display sleep text if the player just slept
window.onload = sleepText();