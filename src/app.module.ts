import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {CarModule} from "./car/car.module";

@Module({
  imports: [
      MongooseModule.forRoot('mongodb+srv://essty:%PASS%@cluster0.mfcr1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/cars'),
      CarModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
