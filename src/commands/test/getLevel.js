const { SlashCommandBuilder } = require('discord.js');
const dataSource = require('../../db/index')
const {calculateXpNeededForLvl} = require('../../modules/levelingSystem')


module.exports = {
	data: new SlashCommandBuilder()
		.setName('level')
		.setDescription('Provides information about the server.'),
	async execute(interaction) {
		try {
			const userRepo = dataSource.getRepository("User")
			const user = await userRepo.findOne({where: {discordId: interaction.member.user.id}})
			const xpNeededForNextLevel = calculateXpNeededForLvl(user.level + 1)
			await interaction.reply(`Your level is ${user.level}. You need ${xpNeededForNextLevel - user.xp} xp to level up`);
		} catch (e) {
			console.log(e)
		}
	},
};