import { City } from './City';

export class NearestNeighborSolver {
  solve(cities: City[]): { path: City[]; totalDistance: number } {
    const visited: boolean[] = Array(cities.length).fill(false);
    const path: City[] = [];
    let totalDistance = 0;
    let current = cities[0];
    path.push(current);
    visited[current.id] = true;

    for (let i = 1; i < cities.length; i++) {
      let nearestCity: City | null = null;
      let minDistance = Infinity;

      for (const city of cities) {
        if (!visited[city.id]) {
          const dist = current.distanceTo(city);
          if (dist < minDistance) {
            minDistance = dist;
            nearestCity = city;
          }
        }
      }

      if (nearestCity) {
        visited[nearestCity.id] = true;
        path.push(nearestCity);
        totalDistance += minDistance;
        current = nearestCity;
      }
    }

    // Regresar al inicio
    totalDistance += current.distanceTo(cities[0]);
    path.push(cities[0]);

    return { path, totalDistance };
  }
}
