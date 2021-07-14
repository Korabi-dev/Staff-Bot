const discord = require("discord.js")
require("discord-inline-replys")
const client = new discord.Client({ws: {intents: discord.Intents.ALL}})
const fs = require("fs")
const { random, max } = require("mathjs")
require("dotenv").config()
const mongoose = require("mongoose")
client.models = require("./Utils/models")
mongoose.connect(process.env.mongoose, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }) .then(() => {console.log("Connected to database.");});
client.owners = ["638476135457357849", "606138051051126794"]
client.commands = new discord.Collection()
const math = require("mathjs")
client.random = function random(){
    return Math.floor(math.random(20, 50))
}
Array.prototype.random = function () {
    return this[Math.floor((Math.random()* this.length))];
  }
  Array.prototype.remove = function(element) {
    const index = this.indexOf(element)
    if(index > -1){
      this.splice(index, 1)
    }
  }

client.maincolor = "#5440cd"
client.embed = function(t, d, f)
 {
const embed = new discord.MessageEmbed().setColor(client.maincolor);
if(t){embed.title = t};
if(d){embed.description = d};
if(f) {embed.setFooter(f)}
return embed;
};
client.loadCommands = function(){
    const folders = fs.readdirSync("src/Commands")
    for(const folder of folders){
    const files = fs.readdirSync(`src/Commands/${folder}`).filter(file => file.endsWith('.js'))
    for(const file of files){
        const command = require(`./Commands/${folder}/${file}`)
        if(!command.name) command.name = file.toLowerCase().replace(".js", "")
        if(!command.category) command.category = folder
        client.commands.set(command.name, command)
        console.log(`Command ${command.name} was loaded.`)
    }
}
}
client.loadEvents = function(){
    const folders = fs.readdirSync("src/Events")
    for(const folder of folders){
    const files = fs.readdirSync(`src/Events/${folder}`).filter(file => file.endsWith('.js'))
    for(const file of files){
       const event = require(`./Events/${folder}/${file}`)
       if(!event.name) event.name = file.toLowerCase().replace(".js", "")
       if(!event.run) {
           console.warn(`Event "${event.name}" does not have a callback, this might lead to errors in the future.`)
       } else {
       client.on(event.name, function(...args){
           try{
               event.run(...args, client)
           }catch(e){
               console.warn(`${event.name} had an error:\n${e}`)
           }
       })
       console.log(`Event ${event.name} was loaded.`)
       }
    }
}
}

client.init = function init(options = {}){
client.destroy()
client.staffrole = options.staffrole
client.checkin = options.checkin
client.logs = options.logs
client.mainserver = options.main
client.login(options.token)
client.loadCommands()
client.loadEvents()
}
client.log = async function log(options = {}){
    const channel = await client.channels.cache.get(client.logs)
    const embed = client.embed()
    if(options.title) embed.setTitle(options.title)
    if(options.description) embed.setDescription(options.description)
    if(options.footer) embed.setFooter(options.footer)
    if(options.message){
        return await channel.send(options.message, embed)
    } else {
        return await channel.send(embed)
    }
    }
setInterval(async() => {
const doc = await client.models.time.findOne({active: true})
if(doc){
const today = new Date().getDay()
if(doc.last < today){
const docs = await client.models.staff.find({onleave: false, suspended: false, blacklisted: false})
const active = [];
const inactive = [];
docs.forEach(async(staff) => {
    let r = client.random()
    if(staff.messages.today >= staff.messages.random){
        r = r / 2
        staff.active = staff.active + 1
        staff.inactive = 0
        active.push(`:heart: <@${staff.user}>`)
    } else if(staff.messages.today < staff.messages.random) {
        staff.inactive = staff.inactive + 1
        staff.active = 0
        inactive.push(`:frowning:  <@${staff.user}>`)
        if(staff.inactive > 3 && !client.owners.includes(doc.user)){
            staff.strikes = staff.strikes + 1
            staff.inactive = 0 
            client.log(client.embed("Striked!", `\`${client.users.cache.get(staff.user).tag}\` has been striked for being inactive for more than 3 days in a row.`))
            if(staff.strikes > 3 && doc.suspended == false && !client.owners.includes(doc.user)){
                staff.suspended = true
                const owners = []
                client.owners.forEach(o => {
                    owners.push(`<@${o}>`)
                })
                channel.send(`${owners.join(" ")}`, {embed: client.embed("Staff member needs reviewing.", `<@${staff.user}> has gotten more than 3 strikes. They are now suspended.`)})
            }
        }
        }
    staff.messages.today = 0
        staff.messages.random = r
        await staff.save()
})
const channel = client.channels.cache.get(client.checkin)
await channel.messages.fetch().then(msgs =>{
msgs.forEach(m => {
    if(m.pinned == false){
        m.delete()
    }
})
})
if(active.length > 0){
    channel.send(client.embed("Check In!", `Staff Who Were Active Today:\n${active.join("\n")}`).setColor("GREEN"))
} else {
    channel.send(client.embed(`Check In!`, `No staff Members Were Active Today :frowning:`))
}
if(inactive.length > 0){
    channel.send(client.embed("Check In!", `Staff Who Were In-Active Today:\n${inactive.join("\n")}`).setColor("RED"))
} else {
    channel.send(client.embed(`Check In!`, `No staff Members Were In-Active Today :tada:`))
}
}
doc.last = today
await doc.save()
} else {
    const newtime = new client.models.time({
        active: true,
        last: new Date().getDay()
    })
    await newtime.save()
}
}, 30000);

client.staff = function generateSchema(id){
    return {
        user: id,
        strikes: 0,
        onleave: false,
        messages:{
            today: 0,
            random: client.random(),
            all: 0
        },
        suspended: false,
        active: 0,
        inactive: 0,
        blacklisted: false
    }
}
client.init({staffrole: process.env.staffrole, checkin: process.env.checkin, token: process.env.token, logs: process.env.logs, main: process.env.main})