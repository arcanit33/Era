const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "UserTempRoles", // Will use table name `category` as default behaviour.
    columns: {
        id: {
            type: 'uuid',
            primary: true,
            generated: 'uuid',
            unique: true,
            default: () => 'uuid_generate_v4()',
        },
        validBy: {
            type: 'timestamp',
            nullable: false
        },
        roleId: {
            type: "varchar",
            nullable: false,
        },
        memmberId: {
            type: "varchar",
            nullable: false
        }
    },
})