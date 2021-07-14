module.exports = {
    run: async(client, message, args) => {
            const user = message.mentions?.users?.first()
            if(!user) return message.reply(client.embed("Error", "You must mention a user to suspend."))
            if(user.id == message.author.id) return message.reply(client.embed("Error", "You can't suspend yourself."))
            if(client.owners.includes(user.id)) return message.reply(client.embed("Error", "You can't suspend an owner."))
            const doc = await client.models.staff.findOne({user: user.id})
            if(doc){
                doc.suspended = true
                const channel = await client.channels.cache.get(client.logs)
               channel.send(client.embed("Suspended", `\`${user.username}\` was suspended by \`${message.author.username}\`.`))
                await doc.save()
                message.reply(client.embed("Suspended!", `You have suspended \`${user.username}\`.`))
            }else {
                message.reply(client.embed("Error", "This user is not in the staff database, if you believe this is a mistake tell them to talk and it should be fixed."))
            }
    }
}