import { IsIn, IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateDealDto {
  @IsString()
  title!: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  amount?: number;

  @IsInt()
  clientId!: number;

  @IsInt()
  stageId!: number;

  @IsOptional()
  @IsIn(['OPEN', 'WON', 'LOST'])
  status?: 'OPEN' | 'WON' | 'LOST';
}