import { Tarea, DIFICULTADES_TAREA, ESTADOS_TAREA } from "../models/Tarea";
import PromptSync from "prompt-sync";
import { pedirNumero, esTituloValido, esDescripcionValida, esfechaValida } from "./Verificadores";
import { obtenerListaEstados, obtenerListaDificultades } from "../Interfaz/Consola";
const prompt = PromptSync();

/**
 * Genera un encabezado visual formateado para cada paso del wizard de creación.
 * 
 * @function header
 * @param {string} titulo - Texto descriptivo del paso actual.
 * @returns {string} Encabezado formateado con bordes decorativos.
 * 
 * @example
 * console.log(header("Paso 1/4: Título"));
 * // ========================================
 * //    NUEVA TAREA | Paso 1/4: Título
 * // ========================================
 */
function header(titulo: string): string {
    return "========================================\n" +
        `   NUEVA TAREA | ${titulo}\n` +
        "========================================\n";
}

/**
 * Ejecuta el wizard de creación de una nueva tarea.
 * 
 * Esta función es impura debido a su interacción con I/O de consola.
 * Guía al usuario a través de un proceso paso a paso para definir:
 * 1. Título (obligatorio, máx. 100 caracteres, único)
 * 2. Descripción (opcional, máx. 500 caracteres)
 * 3. Estado inicial
 * 4. Nivel de dificultad
 * 5. Fecha de vencimiento (opcional)
 * 
 * @function CrearTarea
 * @param {Tarea[]} tareas - Lista actual de tareas para validación de duplicados.
 * @returns {Tarea} Nueva instancia de Tarea con los datos capturados.
 * 
 * @example
 * const nuevaTarea = CrearTarea(gestorTareas.getItems());
 * gestorTareas.addItem(nuevaTarea);
 */
function CrearTarea(tareas: Tarea[]): Tarea {
    let titulo: string;
    let descripcion: string;
    let estado: number;
    let dificultad: number;
    let fechaVencimiento: Date | undefined;
    let estados = ESTADOS_TAREA;
    let dificultades = DIFICULTADES_TAREA;

    console.clear();
    header("Paso 1/4: Título");

    titulo = prompt("Ingrese el título de la tarea (max 100 caracteres): ")?.trim() || "";

    while (!esTituloValido(titulo, tareas)) {
        console.log("\n [!] Título inválido. Intente nuevamente.")
        titulo = prompt("Ingrese el título de la tarea (max 100 caracteres): ")?.trim() || "";
    }

    console.clear();
    header("Paso 2/4: Descripción");

    descripcion = prompt("Ingrese la descripción (Opcional, max 500 caracteres): ")?.trim() || "";

    while (!esDescripcionValida(descripcion)) {
        console.log("\n [!] Descripción inválida. Intente nuevamente.")
        descripcion = prompt("Ingrese la descripción (max 500 caracteres): ")?.trim() || "";
    }

    console.clear();
    header("Paso 3/4: Estado");

    console.log(obtenerListaEstados(estados));

    estado = pedirNumero(" Seleccione el estado actual.", 1, ESTADOS_TAREA.length, true);

    console.clear();
    header("Paso 4/4: Dificultad");

    console.log(obtenerListaDificultades(dificultades));

    dificultad = pedirNumero(" Seleccione La dificultad.", 1, DIFICULTADES_TAREA.length, true);

    console.clear();
    header("Configuración final");

    let opcionFecha: number = pedirNumero("¿Desea asignar una fecha de vencimiento?\n   [1] Sí\n   [2] No", 1, 2, false);

    if (opcionFecha === 1) {
        do {
            console.log("\n--- Ingrese la fecha ---");

            let año: number = pedirNumero("Porfavor indique el año de vencimiento\n", 2025, 2035, false);
            let mes: number = pedirNumero("Porfavor indique el mes de vencimiento \n", 1, 12, false);
            let dia: number = pedirNumero("Porfavor indique el dia de vencimiento \n", 1, 31, false);

            fechaVencimiento = new Date(año, mes - 1, dia);
        } while (!esfechaValida(fechaVencimiento, new Date()));

    } else {
        fechaVencimiento = undefined;
    }

    console.clear();
    console.log("\n========================================");
    console.log("      ¡TAREA CREADA CON ÉXITO!");
    console.log("========================================\n");

    return new Tarea(titulo, descripcion, ESTADOS_TAREA[estado - 1], DIFICULTADES_TAREA[dificultad - 1], fechaVencimiento);
}

export { CrearTarea };
