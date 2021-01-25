//Test setPlayerMultipliers function
if(!(setPlayerMultipliers("attack",abilityData["attack"],abilityData,{attackMultiplier:1,defenseMultiplier:1},{attackMultiplier:1,defenseMultiplier:1})[0].attackMultiplier === 1 &&
setPlayerMultipliers("attack",abilityData["attack"],abilityData,{attackMultiplier:1,defenseMultiplier:1},{attackMultiplier:1,defenseMultiplier:1})[0].defenseMultiplier === 1 &&
setPlayerMultipliers("attack",abilityData["attack"],abilityData,{attackMultiplier:1,defenseMultiplier:1},{attackMultiplier:1,defenseMultiplier:1})[1].attackMultiplier === 1 &&
setPlayerMultipliers("attack",abilityData["attack"],abilityData,{attackMultiplier:1,defenseMultiplier:1},{attackMultiplier:1,defenseMultiplier:1})[1].defenseMultiplier === 1)){
    throw 'Multipliers setup incorrectly';
}

//Test for setPlayerMultipliers function with mock data
if(!(setPlayerMultipliers("attack",{selfAttackMultiplier:2,opponentAttackMultiplier:2,selfDefenseMultiplier:2,opponentDefenseMultiplier:2},{attack:{selfAttackMultiplier:2,opponentAttackMultiplier:2,selfDefenseMultiplier:2,opponentDefenseMultiplier:2}},{attackMultiplier:1,defenseMultiplier:1},{attackMultiplier:1,defenseMultiplier:1})[0].attackMultiplier === 4 &&
setPlayerMultipliers("attack",{selfAttackMultiplier:2,opponentAttackMultiplier:2,selfDefenseMultiplier:2,opponentDefenseMultiplier:2},{attack:{selfAttackMultiplier:2,opponentAttackMultiplier:2,selfDefenseMultiplier:2,opponentDefenseMultiplier:2}},{attackMultiplier:1,defenseMultiplier:1},{attackMultiplier:1,defenseMultiplier:1})[0].defenseMultiplier === 4 &&
setPlayerMultipliers("attack",{selfAttackMultiplier:2,opponentAttackMultiplier:2,selfDefenseMultiplier:2,opponentDefenseMultiplier:2},{attack:{selfAttackMultiplier:2,opponentAttackMultiplier:2,selfDefenseMultiplier:2,opponentDefenseMultiplier:2}},{attackMultiplier:1,defenseMultiplier:1},{attackMultiplier:1,defenseMultiplier:1})[1].attackMultiplier === 4 &&
setPlayerMultipliers("attack",{selfAttackMultiplier:2,opponentAttackMultiplier:2,selfDefenseMultiplier:2,opponentDefenseMultiplier:2},{attack:{selfAttackMultiplier:2,opponentAttackMultiplier:2,selfDefenseMultiplier:2,opponentDefenseMultiplier:2}},{attackMultiplier:1,defenseMultiplier:1},{attackMultiplier:1,defenseMultiplier:1})[1].defenseMultiplier === 4)){
    throw 'Multipliers setup incorrectly';
}


//Test calculatePlayerAttack function
if(!(calculatePlayerAttack({attack:1000,attackMultiplier:1},{defense:0,defenseMultiplier:0}) > 100 &&
calculatePlayerAttack({attack:0,attackMultiplier:0},{defense:1000,defenseMultiplier:1}) == 1)){
    throw 'Player damage not calculated correctly'
}

//Test calculateEnemyAttack function
if(!(calculateEnemyAttack({defense:0,defenseMultiplier:0},{attack:1000,attackMultiplier:1}) > 100 &&
calculateEnemyAttack({defense:1000,defenseMultiplier:1},{attack:0,attackMultiplier:0}) == 1)){
    throw 'Enemy damage not calculated correctly'
}

//Test playerZeroDamage function
if(!(playerZeroDamage("attack", abilityData, {stun:0}, 10) === 10 &&
playerZeroDamage("attack", abilityData, {stun:1}, 10) === 0 &&
playerZeroDamage("powerDown", abilityData, {stun:0}, 10) === 0)){
    throw 'playerZeroDamage function not working correctly'
}

//Test enemyZeroDamage function
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

//Test dealDamage function
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

//Test deadNoDamage function
if(!(deadNoDamage({health:10},{health:10},1,1)[0]===1 &&
deadNoDamage({health:10},{health:10},1,1)[1]===1 &&
deadNoDamage({health:0},{health:10},1,1)[0]===0 &&
deadNoDamage({health:0},{health:10},1,1)[1]===1 &&
deadNoDamage({health:10},{health:0},1,1)[0]===1 &&
deadNoDamage({health:10},{health:0},1,1)[1]===0 &&
deadNoDamage({health:0},{health:0},1,1)[0]===0 &&
deadNoDamage({health:0},{health:0},1,1)[1]===0)){
    throw 'deadNoDamage function not working correctly'  
}

//Test executePlayerAttack function
if(!(executePlayerAttack(5,"attack",{"attack":{name:"Attack"}},{armor:0, health:10},{battleText:""})[0].armor === 0 &&
executePlayerAttack(5,"attack",{"attack":{name:"Attack"}},{armor:0, health:10},{battleText:""})[0].health === 5 &&
executePlayerAttack(5,"attack",{"attack":{name:"Attack"}},{armor:0, health:10},{battleText:""})[1].battleText === "You use Attack. The enemy takes 5 damage.<br>")){
    throw 'executePlayerAttack function not working correctly'
}

