const dotenv = require('dotenv');
const entities = require('./entities')

dotenv.config();

const {DB_URL} = process.env

module.exports = {
    type: 'postgres',
    host: 'aws-0-eu-central-1.pooler.supabase.com',
    port: 6543,
    username: 'postgres.nygvpfhpffinzggxvsao',
    password: '7ivzJzK97vpq4okH',
    database: 'postgres',
    url: DB_URL,
    connectTimeoutMS: 5000,
    logging: true,
    synchronize: false,
    entities: Object.values(entities),
    migrations: ['./src/db/migrations/*.js'],
    migrationsTableName: 'migration',
    extra: {
      max: 10,
    },
  };