abilityData =
{
    "attack":
    {
        "name":"Attack",
        //Current turn damage modifiers
        "selfAttackMultiplier":1, "opponentAttackMultiplier":1, "selfDefenseMultiplier":1, "opponentDefenseMultiplier":1,
        //Multi-turn damage modifiers
        "selfAttack":null, "opponentAttack":null, "selfDefense":null, "opponentDefense":null,
        //Other efects
        "armor":0, "stun":0, "poison":0, "priority":false,"skipAttack":false
    },

    "charge":
    {
        "name":"Charge",
        //Current turn damage modifiers
        "selfAttackMultiplier":1.2, "opponentAttackMultiplier":1, "selfDefenseMultiplier":0.8, "opponentDefenseMultiplier":1,
        //Multi-turn damage modifiers
        "selfAttack":null, "opponentAttack":null, "selfDefense":null, "opponentDefense":null,
        //Other efects
        "armor":0, "stun":0, "poison":0, "priority":false,"skipAttack":false
    },

    "berserk":
    {
        "name":"Berserk",
        //Current turn damage modifiers
        "selfAttackMultiplier":2, "opponentAttackMultiplier":1, "selfDefenseMultiplier":0, "opponentDefenseMultiplier":1,
        //Multi-turn damage modifiers
        "selfAttack":null, "opponentAttack":null, "selfDefense":null, "opponentDefense":null,
        //Other efects
        "armor":0, "stun":0, "poison":0, "priority":false,"skipAttack":false
    },

    "block":
    {
        "name":"Block",
        //Current turn damage modifiers
        "selfAttackMultiplier":0, "opponentAttackMultiplier":1, "selfDefenseMultiplier":2.0, "opponentDefenseMultiplier":1,
        //Multi-turn damage modifiers
        "selfAttack":null, "opponentAttack":null, "selfDefense":null, "opponentDefense":null,
        //Other efects
        "armor":0, "stun":0, "poison":0, "priority":false,"skipAttack":true
    },

    "quickAttack":
    {
        "name":"Quick Attack",
        //Current turn damage modifiers
        "selfAttackMultiplier":1, "opponentAttackMultiplier":1, "selfDefenseMultiplier":1, "opponentDefenseMultiplier":1,
        //Multi-turn damage modifiers
        "selfAttack":null, "opponentAttack":null, "selfDefense":null, "opponentDefense":null,
        //Other efects
        "armor":0, "stun":0, "poison":0, "priority":true,"skipAttack":false
    },

    "powerUp":
    {
        "name":"Power-up",
        //Current turn damage modifiers
        "selfAttackMultiplier":0, "opponentAttackMultiplier":1, "selfDefenseMultiplier":1, "opponentDefenseMultiplier":1,
        //Multi-turn damage modifiers
        "selfAttack":1.2, "opponentAttack":null, "selfDefense":null, "opponentDefense":null,
        //Other efects
        "armor":0, "stun":0, "poison":0, "priority":true,"skipAttack":true
    },

    "shield":
    {
        "name":"Shield",
        //Current turn damage modifiers
        "selfAttackMultiplier":0, "opponentAttackMultiplier":1, "selfDefenseMultiplier":1, "opponentDefenseMultiplier":1,
        //Multi-turn damage modifiers
        "selfAttack":null, "opponentAttack":null, "selfDefense":null, "opponentDefense":null,
        //Other efects
        "armor":5, "stun":0, "poison":0, "priority":false,"skipAttack":true
    },

    "stun":
    {
        "name":"Stun",
        //Current turn damage modifiers
        "selfAttackMultiplier":.5, "opponentAttackMultiplier":1, "selfDefenseMultiplier":1, "opponentDefenseMultiplier":1,
        //Multi-turn damage modifiers
        "selfAttack":null, "opponentAttack":null, "selfDefense":null, "opponentDefense":null,
        //Other efects
        "armor":0, "stun":.5, "poison":0, "priority":false,"skipAttack":false
    },

    "poison":
    {
        "name":"Poison",
        //Current turn damage modifiers
        "selfAttackMultiplier":0, "opponentAttackMultiplier":1, "selfDefenseMultiplier":1, "opponentDefenseMultiplier":1,
        //Multi-turn damage modifiers
        "selfAttack":null, "opponentAttack":null, "selfDefense":null, "opponentDefense":null,
        //Other efects
        "armor":0, "stun":0, "poison":3, "priority":false,"skipAttack":true
    },

    "absorb":
    {
        "name":"Absorb",
        //Current turn damage modifiers
        "selfAttackMultiplier":0.5, "opponentAttackMultiplier":1, "selfDefenseMultiplier":1, "opponentDefenseMultiplier":1,
        //Multi-turn damage modifiers
        "selfAttack":null, "opponentAttack":null, "selfDefense":null, "opponentDefense":null,
        //Other efects
        "armor":10, "stun":0, "poison":0, "priority":false,"skipAttack":false
    },

    "stunned": //Gets used when player or enemy is stunned
    {
        "name":"Stunned",
        //Current turn damage modifiers
        "selfAttackMultiplier":0, "opponentAttackMultiplier":0, "selfDefenseMultiplier":1, "opponentDefenseMultiplier":1,
        //Multi-turn damage modifiers
        "selfAttack":null, "opponentAttack":null, "selfDefense":null, "opponentDefense":null,
        //Other efects
        "armor":0, "stun":0, "poison":0, "priority":false,"skipAttack":false
    }
}