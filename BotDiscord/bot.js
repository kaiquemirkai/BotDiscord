const Discord = require("discord.js");
const _ = require("underscore");
const client = new Discord.Client();
const config = require("./config.json");
const ffmpeg = require("ffmpeg")
const guki = 219093280669958146;
const goya = 131659890216271872;
const kaique = 136462297437700096;
const ighor = 218414398946017280;
const felipe = 236592929760739329;

const YTDL = require("ytdl-core");
var servers = {};

function play(connection, message) {
  var server = servers[message.guild.id];

  server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));
  server.queue.shift();
  server.dispatcher.on("end",function(){
    if(server.queue[0]) play(connection, message);
    else connection.disconnect();
  });
}

function ExibeLog(comando, args, author) {
    console.log(`comando [!${comando} ${args}] usado por [${author}] as [${new Date().toLocaleString()}]`);
}

client.on("ready", () => {
    client.user.setPresence({
        game: {
            name: 'Porno gay de cavalo com anões',
            type: 'WATCHING'
        },
        status: 'online'
    });
});

client.on("guildCreate", guild => {
 console.log(`This bot entered in a new server: ${guild.name} with ${guid.membercount}`);
 client.user.setActivity(`im on ${client.guilds.size} servers`);
});


client.on("guildDelete", guild => {
    console.log(`This bot left the server: ${guild.name}`);
    client.user.setActivity(`im on ${client.guilds.size} servers`);
});


client.on("message", function(message) {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
const comando = args.shift().toLowerCase();

switch(comando) {
    case "alemao":
      message.channel.send("@everyone | Invocando alemão - GAS/COCAINA");
      ExibeLog(message, args, message.author.username);
      break;
    case "goya":
        message.channel.send("@everyone | Invocando goya - LOLI");
        break;
    case "guki":
      var novoBoneco = ['Archer','Musa','Mago','Kunoichi',"Ninja","Berserker","Striker","DK","Feiticeira","Guerreiro","Valkyr","Maehwa","Tamer","Mystic"];
      var x = Math.floor(Math.random()*14);
      message.channel.send(`Guki, que belo dia para rolar para um novo boneco que tal ** ${novoBoneco[x]} **`);
      ExibeLog(message, args, message.author.username);
      break;
    case "cones":
      message.channel.send("@everyone | CHAMANDO TODOS OS CONES");
      ExibeLog(message, args, message.author.username);
      break;
    case "flw":
      if(message.author.id == guki) {
          message.channel.send("Gukie disse que vai comprar um novo país");
      } else {
         message.channel.send(message.author.username + " disse que vai dar um role de bike na sala");
      }
      ExibeLog(message, args, message.author.username);
      break;
    case "faq":
        message.channel.send("GUKI PERGUNTAS FREQUENTES - LINKS SÂO AS RESPOSTAS, NA ORDEM DAS PERGUNTAS\nDevo rolar o boneco? | https://tenor.com/GjJc.gif\nDevo comprar o item com perola? | https://tenor.com/zxhH.gif\nMeu boneco da dano? | https://giphy.com/gifs/agt-nbc-episode-14-28ITnbXmdmwTOifKsE\nEu to forte? | https://tenor.com/FXgY.gif\nQual o proximo boss? | https://tenor.com/H1OF.gif");
        ExibeLog(message, args, message.author.username);
        break;
    case "helpmybot":
        message.channel.send("flw | despedida formal dos abiguinhos\nalemao | invocação do menino do gás\ngoya | invocação do menino loli\n cones | chamar todos pra sala\nguki | sugere um novo personagem no BDO\nfaq | perguntas frequentes de GUKIE\naskme | responde perguntas com sim|não\nMAIS COMANDOS EM BREVE :)");
        ExibeLog(message, args, message.author.username);
        break;
    case "link":
          if(args == "fsbdo") {
            message.channel.send("Tabela de fail stack\nhttps://docs.google.com/spreadsheets/d/1Lv4vnMKzf53h9_AbS0pz2hvkeX_w5wL3oXW0iLtY30M/htmlview?sle=true#gid=1289960585");
          }
          ExibeLog(message, args, message.author.username);
    break;
  case "askme":
       if(args.includes("guki") ||  args.includes("rolar") || args.includes("boneco")) {
         message.channel.send("sim");
       } else {
         var x = Math.floor(Math.random()*2);
         x ? message.channel.send("sim") : message.channel.send("não");
       }
       ExibeLog(message, args, message.author.username);
       break;
   case "play":
        if(args == "") {
          message.channel.send("Um link é necessário!");
          return ;
        }
        if(!message.member.voiceChannel) {
          message.channel.send("Você deve estar em um canal");
          return ;
        }
        if(!servers[message.guild.id]) servers[message.guild.id] = {
          queue: []
        };

        var server = servers[message.guild.id];
        server.queue.push(args.toString());

        if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
          play(connection,message);
        });
        break;
   case "skip":
        var server = servers[message.guild.id];

        if(server.dispatcher) server.dispatcher.end();
        break;
  case "stop":
        var server = servers[message.guild.id];
        if(message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
        break;
  case "ping":
        message.channel.send(`Top Speed API at ${Math.round(client.ping)} parsecs`);
        break;
}

});











client.login(config.token);
