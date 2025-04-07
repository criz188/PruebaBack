import { Module } from '@nestjs/common';
import { TspController } from '../controllers/tsp.controller';
import { TspService } from '../../application/services/tsp.service';
import { CityGeneratorService } from '../../domain/services/city-generator.service';
import { DistanceCalculatorService } from '../../domain/services/distance-calculator.service';

@Module({
  controllers: [TspController],
  providers: [
    TspService,
    CityGeneratorService,
    DistanceCalculatorService
  ],
  exports: [TspService]
})
export class TspModule {}