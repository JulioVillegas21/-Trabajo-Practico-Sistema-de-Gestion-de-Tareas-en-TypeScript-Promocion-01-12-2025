import { Tarea } from "../models/Tarea";

/**
 * Clase que encapsula múltiples estrategias de ordenamiento para listas de tareas.
 * 
 * Implementa un enfoque funcional donde cada método de ordenamiento es puro:
 * - No modifica el array original (usa spread operator para crear copias)
 * - El resultado depende únicamente de los parámetros de entrada
 * - No tiene efectos secundarios
 * 
 * @class OrdenadorTareas
 * @example
 * const ordenador = new OrdenadorTareas();
 * const tareasOrdenadas = ordenador.porTitulo(misTareas);
 */
export class OrdenadorTareas {

    /**
     * Método genérico que ejecuta el ordenamiento con un comparador dado.
     * 
     * Crea una copia del array original usando el spread operator
     * para garantizar la inmutabilidad de los datos de entrada.
     * 
     * @private
     * @param {Tarea[]} items - Lista de tareas a ordenar.
     * @param {Function} comparador - Función comparadora (a, b) => number.
     * @returns {Tarea[]} Nuevo array ordenado según el comparador.
     */
    private ordenarLista(items: Tarea[], comparador: (a: Tarea, b: Tarea) => number): Tarea[] {
        return [...items].sort(comparador);
    }

    /**
     * Comparador alfabético para ordenar por título.
     * 
     * Utiliza localeCompare para manejar correctamente caracteres
     * especiales, acentos y diferentes alfabetos.
     * 
     * @private
     * @param {Tarea} a - Primera tarea a comparar.
     * @param {Tarea} b - Segunda tarea a comparar.
     * @returns {number} Negativo si a < b, positivo si a > b, cero si iguales.
     */
    private compararPorTitulo(a: Tarea, b: Tarea): number {
        return a.getTitulo().localeCompare(b.getTitulo());
    }

    /**
     * Comparador cronológico para ordenar por fecha de vencimiento.
     * 
     * Las tareas sin fecha de vencimiento se posicionan al final del resultado.
     * Ordena de forma ascendente (fechas más próximas primero).
     * 
     * @private
     * @param {Tarea} a - Primera tarea a comparar.
     * @param {Tarea} b - Segunda tarea a comparar.
     * @returns {number} Diferencia en milisegundos entre las fechas.
     */
    private compararPorFechaVencimiento(a: Tarea, b: Tarea): number {
        const fechaA = a.getFechaVencimiento();
        const fechaB = b.getFechaVencimiento();

        if (!fechaA) return 1;
        if (!fechaB) return -1;

        return new Date(fechaA).getTime() - new Date(fechaB).getTime();
    }

    /**
     * Comparador cronológico para ordenar por fecha de creación.
     * 
     * Ordena de forma ascendente (tareas más antiguas primero).
     * 
     * @private
     * @param {Tarea} a - Primera tarea a comparar.
     * @param {Tarea} b - Segunda tarea a comparar.
     * @returns {number} Diferencia en milisegundos entre las fechas.
     */
    private compararPorFechaCreacion(a: Tarea, b: Tarea): number {
        const tiempoA = new Date(a.getFechaCreacion());
        const tiempoB = new Date(b.getFechaCreacion());
        return tiempoA.getTime() - tiempoB.getTime();
    }

    /**
     * Comparador basado en un orden de dificultad personalizado.
     * 
     * Recibe el array de orden explícitamente como parámetro,
     * manteniendo la función pura sin dependencias externas.
     * 
     * @private
     * @param {Tarea} a - Primera tarea a comparar.
     * @param {Tarea} b - Segunda tarea a comparar.
     * @param {string[]} orden - Array que define la jerarquía de dificultad.
     * @returns {number} Diferencia de índices en el array de orden.
     */
    private compararPorDificultad(a: Tarea, b: Tarea, orden: string[]): number {
        const indexA = orden.indexOf(a.getDificultad().toLowerCase());
        const indexB = orden.indexOf(b.getDificultad().toLowerCase());
        return indexA - indexB;
    }

    /**
     * Ordena las tareas alfabéticamente por título (A-Z).
     * 
     * @public
     * @param {Tarea[]} tareas - Lista de tareas a ordenar.
     * @returns {Tarea[]} Nueva lista ordenada por título.
     * 
     * @example
     * const ordenadas = ordenador.porTitulo(tareas);
     */
    public porTitulo(tareas: Tarea[]): Tarea[] {
        return this.ordenarLista(tareas, (a, b) => this.compararPorTitulo(a, b));
    }

    /**
     * Ordena las tareas por fecha de vencimiento (más próximas primero).
     * 
     * Las tareas sin fecha de vencimiento aparecen al final.
     * 
     * @public
     * @param {Tarea[]} tareas - Lista de tareas a ordenar.
     * @returns {Tarea[]} Nueva lista ordenada por fecha de vencimiento.
     * 
     * @example
     * const urgentes = ordenador.porFechaVencimiento(tareas);
     */
    public porFechaVencimiento(tareas: Tarea[]): Tarea[] {
        return this.ordenarLista(tareas, (a, b) => this.compararPorFechaVencimiento(a, b));
    }

    /**
     * Ordena las tareas por fecha de creación (más antiguas primero).
     * 
     * @public
     * @param {Tarea[]} tareas - Lista de tareas a ordenar.
     * @returns {Tarea[]} Nueva lista ordenada por fecha de creación.
     * 
     * @example
     * const cronologico = ordenador.porFechaCreacion(tareas);
     */
    public porFechaCreacion(tareas: Tarea[]): Tarea[] {
        return this.ordenarLista(tareas, (a, b) => this.compararPorFechaCreacion(a, b));
    }

    /**
     * Ordena las tareas según nivel de dificultad.
     * 
     * El orden depende del array proporcionado, típicamente de menor a mayor dificultad.
     * 
     * @public
     * @param {Tarea[]} tareas - Lista de tareas a ordenar.
     * @param {string[]} orden - Array que define la jerarquía (ej: ['Baja', 'Media', 'Alta']).
     * @returns {Tarea[]} Nueva lista ordenada por dificultad.
     * 
     * @example
     * const porDificultad = ordenador.porDificultad(tareas, DIFICULTADES_TAREA);
     */
    public porDificultad(tareas: Tarea[], orden: string[]): Tarea[] {
        return this.ordenarLista(tareas, (a, b) => this.compararPorDificultad(a, b, orden));
    }
}
