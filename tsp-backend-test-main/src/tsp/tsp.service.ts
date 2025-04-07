import { Injectable, NotImplementedException } from '@nestjs/common';
import { TspSolveResponseDto } from './dtos/response/solve.response.dto';
import { TspSolveRequestDto } from './dtos/request/solve.request.dto';
import { TspGenerateCitiesResponseDto } from './dtos/response/generate-cities.response.dto';
import { WorldGenerator } from './domain/world-generator/world-generator';
import { TspGenerateCitiesRequestDto } from './dtos/request/generate-cities.request.dto';
import { TSPSolver } from '../domain/tsp-solver/TSPSolver';
import { City } from '../domain/tsp-solver/City';

@Injectable()
export class TspService {
    solve(payload: TspSolveRequestDto): TspSolveResponseDto {
        const cities = payload.cities.map((city, index) => new City(index, city.x, city.y));
        const solver = new TSPSolver();
        const result = solver.solve(cities);

        return {
            route: result.route.map(city => ({ id: city.id, x: city.x, y: city.y })),
            totalDistance: result.totalDistance,
        };
    }

    generateCities(payload: TspGenerateCitiesRequestDto): TspGenerateCitiesResponseDto {
        const worldGenerator = new WorldGenerator(payload.numOfCities, {
            x: payload.worldBoundX,
            y: payload.worldBoundY,
        });

        const generated = worldGenerator.generateCities();

        const cities = generated.map((city, index) => ({
            id: index,
            x: city.x,
            y: city.y,
        }));

        return {
            cities,
        };
    }
}
