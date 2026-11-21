import { IsEmail, IsOptional, IsString, MinLength, IsIn } from 'class-validator';

export class CreateClientDto {
  @IsString()
  @MinLength(1)
  name!: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  @IsString()
  notes?: string;
  
  @IsOptional()
  @IsString()
  edrpou?: string;

  @IsOptional()
  @IsIn(['active', 'lead', 'inactive'])
  status?: 'active' | 'lead' | 'inactive';
}