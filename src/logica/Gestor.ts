import { readFromFile, writeToFile } from "../utils/FileFunction";
import { Tarea } from "../models/Tarea";

/**
 * Clase Gestor que actúa como capa de persistencia y administración de tareas.
 * 
 * Implementa el patrón Repository, encapsulando toda la lógica de
 * almacenamiento y recuperación de datos. Mantiene una colección
 * de tareas en memoria sincronizada con el archivo JSON de respaldo.
 * 
 * Características:
 * - Carga automática de datos al instanciar
 * - Persistencia automática en cada operación de escritura
 * - Soporte para borrado lógico (soft delete)
 * - Conversión automática de JSON a instancias de clase
 * 
 * @class gestor
 * @example
 * const gestorTareas = new gestor("MisTareas");
 * gestorTareas.addItem(nuevaTarea);
 * const todasLasTareas = gestorTareas.getItems();
 */
export class gestor {

    /**
     * Nombre del archivo JSON para persistencia (sin extensión).
     * @private
     * @type {string}
     */
    private name: string;

    /**
     * Colección en memoria de instancias de Tarea.
     * @private
     * @type {Tarea[]}
     */
    private items: Tarea[] = [];

    /**
     * Crea una nueva instancia del gestor y carga los datos existentes.
     * 
     * @constructor
     * @param {string} name - Nombre del archivo de persistencia (sin extensión .json).
     * 
     * @example
     * const gestor = new gestor("TareasProyecto");
     */
    constructor(name: string) {
        this.name = name;
        this.load();
    }

    /**
     * Carga las tareas desde el archivo JSON y las convierte a instancias de clase.
     * 
     * Este método es fundamental porque JSON.parse() retorna objetos planos
     * sin los métodos de la clase Tarea. Utiliza Tarea.fromJSON() para
     * restaurar la funcionalidad completa de cada objeto.
     * 
     * @private
     * @returns {void}
     */
    private load(): void {
        const data = readFromFile(this.name);
        this.items = data.map((obj: any) => Tarea.fromJSON(obj));
    }

    /**
     * Persiste el estado actual de la colección en el archivo JSON.
     * 
     * Se invoca automáticamente después de cada operación que modifica datos
     * para garantizar la sincronización entre memoria y almacenamiento.
     * 
     * @private
     * @returns {void}
     */
    private save(): void {
        writeToFile(this.name, this.items);
    }

    /**
     * Agrega una nueva tarea a la colección y la persiste.
     * 
     * Utiliza el spread operator para crear un nuevo array,
     * siguiendo el principio de inmutabilidad.
     * 
     * @public
     * @param {Tarea} item - Nueva tarea a agregar.
     * @returns {void}
     * 
     * @example
     * const tarea = new Tarea("Título", "Descripción", "Pendiente", "Baja");
     * gestor.addItem(tarea);
     */
    public addItem(item: Tarea): void {
        this.items = [...this.items, item];
        this.save();
    }

    /**
     * Guarda el estado actual de todas las tareas.
     * 
     * Útil después de modificaciones directas a objetos Tarea
     * obtenidos mediante getItems().
     * 
     * @public
     * @returns {boolean} Siempre retorna true indicando éxito.
     * 
     * @example
     * tarea.setEstado("Terminada");
     * gestor.actItem(); // Persiste los cambios
     */
    public actItem(): boolean {
        this.save();
        return true;
    }

    /**
     * Marca una tarea como eliminada (soft delete).
     * 
     * No elimina físicamente la tarea del array, sino que cambia
     * su propiedad 'eliminado' a true. Esto permite recuperación
     * y mantiene la integridad referencial.
     * 
     * @public
     * @param {string} tareaid - UUID de la tarea a eliminar.
     * @returns {boolean} true si se encontró y marcó, false si no existe.
     * 
     * @example
     * const eliminada = gestor.deleteItem("uuid-de-la-tarea");
     * if (!eliminada) {
     *   console.log("Tarea no encontrada");
     * }
     */
    public deleteItem(tareaid: string): boolean {
        const index = this.getIndexById(tareaid);
        if (index === -1) {
            return false;
        }
        this.items[index].setElimado();
        this.save();
        return true;
    }

    /**
     * Busca el índice de una tarea por su identificador único.
     * 
     * Función pura de utilidad para operaciones internas.
     * 
     * @public
     * @param {string} tareaid - UUID de la tarea a buscar.
     * @returns {number} Índice en el array (0...N) o -1 si no existe.
     * 
     * @example
     * const index = gestor.getIndexById("uuid");
     * if (index !== -1) {
     *   // Tarea encontrada
     * }
     */
    public getIndexById(tareaid: string): number {
        return this.items.findIndex(tarea => tarea.getId() === tareaid);
    }

    /**
     * Obtiene la lista de tareas activas (no eliminadas).
     * 
     * Aplica automáticamente el filtro de soft delete,
     * retornando solo las tareas visibles para el usuario.
     * 
     * @public
     * @returns {Tarea[]} Array filtrado de tareas activas.
     * 
     * @example
     * const activas = gestor.getItems();
     * console.log(`Tienes ${activas.length} tareas activas`);
     */
    public getItems(): Tarea[] {
        return this.items.filter(item => item.getEliminado() !== true);
    }

}
