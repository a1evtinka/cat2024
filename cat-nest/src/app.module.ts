import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { EventsModule } from './events/events.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UserModule, EventsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
