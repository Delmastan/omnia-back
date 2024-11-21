import { IsString, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Description, Name } from 'src/config/commonModel';

export class ClassesModel {
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
}
