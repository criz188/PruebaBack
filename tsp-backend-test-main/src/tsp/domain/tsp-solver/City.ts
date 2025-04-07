export class City {
    constructor(
      public readonly id: number,
      public readonly x: number,
      public readonly y: number
    ) {}
  
    distanceTo(other: City): number {
      const dx = this.x - other.x;
      const dy = this.y - other.y;
      return Math.sqrt(dx * dx + dy * dy);
    }
  }
  