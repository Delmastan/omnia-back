import { IsString, IsOptional, IsArray, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Description, Name } from 'src/config/commonModel';

export class SubclassesModel {
    @IsString()
    ref: string;

    @IsObject()
    @ValidateNested()
    @Type(() => Name)
    name: Name;

    @IsObject()
    @ValidateNested()
    @Type(() => Description)
    description: Description;

    @IsString()
    image: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    evolve?: string[];
}
