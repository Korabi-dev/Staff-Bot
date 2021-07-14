module.exports = {
    run: async(client, message, args) => {
            const user = message.mentions?.users?.first()
            if(!user) return message.reply(client.embed("Error", "You must mention a user to un-suspend."))
            const doc = await client.models.staff.findOne({user: user.id})
            if(doc){
                if(doc.suspended == true){
                doc.suspended = false
                const channel = await client.channels.cache.get(client.logs)
               channel.send(client.embed("Un-Suspended", `\`${user.username}\` was un-suspended by \`${message.author.username}\`.`))
                await doc.save()
                message.reply(client.embed("Un-Suspended!", `You have un-suspended \`${user.username}\`.`))
                } else {
                    message.reply(client.embed("Error", "This staff member is not suspended."))
                }
            }else {
                message.reply(client.embed("Error", "This user is not in the staff database, if you believe this is a mistake tell them to talk and it should be fixed."))
            }
    }
}