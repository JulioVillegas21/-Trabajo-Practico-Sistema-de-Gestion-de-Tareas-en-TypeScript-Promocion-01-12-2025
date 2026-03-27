import { Tarea } from "../models/Tarea";

/**
 * Filtra las tareas para obtener únicamente las activas (no eliminadas).
 * 
 * Esta función implementa el filtro básico para el soft delete,
 * excluyendo todas las tareas marcadas como eliminadas del resultado.
 * 
 * @function filtrarTodas
 * @param {Tarea[]} tareas - Array completo de tareas a filtrar.
 * @returns {Tarea[]} Nuevo array conteniendo solo las tareas activas.
 * 
 * @example
 * const todasLasTareas = gestor.getItems();
 * const tareasActivas = filtrarTodas(todasLasTareas);
 */
function filtrarTodas(tareas: Tarea[]): Tarea[] {
    return tareas.filter(tarea => tarea.getEliminado() === false);
}

/**
 * Filtra las tareas por un estado específico.
 * 
 * Realiza una comparación estricta del estado de cada tarea
 * contra el estado proporcionado como parámetro.
 * 
 * @function filtroBusqueda
 * @param {Tarea[]} tareas - Array de tareas a filtrar.
 * @param {string} estado - Estado objetivo para el filtrado.
 * @returns {Tarea[]} Nuevo array con las tareas que coinciden con el estado.
 * 
 * @example
 * const pendientes = filtroBusqueda(tareas, "Pendiente");
 * const enCurso = filtroBusqueda(tareas, "En curso");
 */
function filtroBusqueda(tareas: Tarea[], estado: string): Tarea[] {
    return tareas.filter(tarea => tarea.getEstado() === estado);
}

/**
 * Busca una tarea específica por su título.
 * 
 * Realiza una búsqueda case-insensitive del título exacto,
 * retornando la primera coincidencia encontrada.
 * 
 * @function BusquedaTitulo
 * @param {Tarea[]} tareas - Array de tareas donde buscar.
 * @param {string} titulo - Título exacto a buscar (case-insensitive).
 * @returns {Tarea|undefined} La tarea encontrada o undefined si no existe.
 * 
 * @example
 * const tarea = BusquedaTitulo(tareas, "completar informe");
 * if (tarea) {
 *   console.log(tarea.getDescripcion());
 * }
 */
function BusquedaTitulo(tareas: Tarea[], titulo: string): Tarea | undefined {
    return tareas.find(tarea => tarea.getTitulo().toLowerCase() === titulo.toLowerCase());
}

export { filtroBusqueda, filtrarTodas, BusquedaTitulo };
