function match(x,y){
    if(x===y){
        return true;
    }else{
        return false;
    }
}

describe('match()', function() {
    it('tests if inputs match', function() {
        var result = match(1,2);
        wish(result);
    });
});