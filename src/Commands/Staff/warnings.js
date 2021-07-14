module.exports = {
    permissions: ["MANAGE_MESSAGES"],
    aliases: ["warns"],
    run: async(client, message, args) =>{
        const user = message.mentions?.users?.first()
        if(!user) message.reply(client.embed("Error", "You need to provide someone to warn."))
        const doc = await client.models.warns.findOne({user: user.id})
        if(doc){
            const warns = doc.warnings.sort((a, b) => a.id - b.id)
            const warnings = []
            warns.forEach(warn => {
                warnings.push(`\`#${warn.id} | Moderator: ${warn.mod} | Reason: ${warn.reason}\``)
            })
            return message.reply(client.embed(`Warnings for user ${user.tag}`, warnings.join("\n")))
        } else {
         message.reply(client.embed("User is clean!", "This user does not have any warnings.")) 
        }
}
}