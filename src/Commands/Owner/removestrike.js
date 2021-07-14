module.exports = {
    run: async(client, message, args) => {
            const user = message.mentions?.users?.first()
            if(!user) return message.reply(client.embed("Error", "You must mention a user to unstrike."))
            const doc = await client.models.staff.findOne({user: user.id})
            if(doc){
                if(doc.strikes < 1){
                doc.strikes = doc.strikes - 1
                const channel = await client.channels.cache.get(client.logs)
                channel.send(client.embed("Un-Striked!", `\`${client.users.cache.get(staff.user).username}\` has been un-striked by \`${message.author.username}\`.`))
                await doc.save()
                message.reply(client.embed("Un-Striked!", `You have un-striked \`${user.username}\` they now have ${doc.strikes}.`))
                } else {
                    message.reply(client.embed("Error", "This staff member has 0 strikes."))
                }
            }else {
                message.reply(client.embed("Error", "This user is not in the staff database, if you believe this is a mistake tell them to talk and it should be fixed."))
            }
    }
}