module.exports = {
    run: async(client) => {
        console.log(`${client.user.tag} has logged in.`)
        client.user.setActivity(`Over ${client.guilds.cache.get(client.mainserver).name || "Servers"}!`, {type: "WATCHING"})
    }
}