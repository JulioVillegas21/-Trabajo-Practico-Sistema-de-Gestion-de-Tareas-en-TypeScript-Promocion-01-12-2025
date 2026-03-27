import { Tarea } from "../models/Tarea";
const Logic = require('logicjs');

/**
 * Destructuración de operadores lógicos de la biblioteca logicjs.
 * - lvar: Crea variables lógicas (incógnitas a resolver)
 * - eq: Operador de unificación/igualdad
 * - and: Conjunción lógica (todas las condiciones deben cumplirse)
 * - or: Disyunción lógica (al menos una condición debe cumplirse)
 * - run: Ejecuta el motor de inferencia y retorna soluciones
 */
const lvar = Logic.lvar,
    eq = Logic.eq,
    and = Logic.and,
    or = Logic.or,
    run = Logic.run;

/**
 * Calcula la diferencia en días entre dos fechas.
 * 
 * Esta es una función pura auxiliar que convierte la diferencia
 * de milisegundos a días completos redondeados hacia arriba.
 * 
 * @function calcularDiasRestantes
 * @param {Date} fechaVencimiento - Fecha límite de la tarea.
 * @param {Date} fechaActual - Fecha de referencia para el cálculo.
 * @returns {number} Número de días restantes (puede ser negativo si está vencida).
 * 
 * @example
 * const hoy = new Date();
 * const limite = new Date("2025-12-31");
 * const dias = calcularDiasRestantes(limite, hoy);
 */
function calcularDiasRestantes(fechaVencimiento: Date, fechaActual: Date): number {
    const diffTiempo = fechaVencimiento.getTime() - fechaActual.getTime();
    const diffDias = Math.ceil(diffTiempo / (1000 * 60 * 60 * 24));
    return diffDias;
}

/**
 * Infiere la prioridad de una tarea usando reglas lógicas declarativas.
 * 
 * Implementa un sistema experto básico que evalúa:
 * - La proximidad de la fecha de vencimiento
 * - El nivel de dificultad de la tarea
 * 
 * Las reglas se definen usando programación lógica con logicjs,
 * permitiendo una especificación declarativa del conocimiento.
 * 
 * @function asignarPrioridadLogica
 * @param {Tarea} tarea - La tarea a evaluar.
 * @param {Date} fechaActual - Fecha de referencia para los cálculos.
 * @returns {string} Nivel de prioridad inferido: "Alta", "Media" o "Baja".
 * 
 * @example
 * const prioridad = asignarPrioridadLogica(miTarea, new Date());
 * console.log(`Prioridad asignada: ${prioridad}`);
 * 
 * @description
 * Reglas de inferencia implementadas:
 * 
 * - ALTA: Vence en ≤4 días Y Dificultad Alta
 * - MEDIA: Vence en ≤8 días Y Dificultad Media
 * - BAJA: Vence en >8 días Y Dificultad Baja
 * - DEFAULT: Si ninguna regla aplica, retorna "Baja"
 */
function asignarPrioridadLogica(tarea: Tarea, fechaActual: Date): string {
    const dificultad: string = tarea.getDificultad();
    const vencimiento: Date | undefined = tarea.getFechaVencimiento();

    if (!vencimiento) {
        return "Media";
    }

    const diasRestantes: number = calcularDiasRestantes(vencimiento, fechaActual);

    const P = lvar();

    const reglaAlta = and(
        eq(diasRestantes <= 4, true),
        eq(dificultad, 'Alta: ⭐⭐⭐'),
        eq(P, "Alta")
    );

    const reglaMedia = and(
        eq(diasRestantes <= 8, true),
        eq(dificultad, 'Media: ⭐⭐'),
        eq(P, "Media")
    );

    const reglaBaja = and(
        eq(diasRestantes > 8, true),
        eq(dificultad, 'Baja : ⭐'),
        eq(P, "Baja")
    );

    const consulta = or(reglaAlta, reglaMedia, reglaBaja);
    const resultados: string[] = run(consulta, P);

    if (resultados.length > 0) {
        return resultados[0];
    }

    return "Baja";
}

export { asignarPrioridadLogica, calcularDiasRestantes };
