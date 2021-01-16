
//Test flee when player dead
console.assert(flee(false,"win",false) === "Player was dead, game over","Flee when player is dead failed")

//Test flee when player is alive and won battle
//console.assert(flee(true,"win",false) === "Player won battle, succesfully left","Flee when player is alive and won failed")

//Test flee when player is alive, did not win battle, and escape setting is false
console.assert(flee(true,"inprogress",false) === "Battle in progress, no escape allowed","Flee when player is alive, won, and escape is false failed")

//Test flee when player dead
//console.assert(flee(true,"inprogress",true) === "Battle in progress, player succesfully escaped"||"Battle in progress, player tried and failed to escape","Flee failed")
