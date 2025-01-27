import {Controller} from "@nestjs/common";
import {CarService} from "./car.service";

@Controller('car')
export class CarController {
    constructor(private readonly guideService: CarService) {}

    /*@Get()
    findAll() {
      return this.guideService.findAll();
    }*/
}
