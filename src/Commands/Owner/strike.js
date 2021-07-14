module.exports = {
    run: async(client, message, args) => {
            const user = message.mentions?.users?.first()
            if(!user) return message.reply(client.embed("Error", "You must mention a user to strike."))
            if(user.id == message.author.id) return message.reply(client.embed("Error", "You can't strike yourself."))
            if(client.owners.includes(user.id)) return message.reply(client.embed("Error", "You can't strike an owner."))
            const doc = await client.models.staff.findOne({user: user.id})
            if(doc){
                doc.strikes = doc.strikes + 1
                const channel = await client.channels.cache.get(client.logs)
                channel.send(client.embed("Striked!", `\`${client.users.cache.get(doc.user).username}\` has been striked by \`${message.author.username}\`.`))
                if(doc.strikes > 3 && doc.suspended == false){
                    doc.suspended = true
                    const owners = []
                    client.owners.forEach(o => {
                        owners.push(`<@${o}>`)
                    })
                    channel.send(`${owners.join(" ")}`, {embed: client.embed("Staff member needs reviewing.", `<@${doc.user}> has gotten more than 3 strikes. (they are now suspended)`)})
                }
                await doc.save()
                message.reply(client.embed("Striked!", `You have striked \`${user.username}\` they now have ${doc.strikes} strike(s).`))
            }else {
                message.reply(client.embed("Error", "This user is not in the staff database, if you believe this is a mistake tell them to talk and it should be fixed."))
            }
    }
}