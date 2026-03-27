import { Tarea } from "../models/Tarea";

/**
 * Genera una lista numerada de títulos de tareas.
 * 
 * Función pura que transforma un array de tareas en un string
 * formateado con índices numéricos para selección por parte del usuario.
 * Utiliza programación funcional con map y join.
 * 
 * @function mostrarTitulos
 * @param {Tarea[]} tareas - Array de tareas a listar.
 * @returns {string} Lista numerada de títulos, uno por línea.
 * 
 * @example
 * const lista = mostrarTitulos(gestorTareas.getItems());
 * console.log(lista);
 * // [1] Completar informe
 * // [2] Revisar código
 * // [3] Preparar presentación
 */
function mostrarTitulos(tareas: Tarea[]): string {
    return tareas.map((tarea, index) => {
        return ` [${index + 1}] ${tarea.getTitulo()}`;
    }).join('\n');
}

/**
 * Genera una ficha detallada de una tarea individual.
 * 
 * Función pura que crea una representación visual completa de una tarea,
 * incluyendo todos sus atributos organizados en secciones:
 * - Identificación (título, ID)
 * - Contenido (descripción)
 * - Estado y clasificación (estado, dificultad)
 * - Información temporal (fechas de creación, vencimiento y edición)
 * 
 * El formato incluye bordes decorativos para mejorar la legibilidad
 * en interfaces de consola.
 * 
 * @function mostrarTareaCompletas
 * @param {Tarea} tarea - Objeto tarea a visualizar.
 * @returns {String} Ficha formateada con todos los detalles de la tarea.
 * 
 * @example
 * const detalles = mostrarTareaCompletas(tareaSeleccionada);
 * console.log(detalles);
 * // ========================================
 * //             DETALLE DE TAREA            
 * // ========================================
 * //
 * //    --------------------------------------------------
 * //     TÍTULO: COMPLETAR INFORME
 * //    --------------------------------------------------
 * //     > ID:           abc123-def456...
 * //
 * //     DESCRIPCIÓN:
 * //     Informe mensual de ventas Q4
 * //     ...
 */
function mostrarTareaCompletas(tarea: Tarea): String {
    return "\n========================================\n" +
        "            DETALLE DE TAREA            \n" +
        "========================================\n" +
        "\n" +
        "   --------------------------------------------------\n" +
        "    TÍTULO: " + tarea.getTitulo().toUpperCase() + "\n" +
        "   --------------------------------------------------\n" +
        "    > ID:           " + tarea.getId() + "\n\n" +
        "    DESCRIPCIÓN:\n" +
        "    " + tarea.getDescripcion() + "\n\n" +
        "    ESTADO Y DIFICULTAD:\n" +
        "    • Estado:       " + tarea.getEstado() + "\n" +
        "    • Dificultad:   " + tarea.getDificultad() + "\n\n" +
        "    FECHAS:\n" +
        "    • Creación:     " + tarea.getFechaCreacion().toLocaleString() + "\n" +
        "    • Vencimiento:  " + (tarea.getFechaVencimiento() ? tarea.getFechaVencimiento()?.toLocaleString() : "No establecida") + "\n" +
        "    • Últ. Edición: " + (tarea.getUltimaEdicion() ? tarea.getUltimaEdicion()?.toLocaleString() : "No editada") + "\n" +
        "   --------------------------------------------------\n" +
        "\n========================================";
}

export { mostrarTitulos, mostrarTareaCompletas };
