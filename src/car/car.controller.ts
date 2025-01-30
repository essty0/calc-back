import {Body, Controller, Get, Post} from "@nestjs/common";
import {CarService} from "./car.service";
import {CarDistanceDto, CarIdDto, CarInputDto} from "./dto/car.dto";

@Controller('car')
export class CarController {
    constructor(private readonly carService: CarService) {}

    @Post('create')
    async create(@Body() carDto: CarInputDto) {
        return await this.carService.createCar(carDto);
    }

    @Post('edit')
    async edit(@Body() carDto: CarInputDto) {
        return await this.carService.editCar(carDto);
    }

    @Post('delete')
    async delete(@Body() carIdDto: CarIdDto) {
        return await this.carService.deleteCar(carIdDto);
    }

    @Post('calc')
    async calcTime(@Body() carDistanceInput: CarDistanceDto) {
        return this.carService.calcTime(carDistanceInput);
    }

    @Get('car-list')
    async getCarList() {
        return this.carService.getCarList();
    }
}
