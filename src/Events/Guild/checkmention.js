module.exports = {
    name: "message",
    run: async(message, client) => {
        if(message.author.bot || !message.guild) return;
        if(message.content.includes("864634895955263558")){
            const doc = await client.models.staff.findOne({user: message.author.id})
            if(doc){
                message.mentionReply(client.embed("Hey there!", `My name is ${client.user.username} and my prefix is \`${process.env.prefix}\`, use \`${process.env.prefix}help\` to see the commands.`))
            }
        }
    }
}