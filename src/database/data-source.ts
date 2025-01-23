import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

// Load environment variables based on NODE_ENV
const environment = process.env.NODE_ENV || 'development';
config({ path: `.env.${environment}` });

const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  username: 'root',
  password: 'root',
  database: 'ganotoon',
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['src/database/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV === 'development',
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
