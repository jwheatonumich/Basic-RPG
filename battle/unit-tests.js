//Import wish assertion library
const wish = require('wish');

require('./species-data.js'); //Import species data
require('./ability-data.js'); //Import ability data
require('../script/enemy-data.js'); //Import enemy data

require('./initialize-data.js');

//import main battle script
require('./main-battle-refactor.js');

describe('Testing the setPlayerMultipliers function', function() {
    it('tests if inputs match', function() {
        var result = func.calculatePlayerAttack({attack:1000,attackMultiplier:1},{defense:0,defenseMultiplier:0});
        wish(result > 100);
    });
});