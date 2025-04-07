import { DistanceMatrix } from '../models/distance-matrix.model';

export interface TspResult {
  route: number[];      // Índices de ciudades en el orden de la ruta
  totalDistance: number; // Distancia total de la ruta
}

export interface TspSolver {
  solve(distanceMatrix: DistanceMatrix): TspResult;
  getName(): string;
}