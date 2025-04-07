import { TspSolver, TspResult } from './tsp-solver.interface';
import { DistanceMatrix } from '../models/distance-matrix.model';

export abstract class BaseTspSolver implements TspSolver {
  abstract solve(distanceMatrix: DistanceMatrix): TspResult;
  abstract getName(): string;

  protected calculateTotalDistance(route: number[], distanceMatrix: DistanceMatrix): number {
    let totalDistance = 0;
    for (let i = 0; i < route.length - 1; i++) {
      totalDistance += distanceMatrix.getDistance(route[i], route[i + 1]);
    }
    // Añadir distancia de regreso al punto inicial
    totalDistance += distanceMatrix.getDistance(route[route.length - 1], route[0]);
    return totalDistance;
  }
}