describe('Testing the setPlayerMultipliers function', function() {
    it('tests if inputs match', function() {
        var result = calculatePlayerAttack({attack:1000,attackMultiplier:1},{defense:0,defenseMultiplier:0});
        expect(result) > 100;
    });
});