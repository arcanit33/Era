// const { SlashCommandBuilder } = require('discord.js');
// const dataSource = require('../../db/index')
// const {calculateXpNeededForLvl} = require('../../modules/levelingSystem')


// module.exports = {
// 	data: new SlashCommandBuilder()
// 		.setName('coins')
// 		.setDescription('Gives X coins to specified user')
//         .addUserOption(option =>
//             option.setName('usertag')
//                 .setDescription('user tag you want to give coins to')
//                 .setRequired(true))
//         .addNumberOption(option =>
//             option.setName('coins')
//                 .setDescription('amount of coins to give')
//                 .setRequired(true)),
// 	async execute(interaction) {
// 		try  {
//             const userParam = interaction.options.getUser('usertag');
//             const coinsParam = interaction.options.getNumber('coins');
// 			const userRepo = dataSource.getRepository("User")
// 			const user = await userRepo.findOne({where: {discordId: userParam.id}})
//             await userRepo.update({id: user.id}, {coins: user.coins + coinsParam})
// 			await interaction.reply(`Coins successfuly added!`);
// 		} catch (e) {
// 			console.log(e)
// 		}
// 	},
// };