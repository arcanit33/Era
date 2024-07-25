const { ActionRowBuilder, ButtonBuilder } = require('discord.js');

const setup2 = {
    groups: [
        { name: 'Купити роль', id: 'buyRole' },
        { name: 'Купити унікальну роль (25000 хмаринок)', id: 'buyCustomRole' },
    ]
}

const createMarketRow = async () =>{

    const length = setup2.groups.length
    const endIndex = length

    let tempButtonsRow = [];

        for (let i = 0; i < endIndex; i++) {
            let button = new ButtonBuilder()
                .setLabel(setup2.groups[i].name)
                .setCustomId(setup2.groups[i].id)
                .setStyle(1);
                tempButtonsRow.push(button)
        }


    return tempButtonsRow
}

const getItemsOnPage = async (items, page) => items.slice(((page - 1) * 5), ((page) * 5) )

const createButtonsRow = async (itemsOnPage, coinValue) =>{
    let tempButtonsRow = [];
    
        for (let i = 0; i < itemsOnPage.length; i++) {
            let button = new ButtonBuilder()
                .setLabel(`${i + 1}`)
                .setCustomId(itemsOnPage[i].id)

                coinValue > itemsOnPage[i].monthlyPrice ? button.setStyle(3).setDisabled(false) : button.setStyle(2).setDisabled(true)
                tempButtonsRow.push(button)
        }

    return tempButtonsRow
}

const createButtonShopRow = async (itemsOnPage, coinValue, interaction) =>{
    let tempButtonsRow = [];
    const userLevelRoles = interaction.member.roles.cache.filter( role => role.id === itemsOnPage.discordRoleId)
    
    let buttonForMonth = new ButtonBuilder()
    .setLabel(`Купити роль на місяць`)
    .setCustomId(`buttonForMonth`)

    coinValue >= itemsOnPage.monthlyPrice ? buttonForMonth.setStyle(3).setDisabled(false) : buttonForMonth.setStyle(2).setDisabled(true)
    userLevelRoles.size <= 0 ? buttonForMonth.setStyle(3).setDisabled(false) : buttonForMonth.setStyle(2).setDisabled(true)
   
    tempButtonsRow.push(buttonForMonth)

    let buttonForever = new ButtonBuilder()
    .setLabel(`Купити роль назавжди`)
    .setCustomId(`buttonForever`)

    coinValue >= itemsOnPage.price ? buttonForever.setStyle(3).setDisabled(false) : buttonForever.setStyle(2).setDisabled(true) 
    userLevelRoles.size <= 0 ? buttonForever.setStyle(3).setDisabled(false) : buttonForever.setStyle(2).setDisabled(true)
    tempButtonsRow.push(buttonForever)

    return tempButtonsRow
}

const createMainButtonsRow = async () =>{
    let tempButtonsRow = [];
    
    let buttonForShopingOption = new ButtonBuilder()
    .setLabel(`Ролі`)
    .setCustomId(`buttonForShopingOption`)
    .setStyle(1)   
    tempButtonsRow.push(buttonForShopingOption)

    let buttonForSponsors = new ButtonBuilder()
    .setLabel(`Стати спонсором`)
    .setCustomId(`buttonForSponsors`)
    .setStyle(1)   
    tempButtonsRow.push(buttonForSponsors)

    return tempButtonsRow
}

const createBackButton = async () =>{
    let tempButtonsRow = [];
    
    let buttonForShopingOption = new ButtonBuilder()
    .setLabel(`Назад`)
    .setCustomId(`buttonForMainMenu`)
    .setStyle(1)   
    tempButtonsRow.push(buttonForShopingOption)

    return tempButtonsRow
}

const createMarketRowBuilder =  (marketRow) =>{

    const marketSelectRow = new ActionRowBuilder().addComponents(marketRow)
    return [marketSelectRow]
}

const createActionRowBuilder =  (buttonsRow, pageRow) =>{

    const actionRow = new ActionRowBuilder().addComponents(buttonsRow)
    const pageActionRow = new ActionRowBuilder().addComponents(pageRow)
    return [actionRow, pageActionRow]
}

const createNavigationMarketButtons = async (curPage) =>{
    
    let tempButtonsRow = [];

    let button1 = new ButtonBuilder()
                .setEmoji('⬅️')
                .setCustomId('arrow_left')
                .setStyle(1);
                tempButtonsRow.push(button1)

    let button2 = new ButtonBuilder()
                .setLabel('Home')
                .setCustomId('home')
                .setStyle(1);
                tempButtonsRow.push(button2)
    let button3 = new ButtonBuilder()
                .setEmoji('➡️')
                .setCustomId('arrow_right')
                .setStyle(1);
                tempButtonsRow.push(button3)

    if (curPage === 1) {
        button1.setDisabled(true)
    }

    return tempButtonsRow
}

const createNavigationMarketButtonsForSales = async () =>{
    
    let tempButtonsRow = [];

    let button1 = new ButtonBuilder()
                .setLabel('Повернутися до списку ролей')
                .setCustomId('backButton')
                .setStyle(1);
                tempButtonsRow.push(button1)

    return tempButtonsRow
}

const getImbedetRolsMenu = async (itemsOnPage, interaction) => {
        let description = ``
        // console.log(itemsOnPage)
        description = itemsOnPage.map((i, index) => {
            let usersWithRole = interaction.guild.members.cache.filter(member => member.roles.cache.has(i.discordRoleId));
           return `**#${index + 1}** Роль <@&${i.discordRoleId}>\n> Ціна: ${i.monthlyPrice} місяць/${i.price} назавжди\n> Користувачів з цією роллю: ${usersWithRole.size}\n\n `    
        }).join(' ')
        return description
}

module.exports = {createNavigationMarketButtonsForSales, createButtonsRow, createNavigationMarketButtons, createActionRowBuilder, createMarketRow, createMarketRowBuilder, getItemsOnPage, getImbedetRolsMenu, createButtonShopRow, createMainButtonsRow, createBackButton}