var attackSlider = document.getElementById("attackInput");
var defenseSlider = document.getElementById("defenseInput");
var enduranceSlider = document.getElementById("enduranceInput");
var attackText = document.getElementById("attackOutput");
var defenseText = document.getElementById("defenseOutput");
var enduranceText = document.getElementById("enduranceOutput");
var remainingStatsText = document.getElementById("remainingStats");

let attack = 5;
let defense = 5;
let endurance = 5;
let totalStats = 30;
let remainingStats = 15;
remainingStatsText.innerHTML = remainingStats;

attackSlider.oninput = function() {
    attackText.innerHTML = this.value;
    attack = this.value;
    remainingStats = totalStats - attack - defense - endurance;
    remainingStatsText.innerHTML = remainingStats;
};

defenseSlider.oninput = function() {
    defenseText.innerHTML = this.value;
    defense = this.value;
    remainingStats = totalStats - attack - defense - endurance;
    remainingStatsText.innerHTML = remainingStats;
};

enduranceSlider.oninput = function() {
    enduranceText.innerHTML = this.value;
    endurance = this.value;
    remainingStats = totalStats - attack - defense - endurance;
    remainingStatsText.innerHTML = remainingStats;
};

function healthCalc(){
    playerStats["maxhealth"] = 4 * playerStats["endurance"]
};

function finalizeStats(){
    if (remainingStats == 0){
        playerStats.attack = parseInt(attack);
        playerStats.defense = parseInt(defense);
        playerStats.endurance =parseInt(endurance);
        playerStats.maxhealth = 4 * playerStats.endurance;
        playerStats.health = playerStats.maxhealth;
        playerStats.leafcoin = 3;
        localStorage.setItem('storedPlayerStats', JSON.stringify(playerStats));
    }
}