//Test executeEnemyAttack function
if(!(executeEnemyAttack(5,{name:"Attack"},{armor:0, health:10},{battleText:""})[0].armor === 0 &&
executeEnemyAttack(5,{name:"Attack"},{armor:0, health:10},{battleText:""})[0].health === 5 &&
executeEnemyAttack(5,{name:"Attack"},{armor:0, health:10},{battleText:""})[1].battleText === "The enemy uses Attack. You take 5 damage.<br>")){
    throw 'executeEnemyAttack function not working correctly'
}

//Test calculatePlayerPoison function
if(!(calculatePlayerPoison("poison",{"poison":{"poison":3}},{battleText:""},{"poison":0},3)[0].poison === 3 &&
calculatePlayerPoison("poison",{"poison":{"poison":3}},{battleText:""},{"poison":0},3)[1].battleText === "You poison the enemy!<br>")){
    throw 'calculatePlayerPoison function not working correctly'
}

//Test calculateEnemyPoison function
if(!(calculateEnemyPoison({"poison":3},{battleText:""},{"poison":0},3)[0].poison === 3 &&
calculateEnemyPoison({"poison":3},{battleText:""},{"poison":0},3)[1].battleText === "The enemy poisons you!<br>")){
    throw 'calculateEnemyPoison function not working correctly'
}

//Test calculateEnemyStunned function
if(!(calculateEnemyStunned({"stun":{"stun":0}}, "stun" ,{stun:0,status:""}).stun === 0 &&
calculateEnemyStunned({"stun":{"stun":0}}, "stun" ,{stun:0,status:""}).status === "" &&
calculateEnemyStunned({"stun":{"stun":1}}, "stun" ,{stun:0,status:""}).stun === 1 &&
calculateEnemyStunned({"stun":{"stun":1}}, "stun" ,{stun:0,status:""}).status === "Stunned")){
    throw 'calculateEnemyStunned function not working correctly'
}

//Test calculatePlayerStunned function
if(!(calculatePlayerStunned({"stun":0},{stun:0,status:""}).stun === 0 &&
calculatePlayerStunned({"stun":0},{stun:0,status:""}).status === "" &&
calculatePlayerStunned({"stun":1},{stun:0,status:""}).stun === 1 &&
calculatePlayerStunned({"stun":1},{stun:0,status:""}).status === "Stunned")){
    throw 'calculatePlayerStunned function not working correctly'
}

//Test setPoisonStunBattletext function
if(!(setPoisonStunBattletext({poison:5,stun:1},{poison:5,stun:1}, {battleText:""}).battleText === "Poison deals you 5 damage<br>Poison deals the enemy 5 damage<br>You have been stunned!<br>The enemy has been stunned!<br>" &&
setPoisonStunBattletext({poison:0,stun:0},{poison:0,stun:0}, {battleText:""}).battleText === "")){
    throw 'setPoisonStunBattletext function not working correctly'
}

//Test saveProgress function
if(!(saveProgress({enemyID:1},{health:2,poison:true, stun:true, status:"Stunned"},{health:2,poison:true, stun:true, status:"Stunned"}).enemyHealth === 2 &&
saveProgress({enemyID:1},{health:2,poison:true, stun:true, status:"Stunned"},{health:2,poison:true, stun:true, status:"Stunned"}).enemyID === 1 &&
saveProgress({enemyID:1},{health:2,poison:true, stun:true, status:"Stunned"},{health:2,poison:true, stun:true, status:"Stunned"}).enemyPoison === true &&
saveProgress({enemyID:1},{health:2,poison:true, stun:true, status:"Stunned"},{health:2,poison:true, stun:true, status:"Stunned"}).enemyStatus === "Stunned" &&
saveProgress({enemyID:1},{health:2,poison:true, stun:true, status:"Stunned"},{health:2,poison:true, stun:true, status:"Stunned"}).enemyStun === true &&
saveProgress({enemyID:1},{health:2,poison:true, stun:true, status:"Stunned"},{health:2,poison:true, stun:true, status:"Stunned"}).playerHealth === 2 &&
saveProgress({enemyID:1},{health:2,poison:true, stun:true, status:"Stunned"},{health:2,poison:true, stun:true, status:"Stunned"}).playerPoison === true &&
saveProgress({enemyID:1},{health:2,poison:true, stun:true, status:"Stunned"},{health:2,poison:true, stun:true, status:"Stunned"}).playerStatus === "Stunned" &&
saveProgress({enemyID:1},{health:2,poison:true, stun:true, status:"Stunned"},{health:2,poison:true, stun:true, status:"Stunned"}).playerStun === true)){
    throw 'saveProgress function not working correctly'
}

//Test loseBattle function
if(!(loseBattle({},{maxhealth:100})[0].result === "lose" &&
loseBattle({},{maxhealth:100})[0].winstreak === 0 &&
loseBattle({},{maxhealth:100})[1].health === 100)){
    throw 'loseBattle function not working correctly'
}