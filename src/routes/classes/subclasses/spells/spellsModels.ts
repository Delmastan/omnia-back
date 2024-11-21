import { IsString, IsOptional, IsArray, IsObject, ValidateNested, IsBoolean, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { Description, Name } from 'src/config/commonModel';

export class SpellsModel {
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
    @IsOptional()
    difficulty?: string;

    @IsString()
    @IsOptional()
    cost?: string;

    @IsString()
    action: string;

    @IsBoolean()
    locked: boolean;

    @IsNumber()
    value: number;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    unlockedSpells?: string[];

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    lockedSpells?: string[];

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    linkedSpells?: string[];
}
