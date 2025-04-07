import { Controller, Post, Body } from '@nestjs/common';
import { TspService } from '../../application/services/tsp.service';
import { SolveTspDto } from '../../application/dtos/solve-tsp.dto';
import { GenerateCitiesDto } from '../../application/dtos/generate-cities.dto';
import { TspResultDto } from '../../application/dtos/tsp-result.dto';

@Controller('api/tsp')
export class TspController {
  constructor(private readonly tspService: TspService) {}

  @Post('solve')
  solveTsp(@Body() solveTspDto: SolveTspDto): TspResultDto {
    return this.tspService.solveTsp(solveTspDto);
  }

  @Post('generate-cities')
  generateCities(@Body() generateCitiesDto: GenerateCitiesDto) {
    return this.tspService.generateCities(generateCitiesDto);
  }
}