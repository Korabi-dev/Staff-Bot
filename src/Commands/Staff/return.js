module.exports = {
    run: async(client, message, args) => {
        const doc = await client.models.staff.findOne({user: message.author.id})
        if(doc){
            if(doc.onleave == false) return message.reply(client.embed("Error", "You arent on leave."))
            doc.onleave = false
          await doc.save()
          const channel = await client.channels.cache.get(client.logs)
            message.reply(client.embed("Welcome Back!", `You are now no longer on leave.`))
            channel.send(client.embed("Staff Member Is Back!", `\`${message.author.username}\` is now back from leave, hope they had a great break :heart:`))
        }
    }
}