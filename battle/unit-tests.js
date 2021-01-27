//Import wish assertion library
const wish = require('wish');

require('./species-data.js'); //Import species data
require('./ability-data.js'); //Import ability data
require('../script/enemy-data.js'); //Import enemy data

require('./initialize-data.js');

//import main battle script
require('./main-battle-refactor.js');

describe('Test setPlayerMultipliers function', function() {
    it('Test if correct multipliers are calculated for mock inputs', function() {
        var result = func.setPlayerMultipliers("attack",abilityData["attack"],abilityData,{attackMultiplier:1,defenseMultiplier:1},{attackMultiplier:1,defenseMultiplier:1});
        wish(result[0].attackMultiplier === 1);
        wish(result[0].defenseMultiplier === 1);
        wish(result[1].attackMultiplier === 1);
        wish(result[1].defenseMultiplier === 1);
    });
});

describe('Test calculatePlayerAttack function', function() {
    it('Simulate a large attack', function() {
        var result = func.calculatePlayerAttack({attack:1000,attackMultiplier:1},{defense:0,defenseMultiplier:0});
        wish(result > 100);
    });
    it('Simulate a small attack', function() {
        var result = func.calculatePlayerAttack({attack:0,attackMultiplier:0},{defense:1000,defenseMultiplier:1});
        wish(result == 1);
    });
});

describe('Test calculateEnemyAttack function', function() {
    it('Simulate a large attack', function() {
        var result = func.calculateEnemyAttack({defense:0,defenseMultiplier:0},{attack:1000,attackMultiplier:1});
        wish(result > 100);
    });
    it('Simulate a small attack', function() {
        var result = func.calculateEnemyAttack({defense:1000,defenseMultiplier:1},{attack:0,attackMultiplier:0});
        wish(result === 1);
    });
});

describe('Test playerZeroDamage function', function() {
    it('Simulate player dealing damage while not stunned', function() {
        var result = func.playerZeroDamage("attack", abilityData, {stun:0}, 10);
        wish(result === 10);
    });
    it('Simulate player dealing damage while stunned', function() {
        var result = func.playerZeroDamage("attack", abilityData, {stun:1}, 10);
        wish(result === 0);
    });
    it('Simulate player using an attack that doesn\'t deal damage', function() {
        var result = func.playerZeroDamage("powerDown", abilityData, {stun:0}, 10);
        wish(result === 0);
    });
});

describe('Test enemyZeroDamage function', function() {
    it('Simulate enemy dealing damage while not stunned', function() {
        var result = func.enemyZeroDamage(abilityData["attack"], {stun:0}, 10);
        wish(result === 10);
    });
    it('Simulate enemy dealing damage while stunned', function() {
        var result = func.enemyZeroDamage(abilityData["attack"], {stun:1}, 10);
        wish(result === 0);
    });
    it('Simulate enemy using an attack that doesn\'t deal damage', function() {
        var result = func.enemyZeroDamage(abilityData["powerDown"], {stun:0}, 10);
        wish(result === 0);
    });
});

describe('Test resetSingleTurnEffects function', function() {
    it('Test whether function reset all outputs', function() {
        var result = func.resetSingleTurnEffects({},{},{});
        wish(result[0].stun === 0);
        wish(result[0].status === "");
        wish(result[1].stun === 0);
        wish(result[1].status === "");
        wish(result[2].battleText ==="");
    });
});

describe('Test dealDamage function', function() {
    it('No armor', function() {
        var result = func.dealDamage(5, {armor:0, health:10});
        wish(result.armor === 0);
        wish(result.health === 5);
    });
    it('Armor takes all damage', function() {
        var result = func.dealDamage(5, {armor:10, health:10});
        wish(result.armor === 5);
        wish(result.health === 10);
    });
    it('Zero damage to health', function() {
        var result = func.dealDamage(0, {armor:0, health:10});
        wish(result.armor === 0);
        wish(result.health === 10);
    });
    it('Zero damage to armor', function() {
        var result = func.dealDamage(0, {armor:10, health:10});
        wish(result.armor === 10);
        wish(result.health === 10);
    });
});

describe('Test playerPriorityAttack function', function() {
    it('Outputs are as expected after attacking for a fixed damage', function() {
        var result = func.playerPriorityAttack(5,"attack",{"attack":{name:"Attack"}},{armor:0, health:10},{battleText:""});
        wish(result[0].armor === 0);
        wish(result[0].health === 5);
        wish(result[1].battleText === "You strike fast with Attack. The enemy takes 5 damage.<br>");
    });
});

describe('Test enemyPriorityAttack function', function() {
    it('Outputs are as expected after attacking for a fixed damage', function() {
        var result = func.enemyPriorityAttack(5,{name:"Attack"},{armor:0, health:10},{battleText:""});
        wish(result[0].armor === 0);
        wish(result[0].health === 5);
        wish(result[1].battleText === "The enemy strike fast with Attack. You take 5 damage.<br>");
    });
});

