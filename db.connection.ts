import { DataSource } from 'typeorm';
import { User } from './src/users/user.entity';

export default new DataSource({
  database: 'dmarket',
  entities: [User],
  host: '127.0.0.1',
  username: 'root',
  password: '',
  port: 3306,
  synchronize: false,
  type: 'mysql',
});
