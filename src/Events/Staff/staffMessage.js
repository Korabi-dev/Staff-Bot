const { random } = require("mathjs")
module.exports = {
    name: "message", 
    run: async(message, client) => {
        if(message.author.bot || message.content.toLowerCase().startsWith(process.env.prefix) || message.content.length < 2 || client.owners.includes(message.author.id)) return;
        const doc = await client.models.staff.findOne({user: message.author.id})
        if(doc){
            if(doc.onleave == false && doc.suspended == false){
                doc.messages.all = doc.messages.all + 1
                doc.messages.today = doc.messages.today + 1
                await doc.save()
            }
        } else {
            if(message.member.roles.cache.get(client.staffrole)){
                const member = message.member
                const newd = new client.models.staff(client.staff(member.id))
                await newd.save()
                client.log(client.embed("New Staff!", `Everyone welcome \`${member.user.username}\` to the staff team!`))
            }
        }
    }
}