describe('Test deadNoDamage function', function() {
    it('Player and enemy are alive, test outputs', function() {
        var result = func.deadNoDamage({health:10},{health:10},1,1);
        wish(result[0] === 1);
        wish(result[1] === 1);
    });
    it('Player dead, enemy alive, test outputs', function() {
        var result = func.deadNoDamage({health:0},{health:10},1,1);
        wish(result[0] === 0);
        wish(result[1] === 1);
    });
    it('Player alive, enemy dead, test outputs', function() {
        var result = func.deadNoDamage({health:10},{health:0},1,1);
        wish(result[0] === 1);
        wish(result[1] === 0);
    });
    it('Player and enemy are dead, test outputs', function() {
        var result = func.deadNoDamage({health:0},{health:0},1,1);
        wish(result[0] === 0);
        wish(result[1] === 0);
    });
});

describe('Test executePlayerAttack function', function() {
    it('Outputs are as expected after attacking for a fixed damage', function() {
        var result = func.executePlayerAttack(5,"attack",{"attack":{name:"Attack"}},{armor:0, health:10},{battleText:""});
        wish(result[0].armor === 0);
        wish(result[0].health === 5);
        wish(result[1].battleText === "You use Attack. The enemy takes 5 damage.<br>");
    });
});

describe('Test executeEnemyAttack function', function() {
    it('Outputs are as expected after attacking for a fixed damage', function() {
        var result = func.executeEnemyAttack(5,{name:"Attack"},{armor:0, health:10},{battleText:""});
        wish(result[0].armor === 0);
        wish(result[0].health === 5);
        wish(result[1].battleText === "The enemy uses Attack. You take 5 damage.<br>");
    });
});

describe('Test calculatePlayerPoison function', function() {
    it('Outputs are as expected after poisoning for a fixed amount', function() {
        var result = func.calculatePlayerPoison("poison",{"poison":{"poison":3}},{battleText:""},{"poison":0},3);
        wish(result[0].poison === 3);
        wish(result[1].battleText === "You poison the enemy!<br>");
    });
});

describe('Test calculateEnemyPoison function', function() {
    it('Outputs are as expected after poisoning for a fixed amount', function() {
        var result = func.calculateEnemyPoison({"poison":3},{battleText:""},{"poison":0},3);
        wish(result[0].poison === 3);
        wish(result[1].battleText === "The enemy poisons you!<br>");
    });
});

describe('Test calculateEnemyStunned function', function() {
    it('Outputs are as expected when enemy is stunned', function() {
        var result = func.calculateEnemyStunned({"stun":{"stun":0}}, "stun" ,{stun:0,status:""});
        wish(result.stun === 0);
        wish(result.status === "");
    });
    it('Outputs are as expected when enemy is not stunned', function() {
        var result = func.calculateEnemyStunned({"stun":{"stun":1}}, "stun" ,{stun:0,status:""});
        wish(result.stun === 1);
        wish(result.status === "Stunned");
    });
});

describe('Test calculatePlayerStunned function', function() {
    it('Outputs are as expected when enemy is stunned', function() {
        var result = func.calculatePlayerStunned({"stun":0},{stun:0,status:""});
        wish(result.stun === 0);
        wish(result.status === "");
    });
    it('Outputs are as expected when enemy is not stunned', function() {
        var result = func.calculatePlayerStunned({"stun":1},{stun:0,status:""});
        wish(result.stun === 1);
        wish(result.status === "Stunned");
    });
});

describe('Test setPoisonStunBattletext function', function() {
    it('Outputs are as expected after poisoning for a fixed amount', function() {
        var result = func.setPoisonStunBattletext({poison:5,stun:1},{poison:5,stun:1}, {battleText:""});
        wish(result.battleText  === "Poison deals you 5 damage<br>Poison deals the enemy 5 damage<br>You have been stunned!<br>The enemy has been stunned!<br>");
    });
    it('Outputs are as expected after poisoning for a fixed amount', function() {
        var result = func.setPoisonStunBattletext({poison:0,stun:0},{poison:0,stun:0}, {battleText:""});
        wish(result.battleText  === "");
    });
});

describe('Test updateBattleStatusData function', function() {
    it('Check battle status data output matches inputs', function() {
        var result = initializeFunc.updateBattleStatusData({enemyID:1},{health:2,poison:true, stun:true, status:"Stunned"},{health:2,poison:true, stun:true, status:"Stunned"},{});
        wish(result.enemyHealth === 2);
        wish(result.enemyID === 1);
        wish(result.enemyPoison === true);
        wish(result.enemyStatus === "Stunned");
        wish(result.enemyStun === true);
        wish(result.playerHealth === 2);
        wish(result.playerPoison === true);
        wish(result.playerStatus === "Stunned");
        wish(result.playerStun === true);

    });
});

describe('Test loseBattle function', function() {
    it('Check outputs are reset after running function', function() {
        var result1 = func.resetBattleStatus({},{maxhealth:100});
        wish(result1[0].playerAlive === false);
        wish(result1[0].result === "lose");
        wish(result1[0].winstreak === 0);
        wish(result1[1].health === 100);
    });
});

describe('addBattleText', function() {
    it('Check output array after adding element', function() {
        var result = func.addTextToArray([,,,,,,,,,],"Line1",0);
        wish(result[0] === "Line1");
    });
    it('Check output array after adding element', function() {
        var result = func.addTextToArray([,,,,,,,,,],"Line5",4);
        wish(result[4] === "Line5");
    });
});

describe('battleTextArrayToString', function() {
    it('Check concatenated string output', function() {
        var result = func.arrayToString(["Line1",,"Line3",,,,,,,]);
        wish(result === "Line1<br>Line3<br>");
    });
});