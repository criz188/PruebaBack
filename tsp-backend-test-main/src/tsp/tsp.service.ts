import { Injectable } from '@nestjs/common';
import { City } from '../domain/tsp-solver/city';
import { TspSolver } from '../domain/tsp-solver/tsp-solver';

@Injectable()
export class TspService {
  generateCities(count: number): City[] {
    const cities: City[] = [];
    for (let i = 0; i < count; i++) {
      const x = Math.floor(Math.random() * 1000);
      const y = Math.floor(Math.random() * 1000);
      cities.push(new City(i, x, y));
    }
    return cities;
  }

  solveTsp(cities: City[]): { route: City[]; totalDistance: number } {
    const solver = new TspSolver(cities);
    return solver.solve();
  }
}
