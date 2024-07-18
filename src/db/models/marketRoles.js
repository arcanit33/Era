const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "MarketRoles", // Will use table name `category` as default behaviour.
    columns: {
        id: {
            type: 'uuid',
            primary: true,
            generated: 'uuid',
            unique: true,
            default: () => 'uuid_generate_v4()',
        },
        price: {
            type: 'integer',
            nullable: false,
        },
        monthlyPrice: {
            type: 'integer',
            nullable: false,
        },
        discordRoleId: {
            type: "varchar",
            unique: true,
        },
        name: {
            type: "varchar",
            unique: true,
        }
    },
})