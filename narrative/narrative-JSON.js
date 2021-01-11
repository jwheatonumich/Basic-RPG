narrativeJSON = [
    {"scriptName":"NewGame","script":'Hello cadet, welcome to Creatura. You have been sent to this planet to subjugate the native lifeforms. Investigate the surrounding area and identify any threats. Should your DNA become corrupted, you can return to the ship to repair it.',"image" : "../images/spaceship-crash.png","buttonName":"Explore","buttonClick" :"location.href='../intro/intro-1.html'","loadScript":"dailyLeafCoins"},
    {"scriptName":"Riku1","script":"Riku is clearly not a real bear.","image" : "../images/bearsuit-avatar.png","buttonName":"Back","buttonClick" :"location.href='../riku-training/train.html'"},
    {"scriptName":"SquirrelMaser1","script":"The master of the ninja squirrels will train your attack, defense, and endurance up to a maximum of 25.","image" : "../images/squirrel-trainer.png","buttonName":"Back","buttonClick" :"location.href='../squirrel-master/train.html'"},
    {"scriptName":"MushroomMaster1","script":"This wisened old mushroom will train your attack, defense, and endurance up to a maximum of 40.","image" : "../images/mushroom-man.png","buttonName":"Back","buttonClick" :"location.href='../mushroom-master/train.html'"},
    {"scriptName":"CrashSite","script":"This is where you crashed your ship. Oops!","image" : "../images/spaceship-crash.png","buttonName":"Back","buttonClick" :"location.href='../spaceship/spaceship.html'"},
    {"scriptName":"Boss1","script":"Your three days are up. Time to see how strong you have become!","image" : "../images/robed-boss-1.png","buttonName":"Fight!","buttonClick" :"startBattle(19, false, true, true,'Boss1PostFight')","heal":true,"mandatory":true,"loadScript":"dailyLeafCoins"},
    {"scriptName":"Boss1PostFight","script":"You did better than I expected. Still, you aren't strong enough for me to use my full power. Try training in the Chanpinon Village and I'll see you again in 4 more days.","image" : "../images/robed-boss-1.png","buttonName":"Back","buttonClick" :"location.href='../home/index.html'"},
    {"scriptName":"Boss2","script":"Your three days are up. Time to see how strong you have become!","image" : "../images/robed-boss-1.png","buttonName":"Fight!","buttonClick" :"startBattle(19, false, true, true)","heal":true,"mandatory":true},
    {"scriptName":"Boss3","script":"Your three days are up. Time to see how strong you have become!","image" : "../images/robed-boss-1.png","buttonName":"Fight!","buttonClick" :"startBattle(19, false, true, true)","heal":true,"mandatory":true},
]