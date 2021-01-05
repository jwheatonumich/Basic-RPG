function dailyEventGenerator(){
    //Random events
    var eventCheck;//Used to calculate whether events happen

    var dailyEvents = {} //Empty object to hold events

    //Squirrel Challenge
    eventCheck = Math.random()
    console.log(eventCheck);
    if (eventCheck < 0.05){
        dailyEvents.squirrelChallenge=true;
    }else{
        dailyEvents.squirrelChallenge=false;
    }

    //Mushroom Challenge
    eventCheck = Math.random()
    if (eventCheck < 0.05){
        dailyEvents.mushroomChallenge=true;
    }else{
        dailyEvents.mushroomChallenge-false;
    }
    
    //Riku Battle
    eventCheck = Math.random()
    if (eventCheck < 0.05){
        dailyEvents.rikuBattle=true;
    }else{
        dailyEvents.rikuBattle=false;
    }

    //Great Tree Leaf
    eventCheck = Math.random()
    if (eventCheck < 0.25){
        dailyEvents.freeLeaf=true;
    }else{
        dailyEvents.freeLeaf=false;
    }

    //Spore Day, Free Training
    eventCheck = Math.random()
    if (eventCheck < 0.25){
        dailyEvents.sporeDay=true;
    }else{
        dailyEvents.sporeDay=false;
    }
    
    //Sleeping Bear
    eventCheck = Math.random()
    if (eventCheck < 0.25){
        dailyEvents.sleepingBear=true;
    }else{
        dailyEvents.sleepingBear=false;
    }

    //Enraged Squirrels
    eventCheck = Math.random()
    if (eventCheck < 0.1){
        dailyEvents.enragedSquirrels=true;
    }else{
        dailyEvents.enragedSquirrels=false;
    }

    //Enraged Mushrooms
    eventCheck = Math.random()
    if (eventCheck < 0.1){
        dailyEvents.enragedMushrooms=true;
    }else{
        dailyEvents.enragedMushrooms=false;
    }

    //Enraged Bears
    eventCheck = Math.random()
    if (eventCheck < 0.1){
        dailyEvents.enragedBears=true;
    }else{
        dailyEvents.enragedBears=false;
    }

    //Store all daily event outcomes
    localStorage.setItem('dailyEvents',JSON.stringify(dailyEvents));

    localStorage.setItem('sleep','true');
    localStorage.setItem('storedPlayerStats', JSON.stringify(playerStats));
    playerSetup(); //Pull updated stats from local storage
    setStats(); //Update stats on page
    window.location.href = "../spaceship/spaceship.html"
};