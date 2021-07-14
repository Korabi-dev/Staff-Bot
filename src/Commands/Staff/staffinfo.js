module.exports = {
    run: async(client, message, args) =>{
      var user = message.mentions?.users.first()
      if(!user) user = message.author
      const doc = await client.models.staff.findOne({user: user.id})
      if(doc){
          message.reply(client.embed(`Staff Info For ${user.tag}`, `**Messages Today:** \`${doc.messages.today}\`\n**Messages Required Today:** \`${doc.messages.random}\`\n**Total Messages:** \`${doc.messages.all}\`\n**Strikes:** \`${doc.strikes}\`\n**Suspended:** \`${doc.suspended ? "Yes" : "No"}\`\n**Blacklisted:** \`${doc.blacklisted ? "Yes" : "No"}\` `))
      }else {
          message.reply(client.embed("Error", "This user is not in the staff database, if you believe this is a mistake tell them to talk and it should be fixed."))
      }
    }
}