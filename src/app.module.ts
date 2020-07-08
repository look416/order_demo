import { Module } from '@nestjs/common';
import { FaunadbModuleOptions, FaunadbModule } from 'nestjs-faunadb';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderModule } from './order/order.module';
import { ScheduleModule } from '@nestjs/schedule';

// initialize for FaunaDB
const fdbConfig: FaunadbModuleOptions = {
  secret: process.env.fauna_key,
};

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.mongo_user}:${process.env.mongo_secret}@cluster0.bd107.mongodb.net/${process.env.mongo_db}?retryWrites=true&w=majority`,
    ),
    FaunadbModule.forRoot(fdbConfig),
    AuthModule,
    UsersModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
