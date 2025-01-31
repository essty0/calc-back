import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {CarModule} from "./car/car.module";
import * as process from "process";

@Module({
  imports: [
      MongooseModule.forRoot(process.env.MONGO_URI as string),
      CarModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
