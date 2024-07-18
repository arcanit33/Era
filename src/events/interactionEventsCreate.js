const { Events } = require('discord.js');
// const {areStringsSimilar} = require('../modules/similarityCheck')
// const dataSource = require('../db/index')

// const {uniqueRoleRequestChannel} = require('../data/channels')

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		try {
			// if (interaction.customId === 'createRoleRequestModal') {

			// 	const userRepo = dataSource.getRepository("User")
			// 	const user = await userRepo.findOne({where: {discordId: interaction.member.user.id}})

			// 	if (user.coins < 25000) {
			// 		interaction.reply(`На вашому рвхунку не достатньо хмаринок :( Ви маєте ${user.coins} хмаринок.`)
			// 		return
			// 	}

			// 	const userRequestedRole = interaction.fields.getTextInputValue('customRoleInput')
			// 	const requestedRoleColor = interaction.fields.getTextInputValue('colorHexInput')
			// 	const requestRoleEmoji = interaction.fields.getTextInputValue('emojiInput')

			// 	const channel = interaction.guild.channels.cache.find( channel => channel.id === uniqueRoleRequestChannel)	

			// 	const similarityMap = interaction.guild.roles.cache.map( role => {
			// 		const similarity = areStringsSimilar(role.name, userRequestedRole)
			// 		return {similarity, roleId: role.id}
			// 	}).filter( x => x.similarity !== 0)

			// 	const topSimilarityMap = Array.from(similarityMap).sort( (a, b) => b.similarity - a.similarity).slice(0, 5)
				
			// 	const similarityWarnMessage = topSimilarityMap.reduce( (acc, val) => acc + `<@&${val.roleId}>. Similarity percentage is ${val.similarity.toFixed(2) * 100}%\n`, '')

				
				
			// 	const templateString = `\n\n Top ${topSimilarityMap.length} roles by similarity\n\n`

			// 	await channel.send(`User <@${interaction.member.id}> requested to create new role: ${userRequestedRole}, color: ${requestedRoleColor} ${requestRoleEmoji ? `, emoji: ${requestRoleEmoji}` : ''}` + templateString + similarityWarnMessage)

			// 	interaction.reply({ephemeral: true, content: "Your request is waiting for approval"})
			// }

			// if (!interaction.isChatInputCommand()) return;

			const command = interaction.client.commands.get(interaction.commandName);

			if (!command) {
				console.error(`No command matching ${interaction.commandName} was found.`);
				return;
			}

			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(`Error executing ${interaction.commandName}`);
				console.error(error);
			}
		} catch (e) {
			console.log(e)
		}
	},
};