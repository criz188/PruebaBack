import { Body, Controller, Post } from '@nestjs/common';
import { TspService } from '../tsp.service';
import { SolveTspDto } from '../dtos/response/solve.response.dto';
import { GenerateCitiesDto } from '../dto/generate-cities.dto';
import { City } from '../domain/tsp-solver/City';

@Controller('api/tsp')
export class TspController {
  constructor(private readonly tspService: TspService) {}

  @Post('generate-cities')
  generate(@Body() dto: GenerateCitiesDto) {
    const cities = this.tspService.generateCities(dto.count);
    return { cities };
  }

  @Post('solve')
  solve(@Body() dto: SolveTspDto) {
    const cities = dto.cities.map((c) => new City(c.id, c.x, c.y));
    const result = this.tspService.solveTsp(cities);
    return {
      route: result.route,
      totalDistance: result.totalDistance.toFixed(2),
    };
  }
}
