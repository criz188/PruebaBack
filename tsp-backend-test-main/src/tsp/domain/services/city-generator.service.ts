import { Injectable } from '@nestjs/common';
import { City } from '../models/city.model';

@Injectable()
export class CityGeneratorService {
  generateRandomCities(
    count: number, 
    maxX: number = 100, 
    maxY: number = 100
  ): City[] {
    const cities: City[] = [];
    
    for (let i = 0; i < count; i++) {
      cities.push(
        new City(
          i,
          Math.floor(Math.random() * maxX),
          Math.floor(Math.random() * maxY),
          `City ${i}`
        )
      );
    }
    
    return cities;
  }
}