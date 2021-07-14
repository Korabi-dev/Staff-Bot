module.exports = {
    run: async(client, message, args) => {
        const user = message.mentions?.members?.first()
        if(!user) return message.reply(client.embed("Error", "You must mention a user."))
        if(user.id == message.member.id) return message.reply(client.embed("Error", "You can't use this command on yourself."))
        if(user.user.bot) return message.reply(client.embed("Error", "Bots can't be staff."))
        const role = await message.guild.roles.cache.get(client.staffrole)
        if(!role) return message.reply(client.embed("Error", "Staff role was not found."))
        const doc = await client.models.staff.findOne({user: user.id})
        if(!user.roles.cache.get(client.staffrole)){
            user.roles.add(client.staffrole)
        }
        if(!doc){
            const newd = new client.models.staff(client.staff(user.id))
            await newd.save()
            client.log(client.embed("New Staff!", `Everyone welcome \`${user.user.username}\` to the staff team!`))
        }
        message.reply(client.embed("Success", `You have given ${user} staff.`))
    }
}