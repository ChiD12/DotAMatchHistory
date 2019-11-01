


var express = require('express');
var app = express();
var request = require('request');

var parsedHistory;

var wl = { wins: 0,
            losses:0,
            winrate: 0}


app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.static('images/heroes'));
app.use(express.static('images/rank_icons'))




// key F2C9FD9CC580AD53F05CE07A97A895B1
// ex api call http://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/v1?key=F2C9FD9CC580AD53F05CE07A97A895B1&account_id=76561198030931895
//http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/key=F2C9FD9CC580AD53F05CE07A97A895B1&account_id=76561198030931895



app.get("/", (req,res)=>{
    res.render("home");

});
 

app.get("/results", (req,res)=>{
    
    var query =  req.query.id;
    var url = `https://api.opendota.com/api/players/${query}/recentMatches`;

    var playerURL = `https://api.opendota.com/api/players/${query}`;

    //var playerURL = `https://api.opendota.com/api/players/${query}/recentMatches`;

    var parsedPlayerInfo;
    
    
    request(url, (error, response, body)=>{
        if(!error && response.statusCode === 200){
            parsedHistory = JSON.parse(body);
            //TODO pass the JSON to custom api which will return object with all info needed for that page
            
            getHero(parsedHistory);
            getTime(parsedHistory);
            getWin(parsedHistory);
            wl.winrate = (wl.wins / (wl.wins + wl.losses))*100;

            request(playerURL, (err, resp, body1)=>{
                
                if(!err && resp.statusCode === 200){
                    
                    parsedPlayerInfo = JSON.parse(body1);

                    console.log(parsedPlayerInfo.rank_tier);
                    
                    res.render("results", { id: parsedHistory, player: parsedPlayerInfo, wl: wl});
                    
                    
                }
                else{
                    console.log(err);
                    //TODO render different page
                }
            });
        }
        else{
            console.log(error);
            //TODO render different page
            
        }
    });

    
    
    
    


    //res.render("results", { id: req.query.id});
});

app.get("/match", (req,res) =>{
    var mid = (req.query.mid);

    var url = `https://api.opendota.com/api/matches/${mid}`;
    
    request(url, (error, response, body)=>{
        if(!error && response.statusCode === 200){
            var parsed = JSON.parse(body);
            
            getHero(parsed.players);

            res.render("match", { players: parsed.players, matchStats: parsed});
        }
        else{
            console.log(error);
            console.log(response.statusCode);
        }
    })

});

app.listen(3000, () =>{
    console.log("Server has started!");
});







function getHero(parsed){
    for(var i=0; i< parsed.length; i++){
         var pid = parsed[i].hero_id;
         parsed[i].hero_id = getHeroObj(pid);
    }
    //console.log(parsed);
}


