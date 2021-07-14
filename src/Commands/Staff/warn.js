module.exports = {
    permissions: ["MANAGE_MESSAGES"],
    run: async(client, message, args) =>{
        const user = message.mentions?.users?.first()
        if(!user) message.reply(client.embed("Error", "You need to provide someone to warn."))
        if(user.id == message.author.id) return message.reply(client.embed("Error", "You can't use this command on yourself."))
        var reason = "None."
        if(args[1]) reason = args.slice(1).join(" ")
        const doc = await client.models.warns.findOne({user: user.id})
        const doc2 = await client.models.warnsid.findOne({active: true})
        let id = 0;
        if(!doc2){
            const newd = new client.models.warnsid({
                active: true,
                current: 0
            })
            await newd.save()
        } else {
            doc2.current = doc2.current + 1
            await doc2.save()
            id = doc2.current
        }
        if(doc){
            doc.warnings.push({reason: reason, mod: message.author.tag, id: id})
        await doc.save()
        } else {
            const newd= new client.models.warns({
                user: user.id,
                warnings: [{reason: reason, mod: message.author.tag, id: id}]
            })
            await newd.save()
        }
        const embed = client.embed("Warning logged", `User: \`${user.tag}\`\nModerator: \`${message.author.tag}\`\nReason: \`${reason}\`\nCase ID: \`#${id}\``)
        message.reply(embed)
        client.log(embed)
}
}