import { City } from './City';

export class DistanceCalculator {
  static calculateMatrix(cities: City[]): number[][] {
    const size = cities.length;
    const matrix = Array.from({ length: size }, () => new Array(size).fill(0));
    for (let i = 0; i < size; i++) {
      for (let j = i + 1; j < size; j++) {
        const dist = cities[i].distanceTo(cities[j]);
        matrix[i][j] = dist;
        matrix[j][i] = dist;
      }
    }
    return matrix;
  }
}
