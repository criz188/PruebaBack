import { City } from './City';

export class TspSolver {
  constructor(private cities: City[]) {}

  public solve(): { route: City[]; totalDistance: number } {
    if (this.cities.length === 0) return { route: [], totalDistance: 0 };

    const visited: City[] = [];
    const unvisited = [...this.cities];
    let current = unvisited.shift()!;
    visited.push(current);

    while (unvisited.length > 0) {
      const next = unvisited.reduce((closest, city) =>
        City.distance(current, city) < City.distance(current, closest) ? city : closest
      );
      current = next;
      visited.push(current);
      unvisited.splice(unvisited.indexOf(current), 1);
    }

    // volver a la ciudad inicial
    const totalDistance = this.calculateTotalDistance(visited);
    return { route: visited, totalDistance };
  }

  private calculateTotalDistance(route: City[]): number {
    let distance = 0;
    for (let i = 0; i < route.length - 1; i++) {
      distance += City.distance(route[i], route[i + 1]);
    }
    distance += City.distance(route[route.length - 1], route[0]); // retorno
    return distance;
  }
}
