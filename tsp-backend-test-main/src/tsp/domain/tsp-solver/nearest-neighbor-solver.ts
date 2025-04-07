import { BaseTspSolver } from './base-tsp-solver';
import { TspResult } from './tsp-solver.interface';
import { DistanceMatrix } from '../models/distance-matrix.model';

export class NearestNeighborSolver extends BaseTspSolver {
  solve(distanceMatrix: DistanceMatrix): TspResult {
    const n = distanceMatrix.size();
    const visited = new Array(n).fill(false);
    const route: number[] = [];
    
    // Empezar desde la ciudad 0
    let currentCity = 0;
    route.push(currentCity);
    visited[currentCity] = true;

    // Encontrar la ciudad más cercana no visitada
    for (let i = 1; i < n; i++) {
      let nextCity = -1;
      let minDistance = Infinity;

      for (let j = 0; j < n; j++) {
        if (!visited[j]) {
          const distance = distanceMatrix.getDistance(currentCity, j);
          if (distance < minDistance) {
            minDistance = distance;
            nextCity = j;
          }
        }
      }

      currentCity = nextCity;
      route.push(currentCity);
      visited[currentCity] = true;
    }

    const totalDistance = this.calculateTotalDistance(route, distanceMatrix);

    return {
      route,
      totalDistance
    };
  }

  getName(): string {
    return 'Nearest Neighbor Algorithm';
  }
}