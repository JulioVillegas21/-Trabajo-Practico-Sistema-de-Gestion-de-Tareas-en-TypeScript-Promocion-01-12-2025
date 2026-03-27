import { gestor } from "../logica/Gestor";
import { Tarea } from "../models/Tarea";
import { contarPorDificultad, contarPorEstado } from "../funcionalidades-Puras/Estadistica";
import { asignarPrioridadLogica } from "../funcionalidades-Puras/Prioridad";

/**
 * Procesa y retorna información estadística según la opción seleccionada.
 * 
 * Función pura que genera reportes textuales basados en los datos de las tareas.
 * Soporta múltiples tipos de métricas sin modificar los datos originales.
 * 
 * @function manejoEstadisticas
 * @param {number} opcion - Tipo de estadística a generar:
 *   - 1: Total de tareas
 *   - 2: Distribución porcentual por estado
 *   - 3: Distribución porcentual por dificultad
 *   - 4: Mensaje de retorno al menú
 * @param {Tarea[]} tareas - Array de tareas a analizar.
 * @param {string[]} estados - Lista de estados válidos del sistema.
 * @param {string[]} dificultades - Lista de niveles de dificultad.
 * @returns {string|void} Reporte textual formateado o undefined.
 * 
 * @example
 * const reporte = manejoEstadisticas(2, tareas, ESTADOS_TAREA, DIFICULTADES_TAREA);
 * console.log(reporte);
 */
function manejoEstadisticas(opcion: number, tareas: Tarea[], estados: string[], dificultades: string[]): string | void {

    switch (opcion) {
        case 1:
            return (`\n Total de Tareas: ${tareas.length}`);
        case 2:
            return ("\n Porcentaje de Tareas por estado:\n" + estados.map(estado =>
                `- ${estado} = ${contarPorEstado(tareas, estado)} %`
            ).join('\n'));
        case 3:
            return ("\n Porcentaje de Tareas por dificultad:\n" + dificultades.map(dificultad =>
                `- ${dificultad} = ${contarPorDificultad(tareas, dificultad)} %`
            ).join('\n'));

        case 4:
            return " Volver al menú principal";

    }
}

/**
 * Procesa consultas avanzadas sobre el conjunto de tareas.
 * 
 * Función pura que implementa consultas especializadas:
 * - Filtrado por prioridad calculada dinámicamente
 * - Detección de relaciones semánticas entre tareas
 * - Identificación de tareas vencidas
 * 
 * @function manejoConsultas
 * @param {number} opcion - Tipo de consulta a ejecutar:
 *   - 1: Tareas de alta prioridad
 *   - 2: Tareas relacionadas por palabras en título
 *   - 3: Tareas vencidas
 *   - 4: Prioridad de todas las tareas
 *   - 5: Mensaje de retorno al menú
 * @param {Tarea[]} tareas - Array de tareas a consultar.
 * @param {Date} fecha - Fecha de referencia para cálculos temporales.
 * @returns {string|void} Resultado de la consulta formateado o undefined.
 * 
 * @example
 * const vencidas = manejoConsultas(3, tareas, new Date());
 * console.log(vencidas);
 */
function manejoConsultas(opcion: number, tareas: Tarea[], fecha: Date): string | void {
    switch (opcion) {
        case 1:
            return "\n Tareas de alta prioridad:\n" + tareas.filter(tarea => asignarPrioridadLogica(tarea, fecha) === "Alta").map(tarea => tarea.toString())
                .join('\n----------------------------------------\n');
        case 2:
            return buscarPorPalabrasRelacionadas(tareas).map(([tareaBase, relacionadas]) => {
                const listaRelacionada = relacionadas
                    .map(t => `  -> [ID ${t.getId()}] ${t.getTitulo()}`)
                    .join('\n');
                return `**Tarea Principal: [ID ${tareaBase.getId()}] ${tareaBase.getTitulo()}\n` +
                    `Tareas Relacionadas:\n${listaRelacionada}`;
            }).join('\n----------------------------------------------\n') || "\n No se encontraron relaciones automáticas por título entre las tareas.";
        case 3:
            let aux = tareas.filter(tarea => {
                const vencimiento = tarea.getFechaVencimiento();

                if (!vencimiento) {
                    return false;
                }

                return vencimiento.getTime() <= fecha.getTime();
            });
            if (aux.length === 0) {
                return "\n No hay tareas vencidas.";
            }
            return "\n Tareas vencidas\n" + aux.map(tarea => tarea.toString())
                .join('\n----------------------------------------\n');
        case 4:
            return "\n Tareas de alta prioridad:\n" + tareas
                .map(tarea => {
                    const prioridad = asignarPrioridadLogica(tarea, fecha);

                    return `${tarea.getTitulo()} (Prioridad: ${prioridad})`;
                })
                .join('\n----------------------------------------\n');
        case 5:
            return " Volver al menú principal";
    }
}

/**
 * Ejecuta la eliminación lógica de una tarea específica.
 * 
 * Función impura que modifica el estado de la tarea a través del gestor.
 * Implementa el patrón soft delete para preservar la integridad de datos.
 * 
 * @function manejoEliminar
 * @param {gestor} gestorTareas - Instancia del gestor de tareas.
 * @param {Tarea} tarea - Tarea a marcar como eliminada.
 * @returns {string} Mensaje de confirmación o error.
 * 
 * @example
 * const resultado = manejoEliminar(gestorTareas, tareaSeleccionada);
 * console.log(resultado); // "[OK] Tarea eliminada exitosamente."
 */
function manejoEliminar(gestorTareas: gestor, tarea: Tarea): string {
    const exito = gestorTareas.deleteItem(tarea.getId());
    if (exito) {
        return ("\n [OK] Tarea eliminada exitosamente.");
    } else {
        return ("\n [!] Error al eliminar la tarea.");
    }
}

/**
 * Encuentra relaciones semánticas entre tareas basándose en palabras compartidas.
 * 
 * Función pura que analiza los títulos de las tareas para detectar
 * palabras comunes significativas (más de 3 caracteres). Útil para
 * identificar tareas que podrían estar relacionadas temáticamente.
 * 
 * @function buscarPorPalabrasRelacionadas
 * @param {Tarea[]} tareas - Array de tareas a analizar.
 * @returns {[Tarea, Tarea[]][]} Array de tuplas donde cada tupla contiene:
 *   - [0]: Tarea base
 *   - [1]: Array de tareas relacionadas
 * 
 * @example
 * const relaciones = buscarPorPalabrasRelacionadas(tareas);
 * relaciones.forEach(([base, relacionadas]) => {
 *   console.log(`${base.getTitulo()} tiene ${relacionadas.length} relacionadas`);
 * });
 */
function buscarPorPalabrasRelacionadas(tareas: Tarea[]): [Tarea, Tarea[]][] {
    const resultado: [Tarea, Tarea[]][] = [];

    for (let i = 0; i < tareas.length; i++) {
        const palabraBase = tareas[i].getTitulo().toLowerCase().split(" ");
        const relacionadas: Tarea[] = [];
        for (let j = 0; j < tareas.length; j++) {
            if (i !== j) {
                const palabrasComparar = tareas[j].getTitulo().toLowerCase().split(" ");
                const hayRelacion = palabraBase.some(palabra => palabrasComparar.includes(palabra) && palabra.length > 3);

                if (hayRelacion === true) {
                    relacionadas.push(tareas[j]);
                }

            }

        }
        if (relacionadas.length > 0) {
            resultado.push([tareas[i], relacionadas]);
        }
    }
    return resultado;
}

export { manejoEstadisticas, manejoConsultas, manejoEliminar };
