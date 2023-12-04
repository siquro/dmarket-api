import { User } from './src/users/user.entity';
export const databaseConfig = {
  database: 'dmarket',
  entities: [User],
  host: 'localhost',
  password: '',
  port: 3306,
  synchronize: false,
  type: 'mysql',
  username: 'root',
};
