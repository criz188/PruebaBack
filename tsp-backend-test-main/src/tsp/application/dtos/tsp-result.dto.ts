import { City } from '../../domain/models/city.model';

export class TspResultDto {
  route: City[];
  routeIndices: number[];
  totalDistance: number;
  algorithmName: string;
  executionTimeMs: number;
}