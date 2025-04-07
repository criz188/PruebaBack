import { BaseTspSolver } from './base-tsp-solver';
import { TspResult } from './tsp-solver.interface';
import { DistanceMatrix } from '../models/distance-matrix.model';

interface Individual {
  route: number[];
  fitness: number;
}

export class GeneticAlgorithmSolver extends BaseTspSolver {
  // Parámetros configurables del algoritmo genético
  private populationSize: number = 100;
  private generations: number = 500;
  private mutationRate: number = 0.01;
  private elitismRate: number = 0.1;
  private tournamentSize: number = 5;

  constructor(
    populationSize?: number,
    generations?: number,
    mutationRate?: number,
    elitismRate?: number
  ) {
    super();
    if (populationSize) this.populationSize = populationSize;
    if (generations) this.generations = generations;
    if (mutationRate) this.mutationRate = mutationRate;
    if (elitismRate) this.elitismRate = elitismRate;
  }

  solve(distanceMatrix: DistanceMatrix): TspResult {
    const n = distanceMatrix.size();
    
    // Inicializar la población
    let population = this.initializePopulation(n);
    
    population = this.evaluatePopulation(population, distanceMatrix);
    
    for (let gen = 0; gen < this.generations; gen++) {
      const selectedIndividuals = this.selection(population);
      
      let newPopulation: Individual[] = [];
      
      // Elitismo: conservar los mejores individuos
      const eliteCount = Math.floor(this.populationSize * this.elitismRate);
      newPopulation = newPopulation.concat(population.slice(0, eliteCount));
      
      // Generar el resto de la población mediante cruce y mutación
      while (newPopulation.length < this.populationSize) {
        // Seleccionar padres
        const parent1 = this.tournamentSelection(selectedIndividuals);
        const parent2 = this.tournamentSelection(selectedIndividuals);
        
        // Cruzar para producir descendencia
        const child = this.crossover(parent1, parent2);
        
        // Aplicar mutación
        this.mutate(child, this.mutationRate);
        
        // Añadir a la nueva población
        newPopulation.push({
          route: child,
          fitness: 0 // Se calculará después
        });
      }
      
      // Evaluar la nueva población
      population = this.evaluatePopulation(newPopulation, distanceMatrix);
    }
    
    // Obtener la mejor solución
    const bestIndividual = population[0]; // Ya están ordenados por fitness
    
    return {
      route: bestIndividual.route,
      totalDistance: 1 / bestIndividual.fitness // Convertir fitness a distancia
    };
  }

  private initializePopulation(n: number): Individual[] {
    const population: Individual[] = [];
    
    for (let i = 0; i < this.populationSize; i++) {
      // Crear un recorrido aleatorio (permutación de 0 a n-1)
      const route = Array.from({ length: n }, (_, index) => index);
      this.shuffleArray(route);
      
      population.push({
        route,
        fitness: 0 // Se calculará después
      });
    }
    
    return population;
  }

  private shuffleArray(array: number[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  private evaluatePopulation(population: Individual[], distanceMatrix: DistanceMatrix): Individual[] {
    // Calcular el fitness para cada individuo
    for (const individual of population) {
      const distance = this.calculateTotalDistance(individual.route, distanceMatrix);
      // El fitness es inversamente proporcional a la distancia (queremos minimizar distancia)
      individual.fitness = 1 / distance;
    }
    
    // Ordenar la población por fitness (de mayor a menor)
    return population.sort((a, b) => b.fitness - a.fitness);
  }

  private selection(population: Individual[]): Individual[] {
    // En este caso, simplemente devolvemos la población ordenada
    // Las técnicas de selección se aplican en tournamentSelection
    return [...population];
  }

  private tournamentSelection(population: Individual[]): number[] {
    // Seleccionar aleatoriamente 'tournamentSize' individuos y quedarse con el mejor
    const tournamentContestants: Individual[] = [];
    
    for (let i = 0; i < this.tournamentSize; i++) {
      const randomIndex = Math.floor(Math.random() * population.length);
      tournamentContestants.push(population[randomIndex]);
    }
    
    // Encontrar el individuo con mejor fitness
    tournamentContestants.sort((a, b) => b.fitness - a.fitness);
    
    // Devolver una copia de la ruta del ganador
    return [...tournamentContestants[0].route];
  }

  private crossover(parent1: number[], parent2: number[]): number[] {
    const n = parent1.length;
    
    // Implementar PMX (Partially Mapped Crossover)
    // 1. Elegir dos puntos de corte aleatorios
    const cutPoint1 = Math.floor(Math.random() * (n - 1));
    const cutPoint2 = cutPoint1 + Math.floor(Math.random() * (n - cutPoint1));
    
    // 2. Inicializar la descendencia con valores inválidos
    const child = new Array(n).fill(-1);
    
    // 3. Copiar la sección intermedia del primer padre
    for (let i = cutPoint1; i <= cutPoint2; i++) {
      child[i] = parent1[i];
    }
    
    // 4. Copiar elementos del segundo padre que no causen conflicto
    for (let i = 0; i < n; i++) {
      if (i >= cutPoint1 && i <= cutPoint2) continue;
      
      if (!child.includes(parent2[i])) {
        child[i] = parent2[i];
      }
    }
    
    // 5. Resolver conflictos
    for (let i = 0; i < n; i++) {
      if (child[i] === -1) {
        // Buscar un valor que no esté ya en child
        let valueToAdd = parent2[i];
        while (child.includes(valueToAdd)) {
          const index = parent1.indexOf(valueToAdd);
          valueToAdd = parent2[index];
        }
        child[i] = valueToAdd;
      }
    }
    
    return child;
  }

  private mutate(route: number[], mutationRate: number): void {
    const n = route.length;
    
    for (let i = 0; i < n; i++) {
      if (Math.random() < mutationRate) {
        // Realizar una mutación de intercambio (swap mutation)
        const j = Math.floor(Math.random() * n);
        [route[i], route[j]] = [route[j], route[i]];
      }
    }
  }

  getName(): string {
    return 'Genetic Algorithm';
  }
}