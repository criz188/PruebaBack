import { Test } from '@nestjs/testing';
import { City } from '../src/tsp/domain/models/city.model';
import { DistanceMatrix } from '../src/tsp/domain/models/distance-matrix.model';
import { NearestNeighborSolver } from '../src/tsp/domain/tsp-solver/nearest-neighbor-solver';
import { BruteForceSolver } from '../src/tsp/domain/tsp-solver/brute-force-solver';

describe('TSP Solvers', () => {
  let cities: City[];
  let distanceMatrix: DistanceMatrix;

  beforeEach(() => {
    // Crear un conjunto de prueba con 5 ciudades
    cities = [
      new City(0, 0, 0, 'A'),
      new City(1, 0, 5, 'B'),
      new City(2, 5, 5, 'C'),
      new City(3, 5, 0, 'D'),
      new City(4, 2, 2, 'E')
    ];
    
    distanceMatrix = new DistanceMatrix(cities);
  });

  describe('NearestNeighborSolver', () => {
    it('should return a valid route', () => {
      const solver = new NearestNeighborSolver();
      const result = solver.solve(distanceMatrix);
      
      expect(result.route).toBeDefined();
      expect(result.route.length).toBe(cities.length);
      expect(result.totalDistance).toBeGreaterThan(0);
      
      // Verificar que cada ciudad aparece exactamente una vez
      const visited = new Set(result.route);
      expect(visited.size).toBe(cities.length);
    });
  });

  describe('BruteForceSolver', () => {
    it('should find the optimal solution for a small set of cities', () => {
      const solver = new BruteForceSolver();
      const result = solver.solve(distanceMatrix);
      
      expect(result.route).toBeDefined();
      expect(result.totalDistance).toBeGreaterThan(0);
      
      // Para este pequeño ejemplo, podemos verificar que la distancia es menor o igual
      // que la solución del vecino más cercano
      const nnSolver = new NearestNeighborSolver();
      const nnResult = nnSolver.solve(distanceMatrix);
      
      expect(result.totalDistance).toBeLessThanOrEqual(nnResult.totalDistance);
    });

    it('should throw an error for large datasets', () => {
      const largeCities = Array.from({ length: 12 }, (_, i) => 
        new City(i, Math.random() * 100, Math.random() * 100)
      );
      const largeMatrix = new DistanceMatrix(largeCities);
      const solver = new BruteForceSolver();
      
      expect(() => solver.solve(largeMatrix)).toThrow();
    });
  });
});