// const { SlashCommandBuilder } = require('discord.js');
// const dataSource = require('../../db/index')


// module.exports = {
// 	data: new SlashCommandBuilder()
// 		.setName('getprofile')
// 		.setDescription('Provides information about the user')
//         .addUserOption(option =>
//             option.setName('usertag')
//                 .setDescription('user tag of progile you would like to get')
//                 .setRequired(true)),
// 	async execute(interaction) {

//         try {
//             const userParam = interaction.options.getUser('usertag');
//             const userRepo = dataSource.getRepository("User")
//             const user = await userRepo.findOne({where: {discordId: userParam.id}})
//             await interaction.reply({
//                 content: null,
//                 embeds: [
//                 {
//                     description: `:cloud: Профіль — <@${user.discordId}>`,
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