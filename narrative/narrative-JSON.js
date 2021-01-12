narrativeJSON = [
    {"scriptName":"NewGame","script":"[You]: Aww shoot, crashed this ship again. Looks like the reactor has been breached too. I guess I should take a look at the exterior. I'll take a few green isotopes in case I get hurt.","image" : "../images/console-intro.PNG","buttonName":"Exit Ship","buttonClick" :"narrativeStore('CrashIntro');location.href='../narrative/narrative.html'","loadScript":"dailyLeafCoins"},
    {"scriptName":"CrashIntro","script":"[You]: Looks like I really mucked things up this time. Hopefully there are some radioactive isotopes nearby.","image" : "../images/spaceship-crash.png","buttonName":"Explore","buttonClick" :"narrativeStore('BossIntro');location.href='../narrative/narrative.html'"},
    {"scriptName":"BossIntro","script":"[???]: Are you the one responsible for all of this noise? You seem mostly harmless. If you are going to hang around these parts you had better toughen-up.Try sparring with some of the local animals. I'll be back to test your strength in three days.","image" : "../images/robed-boss-1.png","buttonName":"Explore","buttonClick" :"location.href='../intro/intro-1.html'"},
    {"scriptName":"Riku1","script":"Riku is clearly not a real bear.","image" : "../images/bearsuit-avatar.png","buttonName":"Back","buttonClick" :"location.href='../riku-training/train.html'"},
    {"scriptName":"SquirrelMaser1","script":"The master of the ninja squirrels will train your attack, defense, and endurance up to a maximum of 25.","image" : "../images/squirrel-trainer.png","buttonName":"Back","buttonClick" :"location.href='../squirrel-master/train.html'"},
    {"scriptName":"MushroomMaster1","script":"This wisened old mushroom will train your attack, defense, and endurance up to a maximum of 40.","image" : "../images/mushroom-man.png","buttonName":"Back","buttonClick" :"location.href='../mushroom-master/train.html'"},
    {"scriptName":"CrashSite","script":"This is where you crashed your ship. Oops!","image" : "../images/spaceship-crash.png","buttonName":"Back","buttonClick" :"location.href='../spaceship/spaceship.html'"},
    {"scriptName":"Boss1","script":"[???]: Your three days are up. Time to see how strong you have become!","image" : "../images/robed-boss-1.png","buttonName":"Fight!","buttonClick" :"startBattle(19, false, true, true,'Boss1PostFight')","heal":true,"mandatory":true,"loadScript":"dailyLeafCoins"},
    {"scriptName":"Boss1PostFight","script":"[???]: You did better than I expected. Still, you aren't strong enough for me to use my full power. Try training in the Chanpinon Village and I'll see you again in 4 more days.","image" : "../images/robed-boss-1.png","buttonName":"Back","buttonClick" :"location.href='../home/index.html'"},
    {"scriptName":"Boss2","script":"[???]: Your four days are up. Time to see how strong you have become!","image" : "../images/robed-boss-1.png","buttonName":"Fight!","buttonClick" :"startBattle(19, false, true, true,'Boss2PostFight')","heal":true,"mandatory":true,"loadScript":"dailyLeafCoins"},
    {"scriptName":"Boss2PostFight","script":"[???]: Very impressive, you actually made me break a sweat. See if you can survive the bear cave and I'll see you again in 4 more days.","image" : "../images/robed-boss-1.png","buttonName":"Back","buttonClick" :"location.href='../home/index.html'"},
    {"scriptName":"Boss3","script":"[???]: Your four days are up. Time to see how strong you have become!","image" : "../images/robed-boss-1.png","buttonName":"Fight!","buttonClick" :"startBattle(19, false, true, true,'Boss3PostFight')","heal":true,"mandatory":true,"loadScript":"dailyLeafCoins"},
    {"scriptName":"Boss3PostFight","script":"[???]: You finally did it. You beat me at my full power.","image" : "../images/robed-boss-1.png","buttonName":"Back","buttonClick" :"location.href='../home/index.html'"},
]