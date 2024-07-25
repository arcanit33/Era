// const { SlashCommandBuilder } = require('discord.js');
// const dataSource = require('../../db/index')


// module.exports = {
// 	data: new SlashCommandBuilder()
// 		.setName('profile')
// 		.setDescription('Provides information about the server.'),
// 	async execute(interaction) {

//         try {
//             const userRepo = dataSource.getRepository("User")
//             const user = await userRepo.findOne({where: {discordId: interaction.member.user.id}})
//             await interaction.reply({
//                 content: null,
//                 embeds: [
//                 {
//                     description: `:cloud: Профіль — <@${interaction.member.id}>`,
//                     color: 14408667,
//                     fields: [
//                     {
//                         name: "> Хмаринки",
//                         value: "```" + user.coins + "```",
//                         inline: true
//                     },
//                     {
//                         name: "> Рівень",
//                         value: "```" + user.level + "```",
//                         inline: true
//                     },
//                     {
//                         name: "> Голосовий онлайн",
//                         value: "```" + user.inVoiceTime + "```",
//                         inline: true
//                     }
//                     ]
//                 }
//                 ]
//             });
//         } catch (e) {
// 			console.log(e)
// 		}
// 	},
// };