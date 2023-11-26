import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ApiController } from './api/api.controller';
import { ApiService } from './api/api.service';
import { ApiModule } from './api/api.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsUniqueConstraint } from './util/validators';
import { User } from './users/user.entity';

@Module({
  controllers: [AppController, ApiController],
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot(),
    // @ts-ignore
    TypeOrmModule.forRoot({
      database: 'dmarket',
      entities: [User],
      host: '127.0.0.1',
      username: 'root',
      password: '',
      port: 3306,
      synchronize: false,
      type: 'mysql',
    }),
    ApiModule,
  ],
  providers: [AppService, ApiService, IsUniqueConstraint],
})
export class AppModule {}
