import { City } from './City';
import { NearestNeighborSolver } from './NearestNeighborSolver';

export class TSPSolver {
  solveTSP(cities: City[]): { route: number[]; totalDistance: number } {
    const solver = new NearestNeighborSolver();
    const { path, totalDistance } = solver.solve(cities);
    return {
      route: path.map(city => city.id),
      totalDistance,
    };
  }
}