function getHeroObj(hid){
    var heroes = [
        {
            "name": "antimage",
            "id": 1,
            "localized_name": "Anti-Mage"
        },
        {
            "name": "axe",
            "id": 2,
            "localized_name": "Axe"
        },
        {
            "name": "bane",
            "id": 3,
            "localized_name": "Bane"
        },
        {
            "name": "bloodseeker",
            "id": 4,
            "localized_name": "Bloodseeker"
        },
        {
            "name": "crystal_maiden",
            "id": 5,
            "localized_name": "Crystal Maiden"
        },
        {
            "name": "drow_ranger",
            "id": 6,
            "localized_name": "Drow Ranger"
        },
        {
            "name": "earthshaker",
            "id": 7,
            "localized_name": "Earthshaker"
        },
        {
            "name": "juggernaut",
            "id": 8,
            "localized_name": "Juggernaut"
        },
        {
            "name": "mirana",
            "id": 9,
            "localized_name": "Mirana"
        },
        {
            "name": "nevermore",
            "id": 11,
            "localized_name": "Shadow Fiend"
        },
        {
            "name": "morphling",
            "id": 10,
            "localized_name": "Morphling"
        },
        {
            "name": "phantom_lancer",
            "id": 12,
            "localized_name": "Phantom Lancer"
        },
        {
            "name": "puck",
            "id": 13,
            "localized_name": "Puck"
        },
        {
            "name": "pudge",
            "id": 14,
            "localized_name": "Pudge"
        },
        {
            "name": "razor",
            "id": 15,
            "localized_name": "Razor"
        },
        {
            "name": "sand_king",
            "id": 16,
            "localized_name": "Sand King"
        },
        {
            "name": "storm_spirit",
            "id": 17,
            "localized_name": "Storm Spirit"
        },
        {
            "name": "sven",
            "id": 18,
            "localized_name": "Sven"
        },
        {
            "name": "tiny",
            "id": 19,
            "localized_name": "Tiny"
        },
        {
            "name": "vengefulspirit",
            "id": 20,
            "localized_name": "Vengeful Spirit"
        },
        {
            "name": "windrunner",
            "id": 21,
            "localized_name": "Windranger"
        },
        {
            "name": "zuus",
            "id": 22,
            "localized_name": "Zeus"
        },
        {
            "name": "kunkka",
            "id": 23,
            "localized_name": "Kunkka"
        },
        {
            "name": "lina",
            "id": 25,
            "localized_name": "Lina"
        },
        {
            "name": "lich",
            "id": 31,
            "localized_name": "Lich"
        },
        {
            "name": "lion",
            "id": 26,
            "localized_name": "Lion"
        },
        {
            "name": "shadow_shaman",
            "id": 27,
            "localized_name": "Shadow Shaman"
        },
        {
            "name": "slardar",
            "id": 28,
            "localized_name": "Slardar"
        },
        {
            "name": "tidehunter",
            "id": 29,
            "localized_name": "Tidehunter"
        },
        {
            "name": "witch_doctor",
            "id": 30,
            "localized_name": "Witch Doctor"
        },
        {
            "name": "riki",
            "id": 32,
            "localized_name": "Riki"
        },
        {
            "name": "enigma",
            "id": 33,
            "localized_name": "Enigma"
        },
        {
            "name": "tinker",
            "id": 34,
            "localized_name": "Tinker"
        },
        {
            "name": "sniper",
            "id": 35,
            "localized_name": "Sniper"
        },
        {
            "name": "necrolyte",
            "id": 36,
            "localized_name": "Necrophos"
        },
        {
            "name": "warlock",
            "id": 37,
            "localized_name": "Warlock"
        },
        {
            "name": "beastmaster",
            "id": 38,
            "localized_name": "Beastmaster"
        },
        {
            "name": "queenofpain",
            "id": 39,
            "localized_name": "Queen of Pain"
        },
        {
            "name": "venomancer",
            "id": 40,
            "localized_name": "Venomancer"
        },
        {
            "name": "faceless_void",
            "id": 41,
            "localized_name": "Faceless Void"
        },
        {
            "name": "skeleton_king",
            "id": 42,
            "localized_name": "Skeleton King"
        },
        {
            "name": "death_prophet",
            "id": 43,
            "localized_name": "Death Prophet"
        },
        {
            "name": "phantom_assassin",
            "id": 44,
            "localized_name": "Phantom Assassin"
        },
        {
            "name": "pugna",
            "id": 45,
            "localized_name": "Pugna"
        },
        {
            "name": "templar_assassin",
            "id": 46,
            "localized_name": "Templar Assassin"
        },
        {
            "name": "viper",
            "id": 47,
            "localized_name": "Viper"
        },
        {
            "name": "luna",
            "id": 48,
            "localized_name": "Luna"
        },
        {
            "name": "dragon_knight",
            "id": 49,
            "localized_name": "Dragon Knight"
        },
        {
            "name": "dazzle",
            "id": 50,
            "localized_name": "Dazzle"
        },
        {
            "name": "rattletrap",
            "id": 51,
            "localized_name": "Clockwerk"
        },
        {
            "name": "leshrac",
            "id": 52,
            "localized_name": "Leshrac"
        },
        {
            "name": "furion",
            "id": 53,
            "localized_name": "Nature's Prophet"
        },
        {
            "name": "life_stealer",
            "id": 54,
            "localized_name": "Lifestealer"
        },
        {
            "name": "dark_seer",
            "id": 55,
            "localized_name": "Dark Seer"
        },
        {
            "name": "clinkz",
            "id": 56,
            "localized_name": "Clinkz"
        },
        {
            "name": "omniknight",
            "id": 57,
            "localized_name": "Omniknight"
        },
        {
            "name": "enchantress",
            "id": 58,
            "localized_name": "Enchantress"
        },
        {
            "name": "huskar",
            "id": 59,
            "localized_name": "Huskar"
        },
        {
            "name": "night_stalker",
            "id": 60,
            "localized_name": "Night Stalker"
        },
        {
            "name": "broodmother",
            "id": 61,
            "localized_name": "Broodmother"
        },
        {
            "name": "bounty_hunter",
            "id": 62,
            "localized_name": "Bounty Hunter"
        },
        {
            "name": "weaver",
            "id": 63,
            "localized_name": "Weaver"
        },
        {
            "name": "jakiro",
            "id": 64,
            "localized_name": "Jakiro"
        },
        {
            "name": "batrider",
            "id": 65,
            "localized_name": "Batrider"
        },
        {
            "name": "chen",
            "id": 66,
            "localized_name": "Chen"
        },
        {
            "name": "spectre",
            "id": 67,
            "localized_name": "Spectre"
        },
        {
            "name": "doom_bringer",
            "id": 69,
            "localized_name": "Doom"
        },
        {
            "name": "ancient_apparition",
            "id": 68,
            "localized_name": "Ancient Apparition"
        },
        {
            "name": "ursa",
            "id": 70,
            "localized_name": "Ursa"
        },
        {
            "name": "spirit_breaker",
            "id": 71,
            "localized_name": "Spirit Breaker"
        },
        {
            "name": "gyrocopter",
            "id": 72,
            "localized_name": "Gyrocopter"
        },
        {
            "name": "alchemist",
            "id": 73,
            "localized_name": "Alchemist"
        },
        {
            "name": "invoker",
            "id": 74,
            "localized_name": "Invoker"
        },
        {
            "name": "silencer",
            "id": 75,
            "localized_name": "Silencer"
        },
        {
            "name": "obsidian_destroyer",
            "id": 76,
            "localized_name": "Outworld Devourer"
        },
        {
            "name": "lycan",
            "id": 77,
            "localized_name": "Lycanthrope"
        },
        {
            "name": "brewmaster",
            "id": 78,
            "localized_name": "Brewmaster"
        },
        {
            "name": "shadow_demon",
            "id": 79,
            "localized_name": "Shadow Demon"
        },
        {
            "name": "lone_druid",
            "id": 80,
            "localized_name": "Lone Druid"
        },
        {
            "name": "chaos_knight",
            "id": 81,
            "localized_name": "Chaos Knight"
        },
        {
            "name": "meepo",
            "id": 82,
            "localized_name": "Meepo"
        },
        {
            "name": "treant",
            "id": 83,
            "localized_name": "Treant Protector"
        },
        {
            "name": "ogre_magi",
            "id": 84,
            "localized_name": "Ogre Magi"
        },
        {
            "name": "undying",
            "id": 85,
            "localized_name": "Undying"
        },
        {
            "name": "rubick",
            "id": 86,
            "localized_name": "Rubick"
        },
        {
            "name": "disruptor",
            "id": 87,
            "localized_name": "Disruptor"
        },
        {
            "name": "nyx_assassin",
            "id": 88,
            "localized_name": "Nyx Assassin"
        },
        {
            "name": "naga_siren",
            "id": 89,
            "localized_name": "Naga Siren"
        },
        {
            "name": "keeper_of_the_light",
            "id": 90,
            "localized_name": "Keeper of the Light"
        },
        {
            "name": "wisp",
            "id": 91,
            "localized_name": "Wisp"
        },
        {
            "name": "visage",
            "id": 92,
            "localized_name": "Visage"
        },
        {
            "name": "slark",
            "id": 93,
            "localized_name": "Slark"
        },
        {
            "name": "medusa",
            "id": 94,
            "localized_name": "Medusa"
        },
        {
            "name": "troll_warlord",
            "id": 95,
            "localized_name": "Troll Warlord"
        },
        {
            "name": "centaur",
            "id": 96,
            "localized_name": "Centaur Warrunner"
        },
        {
            "name": "magnataur",
            "id": 97,
            "localized_name": "Magnus"
        },
        {
            "name": "shredder",
            "id": 98,
            "localized_name": "Timbersaw"
        },
        {
            "name": "bristleback",
            "id": 99,
            "localized_name": "Bristleback"
        },
        {
            "name": "tusk",
            "id": 100,
            "localized_name": "Tusk"
        },
        {
            "name": "skywrath_mage",
            "id": 101,
            "localized_name": "Skywrath Mage"
        },
        {
            "name": "abaddon",
            "id": 102,
            "localized_name": "Abaddon"
        },
        {
            "name": "elder_titan",
            "id": 103,
            "localized_name": "Elder Titan"
        },
        {
            "name": "legion_commander",
            "id": 104,
            "localized_name": "Legion Commander"
        },
        {
            "name": "ember_spirit",
            "id": 106,
            "localized_name": "Ember Spirit"
        },
        {
            "name": "earth_spirit",
            "id": 107,
            "localized_name": "Earth Spirit"
        },
        {
            "name": "abyssal_underlord",
            "id": 108,
            "localized_name": "Abyssal Underlord"
        },
        {
            "name": "terrorblade",
            "id": 109,
            "localized_name": "Terrorblade"
        },
        {
            "name": "phoenix",
            "id": 110,
            "localized_name": "Phoenix"
        },
        {
            "name": "techies",
            "id": 105,
            "localized_name": "Techies"
        },
        {
            "name": "oracle",
            "id": 111,
            "localized_name": "Oracle"
        },
        {
            "name": "winter_wyvern",
            "id": 112,
            "localized_name": "Winter Wyvern"
        },
        {
            "name": "arc_warden",
            "id": 113,
            "localized_name": "Arc Warden"
        },
        {
            "name": "abyssal_underlord",
            "id": 114,
            "localized_name": "Underlord"
        },
        {
            "name": "monkey_king",
            "id": 115,
            "localized_name": "Monkey King"
        },
        {
            "name": "dark_willow",
            "id": 116,
            "localized_name": "Dark Willow"
        },
        {
            "name": "pangolier",
            "id": 120,
            "localized_name": "Pangolier"
        },
        {
            "name": "grimstroke",
            "id": 118,
            "localized_name": "Grimstroke"
        },
        {
            "name": "mars",
            "id": 119,
            "localized_name": "Mars"
        }
    ];

    var selectedHero;
    for(var i=0; i< heroes.length; i++){
        if (hid === heroes[i].id){
            return heroes[i];
        }
    }
    return "default"
}

