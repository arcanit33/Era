const { Events } = require('discord.js');
const {calculateXpNeededForLvl} = require('../modules/levelingSystem')
const {boostRoles, boostRolesMap} = require('../data/roles')
const {chatsToMonitor} = require('../data/channels')

const dataSource = require('../db/index')

module.exports = {
	name: Events.MessageCreate,
	async execute(interaction) {

        if (interaction.author.bot) return
		
        if (chatsToMonitor.includes(interaction.channel.id)) {

            
            try {
                const member = await interaction.member.fetch()
                const userRepo = dataSource.getRepository("User")
                let user = await userRepo.findOne({where: {discordId: interaction.member.user.id}})
                if (!user) {
                    const newUser = userRepo.create({discordId: interaction.member.user.id, level: 1, xp: 0})
                    user = await userRepo.save(newUser)
                }

                const multiplier = interaction.member.roles.cache.reduce( (acc, role ) => boostRoles.includes(role.id) && acc < boostRolesMap[role.id] ? boostRolesMap[role.id] : acc, 1)

                const xpNeededForNextLevel = calculateXpNeededForLvl(user.level + 1)
                const xpLeftForNextLevel = xpNeededForNextLevel - user.xp

                let xp = user.xp
                let level = user.level

                const xpGain = 0.5
                const coinsGain = 0.3

                if (xpLeftForNextLevel > xpGain) {
                    xp += xpGain

                } else {
                    level += 1
                    xp = xpGain - xpLeftForNextLevel
                }
                const userLevelRoles = member.roles.cache.filter( role => role.name.split('-').slice(-1)[0] === 'level')
                const newLevelRole = member.guild.roles.cache.find( role => role.name === `${level}-level`)
                
                if (userLevelRoles.size == 0) {
                    newLevelRole > 0 && await interaction.member.roles.add(newLevelRole)
                }
                if (level !== user.level) {
                
                    console.log('////////////////////')
                    // console.log(userLevelRoles)
                    console.log('//////////////////////////')
                    console.log('123')
                    console.log(newLevelRole)
                    console.log('//////////////////////////')
                    userLevelRoles.size > 0 && await Promise.all(userLevelRoles.map( role => interaction.member.roles.remove(role)))
                    newLevelRole > 0 && await interaction.member.roles.add(newLevelRole)
                }

                await userRepo.update({discordId: user.discordId }, {xp: xp, level: level, coins: user.coins + coinsGain})
            }
            catch (e) {
                console.error(e)
            }
        }
	},
};