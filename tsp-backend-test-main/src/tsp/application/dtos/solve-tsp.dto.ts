import { IsArray, ValidateNested, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class CityDto {
  @IsNumber()
  id: number;

  @IsNumber()
  x: number;

  @IsNumber()
  y: number;

  @IsOptional()
  name?: string;
}

export class SolveTspDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CityDto)
  cities: CityDto[];

  @IsOptional()
  @IsArray()
  distanceMatrix?: number[][];

  @IsOptional()
  @IsNumber()
  algorithmType?: number; // 1: NearestNeighbor, 2: BruteForce, 3: GeneticAlgorithm
}