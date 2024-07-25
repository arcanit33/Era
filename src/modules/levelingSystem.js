const dataSource = require('../db/index')
const {boostRoles, boostRolesMap} = require('../data/roles')
const {afkChannelId, logsChannel} = require('../data/channels')

const xpNeededForLvl1 = 1800
const delta = 2520

const calculateXpNeededForLvl = (lvl) => {
    if (lvl < 1) throw Error("Error calculating xp for lvl")

    return ((lvl - 1) * delta + xpNeededForLvl1 )
}

const updateUser = async (user, curState) => {

    try {
        const userRepo = dataSource.getRepository("User")

        const member = await curState.member.fetch()

        const minutesInVoice = Math.floor(( new Date().getTime() - new Date(user.joinedVoiceAt).getTime() ) / 60_000)

       
       
       
        const multiplier = member.roles.cache.reduce( (acc, role ) => boostRoles.includes(role.id) && acc < boostRolesMap[role.id] ? boostRolesMap[role.id] : acc, 1)

        let xpIncrease = minutesInVoice * multiplier
        let lvl = user.level
        let xp = user.xp

        const coinsGain = minutesInVoice

        if (lvl < 10) {
            while (xpIncrease > 0) {
                const xpNeededToLevelUp = calculateXpNeededForLvl(lvl + 1)
                const xpDelta = xpNeededToLevelUp - xp - xpIncrease 
                if (xpDelta <= 0) {
                    lvl++
                    xpIncrease -= (xpNeededToLevelUp - xp)
                    xp = 0
                } else {
                    xp += xpIncrease
                    xpIncrease = 0
                }
            }
        }  else {
            xp += xpIncrease
        }

        const channel = curState.guild.channels.cache.find( channel => channel.id === logsChannel)	

        channel.send(`User ${member.user.username} gained ${coinsGain} xp, updated level is ${lvl}, cooins gain - ${coinsGain}, joined voice at - ${user.joinedVoiceAt}, minutes in voice: ${minutesInVoice}, role multiplier - ${multiplier}`)

        if (!user.joinedVoiceAt) return
        
        const userLevelRoles = member.roles.cache.filter( role => role.name.split('').slice(-1)[0] === '-level')
        const newLevelRole = member.guild.roles.cache.find( role => role.name === `${lvl}-level`)
        if (userLevelRoles.size == 0) {
            newLevelRole > 0 && await curState.member.roles.add(newLevelRole)
        }
        if (lvl !== user.level) {
        
            userLevelRoles.size > 0 && await Promise.all(userLevelRoles.map( role => curState.member.roles.remove(role)))
            newLevelRole > 0 && await curState.member.roles.add(newLevelRole)
        }
       

        await userRepo.save({...user, level: lvl, xp, joinedVoiceAt: null, coins: user.coins + coinsGain, inVoiceTime: user.inVoiceTime + minutesInVoice})
    } catch (e) {
        console.log(e)
    }

}

const updateLvlXpOnVoiceLeave = async (prevState, curState) => {
    if (!prevState.channel) {

        if (curState.channel.id === afkChannelId) return

        try {
            const userRepo = dataSource.getRepository("User")
            let user = await userRepo.findOne({where: {discordId: curState.member.user.id}})
            if (!user) {
                const newUser = userRepo.create({discordId: curState.member.user.id, level: 1, xp: 0})
                user = await userRepo.save(newUser)
            }
            
            await userRepo.save({...user, joinedVoiceAt: new Date()})
        }
        catch (e) {
            console.error(e)
        }
		
    }

    if (!curState.channel) {

        try {
            const userRepo = dataSource.getRepository("User")

            let user = await userRepo.findOne({where: {discordId: curState.member.user.id}})

            if (!user) {
                const newUser = userRepo.create({discordId: curState.member.user.id, level: 1, xp: 0})
                user = await userRepo.save(newUser)
                return
            }

            if (!user.joinedVoiceAt) return 

            await updateUser(user, curState)
        }
        catch (e) {
            console.error(e)
        }
    }

    if (curState.channel && prevState.channel && curState.channelId !== prevState.channelId) {
        const userRepo = dataSource.getRepository("User")
        let user = await userRepo.findOne({where: {discordId: curState.member.user.id}})

        if (curState.channel.id === afkChannelId) {
            await updateUser(user, curState)
        } else if (prevState.channel.id === afkChannelId){
            await userRepo.save({...user, joinedVoiceAt: new Date()})
        }
    }
}


module.exports = {updateLvlXpOnVoiceLeave, calculateXpNeededForLvl}