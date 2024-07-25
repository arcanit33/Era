const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "User", // Will use table name `category` as default behaviour.
    columns: {
        id: {
            type: 'uuid',
            primary: true,
            generated: 'uuid',
            unique: true,
            default: () => 'uuid_generate_v4()',
        },
        discordId: {
            type: "varchar",
            unique: true,
        },
        level: {
            type: 'integer',
            nullable: false,
            default: 1
        },
        xp: {
            type: 'float',
            nullable: false,
            default: 0
        },
        coins: {
            type: 'float',
            nullable: false,
            default: 0
        },
        joinedVoiceAt: {
            type: 'timestamp',
            nullable: true
        },
        inVoiceTime: {
            type: 'integer',
            nullable: false,
            default: 0
        }
    },
})