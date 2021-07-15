module.exports = {
    name: "guildMemberUpdate",
    run: async(old, n, client) => {
        if(n.roles.cache.get(client.staffrole)){
         if(n.user.bot)return;
            const doc = await client.models.staff.findOne({user: n.id})
            if(doc){
                if(doc.blacklisted == true){
                    doc.blacklisted = false
                    await doc.save()
                client.log(client.embed("Staff Member Came Back!", `Everyone welcome \`${n.user.username}\` back to the staff team!`))
                }
            }
            if(!doc){
                const newd = new client.models.staff(client.staff(n.id))
                await newd.save()
                client.log(client.embed("New Staff!", `Everyone welcome \`${n.user.username}\` to the staff team!`))
            }
        } else {
            const doc = await client.models.staff.findOne({user: n.id})
            if(doc){
                doc.blacklisted = true
                await doc.save()
                client.log(client.embed("Staff Member Removed!", `Everyone say bye to \`${n.user.username}\`, they are no longer on the staff team!`))
            } 
        }
    }
}