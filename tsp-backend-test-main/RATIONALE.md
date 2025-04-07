# Enfoque y Justificación para la Solución del TSP

## Arquitectura

Para abordar el Problema del Viajante (TSP), he implementado una solución basada en principios sólidos de programación orientada a objetos (POO). La arquitectura sigue los principios de Domain-Driven Design (DDD) con las siguientes capas:

- **Dominio**: Contiene las entidades principales (City, DistanceMatrix), las interfaces y clases abstractas para los solucionadores, y servicios de dominio.
- **Aplicación**: Coordina los casos de uso, transformando DTOs en entidades del dominio y viceversa.
- **Infraestructura**: Proporciona los endpoints de API y la configuración.

## Algoritmos Implementados

### 1. Vecino más cercano (Nearest Neighbor)
- **Enfoque**: Algoritmo voraz que siempre selecciona la ciudad no visitada más cercana.
- **Ventajas**: Simple, rápido (O(n²)), proporciona una solución razonable.
- **Desventajas**: No garantiza la solución óptima, puede ser hasta un 25% peor que el óptimo en casos promedio.
- **Uso recomendado**: Para datasets grandes (n > 10) donde la optimalidad no es crítica.

### 2. Fuerza Bruta (Brute Force)
- **Enfoque**: Evalúa todas las permutaciones posibles para encontrar la óptima.
- **Ventajas**: Garantiza la solución óptima.
- **Desventajas**: Complejidad O(n!), lo que lo hace inviable para n > 10.
- **Uso recomendado**: Para datasets pequeños donde la optimalidad es crucial.

## Principios de OOP Aplicados

1. **Encapsulamiento**: Las clases como City y DistanceMatrix encapsulan sus datos y comportamientos.
2. **Herencia**: La jerarquía BaseTspSolver → [NearestNeighborSolver, BruteForceSolver] permite compartir funcionalidad común.
3. **Polimorfismo**: Uso de interfaces (TspSolver) para desacoplar implementaciones específicas.
4. **Abstracción**: Definición de comportamientos abstractos en la clase BaseTspSolver.

## Consideraciones de Rendimiento

- Para garantizar el rendimiento con N = 10 ciudades, ofrezco dos enfoques:
  - Vecino más cercano: Eficiente pero aproximado
  - Fuerza bruta: Óptimo pero limitado a conjuntos pequeños
- El sistema detecta automáticamente cuando el conjunto de datos es demasiado grande para la fuerza bruta y evita cómputos excesivos.

## Extensibilidad

La arquitectura está diseñada para ser extensible:
- Nuevos algoritmos (como algoritmos genéticos o optimización por colonias de hormigas) pueden añadirse implementando la interfaz TspSolver.
- El sistema de selección de algoritmos permite elegir el enfoque más adecuado según el caso de uso.

## Compensaciones (Trade-offs)

- **Optimalidad vs. Rendimiento**: Al ofrecer múltiples algoritmos, permito al usuario elegir entre soluciones óptimas más lentas o aproximadas más rápidas.
- **Simplicidad vs. Funcionalidad**: He priorizado un diseño claro y mantenible sobre optimizaciones extremas que podrían oscurecer la lógica.
- **Generalidad vs. Especialización**: La solución es lo suficientemente general para manejar diferentes tamaños de problemas y preferencias de algoritmos.

## Mejoras Futuras

- Implementación de algoritmos más avanzados como recocido simulado o algoritmos genéticos.
- Paralelización de cálculos para conjuntos de datos más grandes.
- Visualización de rutas y comparación de algoritmos.
- Cache de resultados para consultas repetidas.