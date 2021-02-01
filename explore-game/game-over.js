//Reward if you win
rewardType = "acorncoin";
rewardImage = '../images/acorn-coin.png'
var page = "../acorn-catch/acorn-catch.html";

//Enemy you battle if you lose
enemyList = [23];

//End game function
endGame = function(){
    //Handle game over
    if(gameStatus == "win"){
        document.getElementById("textbox").innerHTML = 'You win!<br>'

        playerStats[rewardType] +=coinsCaught;
        localStorage.setItem('storedPlayerStats', JSON.stringify(playerStats));
        playerSetup();
        setStats();
        
        //Loop to create leaf icons
        var i = 1;
        while (i <= coinsCaught){

            //Create the images
            var elem = document.createElement("img");
            elem.src = rewardImage;
            elem.setAttribute("class", "item");

            //Append the images
            document.getElementById("textbox").appendChild(elem);
            i++;
        }

    }

    if(gameStatus == "lose"){
        playerStats[rewardType] +=coinsCaught;
        localStorage.setItem('storedPlayerStats', JSON.stringify(playerStats));
        playerSetup();
        setStats();

        startBattle(enemyList,false,true,true);
    }

}