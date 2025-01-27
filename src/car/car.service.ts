import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {Injectable} from "@nestjs/common";
import {Car, CarDocument} from "./car.model";

@Injectable()
export class CarService {
    constructor(
        @InjectModel(Car.name) private carModel: Model<CarDocument>,
    ) {
    }

}
