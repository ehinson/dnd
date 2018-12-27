// http://www.dnd5eapi.co

const data = [
    {
        "name": "Barbarian",
        "hit_die": 12,
        "proficiency_choices": [
            { "from": [
                { "name": "Skill: Animal Handling"},
                { "name": "Skill: Athletics"},
                { "name": "Skill: Intimidation"},
                { "name": "Skill: Nature"},
                { "name": "Skill: Perception"},
                { "name": "Skill: Survival"},
            ],
            "choose": 2 }
        ],
        "proficiencies": [
            {"name": "Light armor" },
            {"name": "Medium armor" },
            {"name": "Shields" },
            {"name": "Simple weapons" },
            {"name": "Martial weapons" },
        ],
        "saving_throws": [
            {"name": "STR" },
            {"name": "CON" },
        ],
        "starting_equipment": { "class": "Barbarian" },
        "class_levels": { "class": "Barbarian" },
        "subclasses": [
            { "name": "Berserker" }
        ]
    },
    {
        "name": "Bard",
        "url": "http://www.dnd5eapi.co/api/classes/2"
    },
    {
        "name": "Cleric",
        "url": "http://www.dnd5eapi.co/api/classes/3"
    },
    {
        "name": "Druid",
        "url": "http://www.dnd5eapi.co/api/classes/4"
    },
    {
        "name":"Fighter",
        "hit_die":10,
        "proficiency_choices":[
            {"from":[
                {"name":"Skill: Acrobatics"},
                {"name":"Skill: Animal Handling"},
                {"name":"Skill: Athletics"},
                {"name":"Skill: History"},
                {"name":"Skill: Insight"},
                {"name":"Skill: Intimidation"},
                {"name":"Skill: Perception"},
                {"name":"Skill: Survival"}
            ],
            "choose":2}],
        "proficiencies":[
            {"name":"All armor"},
            {"name":"Shields"},
            {"name":"Simple weapons"},
            {"name":"Martial weapons"}
        ],
        "saving_throws":[
            {"name":"STR"},
            {"name":"CON"}
        ],
        "starting_equipment":{
            "choices_to_make": 5,
            "choice_1": [
              {
                "from": [
                  {
                    "quantity": 1,
                    "item": {
                        "name": "Chain Mail",
                        "AC": 16,
                        "Stealth": "Disadvantage",
                        "Weight": 55,
                        "type": "armor",
                    }
                  }
                ],
                "title": "Chain Mail Armor",
                "type": "equipment",
                "choose": 1
              },
              {
                "from": [
                  {
                    "quantity": 1,
                    "item": {
                        "name": "Leather Armor",
                        "AC": 11,
                        "Weight": 10,
                        "type": "armor"
                    }
                  },
                  {
                    "quantity": 1,
                    "item": {
                        "name": "Longbow",
                        "ranged": true,
                        "attack_bonus": "figure this out for player",
                        "damage_dice": "1d8",
                        "properties": "Ammunition, Heavy, Range, Two-Handed",
                        "damage_bonus": "figure this out for player(proficiency)",
                        "type": "weapon"
                    }
                  },
                  {
                    "quantity": 20,
                    "item": {
                      "name": "Arrow",
                      "type": "ammunition",
                      "weight": .05,
                    }
                  }
                ],
                "title": "Leather Armor, Longbow & 20 Arrows",
                "type": "equipment",
                "choose": 3
              }
            ],
            "choice_2": [
              {
                "from": [
                  {
                    "quantity": 1,
                    "item": {
                      "name": "Shield",
                    }
                  }
                ],
                "title": "Shield",
                "type": "equipment",
                "choose": 1
              },
              {
                "from": [
                  {
                    "quantity": 1,
                    "item": {
                      "name": "Battleaxe",
                    }
                  },
                  {
                    "quantity": 1,
                    "item": {
                      "name": "Flail",
                    }
                  },
                  {
                    "quantity": 1,
                    "item": {
                      "name": "Glaive",
                    }
                  },
                  {
                    "quantity": 1,
                    "item": {
                      "name": "Greataxe",
                    }
                  },
                  {
                    "quantity": 1,
                    "item": {
                      "name": "Greatsword",
                    }
                  },
                  {
                    "quantity": 1,
                    "item": {
                      "name": "Halberd",
                    }
                  },
                  {
                    "quantity": 1,
                    "item": {
                      "name": "Lance",
                    }
                  },
                  {
                    "quantity": 1,
                    "item": {
                      "name": "Longsword",
                    }
                  },
                  {
                    "quantity": 1,
                    "item": {
                      "name": "Maul",
                    }
                  },
                  {
                    "quantity": 1,
                    "item": {
                      "name": "Morningstar",
                    }
                  },
                  {
                    "quantity": 1,
                    "item": {
                      "name": "Pike",
                    }
                  },
                  {
                    "quantity": 1,
                    "item": {
                      "name": "Rapier",
                    }
                  },
                  {
                    "quantity": 1,
                    "item": {
                      "name": "Scimitar",
                    }
                  },
                  {
                    "quantity": 1,
                    "item": {
                      "name": "Shortsword",
                    }
                  },
                  {
                    "quantity": 1,
                    "item": {
                      "name": "Trident",
                    }
                  },
                  {
                    "quantity": 1,
                    "item": {
                      "name": "War pick",
                    }
                  },
                  {
                    "quantity": 1,
                    "item": {
                      "name": "Warhammer",
                    }
                  },
                  {
                    "quantity": 1,
                    "item": {
                      "name": "Whip",
                    }
                  },
                  {
                    "quantity": 1,
                    "item": {
                      "name": "Blowgun",
                    }
                  },
                  {
                    "quantity": 1,
                    "item": {
                      "name": "Crossbow, hand",
                    }
                  },
                  {
                    "quantity": 1,
                    "item": {
                      "name": "Crossbow, heavy",
                    }
                  },
                  {
                    "quantity": 1,
                    "item": {
                      "name": "Longbow",
                    }
                  },
                  {
                    "quantity": 1,
                    "item": {
                      "name": "Net",
                    }
                  }
                ],
                "title": "Additional Martial Weapon (Choose 1 here and 1 below)",
                "type": "equipment",
                "choose": 1
              }
            ],
            "choice_3": [
              {
                "from": [
                  {
                    "quantity": 1,
                    "item": {
                      "name": "Crossbow, light",
                    }
                  },
                  {
                    "quantity": 20,
                    "item": {
                      "name": "Crossbow bolt",
                    }
                  }
                ],
                "title": "Light Crossbow and bolts",
                "type": "equipment",
                "choose": 2
              },
              {
                "from": [
                  {
                    "quantity": 2,
                    "item": {
                      "name": "Handaxe",
                    }
                  }
                ],
                "title": "2 Handaxes",
                "type": "equipment",
                "choose": 1
              }
            ],
            "choice_4": [
              {
                "from": [
                  {
                    "quantity": 1,
                    "item": {
                      "name": "Dungeoneer's Pack",
                    }
                  }
                ],
                "title": "Dungeoneer's Pack",
                "type": "equipment",
                "choose": 1
              },
              {
                "from": [
                  {
                    "quantity": 1,
                    "item": {
                      "name": "Explorer's Pack",
                    }
                  }
                ],
                "title": "Explorer's Pack",
                "type": "equipment",
                "choose": 1
              }
            ],
            "choice_5": [
              {
                "from": [
                  {
                    "quantity": 1,
                    "item": {
                      "name": "Battleaxe",
                    }
                  },
                  {
                    "quantity": 1,
                    "item": {
                      "name": "Flail",
                    }
                  },
                  {
                    "quantity": 1,
                    "item": {
                      "name": "Glaive",
                    }
                  },
                  {
                    "quantity": 1,
                    "item": {
                      "name": "Greataxe",
                    }
                  },
                  {
                    "quantity": 1,
                    "item": {
                      "name": "Greatsword",
                    }
                  },
                  {
                    "quantity": 1,
                    "item": {
                      "name": "Halberd",
                    }
                  },
                  {
                    "quantity": 1,
                    "item": {
                      "name": "Lance",
                    }
                  },
                  {
                    "quantity": 1,
                    "item": {
                      "name": "Longsword",
                    }
                  },
                  {
                    "quantity": 1,
                    "item": {
                      "name": "Maul",
                    }
                  },
                  {
                    "quantity": 1,
                    "item": {
                      "name": "Morningstar",
                    }
                  },
                  {
                    "quantity": 1,
                    "item": {
                      "name": "Pike",
                    }
                  },
                  {
                    "quantity": 1,
                    "item": {
                      "name": "Rapier",
                    }
                  },
                  {
                    "quantity": 1,
                    "item": {
                      "name": "Scimitar",
                    }
                  },
                  {
                    "quantity": 1,
                    "item": {
                      "name": "Shortsword",
                    }
                  },
                  {
                    "quantity": 1,
                    "item": {
                      "name": "Trident",
                    }
                  },
                  {
                    "quantity": 1,
                    "item": {
                      "name": "War pick",
                    }
                  },
                  {
                    "quantity": 1,
                    "item": {
                      "name": "Warhammer",
                    }
                  },
                  {
                    "quantity": 1,
                    "item": {
                      "name": "Whip",
                    }
                  },
                  {
                    "quantity": 1,
                    "item": {
                      "name": "Blowgun",
                    }
                  },
                  {
                    "quantity": 1,
                    "item": {
                      "name": "Crossbow, hand",
                    }
                  },
                  {
                    "quantity": 1,
                    "item": {
                      "name": "Crossbow, heavy",
                    }
                  },
                  {
                    "quantity": 1,
                    "item": {
                      "name": "Longbow",
                    }
                  },
                  {
                    "quantity": 1,
                    "item": {
                      "name": "Net",
                    }
                  }
                ],
                "title": "Martial Weapon (Choose 1)",
                "type": "equipment",
                "choose": 1
              }
            ],
            "class": {
              "name": "Fighter"
            }
          },
        "class_levels":{
            "class":"Fighter",
            "1": {
                "level": 1,
                "ability_score_bonuses": 0,
                "prof_bonus": 2,
                "feature_choices": [
                    {
                    "name":"Choose: Fighting Style",
                    "level":1,
                    "choice":{
                        "choose":1,
                        "type":"feature",
                        "from":[
                            {"name":"Fighting Style: Archery","level":1,"group":"Fighting Style (Fighter)", "desc":["You gain a +2 bonus to attack rolls you make with ranged weapons."]},
                            {"name":"Fighting Style: Defense","level":1,"group":"Fighting Style (Fighter)", "desc":["While you are wearing armor, you gain a +1 bonus to AC."]},
                            {"name":"Fighting Style: Dueling","level":1,"group":"Fighting Style (Fighter)","desc":["When you are wielding a melee weapon in one hand and no other weapons, you gain a +2 bonus to damage rolls with that weapon."]},
                            {"name":"Fighting Style: Great Weapon Fighting","level":1,"group":"Fighting Style (Fighter)","desc":["When you roll a 1 or 2 on a damage die for an attack you make with a melee weapon that you are wielding with two hands, you can reroll the die and must use the new roll, even if the new roll is a 1 or a 2. The weapon must have the two-handed or versatile property for you to gain this benefit."]},
                            {"name":"Fighting Style: Protection","level":1,"group":"Fighting Style (Fighter)","desc":["When a creature you can see attacks a target other than you that is within 5 feet of you, you can use your reaction to impose disadvantage on the attack roll. You must be wielding a shield."]},
                            {"name":"Fighting Style: Two-Weapon Fighting","level":1,"group":"Fighting Style (Fighter)","desc":["When you engage in two-weapon fighting, you can add your ability modifier to the damage of the second attack."]}
                        ]},
                        "desc":[
                            "You adopt a particular style of fighting as your specialty. Choose one of the following options. You can’t take a Fighting Style option more than once, even if you later get to choose again."
                        ],
                    }
                ],
                "features": [
                    {
                        "name":"Second Wind",
                        "level":1,
                        "desc":[
                            "You have a limited well of stamina that you can draw on to protect yourself from harm. On your turn, you can use a bonus action to regain hit points equal to 1d10 + your fighter level. Once you use this feature, you must finish a short or long rest before you can use it again."
                        ],
                        "health_dice": "1d10",
                        "health_bonus": 1,
                    }
                ],
                "class_specific": {
                  "action_surges": 0,
                  "indomitable_uses": 0,
                  "extra_attacks": 0
                },
                "class": {
                  "name": "Fighter",
                },
              }
        },
        "subclasses":[{"name":"Champion"}]
    },
    {
        "name": "Monk",
        "url": "http://www.dnd5eapi.co/api/classes/6"
    },
    {
        "name": "Paladin",
        "url": "http://www.dnd5eapi.co/api/classes/7"
    },
    {
        "name": "Ranger",
        "url": "http://www.dnd5eapi.co/api/classes/8"
    },
    {
        "name": "Rogue",
        "url": "http://www.dnd5eapi.co/api/classes/9"
    },
    {
        "name": "Sorcerer",
        "url": "http://www.dnd5eapi.co/api/classes/10"
    },
    {
        "name": "Warlock",
        "url": "http://www.dnd5eapi.co/api/classes/11"
    },
    {
        "name": "Wizard",
        "url": "http://www.dnd5eapi.co/api/classes/12"
    }
]

export default data;