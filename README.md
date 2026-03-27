# Trabajo Práctico de Promoción — Sistema de Gestión de Tareas en TypeScript

Este proyecto fue desarrollado como **Trabajo Práctico de Promoción** para la materia **Paradigmas de Programación**, representando una evolución significativa en el diseño y desarrollo de aplicaciones en TypeScript.

📅 Fecha: 01/12/2025

## Descripción
Aplicación de consola que permite gestionar tareas de forma completa, incluyendo creación, edición, eliminación, visualización, estadísticas y consultas avanzadas.

El sistema fue desarrollado utilizando TypeScript, aplicando conceptos de programación orientada a objetos, programación funcional y organización en capas.

## Funcionalidades
- Creación de tareas mediante un proceso guiado (wizard) :contentReference[oaicite:0]{index=0}  
- Visualización de tareas con filtrado y ordenamiento :contentReference[oaicite:1]{index=1}  
- Búsqueda de tareas por título  
- Edición de tareas  
- Eliminación lógica (soft delete)  
- Generación de estadísticas :contentReference[oaicite:2]{index=2}  
- Consultas avanzadas (prioridad, relaciones, tareas vencidas) :contentReference[oaicite:3]{index=3}  
- Persistencia de datos en archivo JSON :contentReference[oaicite:4]{index=4}  

## Enfoque del desarrollo
El proyecto fue diseñado siguiendo una arquitectura más estructurada y modular:

- Separación por capas:
  - **Modelos**: definición de entidades (`Tarea`) :contentReference[oaicite:5]{index=5}  
  - **Lógica de negocio**: manejo del flujo principal :contentReference[oaicite:6]{index=6}  
  - **Funciones puras**: filtrado, ordenamiento y estadísticas :contentReference[oaicite:7]{index=7}  
  - **Interfaz**: interacción con el usuario en consola :contentReference[oaicite:8]{index=8}  
  - **Persistencia**: lectura y escritura en archivos :contentReference[oaicite:9]{index=9}  

- Uso de **programación orientada a objetos**:
  - Clase `Tarea` con encapsulamiento y métodos  
  - Clase `gestor` como repositorio de datos  

- Uso de **programación funcional**:
  - Funciones puras sin efectos secundarios  
  - Uso de `map`, `filter`, `reduce`  
  - Separación entre funciones puras e impuras  

- Aplicación del principio **80/20 de programación funcional**:
  - Aproximadamente el 80% del sistema fue desarrollado mediante funciones puras  
  - El 20% restante corresponde a interacción con el usuario (I/O) y manejo de estado  
  - Esto permitió mejorar la claridad, testabilidad y mantenibilidad del código  

- Aplicación de conceptos avanzados:
  - Inmutabilidad de datos  
  - Validaciones centralizadas :contentReference[oaicite:10]{index=10}  
  - Ordenamientos configurables :contentReference[oaicite:11]{index=11}  

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
