const VOICE_MANAGER_GROUP_TYPE = {
    SAME: 'SAME',
    NUMERIC: 'NUMERIC'
  };

const setup = {
    groups: [
        {
            type: VOICE_MANAGER_GROUP_TYPE.SAME,
            namingConvention: "│🎧│Дуо",
            baseChannelCount: 2
        },
        {
            type: VOICE_MANAGER_GROUP_TYPE.SAME,
            namingConvention: "│🎧│Тріо",
            baseChannelCount: 2
        },
        {
            type: VOICE_MANAGER_GROUP_TYPE.NUMERIC,
            namingConvention: '💢 VALORANT ',
            baseChannelCount: 5
        }
        // {
        //     type: VOICE_MANAGER_GROUP_TYPE.NUMERIC,
        //     namingConvention: '🔥 Counter Strike ',
        //     baseChannelCount: 5
        // }
    ]
}

const sameCheck = (x, convention) => x === convention
const numericCheck = (x, convention) => !isNaN(Number(x.split(convention).join('')))

const create = async (group, currentState, curCategoryChannel) =>{

    const numberOfVoiceChannels = curCategoryChannel.children.cache.filter( (c) => c.type === 2 && filterGroupChannels(c.name, group)).size
    switch(group.type) {
        case VOICE_MANAGER_GROUP_TYPE.SAME: 
            const newChannelSame = await currentState.channel.clone()   
            await newChannelSame.setPosition(currentState.channel.position + 1)
            break
        case VOICE_MANAGER_GROUP_TYPE.NUMERIC:
            const newChannelNumeric= await currentState.channel.clone()
            await newChannelNumeric.setPosition(currentState.channel.position + 1)
            await newChannelNumeric.setName(group.namingConvention + `${numberOfVoiceChannels + 1}`)
            break
        default:
            break
    }
}

const shouldAddNewChannel = async (group, curCategoryChannel) => {
    return curCategoryChannel.children.cache.filter( (c) => c.type === 2 && filterGroupChannels(c.name, group) && c.members.size === 0).size === 0
}

const filterOutBaseNumericChannels = (channelName, group) => {
    const channelNumber = Number(channelName.split(group.namingConvention).join(''))
    const s=  isNaN(channelNumber) ? false : channelNumber <= group.baseChannelCount ? false : true
    return s
}

const sortNumericChannels = (a, b, namingConvention) => {
    return Number(b.name.split(namingConvention).join('')) - Number(a.name.split(namingConvention).join(''))
}

const shouldRemoveChannel = async (group, prevCategoryChannel) => {
    const groupChannels = prevCategoryChannel.children.cache.filter( (c) => c.type === 2 && filterGroupChannels(c.name, group))
    const emptyChannels =  groupChannels.filter( c => c.members.size === 0)
    const emptyBaseChannels = emptyChannels.filter( (c) => !filterOutBaseNumericChannels(c.name, group))
    const emptyNotBaseChannels = emptyChannels.filter( (c) => filterOutBaseNumericChannels(c.name, group)) 

    switch(group.type) {
        case VOICE_MANAGER_GROUP_TYPE.SAME: 
            return groupChannels.size === group.baseChannelCount ? false : emptyChannels.size > 1 ? [...emptyChannels.values()].slice(0, emptyChannels.size - 1) : false
        case VOICE_MANAGER_GROUP_TYPE.NUMERIC:
            const isEmptyBaseChannels = emptyBaseChannels.size > 0
            const isMoreThanOneEmptyChannel = emptyNotBaseChannels.size > 1
            return isEmptyBaseChannels ? emptyNotBaseChannels : isMoreThanOneEmptyChannel ? [...emptyNotBaseChannels.values()].sort((a, b) => sortNumericChannels(a, b, group.namingConvention)).slice(0, emptyNotBaseChannels.size - 1) : false
        default:
            return false
    }
}

const filterGroupChannels = (channelName, group) => {
        switch(group.type) {
            case VOICE_MANAGER_GROUP_TYPE.SAME:
                return sameCheck(channelName, group.namingConvention)
            case VOICE_MANAGER_GROUP_TYPE.NUMERIC:
                return numericCheck(channelName, group.namingConvention)
            default:
                return false
        }
}

const remove = async (channelsToRemove) =>{
    await Promise.all(channelsToRemove.map( c => {
            return c.delete()            
    }))
}

const getAutomaticManagementGroups = (prevState, curState) => { 
    const isCurChannel = curState.channel
    const isPrevChannel = prevState.channel
    const data = setup.groups.reduce((acc, group) => {
        const isPrevChannelGroup = isPrevChannel && filterGroupChannels(prevState.channel.name, group)
        const isCurChannelGroup = isCurChannel && filterGroupChannels(curState.channel.name, group)
        const updatedAcc = {prev: isPrevChannelGroup ? group : acc.prev, cur: isCurChannelGroup ? group: acc.cur}
        return updatedAcc
    }, {prev: null, cur: null})

    return data
}

module.exports = {getAutomaticManagementGroups, setup, create, remove, shouldAddNewChannel, shouldRemoveChannel}