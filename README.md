# Trabajo Práctico de Promoción — Sistema de Gestión de Tareas en TypeScript

Este proyecto fue desarrollado como **Trabajo Práctico de Promoción** para la materia **Paradigmas de Programación**, representando una evolución significativa en el diseño y desarrollo de aplicaciones en TypeScript.

Fecha: 01/12/2025

## Descripción
Aplicación de consola que permite gestionar tareas de forma completa, incluyendo creación, edición, eliminación, visualización, estadísticas y consultas avanzadas.

El sistema fue desarrollado utilizando TypeScript, aplicando conceptos de programación orientada a objetos, programación funcional y organización en capas.

## Funcionalidades
- Creación de tareas mediante un proceso guiado (wizard)  
- Visualización de tareas con filtrado y ordenamiento  
- Búsqueda de tareas por título  
- Edición de tareas  
- Eliminación lógica (soft delete)  
- Generación de estadísticas  
- Consultas avanzadas (prioridad, relaciones, tareas vencidas)  
- Persistencia de datos en archivo JSON  

## Enfoque del desarrollo
El proyecto fue diseñado siguiendo una arquitectura más estructurada y modular:

- Separación por capas:
  - Modelos: definición de entidades (`Tarea`)  
  - Lógica de negocio: manejo del flujo principal  
  - Funciones puras: filtrado, ordenamiento y estadísticas  
  - Interfaz: interacción con el usuario en consola  
  - Persistencia: lectura y escritura en archivos  

- Uso de programación orientada a objetos:
  - Clase `Tarea` con encapsulamiento y métodos  
  - Clase `gestor` como repositorio de datos  

- Uso de programación funcional:
  - Funciones puras sin efectos secundarios  
  - Uso de `map`, `filter`, `reduce`  
  - Separación entre funciones puras e impuras  

- Aplicación del principio 80/20 de programación funcional:
  - Aproximadamente el 80% del sistema fue desarrollado mediante funciones puras  
  - El 20% restante corresponde a interacción con el usuario (I/O) y manejo de estado  
  - Esto permitió mejorar la claridad, testabilidad y mantenibilidad del código  

- Aplicación de conceptos avanzados:
  - Inmutabilidad de datos  
  - Validaciones centralizadas  
  - Ordenamientos configurables  

## Características técnicas
- Tipado fuerte con TypeScript
- Arquitectura modular
- Separación de responsabilidades
- Persistencia en archivos JSON
- Uso de UUID para identificación de tareas
- Implementación de borrado lógico (soft delete)

## Estructura del proyecto
- `main.ts`: punto de entrada del sistema  
- `models/`: definición de entidades  
- `logica/`: flujo de negocio y gestor  
- `Funcionalidades/`: operaciones principales  
- `funcionalidades-Puras/`: funciones puras  
- `Interfaz/`: menús y visualización  
- `utils/`: manejo de archivos  
- `GuardadoDeTareas.json`: almacenamiento de datos  

## Tecnologías
- TypeScript
- Node.js

## Ejecución
Ejecutar el proyecto:
```bash
npm start
