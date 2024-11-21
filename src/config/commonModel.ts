import { IsString } from 'class-validator';

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
