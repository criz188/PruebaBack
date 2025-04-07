import { TspSolver } from '../domain/tsp-solver/TspSolver';
import { City } from '../domain/tsp-solver/City';

describe('TspSolver', () => {
  it('calculates a route and total distance', () => {
    const cities = [
      new City(0, 0, 0),
      new City(1, 0, 1),
      new City(2, 1, 0),
    ];

    const solver = new TspSolver(cities);
    const result = solver.solve();

    expect(result.route.length).toBe(3);
    expect(result.totalDistance).toBeGreaterThan(0);
  });
});
