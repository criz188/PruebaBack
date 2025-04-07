export class City {
    constructor(
      public readonly id: number,
      public readonly x: number,
      public readonly y: number,
    ) {}
  
    static distance(a: City, b: City): number {
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      return Math.sqrt(dx * dx + dy * dy);
    }
  }
  