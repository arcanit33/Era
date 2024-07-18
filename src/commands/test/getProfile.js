const { SlashCommandBuilder } = require('discord.js');
// const dataSource = require('../../db/index')


module.exports = {
	data: new SlashCommandBuilder()
		.setName('getprofile')
		.setDescription('Provides information about the user'),
	async execute(interaction) {
        try {
            // const userParam = interaction.options.getUser('usertag');
            // const userRepo = dataSource.getRepository("User")
            console.log(interaction)
            // const user = await userRepo.findOne({where: {discordId: userParam.id}})
            await interaction.reply('hui');
        } catch (e) {
			console.log(e)
		}
	},
};