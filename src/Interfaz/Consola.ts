/**
 * Genera el menú principal de la aplicación.
 * 
 * Función pura que retorna un string formateado con todas las opciones
 * disponibles en el nivel raíz de navegación de la aplicación.
 * 
 * @function menu
 * @returns {string} Menú principal formateado con bordes decorativos.
 * 
 * @example
 * console.log(menu());
 * // Muestra el menú con opciones 1-7
 */
function menu(): string {
    return "\n" +
        "========================================\n" +
        "            MENÚ PRINCIPAL              \n" +
        "========================================\n" +
        "   [1] - Ver Mis Tareas\n" +
        "   [2] - Buscar Tarea\n" +
        "   [3] - Agregar Tarea\n" +
        "   [4] - Eliminar Tarea\n" +
        "   [5] - Estadisticas\n" +
        "   [6] - Consultas extras\n" +
        "   [7] - Salir\n" +
        "========================================";
}

/**
 * Genera el submenú de filtrado para visualización de tareas.
 * 
 * Permite al usuario seleccionar qué subconjunto de tareas desea ver
 * basándose en su estado actual dentro del flujo de trabajo.
 * 
 * @function VerMisTareas
 * @returns {string} Submenú de opciones de filtrado.
 * 
 * @example
 * console.log(VerMisTareas());
 * const opcion = pedirNumero("", 1, 5, false);
 */
function VerMisTareas(): string {
    return "\n" +
        "--- FILTRAR TAREAS ---\n" +
        "\n" +
        "   [1] Todas\n" +
        "   [2] Pendientes\n" +
        "   [3] En curso\n" +
        "   [4] Terminadas\n" +
        "   [5] Volver al menú principal\n";
}

/**
 * Genera el submenú de criterios de ordenamiento.
 * 
 * Ofrece múltiples opciones para ordenar la lista de tareas
 * según diferentes atributos en orden ascendente.
 * 
 * @function OrdenTareasASC
 * @returns {string} Submenú con criterios de ordenamiento.
 * 
 * @example
 * console.log(OrdenTareasASC());
 * const criterio = pedirNumero("", 1, 5, false);
 */
function OrdenTareasASC(): string {
    return "\n" +
        "--- ORDENAR POR ---\n" +
        "\n" +
        "   [1] Título ascendente\n" +
        "   [2] Fecha de vencimiento ascendente\n" +
        "   [3] Fecha de creación ascendente\n" +
        "   [4] Dificultad (de baja a alta)\n" +
        "   [5] Volver al menú principal\n";
}

/**
 * Genera el menú de estadísticas y métricas.
 * 
 * Proporciona acceso a diferentes vistas analíticas sobre
 * la colección de tareas del usuario.
 * 
 * @function menuEstad
 * @returns {string} Menú de opciones estadísticas formateado.
 * 
 * @example
 * console.log(menuEstad());
 * const reporte = pedirNumero("", 1, 4, false);
 */
function menuEstad(): string {
    return "\n" +
        "========================================\n" +
        "          ESTADISTICA              \n" +
        "========================================\n" +
        "   [1] - Total de Tareas\n" +
        "   [2] - Porcentaje de Tareas por estado\n" +
        "   [3] - Porcentaje de Tareas por dificultad\n" +
        "   [4] - Volver al menú principal\n" +
        "========================================";
}

/**
 * Genera el menú de consultas avanzadas.
 * 
 * Ofrece funcionalidades de análisis más complejas como
 * detección de prioridades y relaciones entre tareas.
 * 
 * @function menuConsultas
 * @returns {string} Menú de consultas avanzadas formateado.
 * 
 * @example
 * console.log(menuConsultas());
 * const consulta = pedirNumero("", 1, 5, false);
 */
function menuConsultas(): string {
    return "\n" +
        "========================================\n" +
        "         CONSULTAS EXTRAS              \n" +
        "========================================\n" +
        "   [1] - Tareas de alta prioridad\n" +
        "   [2] - Tareas relacionadas\n" +
        "   [3] - Listado de tareas vencidas\n" +
        "   [4] - Prioridad de todas las Tareas\n" +
        "   [5] - Volver al menú principal\n" +
        "========================================";
}

/**
 * Genera el submenú de selección de campo para edición.
 * 
 * Lista todos los atributos modificables de una tarea,
 * permitiendo al usuario elegir qué propiedad desea cambiar.
 * 
 * @function PreguntaEditar
 * @returns {string} Submenú de campos editables.
 * 
 * @example
 * console.log(PreguntaEditar());
 * const campo = pedirNumero("", 1, 6, false);
 */
function PreguntaEditar(): string {
    return "\n" +
        "--- EDITAR CAMPO ---\n" +
        "\n" +
        "   [1] Título\n" +
        "   [2] Descripción\n" +
        "   [3] Estado\n" +
        "   [4] Dificultad\n" +
        "   [5] Fecha de vencimiento\n" +
        "   [6] Volver al menú principal\n";
}

/**
 * Genera el mensaje de confirmación para iniciar edición.
 * 
 * Texto simple que solicita al usuario confirmar si desea
 * proceder con la modificación de la tarea visualizada.
 * 
 * @function EditarY_N
 * @returns {string} Pregunta de confirmación para edición.
 * 
 * @example
 * const confirmacion = Confirmacion(EditarY_N());
 */
function EditarY_N(): string {
    return "- Desea editar la tarea? (Y/N)\n"
}

/**
 * Formatea un array de estados como lista numerada.
 * 
 * Función pura que transforma el array de estados en un string
 * con formato de lista para presentación en consola.
 * 
 * @function obtenerListaEstados
 * @param {string[]} estados - Array de estados válidos.
 * @returns {string} Lista numerada de estados.
 * 
 * @example
 * console.log(obtenerListaEstados(ESTADOS_TAREA));
 * // 1). Pendiente
 * // 2). En curso
 * // 3). Terminada
 * // 4). Cancelada
 */
export function obtenerListaEstados(estados: string[]): string {
    return estados.map((estado, i) => `${i + 1}). ${estado}`).join('\n');
}

/**
 * Formatea un array de dificultades como lista numerada.
 * 
 * Función pura que transforma el array de dificultades en un string
 * con formato de lista para presentación en consola.
 * 
 * @function obtenerListaDificultades
 * @param {string[]} dificultad - Array de niveles de dificultad.
 * @returns {string} Lista numerada de dificultades.
 * 
 * @example
 * console.log(obtenerListaDificultades(DIFICULTADES_TAREA));
 * // 1). Baja: ⭐
 * // 2). Media: ⭐⭐
 * // 3). Alta: ⭐⭐⭐
 */
export function obtenerListaDificultades(dificultad: string[]): string {
    return dificultad.map((dif, i) => `${i + 1}). ${dif}`).join('\n');
}

export {
    menu,
    VerMisTareas,
    OrdenTareasASC,
    PreguntaEditar,
    EditarY_N,
    menuEstad,
    menuConsultas
};
