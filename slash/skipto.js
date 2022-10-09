const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder().setName("skipto").setDescription("Skipea a la cancion indicada por numero")
        .addNumberOption((option) =>
            option.setName("tracknumber").setDescription("The track to skip to").setMinValue(1).setRequired(true)),
    run: async ({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guildId)

        if (!queue) return await interaction.editReply("There are no songs in the queue")

        const trackNum = interaction.options.getNumber("tracknumber")
        if (trackNum > queue.tracks.length)
            return await interaction.editReply("Numero de cancion invalido para skipear")
        queue.skipTo(trackNum - 1)

        await interaction.editReply(`Skipeado a la cancion número ${trackNum}`)        
    },
}
