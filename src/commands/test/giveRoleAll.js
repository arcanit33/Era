// const { SlashCommandBuilder } = require('discord.js');
// const dataSource = require('../../db/index')
// const {calculateXpNeededForLvl} = require('../../modules/levelingSystem')


// module.exports = {
// 	data: new SlashCommandBuilder()
// 		.setName('roleall')
// 		.setDescription('Gives specified role to each server member')
//         .addRoleOption(option =>
//             option.setName('roletag')
//                 .setDescription('tag of role you want to assign to everybody')
//                 .setRequired(true)),
// 	async execute(interaction) {
// 		try  {
// 			await interaction.deferReply()
//             const roleParam = interaction.options.getRole('roletag');
// 			const s = await interaction.guild.members.fetch()
// 			await new Promise(r => setTimeout(r, 1000));

// 			const users = s.filter( x=> !x.user.bot)

// 			Promise.all(Array.from(users).map( async (x, i) => {

// 				if (x[1].roles.cache.find(x => x.id === roleParam.id)) {
// 					console.log('already', x[1].user.username)
// 				} else {

// 					console.log(x[1].user.username)
// 					return (async () => {
// 						await new Promise(r => setTimeout(r, 3000));
// 						await x[1].roles.add(roleParam)
// 					})()
// 				}
// 			})).then( () => {
// 				interaction.editReply('All roles assigned!');
// 			})


// 		} catch (e) {
// 			console.log(e)
// 		}
// 	},
// };