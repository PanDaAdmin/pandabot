const Discord = require("discord.js");
const config = require("./config.json");
const YTDL = require("ytdl-core");
const fs = require("fs");

const TOKEN = "MzA2MjU1NDcyMzA5MzA1MzQ0.DBjzcg.NDpnqWjbGpftwhwoA0CAVjz5nwE";
const PREFIX = "$";

function commandIs(str, msg){
    return msg.content.toLowerCase().startsWith('$' + str);
}

function pluck(array) {
    return array.map(function(item) { return item["name"]; });
}

function hasRole(mem, role) {
    if(pluck(mem.roles).includes(role)){
        return true;
    } else {
        return false;
    }

  }


    function play(connection, message) {
        var server = servers[message.guild.id];
        server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: 'audioonly'}));

        server.queue.shift();

        server.dispatcher.on('end', function() {
            if(server.queue[0]) play(connection, message);
            else connection.disconnect();
        });
}

var servers = {};

var bot = new Discord.Client();

var fortunes = [
  "Yes",
  "No",
  "Maybe",
  "Fuck You"
];



bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
  bot.user.setGame(" $help | on 131 server ","http://twitch.tv/y04zgamer")
  bot.user.setStatus("DND")
  bot.user.setUsername("PanDa Bot")
  bot.user.setAvatar("./PanDabot.jpg")
});

bot.on('guildMemberAdd', message => {
  member.guild.defaultChannel.send("Welcome To our server ${member}")

});

bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split(" ");

    var argresult = args.join(' ');

    switch (args[0].toLowerCase()) {
          case "help":
            var embed  = new Discord.RichEmbed()
              .addField("**BAN**" ,"**الاستخدام:** ``$ban <user>``")
              .addField("**KICK**" ,"**الاستخدام:** ``$kick <user> ``")
              .addField("**ِAVATAR**" ,"**الاستخدام:** ``$avatar``")
              .addField("**SAY**" ,"**الاستخدام:** ``$say <message>``")
              .addField("**ID**" ,"**الاستخدام:** ``$id``")
              .addField("**SERVER**" ,"**الاستخدام:** ``$server``")
              .addField("**PLAY**" ,"**الاستخدام:** ``$play <link>``")
              .addField("**SKIP**" ,"**الاستخدام:** ``$skip``")
              .addField("**STOP**" ,"**الاستخدام:** ``$stop``")
              .addField("**INVITE**" ,"**الاستخدام:** ``$invite <to invite panda bot to your server>``")
              .addField("**SUPPORT**" ,"**الاستخدام:** ``$suppport <Panda Bot Server>``")
              .addField("**QA**" ,"**الاستخدام:** ``$qa <Qustion>``  ")
              .addField("**LEVEL**" ,"**الاستخدام:** ``$level <Show You Your level on bot> ")
              .setColor(0x8300ff)
              .setFooter("THANKS FOR USING PANDA BOT")
              .setThumbnail(message.author.avatarURL)
              message.member.sendEmbed(embed);
              message.reply("Okay, Please Check your Private Messages :mailbox_with_mail: ");
              break;
              case "invite":
              message.reply(" اضغط على الرابط لأضافه البوت : https://discordapp.com/oauth2/authorize?client_id=306255472309305344&scope=bot&permissions=8")
              break;
              case "support":
              message.member.send("رابط سيرفر البوت : https://discord.gg/PsnEb6H")
              break;
              case "id":
              var embed  = new Discord.RichEmbed()
              .addField("ID", message.author.id)
              .setDescription(message.author.username)
              .addField(": تاريخ دخولك للديسكورد", message.author.createdAt)
              .addField(" :تاريخ دخولك لسيرفرنا ", message.guild.joinedAt)
              .setColor(0x00FFFF)
              .setFooter("THANKS FOR USING PANDA BOT")
              .setThumbnail(message.author.avatarURL)
              message.channel.sendEmbed(embed)
              break;
              case "qa":
              if (args[1]) {
              message.reply(fortunes[Math.floor(Math.random() * fortunes.length)]);
              }
              break;
              case "avatar":
              message.reply(message.author.avatarURL);
              break;
              case "ping":
              message.channel.send(`Pong! \`${Date.now() - message.createdTimestamp} ms\``);
              break;
              case "wp":
              message.channel.sendFile("./wp.png");
              break;
              case 'play':
    if(!args[1]) {
        message.channel.sendMessage('Please provide a link');
    return;
    }
    if(!servers[message.guild.id]) servers[message.guild.id] = {
        queue: []
    };
    var server = servers[message.guild.id];

    server.queue.push(args[1]);

    if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {

        play(connection, message);
    });
    break;

    case 'skip':
        var server = servers[message.guild.id];
        if(server.dispatcher) server.dispatcher.end();
    break;

    case 'stop':
        var server = servers[message.guild.id];
        if(message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
    break;
    case 'playlist':
    var embed = new Discord.RichEmbed()
        .addField('Playing', 'PUT THIS HERE')
        .addField("PANDA BOT" ,"PANDA BOT")
        .setColor(0x00ff00)
        .setFooter('Info for "special" people: This is the song playlist')
         message.channel.sendEmbed(embed);
         break;
         case "server":
         var embed  = new Discord.RichEmbed()
         .setAuthor(message.author.username, message.author.avatarURL)
         .addField(":id: Server ID:", message.guild.id)
         .addField(message.author.large , message.author.large)
         .addField(":crown: Owned by", message.guild.owner)
         .addField(":busts_in_silhouette: Members ", message.guild.memberCount)
         .addField("Defaults Channel:" , message.guild.defaultChannel)
         .addField(" :earth_africa: Reagion" , message.guild.region)
         .addField("MemberLive" ,message.guild.available)
         .setColor(0x00FFFF)
         .setFooter("THANKS FOR USING PANDA BOT")
         .setThumbnail(message.author.avatarURL)
         message.channel.sendEmbed(embed)
         break;
         case "roles":
         message.channel.send(message.author.roles)
         break;
         case "opsssswe":
         message.channel.send("hello")
         break;
         case "ops":
         let args = message.content.split(" ").slice(1);
         let age = args[0]; // yes, start at 0, not 1. I hate that too.
         let sex = args[1];
         let location = args[2];
         message.reply(`Hello ${message.author.name}, I see you're a ${age} year old ${sex} from ${location}. Wanna date?`);
         break;



            }


            });

            let points = JSON.parse(fs.readFileSync("./points.json", "utf8"));
            const prefix = "$";

            bot.on("message", message => {
              if (!message.content.startsWith(prefix)) return;
              if (message.author.bot) return;

              if (!points[message.author.id]) points[message.author.id] = {
                points: 0,
                level: 0
              };
              let userData = points[message.author.id];
              userData.points++;

              let curLevel = Math.floor(0.1 * Math.sqrt(userData.points));
              if (curLevel > userData.level) {
                // Level up!
                userData.level = curLevel;
                message.reply(`You"ve leveled up to level **${curLevel}**! Ain"t that dandy?`);
              }

              if (message.content.startsWith(prefix + "level")) {
                message.reply(`You are currently level ${userData.level}, with ${userData.points} points.`);
              }
              fs.writeFile("./points.json", JSON.stringify(points), (err) => {
                if (err) console.error(err)
              });
            });

          bot.on('message', message => {
            if (message.content === 'برب') {
              message.channel.sendFile("./t.png");
            }
            if (message.content === '<@306255472309305344>') {
              message.reply("What Mother Father :joy:");
            }

          });

          bot.on('guildMemberAdd', member => {
          member.guild.defaultChannel.sendFile("./welcome.png")

        });

        bot.on('message', message => {
          if(message.author.bot) return;
          if(!message.content.startsWith(config.prefix)) return;

          let command = message.content.split(" ")[0];
          command = command.slice(config.prefix.length);

        let args = message.content.split(" ").slice(1);

          if (command === "say") {
            message.guild.channel.send(args.join(" "));

      }

        var argresult = args.join(' ');

        if (command === "sg") {
          bot.user.setGame(argresult);
        }

        if (command === "ss") {
        if(!argresult) argresult = 'online;'
        bot.user.setStatus(argresult);
      }

      var member = args.join(' ');

      if (command === "bc") {
            message.author.users.send(args.join("328790722809430017"));
      }


      });

        bot.on('message', message => {
    var args = message.content.split(/[ ]+/)

        if(commandIs("clear", message)){
       if (message.member.hasPermissions(['MANAGE_ROLES'])){
        if(args.length >= 3){
            message.channel.sendMessage('You defined too many arguments. Usage: `!delete (number if messages to delete)`');
         } else {
            var msg;
            if(args.length === 1){
                msg=2;
            } else {
                msg=parseInt(args[1]) + 1;
            }
            message.channel.fetchMessages({limit: msg}).then(messages => message.channel.bulkDelete(messages)).catch(console.error);
         }
     } else {
         message.reply(":no_entry_sign: You need the permission ``MANAGE_ROLES`` to use this command.");
   }

 }

 if(commandIs('kick', message)){
     if (message.member.hasPermissions(['KICK_MEMBERS'])){
       if(args.length === 1){
         message.channel.sendMessage(message.author.username + " Mention a person to kick! *Usage:* `!kick [@user]`");
       } else {
           message.guild.member(message.mentions.users.first()).kick().catch(console.error);
         }
     } else {
         message.reply(":no_entry_sign: You need the permission ``KICK_MEMBERS`` to use this command.");
     }

     }

     if(commandIs('ban', message)){
         if (message.member.hasPermissions(['BAN_MEMBERS'])){
           if(args.length === 1){
             message.channel.sendMessage(message.author.username + " Mention a person to kick! *Usage:* `!kick [@user]`");
           } else {
               message.guild.member(message.mentions.users.first()).ban().catch(console.error);
             }
         } else {
             message.reply(':no_entry_sign: You need the permission ``BAN_MEMBERS`` to use this command.');
           }

     }


    });

bot.login('MzA2MjU1NDcyMzA5MzA1MzQ0.DBjzcg.NDpnqWjbGpftwhwoA0CAVjz5nwE');
