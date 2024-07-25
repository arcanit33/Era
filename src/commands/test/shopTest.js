// const { SlashCommandBuilder, TextInputStyle, ActionRowBuilder, ComponentType, ModalBuilder, TextInputBuilder  } = require('discord.js');

// const {createNavigationMarketButtonsForSales, createButtonsRow, createButtonShopRow, createNavigationMarketButtons, createActionRowBuilder, setup, createMarketRow, createMarketRowBuilder, getItemsOnPage, getImbedetRolsMenu, createMainButtonsRow, createBackButton} = require('../../modules/marketConceptMenu');
// const dataSource = require('../../db/index')


// module.exports = {
// 	data: new SlashCommandBuilder()
// 		.setName('market')
// 		.setDescription('shop panel'),
// 	async execute(interaction) {

//         try {
//             const marketRolesRepo = dataSource.getRepository("MarketRoles")
//             const marketRoles = await marketRolesRepo.find()

//             const UserTempRolesRepo = dataSource.getRepository("UserTempRoles")

//             const userRepo = dataSource.getRepository("User")
//             const user = await userRepo.findOne({where: {discordId: interaction.member.user.id}})
//             const value = user.coins

//             let selectedRole
//             const startUrl = "https://media.discordapp.net/attachments/1180623267233550447/1197201512221376602/file-UqHIaiuljGZ2qeU2XHCd4tHK.png?ex=65ba67cb&is=65a7f2cb&hm=722d755267949073960cdc0482a5fb873687bbeb6b4e822219e97de9d09830ec&format=webp&quality=lossless&width=672&height=672&"

//             let curPage = 1
            
//             let itemsOnPage = await getItemsOnPage(marketRoles, curPage)
//             const marketRow = await createMarketRow()
//             let buttonsRow = await createButtonsRow(itemsOnPage, value)
//             const pageRow = await createNavigationMarketButtons(1)
//             const backButton = await createBackButton()
//             const mainRow = await createMainButtonsRow()
            
            

//             const components =  createMarketRowBuilder(mainRow)
//             const startEmbeds = [
//                 {
//                 description: `Вітаємо вас в clouds shop`,
//                 color: 14408667,
//                 image: {
//                 url: startUrl
//                         }
//                 }
//                      ]
// 	        const reply = await interaction.reply({
//                 embeds: startEmbeds,
//                 ephemeral: true,
//                 components})
            
//             const collector = reply.createMessageComponentCollector({
//                 componentType: ComponentType.Button,
//                 filter: (i) => i.user.id === interaction.user.id,
//                 time: 300_000
//             }) 
            
//             collector.on('collect', async (interaction) => {

//                 if (interaction.customId === 'buyCustomRole') {
                    
//                     const modal = new ModalBuilder()
//                     .setCustomId('createRoleRequestModal')
//                     .setTitle('Деталі ролі')

//                     const roleInput = new TextInputBuilder()
//                     .setCustomId('customRoleInput')
//                     .setLabel("Введіть назву ролі яку ви хочете створити")
//                     .setRequired(true)
//                     .setStyle(TextInputStyle.Short);

//                     const colorHexInput = new TextInputBuilder()
//                     .setCustomId('colorHexInput')
//                     .setLabel("Введіть HEX код кольору ролі ( #9d03fc )")
//                     .setRequired(true)
//                     .setStyle(TextInputStyle.Short)

//                     const emojiInput = new TextInputBuilder()
//                     .setCustomId('emojiInput')
//                     .setLabel("Введіть код емоджі ( + 5000 хмаринок)")
//                     .setRequired(false)
//                     .setStyle(TextInputStyle.Short)

//                     const firstActionRow = new ActionRowBuilder().addComponents(roleInput);
//                     const secondActionRow = new ActionRowBuilder().addComponents(colorHexInput);
//                     const thirdActionRow = new ActionRowBuilder().addComponents(emojiInput);
                    
//                     modal.addComponents([firstActionRow, secondActionRow, thirdActionRow]);
//                     await interaction.showModal(modal);
//                     return
//             }

            
//             interaction.deferUpdate()
//             let updatedComponents
//             let descriptionContent

            
//             if (interaction.customId === 'buyRole') {
//                 curPage = 1
//                 url = "https://cdn.discordapp.com/attachments/1053968251991896066/1058661855914102854/whiteline.gif?ex=65b4bdaf&is=65a248af&hm=d4f69d94e1be73c637d693876240900d7c26152fb027b9b768fe159677618e87&"

//             }
//             if (interaction.customId === 'arrow_left') {
//                 curPage--
//             }
//             if (interaction.customId === 'home') {
//                 curPage = 0
//                 updatedComponents = createActionRowBuilder(marketRow, backButton)
//                 descriptionContent = ":shopping_cart: Магазин \n```Оберіть категорію```" 

//             } 
//             if (interaction.customId === 'arrow_right') {
//                 curPage++
//             }
//             if (interaction.customId === 'backButton') {
//                 descriptionContent = ":shopping_cart: Магазин \n```Оберіть категорію```" 
//                 curPage = 1
//             }

//             if (interaction.customId === 'buttonForever') {
//                 curPage = 1

//                 const customRole= interaction.guild.roles.cache.find(role => role.id === selectedRole.discordRoleId)
//                 const member = await interaction.guild.members.fetch(interaction.user.id)
//                 member.roles.add(customRole)
//                 userRepo.update({discordId: user.discordId }, {coins: user.coins - selectedRole.price })
                
