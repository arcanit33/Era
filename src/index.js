const cron = require('node-cron');
const dotenv = require('dotenv');
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const dataSource = require('./db/index')
const {rolesForServerBoosters} = require('./data/roles');
const { In, Not } = require('typeorm');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildPresences]});

dotenv.config();

client.commands = new Collection();
const {token, guildId, MODE} = process.env

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);


dataSource.initialize().then(_ => console.log("Database connection established")).catch((error) => console.log(error));

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// cron.schedule('0 0 * * *', async function() {
// // cron.schedule('* * * * *', async function() {
// 		const guild = await client.guilds.fetch(guildId)
//         const members = await guild.members.fetch()

//         const userTempRoleRepo = dataSource.getRepository("UserTempRoles")
//         const userTempRoles = await userTempRoleRepo.find()

// 		userTempRoles.forEach( async tempRole => {
// 			const shouldBeDeleted = (new Date().getTime() - (new Date(tempRole.validBy)).getTime()) > 0
// 			if (shouldBeDeleted) {
// 				const member = await guild.members.fetch(tempRole.memmberId)
// 				const role =  await guild.roles.fetch(tempRole.roleId)
// 				await member.roles.remove(role)
// 				await userTempRoleRepo.delete({id: tempRole.id})
// 			}
// 		})

// 		const membersWithoutBoost = members.filter( member => !member.premiumSince)

// 		try {
// 		const s = await Promise.all(membersWithoutBoost.map( member =>  {
// 			const rolesToDelete = member.roles.cache.filter((role) => rolesForServerBoosters.includes(role.id))
// 			return member.roles.remove(rolesToDelete)
// 		}))
// 	} catch (e) {
// 		console.log(e)
// 	}
// });



const onStart  = async () => {
	const guild = await client.guilds.fetch(guildId)
	const members = await guild.members.fetch()
	const onlineUsers =  members.filter(member => member.voice.channelId)

	const userRepo = dataSource.getRepository("User")

	const users = await userRepo.find({where: {discordId: In(onlineUsers.map( x=> x.user.id))}})
	const offlineUsers = await userRepo.find({where: {discordId: Not(In(onlineUsers.map( x=> x.user.id)))}})
	
	await userRepo.update({id: In(offlineUsers.map( x => x.id))}, {joinedVoiceAt: null})

	users.forEach( async x => {
		if (!x.joinedVoiceAt) await userRepo.update(x.id, {joinedVoiceAt: new Date()})
	})
} 



// Log in to Discord with your client's token
client.login(token).then( (_) => {
	if (MODE !== 'DEV') onStart()
});