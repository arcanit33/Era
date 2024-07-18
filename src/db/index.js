const typeorm = require("typeorm")
const dataSourceConfig =  require("./data-source.config")

const dataSource = new typeorm.DataSource(dataSourceConfig)

module.exports = dataSource

    