import { User } from './src/users/user.entity';
console.log('halelujaa')
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
