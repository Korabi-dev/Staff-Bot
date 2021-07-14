module.exports = {
    run: async(client, message, args) => {
        const doc = await client.models.staff.findOne({user: message.author.id})
        if(doc){
            if(doc.onleave == true) return message.reply(client.embed("Error", "You are already on leave."))
            if(!args[0]) return message.reply(client.embed("Error", "You need to provide a reason."))
            doc.onleave = true
          await doc.save()
          const channel = await client.channels.cache.get(client.logs)
            message.reply(client.embed("Goodbye!", `You are now on leave for: \`${args.slice(0).join(" ")}\``))
            channel.send(client.embed("Leave!", `\`${message.author.username}\` is now on leave for: \`${args.slice(0).join(" ")}\``))
        }
    }
}