import { BaseTspSolver } from './base-tsp-solver';
import { TspResult } from './tsp-solver.interface';
import { DistanceMatrix } from '../models/distance-matrix.model';

export class BruteForceSolver extends BaseTspSolver {
  solve(distanceMatrix: DistanceMatrix): TspResult {
    if (distanceMatrix.size() > 11) {
      throw new Error('Brute force algorithm is too slow for more than 10 cities');
    }

    const cities = Array.from({ length: distanceMatrix.size() }, (_, i) => i);
    // Mantener ciudad 0 como punto de inicio
    const startCity = cities.shift() as number;
    
    const permutations = this.generatePermutations(cities);
    let bestRoute: number[] = [];
    let minDistance = Infinity;

    for (const perm of permutations) {
      // Añadir ciudad de inicio al principio
      const route = [startCity, ...perm];
      const distance = this.calculateTotalDistance(route, distanceMatrix);
      
      if (distance < minDistance) {
        minDistance = distance;
        bestRoute = route;
      }
    }

    return {
      route: bestRoute,
      totalDistance: minDistance
    };
  }

  private generatePermutations(arr: number[]): number[][] {
    if (arr.length <= 1) return [arr];
    
    const result: number[][] = [];
    
    for (let i = 0; i < arr.length; i++) {
      const current = arr[i];
      const remaining = [...arr.slice(0, i), ...arr.slice(i + 1)];
      const permutationsOfRemaining = this.generatePermutations(remaining);
      
      for (const perm of permutationsOfRemaining) {
        result.push([current, ...perm]);
      }
    }
    
    return result;
  }

  getName(): string {
    return 'Brute Force Algorithm (Optimal)';
  }
}