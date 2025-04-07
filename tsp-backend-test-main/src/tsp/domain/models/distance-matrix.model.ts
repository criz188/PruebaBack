import { City } from './city.model';

export class DistanceMatrix {
  private matrix: number[][];

  constructor(private cities: City[]) {
    this.calculateDistances();
  }

  private calculateDistances(): void {
    const size = this.cities.length;
    this.matrix = Array(size)
      .fill(null)
      .map(() => Array(size).fill(0));

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (i !== j) {
          this.matrix[i][j] = this.cities[i].distanceTo(this.cities[j]);
        }
      }
    }
  }

  public getDistance(fromCityIndex: number, toCityIndex: number): number {
    return this.matrix[fromCityIndex][toCityIndex];
  }

  public getMatrix(): number[][] {
    return this.matrix;
  }

  public getCities(): City[] {
    return [...this.cities];
  }

  public size(): number {
    return this.cities.length;
  }
}