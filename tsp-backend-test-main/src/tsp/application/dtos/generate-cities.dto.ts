import { IsNumber, IsOptional, Min, Max } from 'class-validator';

export class GenerateCitiesDto {
  @IsNumber()
  @Min(3)
  @Max(100)
  count: number;

  @IsOptional()
  @IsNumber()
  @Min(10)
  maxX?: number;

  @IsOptional()
  @IsNumber()
  @Min(10)
  maxY?: number;
}