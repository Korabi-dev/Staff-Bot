
module.exports = {
    name: "message",
    run: async(message, client) => {
        const prefix = process.env.prefix
        if(message.author.bot || !message.content.startsWith(prefix) || !message.guild) return;
        message.author.isOwner = false
        message.author.isStaff = false
        if(client.owners.includes(message.author.id)) message.author.isOwner = true
       const staffInfo = await client.models.staff.findOne({user: message.author.id})
       if(staffInfo){
           message.author.isStaff = true
       }
        message.reply = function(content, options = {}){
            if(!options.mention){
                return message.noMentionReply(content)
            }   
            if(options.mention){
                return message.mentionReply(content)
            }
           }
   
        let [commandName, ...args] = message.content
        .slice(prefix.length)
        .trim()
        .split(/ +/);
      commandName = commandName.toLowerCase()
      args.clean = message.cleanContent.slice(prefix.length + commandName.length);
      args.all = message.cleanContent.replace(`${prefix}${commandName}`, "")
      var command =
        client.commands.get(commandName) 
        if(!command){
        command = client.commands.find((cmd) => cmd.aliases?.includes(commandName));
        }
        if(!command) return;
        if(command){
            let run = true
            if(command.category == "Owner" && message.author.isOwner == false) {
                run = false
                return;
            } 
            if(command.category == "Staff" && message.author.isStaff == false && message.author.isOwner == false){
                run = false
                return;
            }
            if(message.author.isStaff && message.author.isOwner == false){
                if(staffInfo.blacklisted == true){
                    run = false
                    return;
                }
            if(staffInfo.suspended == true){
                run = false
                return message.reply(client.embed("Error", `Uh oh, looks like you cant use this command right now because you are currently ${staffInfo.blacklisted ? "blacklisted" : "suspended"} from the staffing system.`))
            }
            }
            
            if(command.permissions){
command.permissions.forEach(perm => {
                    if(!message.member.hasPermission(perm) && message.author.isOwner == false) {
                        run = false
                   return message.reply(client.embed("Missing Permissions", `You need the \`${perm.replace("_", " ")}\` permission to use this command.`)) }}
                )
            }
            if(command.botpermissions){
                command.botpermissions.forEach(perm => {
                    if(!message.guild.me.hasPermission(perm)) {
                        run = false
                      return message.reply(client.embed("Missing Permissions", `I need the \`${perm.replace("_", " ")}\` permission for this command to work.`))
                    }
                })
            }

            if(run == true){
            command.run(client, message, args)
            }

        }
    }
}