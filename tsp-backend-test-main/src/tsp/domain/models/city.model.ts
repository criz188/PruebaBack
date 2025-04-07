export class City {
    constructor(
      public readonly id: number,
      public readonly x: number,
      public readonly y: number,
      public readonly name?: string
    ) {}
  
    distanceTo(other: City): number {
      // Fórmula de distancia euclidiana
      return Math.sqrt(
        Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2)
      );
    }
  }