import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { RegisterModule } from './api/register/register.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      // 'mongodb://dumby:eHj7zfizoS4xKTnm@ac-gqkb7qc-shard-00-00.zyiv6nm.mongodb.net:27017,ac-gqkb7qc-shard-00-01.zyiv6nm.mongodb.net:27017,ac-gqkb7qc-shard-00-02.zyiv6nm.mongodb.net:27017/?ssl=true&replicaSet=atlas-slfcc9-shard-0&authSource=admin&retryWrites=true&w=majority',
      'mongodb+srv://dumby:eHj7zfizoS4xKTnm@cluster0.zyiv6nm.mongodb.net/you-app?retryWrites=true&w=majority',
    ),
    UsersModule,
    RegisterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
