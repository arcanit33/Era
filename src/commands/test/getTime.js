// const { SlashCommandBuilder } = require('discord.js');
// const dataSource = require('../../db/index')

// module.exports = {
// 	data: new SlashCommandBuilder()
// 		.setName('time')
// 		.setDescription('Provides information about the server.'),
// 	async execute(interaction) {
//         try {
//             const userRepo = dataSource.getRepository("User")
//             const user = await userRepo.findOne({where: {discordId: interaction.member.user.id}})
//             await interaction.reply(`You spent ${user.inVoiceTime} minutes in voice.`);
//         } catch (e) {
// 			console.log(e)
// 		}
// 	},
// };