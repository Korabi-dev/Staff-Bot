module.exports = {
run: async(client, message, args) => {
if(!args[0]) return message.reply(client.embed("Error", "You must provide a valid subcommand/tag."))
const subcommands = ["create", "delete", "edit", "list"]
var doc = await client.models.tags.findOne({enabled: true})
    if(!doc){
        const newd = new client.models.tags({
            tags: [],
            enabled: true
        })
        await newd.save()
        return message.reply(client.embed("Setting up!", "The tag system is being setup, please use this command again in 10 seconds or so."))
    }
if(subcommands.includes(args[0].toLowerCase())){
const option = args[0].toLowerCase()
if(option == "create"){
    if(!args[1] || !args[2]) return message.reply(client.embed("Error", `Invalid usage, valid usage: \`${process.env.prefix}tag create <Name> <Content>\`.`))
    args[1] = args[1].toLowerCase()
    const tag = doc.tags.filter(t => {
     return  t.name.toLowerCase() == args[1]
    })
    if(tag[0]) return message.reply(client.embed("Error", `This tag already exists, use \`${process.env.prefix}tag edit <Name> <Content> to edit it.\``))
    if(!tag[0]){
        doc.tags.push({name: args[1], content: args.slice(2).join(" "), user: message.author.tag})
        await doc.save()
        return message.reply(client.embed("Tag Added!", `You have added the tag \`${args[1]}\` successfully.`))
    }
} else if(option == "delete"){
if(!args[1]) return message.reply(client.embed("Error", "You must provide a tag name."))
args[1] = args[1].toLowerCase()
const tag = doc.tags.filter(t => {
   return t.name.toLowerCase() == args[1]
})
if(!tag[0]) return message.reply(client.embed("Error", `Tag \`${args[1]}\` was not found.`))
if(tag[0]){
    doc.tags.remove(tag[0])
    await doc.save()
    return message.reply(client.embed("Success", `You have removed the tag \`${args[1]}\``))
}
} else if(option == "edit"){
    if(!args[1]) return message.reply(client.embed("Error", "You must provide a tag name."))
    args[1] = args[1].toLowerCase()
    const tag = doc.tags.filter(t => {
       return t.name.toLowerCase() == args[1]
    })
    if(!tag[0]) return message.reply(client.embed("Error", `Tag \`${args[1]}\` was not found.`))
    if(tag[0]){
        if(!args[2]) return message.reply(client.embed("Error", "You must provide some content."))
        doc.tags.remove(tag[0])
        doc.tags.push({name: args[1], content: args.slice(2).join(" "), user: message.author.tag})
        await doc.save()
        message.reply(client.embed("Success", `You edited the tag \`${args[1]}\`.`))
    }
} else if(option == "list"){
    const embed = client.embed()
    if(doc.tags.length > 0){
        embed.setTitle(`Tags list for ${client.guilds.cache.get(client.mainserver).name}`)
        doc.tags.forEach(async(tag) => {
            embed.addField(`${tag.name} - ${tag.user}`, `\`\`\`\n${tag.content}\n\`\`\``)
        })
        embed.setDescription(`${client.guilds.cache.get(client.mainserver).name} has ${doc.tags.length} total tag(s).`)
    } else {
       embed.setTitle("No tags")
       embed.setDescription(`There are no tags for ${client.guilds.cache.get(client.mainserver).name}.`)
    }
    return message.reply(embed)
}
}else {
    const tag = doc.tags.filter(t => {
       return t.name.toLowerCase() == args[0].toLowerCase()
    })
    if(!tag[0]) return message.reply(client.embed("Error", "You must provide a valid subcommand/tag."))
    if(tag[0]){
     message.channel.send(client.embed(tag[0].name, tag[0].content))
         message.delete()
    }
}
}
}