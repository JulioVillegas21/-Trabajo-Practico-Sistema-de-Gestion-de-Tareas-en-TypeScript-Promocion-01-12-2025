import { Tarea } from "../models/Tarea";

/**
 * Calcula el porcentaje de tareas que coinciden con un estado específico.
 * 
 * Esta es una función pura: no modifica el array original ni tiene efectos secundarios.
 * Utiliza el método reduce para un conteo eficiente y funcional.
 * 
 * @function contarPorEstado
 * @param {Tarea[]} tareas - Array de tareas a analizar.
 * @param {string} estado - Estado a buscar (ej: "Pendiente", "En curso").
 * @returns {number} Porcentaje redondeado hacia arriba de tareas con ese estado.
 * 
 * @example
 * const tareas = [...]; // Array de 10 tareas, 3 pendientes
 * const porcentaje = contarPorEstado(tareas, "Pendiente");
 * console.log(porcentaje); // 30
 */
function contarPorEstado(tareas: Tarea[], estado: string): number {
    return Math.ceil((tareas.reduce((count, tarea) => {
        return count + (tarea.getEstado().toLocaleLowerCase() === estado.toLocaleLowerCase() ? 1 : 0);
    }, 0) / tareas.length) * 100);
}

/**
 * Calcula el porcentaje de tareas que coinciden con una dificultad específica.
 * 
 * Esta es una función pura: no modifica el array original ni tiene efectos secundarios.
 * La comparación es case-insensitive para mayor flexibilidad.
 * 
 * @function contarPorDificultad
 * @param {Tarea[]} tareas - Array de tareas a analizar.
 * @param {string} dificultad - Nivel de dificultad a buscar.
 * @returns {number} Porcentaje redondeado hacia arriba de tareas con esa dificultad.
 * 
 * @example
 * const tareas = [...]; // Array de 10 tareas, 5 de dificultad alta
 * const porcentaje = contarPorDificultad(tareas, "Alta: ⭐⭐⭐");
 * console.log(porcentaje); // 50
 */
function contarPorDificultad(tareas: Tarea[], dificultad: string): number {
    return Math.ceil((tareas.reduce((count, tarea) => {
        return count + (tarea.getDificultad().toLocaleLowerCase() === dificultad.toLocaleLowerCase() ? 1 : 0);
    }, 0) / tareas.length) * 100);
}

export { contarPorEstado, contarPorDificultad };
