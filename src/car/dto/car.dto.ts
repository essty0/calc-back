import {IsMongoId, IsNumber, IsOptional, IsString, Length, Max, Min,} from "class-validator";

export class CarInputDto {
    @IsOptional()
    @IsMongoId()
    _id?: string;

    @IsString()
    @Length(0, 75)
    model?: string;

    @IsNumber()
    @Min(0)
    @Max(500)
    speed?: number;
}


export class CarIdDto {
    @IsMongoId()
    _id: string;
}

export class CarDistanceDto extends CarIdDto {
    @IsNumber()
    distance: number;
}