function getTime(parsed){
    var now = new Date();
    var gameTime;
    for(var i=0; i< parsed.length; i++){
        gameTime = parsed[i].start_time;
        var gameTimeInt = parseInt(gameTime,10); 
        //var elapsedTime = now.getTime() - gameTimeInt*1000;
    
        //now.setTime(elapsedTime);
        var gDate = new Date(gameTime*1000);
        var monthNum = gDate.getMonth() +1;
        
        
        var dateS =  gDate.getUTCFullYear() + "-" + monthNum + "-" + gDate.getUTCDate();
        //console.log(gDate.toString());

        parsed[i].start_time = dateS;


        // var x = new Date(gameTimeInt*1000); // or if you have milliseconds, use that instead
        // var y = new Date(now.getTime());
        // var z = new Date(elapsedTime);
        // z;
        // // returns "Wed Jan 21 1970 06:49:15 GMT-0600 (CST)"
        // // now compare this with epoch
        // var epoch = new Date('1970-01-01 00:00:00-0600');
        // var diff_years = z.getYear() - epoch.getYear();
        // var diff_month = z.getMonth() - epoch.getMonth();
        // var diff_days = z.getDate() - epoch.getDate();
        // var diff_hours = z.getHours() - epoch.getHours();
        // var diff_minutes = z.getMinutes() - epoch.getMinutes();

        //console.log("years: " + diff_years + " months: " + diff_month + " days: " + diff_days + " hours: " + diff_hours + " minutes: " + diff_minutes);
        }



    
}

function getWin(parsed){
    for(var i = 0;i< parsed.length; i++){
        var pos = parsed[i].player_slot;
        var team;
        var playerWin;
        if(pos < 128){
            team = "radiant";
        }else{
            team = "dire";
        }
        var radiWin = parsed[i].radiant_win;
        //console.log(radiWin);
        if(radiWin && team === "radiant"){
            playerWin = "Won Match";
        }else if(radiWin && team === "dire"){
            playerWin = "Lost Match";
        }else if(!radiWin && team === "radiant"){
            playerWin = "Lost Match";
        }else if(!radiWin && team === "dire"){
            playerWin = "Won Match";
        }

        if (playerWin === "Won Match"){
            wl.wins++;
        }else if(playerWin === "Lost Match"){
            wl.losses++;
        }
        
        
        parsed[i].radiant_win = playerWin;
        //console.log("team: " + team + " radiwin: " + radiWin + " playerwin: " +playerWin);
    }
}


    

