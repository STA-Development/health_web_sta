import {createConnection} from 'typeorm'

export default async function connectToMysql() {
  try {
    const connection = await createConnection({
      host: process.env.DB_SQL_HOST || '127.0.0.1',
      port: Number(process.env.DEV_SQL_PORT),
      type: 'mysql',
      database: process.env.DB_SQL_NAME,
      username: process.env.DB_SQL_USERNAME,
      password: process.env.DB_SQL_PASSWORD,
      synchronize: false,
      logging: ['warn', 'error'],
    })

    console.log('DB connection established')

    return connection
  } catch (error) {
    console.error('No connection to SQL database')
    console.error(error)
  }
}
