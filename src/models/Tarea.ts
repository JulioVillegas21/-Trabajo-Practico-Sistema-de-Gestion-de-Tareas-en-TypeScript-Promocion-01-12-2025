import { v4 as uuid } from 'uuid';

/**
 * Estados válidos para una tarea dentro del sistema.
 * Define el ciclo de vida de una tarea desde su creación hasta su finalización.
 * @constant {string[]}
 */
export const ESTADOS_TAREA: string[] = ['Pendiente', 'En curso', 'Terminada', 'Cancelada'];

/**
 * Niveles de dificultad disponibles para clasificar las tareas.
 * Incluye representación visual con estrellas para mejor UX.
 * @constant {string[]}
 */
export const DIFICULTADES_TAREA: string[] = ['Baja: ⭐', 'Media: ⭐⭐', 'Alta: ⭐⭐⭐'];

/**
 * Clase que representa una Tarea en el sistema de gestión.
 * 
 * Implementa el patrón de entidad con identificador único (UUID) y
 * soporta serialización/deserialización JSON para persistencia.
 * 
 * @class Tarea
 * @example
 * const nuevaTarea = new Tarea(
 *   "Completar informe",
 *   "Informe mensual de ventas",
 *   "Pendiente",
 *   "Media: ⭐⭐",
 *   new Date("2025-12-31")
 * );
 */
export class Tarea {

    /**
     * Identificador único universal de la tarea.
     * Generado automáticamente mediante UUID v4.
     * @private
     * @type {string}
     */
    private id: string;

    /**
     * Título descriptivo de la tarea.
     * Limitado a 100 caracteres por validación externa.
     * @private
     * @type {string}
     */
    private titulo: string;

    /**
     * Descripción detallada de la tarea.
     * Campo opcional, limitado a 500 caracteres.
     * @private
     * @type {string}
     */
    private descripcion: string;

    /**
     * Estado actual de la tarea dentro del flujo de trabajo.
     * Debe coincidir con uno de los valores de ESTADOS_TAREA.
     * @private
     * @type {string}
     */
    private estado: string;

    /**
     * Nivel de dificultad asignado a la tarea.
     * Debe coincidir con uno de los valores de DIFICULTADES_TAREA.
     * @private
     * @type {string}
     */
    private dificultad: string;

    /**
     * Marca temporal de creación de la tarea.
     * Se asigna automáticamente al instanciar la clase.
     * @private
     * @type {Date}
     */
    private fechaCreacion: Date;

    /**
     * Fecha límite para completar la tarea.
     * Campo opcional que puede ser undefined si no se establece.
     * @private
     * @type {Date|undefined}
     */
    private fechaVencimiento?: Date;

    /**
     * Marca temporal de la última modificación realizada.
     * Se actualiza automáticamente con cada edición.
     * @private
     * @type {Date|undefined}
     */
    private ultimaEdicion?: Date;

    /**
     * Indicador de borrado lógico (soft delete).
     * Permite recuperar tareas eliminadas sin pérdida de datos.
     * @private
     * @type {boolean}
     */
    private eliminado: boolean;

    /**
     * Crea una nueva instancia de Tarea.
     * 
     * @constructor
     * @param {string} titulo - Título identificativo de la tarea (máx. 100 caracteres).
     * @param {string} descripcion - Descripción detallada (máx. 500 caracteres).
     * @param {string} estado - Estado inicial de la tarea.
     * @param {string} dificultad - Nivel de dificultad asignado.
     * @param {Date} [fechaVencimiento] - Fecha límite opcional para la tarea.
     */
    public constructor(
        titulo: string,
        descripcion: string,
        estado: string,
        dificultad: string,
        fechaVencimiento?: Date
    ) {
        this.id = uuid();
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.estado = estado || ESTADOS_TAREA[0];
        this.dificultad = dificultad || DIFICULTADES_TAREA[0];
        this.fechaCreacion = new Date();
        this.fechaVencimiento = fechaVencimiento || undefined;
        this.eliminado = false;
    }

    /**
     * Obtiene el identificador único de la tarea.
     * @returns {string} UUID de la tarea.
     */
    public getId(): string {
        return this.id;
    }

    /**
     * Obtiene el título de la tarea.
     * @returns {string} Título actual de la tarea.
     */
    public getTitulo(): string {
        return this.titulo;
    }

    /**
     * Obtiene la descripción de la tarea.
     * @returns {string} Descripción detallada de la tarea.
     */
    public getDescripcion(): string {
        return this.descripcion;
    }

    /**
     * Obtiene el estado actual de la tarea.
     * @returns {string} Estado dentro del ciclo de vida.
     */
    public getEstado(): string {
        return this.estado;
    }

    /**
     * Obtiene el nivel de dificultad de la tarea.
     * @returns {string} Dificultad asignada con indicador visual.
     */
    public getDificultad(): string {
        return this.dificultad;
    }

    /**
     * Obtiene la fecha de creación de la tarea.
     * @returns {Date} Marca temporal de creación.
     */
    public getFechaCreacion(): Date {
        return this.fechaCreacion;
    }

