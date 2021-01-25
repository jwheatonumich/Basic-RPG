//----------------------MOCK DATA-----------------------------

let testPlayerBattleStats = {"name":"James","species":"gremlin","image":"../images/little-goblin.png","health":10,"maxhealth":40,"attack":10,"defense":10,"endurance":10,"day":1,"caveday":0,"treeday":0,"acorncoin":2,"mushroomcoin":0,"bearclawcoin":0,"leafcoin":3,"ship-acorncoin":0,"ship-mushroomcoin":0,"ship-bearclawcoin":0,"squirrelunlock":false,"mushroomunlock":false,"bearunlock":false};
let testChosenEnemy = {"name":"Brown Squirrel", "enemyID":0, "species":"squirrel","health":15, "maxhealth":15, "attack":10, "defense":5, "ability1prob":1,"ability2prob":0,"ability3prob":0,"ability4prob":0,"acorncoin":1, "mushroomcoin":0, "bearclawcoin":0};
let testBattleSettingData = {"escape":true,"singleBattle":false,"mandatory":false,"postBattleNarrative":false};
let testBattleStatusData = {"inProgress":false,"battleTurn":2,"winstreak":0,"enemyID":6,"playerHealth":2,"enemyHealth":59,"playerPoison":0,"enemyPoison":0,"playerStun":0,"enemyStun":0,"playerStatus":"","enemyStatus":""};

//----------------------UNIT TESTS----------------------------

//Test selectEnemy() function
if(!(selectEnemy([0],{inProgress:false},enemyStats).name === "Brown Squirrel")){throw "Correct enemy not chosen"};

if(!(["Brown Squirrel","Red Squirrel"].includes(selectEnemy([0,1],false,0).name))){throw "Correct enemy not chosen"};

//Test playerSetup() function
if(!(playerSetup({name:"James"},{inProgress:false}).name === "James")){throw "Player setup failed"}

//Test enemySetup() function
if(!(enemySetup(testChosenEnemy,testBattleStatusData,testPlayerBattleStats).name ==="Brown Squirrel")){throw "Failed to setup enemy"}