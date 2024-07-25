const { Events } = require('discord.js');
const dataSource = require('../db/index')

module.exports = {
	name: Events.GuildMemberAdd,
	async execute(member) {
		try {
            const userRepo = dataSource.getRepository("User")
            const user = await userRepo.findOne({discordId: member.user.id})
            if (!user) {
                
                const newUser = userRepo.create({discordId: interaction.member.user.id, level: 1, xp: 0})
                await userRepo.save(newUser)
            }
        } catch (e) {
            console.error(e)
        }
	},
};