//Test setPlayerMultipliers()
if(!(setPlayerMultipliers("attack",abilityData["attack"],abilityData)[0] === 1 &&
setPlayerMultipliers("attack",abilityData["attack"],abilityData)[1] === 1 &&
setPlayerMultipliers("attack",abilityData["attack"],abilityData)[2] === 1 &&
setPlayerMultipliers("attack",abilityData["attack"],abilityData)[3] === 1)){
    throw 'Multipliers setup incorrectly';
}

//Test calculatePlayerAttack()
if(!(calculatePlayerAttack(1000,1,0,0) > 100 &&
calculatePlayerAttack(0,0,1000,1) == 1)){
    throw 'Player damage not calculated correctly'
}

//Test calculateEnemyAttack()
if(!(calculateEnemyAttack(1000,1,0,0) > 100 &&
calculateEnemyAttack(0,0,1000,1) == 1)){
    throw 'Enemy damage not calculated correctly'
}