//             }

//             if (interaction.customId === 'buttonForShopingOption') {
//                 curPage = 0 
//                 descriptionContent = ":shopping_cart: Магазин \n```Оберіть категорію```" 
//                 url = "https://cdn.discordapp.com/attachments/1053968251991896066/1058661855914102854/whiteline.gif?ex=65b4bdaf&is=65a248af&hm=d4f69d94e1be73c637d693876240900d7c26152fb027b9b768fe159677618e87&"
//                 updatedComponents = createActionRowBuilder(marketRow, backButton)
//             }

//             if (interaction.customId === 'buttonForMainMenu') {
//                 curPage = 0  
//                 descriptionContent = "Вітаємо вас в clouds shop" 
//                 url = "https://media.discordapp.net/attachments/1180623267233550447/1197201512221376602/file-UqHIaiuljGZ2qeU2XHCd4tHK.png?ex=65ba67cb&is=65a7f2cb&hm=722d755267949073960cdc0482a5fb873687bbeb6b4e822219e97de9d09830ec&format=webp&quality=lossless&width=672&height=672&"
//                 updatedComponents = createMarketRowBuilder(mainRow)
//             }

//             if (interaction.customId === 'buttonForSponsors') {
//                 curPage = 0
//                 descriptionContent = `💰 Спонсор магазин\n\n**1#** Власна роль\n> • Можливість створення кастомної ролі на сервері\n\n**ЦІНА: 100ГРН/НАЗАВЖДИ**\n\`\`\` \`\`\`\n**2<@&1197264019246022746>**\n> • Відображення вашої ролі вище, ніж у звичайних користувачів;\n> • 2х досвід та хмаринки\n\n**ЦІНА: 300 ГРН/МІСЯЦЬ | 1250 ГРН/НАЗАВЖДИ**\n\`\`\` \`\`\`\n**3<@&1197264109188690030>**\n> • Можна мутити та анмутити, але тільки за правилами сервера\n> • Можливість заходити в переповнені канали\n> • Абсолютне значення на сервері\n> • 3х досвід та хмаринки \n\n**ЦІНА: 600 ГРН/МІСЯЦЬ | 1600 ГРН/НАЗАВЖДИ** \n Для купівлі пишіть <@488334219756437504>`
//                 url = "https://cdn.discordapp.com/attachments/1053968251991896066/1058661855914102854/whiteline.gif?ex=65b4bdaf&is=65a248af&hm=d4f69d94e1be73c637d693876240900d7c26152fb027b9b768fe159677618e87&"
//                 updatedComponents = createMarketRowBuilder(backButton)
//             }


//             if (interaction.customId === 'buttonForMonth') {
//                 curPage = 1

//                 const date = new Date();
//                 date.setMonth(date.getMonth() + 1)

//                 const customRole= interaction.guild.roles.cache.find(role => role.id === selectedRole.discordRoleId)
//                 const member = await interaction.guild.members.fetch(interaction.user.id)
//                 user.coins - selectedRole.price
                
//                 member.roles.add(customRole)
                
//                 await userRepo.update({discordId: user.discordId }, {coins: user.coins - selectedRole.monthlyPrice })
//                 const newUserTempRoles =  await UserTempRolesRepo.create({validBy: date, roleId: selectedRole.discordRoleId, memmberId: user.discordId})
//                 await UserTempRolesRepo.save(newUserTempRoles)
//             }

//             if (curPage !== 0) {
//                 itemsOnPage = await getItemsOnPage(marketRoles, curPage)
//                 buttonsRow = await createButtonsRow(itemsOnPage, value)
//                 updatedComponents = createActionRowBuilder(buttonsRow, pageRow)
//                 descriptionContent = `:shopping_cart: Магазин ролей \n\n${await getImbedetRolsMenu(itemsOnPage, interaction)}`

//                 curPage === 1 ? updatedComponents[1].components[0].setDisabled(true) : updatedComponents[1].components[0].setDisabled(false)
//                 curPage === Math.ceil(marketRoles.length / 5) ? updatedComponents[1].components[2].setDisabled(true) : updatedComponents[1].components[2].setDisabled(false)
//             }
            
//             if (itemsOnPage.find(item => item.id === interaction.customId)) {

//                 curPage = 0
//                 const tempRole = []
//                 selectedRole = itemsOnPage.find(item => item.id === interaction.customId)
                
//                 tempRole.push(selectedRole)
//                 descriptionContent = `Обрана роль: \n\n${await getImbedetRolsMenu(tempRole, interaction)}`
//                 buttonsRow = await createButtonShopRow(selectedRole, value, interaction)
//                 const nawShopButton = await createNavigationMarketButtonsForSales()

//                 updatedComponents = createActionRowBuilder(buttonsRow, nawShopButton)

//             }
//             let embeds = [
//                 {
//                 description: descriptionContent,
//                 color: 14408667,
//                 image: {
//                 url: url
//                         }
//                 }
//                      ]

          
//             reply.edit({
//                 ephemeral: true,
//                 content: null,
//                 embeds: descriptionContent === startEmbeds ? [] : embeds ,
//             attachments: [],
//                 components: updatedComponents
//              })
//         })
        
//         } catch (e) {
//             console.log(e)
//         }  
// 	},
// };