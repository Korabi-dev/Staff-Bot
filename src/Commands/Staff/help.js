module.exports = {
    hide: true,
    run: async(client, message, args) => {
        const all = []
        const owner = []
        const staff = []
        client.commands.forEach(command => {
            if(command.hide) return;
            all.push(command)
            const c = command.category.toLowerCase()
            if(c == "owner"){
                owner.push(`\`${command.name}\``)
            } else if(c == "staff"){
                staff.push(`\`${command.name}\``)
            }
        })
        if(all.length < 1) return message.reply(client.embed("Error", "No commands found."))
        const embed = client.embed(`${client.user.username}'s Command List`, `${client.user.username} currently has **${all.length}** commands.`).setURL("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
        if(owner.length > 0){
            embed.addField("👑 Owner:", owner.join(", "))
        }
        if(staff.length > 1){
            embed.addField("🛠️ Staff:", staff.join(", "))
        }
        
        message.reply(embed)
    }
}