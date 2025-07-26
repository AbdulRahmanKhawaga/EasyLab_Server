import { IsString, IsDate, IsEnum, IsOptional, IsEmail, Length, IsPhoneNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePatientDto {
  @IsString()
  @Length(1, 100)
  first_name: string;

  @IsString()
  @Length(1, 100)
  last_name: string;

  @IsDate()
  @Type(() => Date)
  date_of_birth: Date;

  @IsEnum(['Male', 'Female'])
  gender: 'Male' | 'Female';

  @IsPhoneNumber(undefined) // or use @Length(7, 15) if regional
  phone: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsString()
  address: string;

  @IsString()
  national_id: string;
}
