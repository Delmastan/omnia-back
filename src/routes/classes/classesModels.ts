import { IsString, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

// Définir les classes auxiliaires avant de les utiliser
export class Name {
  @IsString()
  fr: string;

  @IsString()
  en: string;
}

export class Description {
  @IsString()
  fr: string;

  @IsString()
  en: string;
}

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