    /**
     * Obtiene la fecha de vencimiento de la tarea.
     * @returns {Date|undefined} Fecha límite o undefined si no está establecida.
     */
    public getFechaVencimiento(): Date | undefined {
        return this.fechaVencimiento;
    }

    /**
     * Obtiene la fecha de última edición de la tarea.
     * @returns {Date|undefined} Marca temporal de última modificación o undefined.
     */
    public getUltimaEdicion(): Date | undefined {
        return this.ultimaEdicion;
    }

    /**
     * Indica si la tarea ha sido eliminada lógicamente.
     * @returns {boolean} true si está marcada como eliminada, false en caso contrario.
     */
    public getEliminado(): boolean {
        return this.eliminado;
    }

    /**
     * Actualiza la descripción de la tarea.
     * @param {string} descripcion - Nueva descripción para la tarea.
     */
    public setDescripcion(descripcion: string): void {
        this.descripcion = descripcion;
    }

    /**
     * Actualiza el estado de la tarea.
     * @param {string} estado - Nuevo estado válido del ciclo de vida.
     */
    public setEstado(estado: string): void {
        this.estado = estado;
    }

    /**
     * Actualiza el nivel de dificultad de la tarea.
     * @param {string} dificultad - Nuevo nivel de dificultad.
     */
    public setDificultad(dificultad: string): void {
        this.dificultad = dificultad;
    }

    /**
     * Establece o actualiza la fecha de vencimiento.
     * @param {Date} fechaVencimiento - Nueva fecha límite para la tarea.
     */
    public setFechaVencimiento(fechaVencimiento: Date): void {
        this.fechaVencimiento = fechaVencimiento;
    }

    /**
     * Alterna el estado de eliminación lógica de la tarea.
     * Implementa el patrón soft delete para preservar la integridad de datos.
     * Actualiza automáticamente la fecha de última edición.
     */
    public setElimado(): void {
        this.eliminado = !this.eliminado;
        this.setEdicion();
    }

    /**
     * Actualiza el título de la tarea.
     * @param {string} tituloNuevo - Nuevo título para la tarea.
     */
    public setTitulo(tituloNuevo: string): void {
        this.titulo = tituloNuevo;
    }

    /**
     * Actualiza la marca temporal de última edición al momento actual.
     * Debe invocarse después de cualquier modificación a la tarea.
     */
    public setEdicion(): void {
        this.ultimaEdicion = new Date();
    }

    /**
     * Genera una representación en texto plano de la tarea.
     * Útil para depuración y visualización rápida en consola.
     * @returns {string} Representación textual de todos los atributos.
     */
    public toString(): string {
        return `---Título=${this.titulo}---\nID=${this.id}\n Descripción=${this.descripcion}\n Estado=${this.estado}\n Dificultad=${this.dificultad}\n Fecha de Creación=${this.fechaCreacion.toLocaleString()}\n Fecha de Vencimiento=${this.fechaVencimiento ? this.fechaVencimiento.toLocaleString() : 'No establecida'}\n Última Edición=${this.ultimaEdicion ? this.ultimaEdicion.toLocaleString() : 'No editada'}\n Eliminado=${this.eliminado}]`;
    }

    /**
     * Reconstruye una instancia de Tarea desde un objeto JSON plano.
     * 
     * Este método es esencial para la deserialización de datos persistidos,
     * ya que JSON.parse() no preserva los métodos de la clase.
     * 
     * @static
     * @param {any|Tarea} obj - Objeto JSON con los datos de la tarea.
     * @returns {Tarea} Nueva instancia de Tarea con todos sus métodos.
     * @throws {Error} Si faltan campos obligatorios en el objeto JSON.
     * 
     * @example
     * const jsonData = JSON.parse(archivoLeido);
     * const tarea = Tarea.fromJSON(jsonData);
     */
    public static fromJSON(obj: any | Tarea): Tarea {
        if (obj.id === undefined) throw new Error("Falta 'id' en el JSON.");
        if (obj.titulo === undefined) throw new Error("Falta 'titulo' en el JSON.");
        if (obj.descripcion === undefined) throw new Error("Falta 'descripcion' en el JSON.");
        if (obj.estado === undefined) throw new Error("Falta 'estado' en el JSON.");
        if (obj.dificultad === undefined) throw new Error("Falta 'dificultad' en el JSON.");
        if (obj.fechaCreacion === undefined) throw new Error("Falta 'fechaCreacion' en el JSON.");
        if (obj.eliminado === undefined) throw new Error("Falta 'eliminado' en el JSON.");

        const tarea = new Tarea(
            obj.titulo,
            obj.descripcion,
            obj.estado,
            obj.dificultad,
            obj.fechaVencimiento ? new Date(obj.fechaVencimiento) : undefined
        );

        tarea.id = obj.id;
        tarea.fechaCreacion = new Date(obj.fechaCreacion);
        tarea.ultimaEdicion = obj.ultimaEdicion ? new Date(obj.ultimaEdicion) : undefined;
        tarea.eliminado = obj.eliminado;

        return tarea;
    }
}
