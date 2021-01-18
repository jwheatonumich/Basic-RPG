//Test setPlayerMultipliers function
if(!(setPlayerMultipliers("attack",abilityData["attack"],abilityData)[0] === 1 &&
setPlayerMultipliers("attack",abilityData["attack"],abilityData)[1] === 1 &&
setPlayerMultipliers("attack",abilityData["attack"],abilityData)[2] === 1 &&
setPlayerMultipliers("attack",abilityData["attack"],abilityData)[3] === 1)){
    throw 'Multipliers setup incorrectly';
}

//Test calculatePlayerAttack function
if(!(calculatePlayerAttack(1000,1,0,0) > 100 &&
calculatePlayerAttack(0,0,1000,1) == 1)){
    throw 'Player damage not calculated correctly'
}

//Test calculateEnemyAttack function
if(!(calculateEnemyAttack(1000,1,0,0) > 100 &&
calculateEnemyAttack(0,0,1000,1) == 1)){
    throw 'Enemy damage not calculated correctly'
}

//Test playerZeroDamage function
if(!(playerZeroDamage("attack", abilityData, {stun:0}, 10) === 10 &&
playerZeroDamage("attack", abilityData, {stun:1}, 10) === 0 &&
playerZeroDamage("powerDown", abilityData, {stun:0}, 10) === 0)){
    throw 'playerZeroDamage function not working correctly'
}

//Test playerZeroDamage function
if(!(enemyZeroDamage(abilityData["attack"], {stun:0}, 10) === 10 &&
enemyZeroDamage(abilityData["attack"], {stun:1}, 10) === 0 &&
enemyZeroDamage(abilityData["powerDown"], {stun:0}, 10) === 0)){
    throw 'playerZeroDamage function not working correctly'
}

//Test resetSingleTurnEffects function
if(!(resetSingleTurnEffects({},{},{})[0].stun === 0 &&
resetSingleTurnEffects({},{},{})[0].status ==="" &&
resetSingleTurnEffects({},{},{})[1].stun === 0 &&
resetSingleTurnEffects({},{},{})[1].status ==="" &&
resetSingleTurnEffects({},{},{})[2].battleText ==="")){
    throw 'resetSingleTurnEffects function not working correctly'
}

//Testp dealDamage function
if(!(dealDamage(5, {armor:0, health:10}).armor === 0 &&
dealDamage(5, {armor:0, health:10}).health === 5 &&
dealDamage(5, {armor:10, health:10}).armor == 5 &&
dealDamage(0, {armor:0, health:10}).health == 10 &&
dealDamage(0, {armor:10, health:10}).armor == 10)){
    throw 'dealDamage function not working correctly'
}

//Test playerPriorityAttack function
if(!(playerPriorityAttack(5,"attack",{"attack":{name:"Attack"}},{armor:0, health:10},{battleText:""})[0].armor === 0 &&
playerPriorityAttack(5,"attack",{"attack":{name:"Attack"}},{armor:0, health:10},{battleText:""})[0].health === 5 &&
playerPriorityAttack(5,"attack",{"attack":{name:"Attack"}},{armor:0, health:10},{battleText:""})[1].battleText === "You strike fast with Attack. The enemy takes 5 damage.<br>")){
    throw 'playerPriorityAttack function not working correctly'
}

//Test enemyPriorityAttack function
if(!(enemyPriorityAttack(5,{name:"Attack"},{armor:0, health:10},{battleText:""})[0].armor === 0 &&
enemyPriorityAttack(5,{name:"Attack"},{armor:0, health:10},{battleText:""})[0].health === 5 &&
enemyPriorityAttack(5,{name:"Attack"},{armor:0, health:10},{battleText:""})[1].battleText === "The enemy strike fast with Attack. You take 5 damage.<br>")){
    throw 'enemyPriorityAttack function not working correctly'
}