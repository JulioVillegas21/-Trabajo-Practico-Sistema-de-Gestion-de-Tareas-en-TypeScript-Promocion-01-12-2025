import PromptSync from "prompt-sync";
import { Tarea } from "../models/Tarea";
const prompt = PromptSync();

/**
 * Verifica si un número se encuentra dentro de un rango especificado.
 * 
 * Función pura que valida tanto el tipo de dato como los límites.
 * 
 * @function validarRango
 * @param {number} numero - Número a validar.
 * @param {number} min - Límite inferior del rango (inclusivo).
 * @param {number} max - Límite superior del rango (inclusivo).
 * @returns {boolean} true si el número está en el rango, false en caso contrario.
 * 
 * @example
 * validarRango(5, 1, 10);  // true
 * validarRango(0, 1, 10);  // false
 * validarRango(NaN, 1, 10); // false
 */
export function validarRango(numero: number, min: number, max: number): boolean {
    return !Number.isNaN(numero) && numero >= min && numero <= max;
}

/**
 * Valida si una entrada corresponde a una respuesta de confirmación.
 * 
 * Función pura que verifica respuestas booleanas en formato y/n.
 * 
 * @function esRespuestaConfirmacion
 * @param {string} input - Entrada del usuario a validar.
 * @returns {boolean} true si es 'y' o 'n', false en caso contrario.
 * 
 * @example
 * esRespuestaConfirmacion("y"); // true
 * esRespuestaConfirmacion("n"); // true
 * esRespuestaConfirmacion("s"); // false
 */
export function esRespuestaConfirmacion(input: string): boolean {
    return input === "y" || input === "n";
}

/**
 * Solicita y valida un número entero dentro de un rango específico.
 * 
 * Función impura que interactúa con la consola para capturar entrada.
 * Soporta un modo opcional de valor por defecto cuando el usuario presiona Enter.
 * 
 * @function pedirNumero
 * @param {string} mensaje - Texto a mostrar como prompt al usuario.
 * @param {number} min - Valor mínimo aceptado (también es el valor por defecto si activadorVacio=true).
 * @param {number} max - Valor máximo aceptado.
 * @param {boolean} activadorVacio - Si es true, permite entrada vacía retornando min.
 * @returns {number} Número validado ingresado por el usuario.
 * 
 * @example
 * const opcion = pedirNumero("Seleccione opción", 1, 5, false);
 * const estado = pedirNumero("Estado (Enter=Pendiente)", 1, 4, true);
 */
export function pedirNumero(mensaje: string, min: number, max: number, activadorVacio: boolean): number {
    console.log(mensaje);

    if (activadorVacio) {
        console.log(` (Opciones ${min}-${max}. Enter para seleccionar: ${min})`);
    } else {
        console.log(` (Ingrese un valor entre ${min} y ${max})\n`);
    }

    let entrada: string = prompt(" > ")?.trim() || "";

    if (entrada === "" && activadorVacio) {
        return min;
    }

    let numero = parseInt(entrada);

    while (!validarRango(numero, min, max)) {
        if (entrada === "" && activadorVacio) {
            return min;
        }
        console.log(" [!] Entrada inválida.");

        entrada = prompt(" Intente nuevamente: > ")?.trim() || "";
        numero = parseInt(entrada);
    }

    return numero;
}

/**
 * Solicita una confirmación binaria (Sí/No) al usuario.
 * 
 * Función impura que captura y valida respuestas Y/N de forma case-insensitive.
 * Continúa solicitando hasta obtener una respuesta válida.
 * 
 * @function Confirmacion
 * @param {string} mensaje - Pregunta a mostrar al usuario.
 * @returns {number} 1 si la respuesta es 'Sí' (Y), 0 si es 'No' (N).
 * 
 * @example
 * const confirmado = Confirmacion("¿Desea guardar los cambios?");
 * if (confirmado === 1) {
 *   guardarCambios();
 * }
 */
export function Confirmacion(mensaje: string): number {
    let salida: number;

    console.log(`\n ${mensaje}`);
    console.log("   [Y] Sí   [N] No\n");

    let input: string = prompt(" > ")?.trim().toLowerCase() || "";

    while (!esRespuestaConfirmacion(input)) {
        console.log(" [!] Opción inválida. Por favor escriba 'Y' o 'N'.");
        input = prompt(" > ")?.trim().toLowerCase() || "";
    }

    if (input == "y") {
        salida = 1;
    }
    else {
        salida = 0;
    }

    return salida
}

/**
 * Valida la integridad de un título para una nueva tarea.
 * 
 * Función pura que verifica tres criterios:
 * 1. No está vacío ni contiene solo espacios
 * 2. No excede los 100 caracteres
 * 3. No existe ya en la lista de tareas 
 * 
 * @function esTituloValido
 * @param {string} titulo - Título propuesto a validar.
 * @param {Tarea[]} tareas - Lista de tareas existentes para verificar duplicados.
 * @returns {boolean} true si el título es válido, false en caso contrario.
 * 
 * @example
 * if (esTituloValido("Nueva tarea", tareas)) {
 *   crearTarea(titulo);
 * }
 */
export function esTituloValido(titulo: string, tareas: Tarea[]): boolean {
    if (!titulo || titulo.trim().length === 0 || titulo.length > 100) {
        return false;
    }
    return !tareas.some(t => t.getTitulo().toLowerCase() === titulo.toLowerCase());
}

/**
 * Valida la longitud de una descripción de tarea.
 * 
 * Función pura que verifica que la descripción no exceda el límite de caracteres.
 * Las descripciones vacías son válidas (campo opcional).
 * 
 * @function esDescripcionValida
 * @param {string} descripcion - Descripción a validar.
 * @returns {boolean} true si tiene 500 caracteres o menos, false si excede.
 * 
 * @example
 * if (!esDescripcionValida(texto)) {
 *   console.log("La descripción es muy larga");
 * }
 */
export function esDescripcionValida(descripcion: string): boolean {
    return descripcion.length <= 500;
}

/**
 * Valida que una fecha de vencimiento sea posterior a la fecha actual.
 * 
 * Función pura que compara dos fechas para asegurar que el vencimiento
 * no esté en el pasado.
 * 
 * @function esfechaValida
 * @param {Date} fecha - Fecha de vencimiento propuesta.
 * @param {Date} hoy - Fecha actual de referencia.
 * @returns {boolean} true si la fecha es futura, false si es pasada o actual.
 * 
 * @example
 * const vencimiento = new Date("2025-12-31");
 * if (esfechaValida(vencimiento, new Date())) {
 *   asignarFecha(vencimiento);
 * }
 */
export function esfechaValida(fecha: Date, hoy: Date): boolean {
    return fecha > hoy;
}
