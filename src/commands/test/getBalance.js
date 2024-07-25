// const { SlashCommandBuilder } = require('discord.js');
// const dataSource = require('../../db/index')

// module.exports = {
// 	data: new SlashCommandBuilder()
// 		.setName('balance')
// 		.setDescription('Provides information about cloud coins balance.'),
// 	async execute(interaction) {
// 		try {
// 			const userRepo = dataSource.getRepository("User")
// 			const user = await userRepo.findOne({where: {discordId: interaction.member.user.id}})
// 			await interaction.reply(`You have ${user.coins}! Keep it up.`);
// 		} catch (e) {
// 			console.log(e)
// 		}
// 	},
// };