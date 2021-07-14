module.exports = {
    run: async(client, message, args) => {
    var docs = await client.models.staff.find({onleave: false, suspended: false, blacklisted: false})
        docs = docs.sort((a,b) => b.messages.today - a.messages.today)
        const active = []
        docs.forEach(async(staff) => {
            if(client.owners.includes(staff.user)) return;
            if(staff.messages.today >= staff.messages.random){
                active.push(`:heart: \`${client.users.cache.get(staff.user).username || "Unknown"}\` - ${staff.messages.today}/${staff.messages.random} messages today.`)
            } else {
                active.push(`:frowning: \`${client.users.cache.get(staff.user).username || "Unknown"}\` - ${staff.messages.today}/${staff.messages.random} messages today.`) 
            }
        })
        if(active.length > 0){
    message.reply(client.embed("Staff Activity", active.join("\n")))
    } else{
        message.reply(client.embed("Error", "No qualified staff found."))
    }
}
}