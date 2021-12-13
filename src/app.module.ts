import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://alvannwanorim:alvan2327@cluster0.6woy5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    ),
    AuthModule,
  ],
})
export class AppModule {}
