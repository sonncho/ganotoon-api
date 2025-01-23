import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

// Load environment variables based on NODE_ENV
const environment = process.env.NODE_ENV || 'development';
config({ path: `.env.${environment}` });

const dataSourceOptions: DataSourceOptions = {
  type: process.env.DB_TYPE as 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['src/database/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV === 'development',
  timezone: '+09:00',
  charset: 'utf8mb4',
  poolSize: parseInt(process.env.DB_POOL_SIZE, 10) || 10,
  connectTimeout: 20000,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
