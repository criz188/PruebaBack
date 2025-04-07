import { Injectable } from '@nestjs/common';
import { City } from '../../domain/models/city.model';
import { DistanceMatrix } from '../../domain/models/distance-matrix.model';
import { NearestNeighborSolver } from '../../domain/tsp-solver/nearest-neighbor-solver';
import { BruteForceSolver } from '../../domain/tsp-solver/brute-force-solver';
import { TspSolver } from '../../domain/tsp-solver/tsp-solver.interface';
import { CityGeneratorService } from '../../domain/services/city-generator.service';
import { DistanceCalculatorService } from '../../domain/services/distance-calculator.service';
import { SolveTspDto } from '../dtos/solve-tsp.dto';
import { GenerateCitiesDto } from '../dtos/generate-cities.dto';
import { TspResultDto } from '../dtos/tsp-result.dto';

@Injectable()
export class TspService {
  private solvers: Map<number, TspSolver>;

  constructor(
    private cityGeneratorService: CityGeneratorService,
    private distanceCalculatorService: DistanceCalculatorService
  ) {
    this.solvers = new Map();
    this.solvers.set(1, new NearestNeighborSolver());
    this.solvers.set(2, new BruteForceSolver());
    // Se pueden agregar más solucionadores aquí
  }

  solveTsp(dto: SolveTspDto): TspResultDto {
    const startTime = Date.now();
    
    // Convertir DTO a entidades del dominio
    const cities = dto.cities.map(c => new City(c.id, c.x, c.y, c.name));
    const distanceMatrix = this.distanceCalculatorService.calculateDistanceMatrix(cities);
    
    // Seleccionar algoritmo (por defecto: NearestNeighbor)
    const solverType = dto.algorithmType || 1;
    const solver = this.solvers.get(solverType);
    
    if (!solver) {
      throw new Error(`Solver type ${solverType} not found`);
    }
    
    // Resolver TSP
    const result = solver.solve(distanceMatrix);
    
    // Preparar respuesta
    const routeCities = result.route.map(index => cities[index]);
    
    const endTime = Date.now();
    
    return {
      route: routeCities,
      routeIndices: result.route,
      totalDistance: result.totalDistance,
      algorithmName: solver.getName(),
      executionTimeMs: endTime - startTime
    };
  }

  generateCities(dto: GenerateCitiesDto): {
    cities: City[];
    distanceMatrix: number[][];
  } {
    // Generar ciudades aleatorias
    const cities = this.cityGeneratorService.generateRandomCities(
      dto.count,
      dto.maxX || 100,
      dto.maxY || 100
    );
    
    // Calcular matriz de distancias
    const matrix = this.distanceCalculatorService.calculateDistanceMatrix(cities);
    
    return {
      cities,
      distanceMatrix: matrix.getMatrix()
    };
  }
}