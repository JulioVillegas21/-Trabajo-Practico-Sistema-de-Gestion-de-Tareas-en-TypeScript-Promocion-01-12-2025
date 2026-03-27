import * as fs from "fs";
import * as path from "path";
import { Tarea } from "../models/Tarea";

/**
 * Lee y parsea un archivo JSON que contiene tareas.
 * 
 * Función impura que accede al sistema de archivos para recuperar
 * datos persistidos. Maneja errores de forma silenciosa retornando
 * un array vacío si el archivo no existe o hay errores de lectura.
 * 
 * @function readFromFile
 * @param {string} filename - Nombre del archivo (sin extensión .json).
 * @returns {Tarea[]} Array de objetos tarea (requiere conversión con fromJSON).
 * 
 * @example
 * const datos = readFromFile("MisTareas");
 * const tareas = datos.map(obj => Tarea.fromJSON(obj));
 * 
 * @throws {Error} Captura internamente errores de lectura/parseo.
 */
export function readFromFile(filename: string): Tarea[] {
    const filepath = path.join(__dirname, "..", `${filename}.json`);

    try {
        if (fs.existsSync(filepath)) {
            const data = fs.readFileSync(filepath, "utf-8");
            return JSON.parse(data);
        }
    } catch (error) {
        console.error(`Error leyendo archivo ${filename}.json:`, error);
    }

    return [];
}

/**
 * Serializa y escribe un array de tareas a un archivo JSON.
 * 
 * Función impura que persiste datos en el sistema de archivos.
 * Utiliza formato JSON con indentación de 2 espacios para legibilidad.
 * Muestra confirmación en consola tras escritura exitosa.
 * 
 * @function writeToFile
 * @param {string} filename - Nombre del archivo (sin extensión .json).
 * @param {Tarea[]} item - Array de tareas a persistir.
 * @returns {void}
 * 
 * @example
 * writeToFile("MisTareas", gestorTareas.getItems());
 * // Consola: "✓ Datos guardados en MisTareas.json"
 * 
 * @throws {Error} Captura internamente errores de escritura.
 */
export function writeToFile(filename: string, item: Tarea[]): void {
    const filepath = path.join(__dirname, "..", `${filename}.json`);

    try {
        fs.writeFileSync(filepath, JSON.stringify(item, null, 2), "utf-8");
        console.log(`✓ Datos guardados en ${filename}.json`);
    } catch (error) {
        console.error(`Error escribiendo archivo ${filename}.json:`, error);
    }
}
