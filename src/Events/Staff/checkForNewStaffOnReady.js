const { random } = require("mathjs")
module.exports = {
    name: "ready",
    run: async(client) => {
        const guild = client.guilds.cache.get(client.mainserver)
        guild.members.cache.forEach(async(member) => {
            if(client.owners.includes(member.id)) return;
            const user = client.users.cache.get(member.id)
            if(!user) console.warn(`Could not find member ${member.user.tag} as a user.`)
            if(user.bot) return;
            if(member.roles.cache.get(client.staffrole)){
                const doc = await client.models.staff.findOne({user: member.id})
                if(!doc){
                    const newd = new client.models.staff(client.staff(member.id))
                    await newd.save()
                    client.log(client.embed("New Staff!", `Everyone welcome \`${member.user.username}\` to the staff team!`))
                }
            }
        })
    }
}