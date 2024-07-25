const { Events } = require('discord.js');
const { getAutomaticManagementGroups, create, remove, shouldAddNewChannel, shouldRemoveChannel} = require('../modules/automaticVoiceChannelManagement');
const {updateLvlXpOnVoiceLeave} = require('../modules/levelingSystem')


module.exports = {
        name: Events.VoiceStateUpdate,
        async execute(previousState, currentState) {
               try {
                    updateLvlXpOnVoiceLeave(previousState, currentState)
                    const data = getAutomaticManagementGroups(previousState, currentState)
                    
                    const curCategoryChannel = currentState.channel && await currentState.client.channels.cache.get(currentState.channel.parentId)
                    const prevCategoryChannel = previousState.channel && await previousState.client.channels.cache.get(previousState.channel.parentId)

                    console.log("hui")

                    if (!data.prev && data.cur){
                         const shouldAddChannel = await shouldAddNewChannel(data.cur, curCategoryChannel)
                         shouldAddChannel && await create(data.cur, currentState, curCategoryChannel)
                    } else if (!data.cur && data.prev) {
                         const channelsToRemove = await shouldRemoveChannel(data.prev, prevCategoryChannel)

                         channelsToRemove && remove(channelsToRemove)
                    } else if (data.cur && data.prev) {
                         const channelsToRemove = await shouldRemoveChannel(data.prev, prevCategoryChannel)
                         const shouldAddChannel = await shouldAddNewChannel(data.cur, curCategoryChannel)
                         shouldAddChannel && await create(data.cur, currentState, curCategoryChannel)
                         channelsToRemove && await remove(channelsToRemove)
                    }
               } catch (e) {
                    console.log(e)
               }
        },
};