import {Model, Types} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {Injectable} from "@nestjs/common";
import {Car, CarDocument} from "./car.model";
import {CarDistanceDto, CarIdDto, CarInputDto} from "./dto/car.dto";

@Injectable()
export class CarService {
    constructor(
        @InjectModel(Car.name) private carModel: Model<CarDocument>,
    ) {
    }

    async createCar(carDto: CarInputDto) {
        try {
            const addCar = new this.carModel({
                model: carDto.model,
                speed: carDto.speed
            });
            await addCar.save();
            return !!addCar;
        } catch (e) {
           return false;
        }
    }

    async getCarById(id: Types.ObjectId | string): Promise<Car | null> {
        return this.carModel.findOne({_id: id}).lean();
    }

    async getCarList(): Promise<Car[]> {
        return this.carModel.find().lean();
    }

    async deleteCar(carId: CarIdDto) {
        const result = await this.carModel.findOneAndDelete({
            _id: carId._id
        }).exec();
        return !! result;
    }

    async editCar(carDto: CarInputDto) {
        const upd: Partial<CarInputDto> = {};
        if (carDto._id) {
            const getCar = await this.getCarById(carDto._id);
            if (!!getCar) {
                if (carDto?.model?.length) {
                    upd.model = carDto.model;
                }
                if (!!carDto?.speed) {
                    upd.speed = carDto.speed;
                }
                if (Object.keys(upd).length > 0) {
                    const result = await this.carModel.findOneAndUpdate({
                        _id: carDto._id
                    }, {
                        $set: upd,
                    }).exec();
                    return !!result;
                }
            }
        }
        return false;
    }

    async calcTime(carDistanceInput: CarDistanceDto) {
        try {
            const getCar = await this.carModel.findOne({
                _id: carDistanceInput._id
            });
            if (getCar) {
                if (getCar.speed > 0) {
                    const time = carDistanceInput.distance / (getCar?.speed / 3600); // convert speed to km/sec and get time in seconds
                    return time.toFixed(1);//return with one digit after comma
                }
                throw new Error('Require speed value !');
            }
        } catch (e) {
            throw new Error(e.message);
        }

    }
}
