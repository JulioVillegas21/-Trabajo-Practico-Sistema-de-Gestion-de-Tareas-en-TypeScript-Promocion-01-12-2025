
import PromptSync from "prompt-sync";
import { DIFICULTADES_TAREA, Tarea, ESTADOS_TAREA } from "../models/Tarea";
import { OrdenTareasASC, VerMisTareas, EditarY_N, PreguntaEditar, obtenerListaEstados, obtenerListaDificultades } from "../Interfaz/Consola";
import { pedirNumero, Confirmacion, esfechaValida, esTituloValido, esDescripcionValida } from "./Verificadores";
import { gestor } from "../logica/Gestor";
import { filtroBusqueda, filtrarTodas } from "../funcionalidades-Puras/FiltroSegunEstado"
import { OrdenadorTareas } from "../funcionalidades-Puras/ObjetoOrdenamiento";
import { mostrarTitulos, mostrarTareaCompletas } from "../Interfaz/consolaTarea";
const prompt = PromptSync();

/**
 * Gestiona el flujo completo de visualización y edición de tareas.
 * 
 * Esta función impura implementa una interfaz de usuario interactiva
 * que guía al usuario a través de las siguientes etapas:
 * 
 * 1. **Filtrado**: Selección de tareas por estado (Todas/Pendientes/En curso/Terminadas)
 * 2. **Ordenamiento**: Criterio de ordenación (Título/Vencimiento/Creación/Dificultad)
 * 3. **Selección**: Elección de tarea específica de la lista filtrada
 * 4. **Visualización**: Muestra detallada de la tarea seleccionada
 * 5. **Edición**: Modificación opcional de cualquier campo de la tarea
 * 
 * @function verMisTareas
 * @param {gestor} tareas - Instancia del gestor que administra la colección de tareas.
 * @returns {void}
 * 
 * @example
 * if (gestorTareas.getItems().length > 0) {
 *   verMisTareas(gestorTareas);
 * }
 */
function verMisTareas(tareas: gestor): void {
    console.clear();

    let todasLasTareas: Tarea[] = tareas.getItems();
    let opcionVerTareas: number;
    const Ordenador = new OrdenadorTareas;
    let tareasfiltradas: Tarea[] = [];
    let tareasfiltradasOrdenanadas: Tarea[] = [];
    let tareaSeleccionada: Tarea;
    let validacion: boolean;
    let index: number;
    let dato: string;
    let datonumerico: number;
    let datoFecha: Date;

    console.log(VerMisTareas());

    opcionVerTareas = pedirNumero("", 1, 5, false);

    switch (opcionVerTareas) {
        case 1:
            tareasfiltradas = filtrarTodas(tareas.getItems());
            break;
        case 2:
            tareasfiltradas = filtroBusqueda(tareas.getItems(), ESTADOS_TAREA[0]);
            break;
        case 3:
            tareasfiltradas = filtroBusqueda(tareas.getItems(), ESTADOS_TAREA[1]);
            break
        case 4:
            tareasfiltradas = filtroBusqueda(tareas.getItems(), ESTADOS_TAREA[2]);
            break;
        case 5:
            console.log("\n Volviendo al menú principal...");
            prompt("\n Presione Enter para continuar...");
            return;
    }

    console.clear();
    console.log(OrdenTareasASC());
    opcionVerTareas = pedirNumero("", 1, 5, false);

    switch (opcionVerTareas) {
        case 1:
            tareasfiltradasOrdenanadas = Ordenador.porTitulo(tareasfiltradas);
            break;
        case 2:
            tareasfiltradasOrdenanadas = Ordenador.porFechaVencimiento(tareasfiltradas);
            break;
        case 3:
            tareasfiltradasOrdenanadas = Ordenador.porFechaCreacion(tareasfiltradas);
            break;
        case 4:
            tareasfiltradasOrdenanadas = Ordenador.porDificultad(tareasfiltradas, DIFICULTADES_TAREA)
            break;
    }

    console.clear();
    console.log("\n========================================");
    console.log("       RESULTADOS DE LA BÚSQUEDA        ");
    console.log("========================================\n");

    console.log(mostrarTitulos(tareasfiltradasOrdenanadas));

    if (tareasfiltradasOrdenanadas.length === 0) {
        console.log("\n [i] No se encontraron tareas con ese criterio.");
        prompt("\n Presione Enter para continuar...");
        return;
    }

    console.log("\n----------------------------------------");

    index = pedirNumero("Indique la tarea que desea visualizar", 1, tareasfiltradasOrdenanadas.length, false);

    console.clear();

    tareaSeleccionada = tareasfiltradasOrdenanadas[index - 1];

    console.log(mostrarTareaCompletas(tareaSeleccionada));

    prompt("\n Presione Enter para continuar...");

    opcionVerTareas = Confirmacion(EditarY_N())

    if (opcionVerTareas == 0) {
        console.clear();
        console.log("Volviendo al menu")
        prompt("\n Presione Enter para continuar...");
        return;
    }

    do {
        console.clear();

        console.log(mostrarTareaCompletas(tareaSeleccionada));

        validacion = true;

        opcionVerTareas = pedirNumero(PreguntaEditar(), 1, 6, false);
        let fechaVencimien: Date;
        switch (opcionVerTareas) {

            case 1:
                console.clear();
                dato = prompt("Ingrese el título de la tarea (max 100 caracteres): ")?.trim() || "";

                while (!esTituloValido(dato, tareas.getItems())) {
                    console.log("\n [!] Título inválido. Intente nuevamente.")
                    dato = prompt("Ingrese el título de la tarea (max 100 caracteres): ")?.trim() || "";
                }

                tareaSeleccionada.setTitulo(dato);
                tareaSeleccionada.setEdicion();

                prompt("\n Presione Enter para continuar...");
                break;

            case 2:
                console.clear();
                dato = prompt("Ingrese la descripción (Opcional, max 500 caracteres): ")?.trim() || "";

                while (!esDescripcionValida(dato)) {
                    console.log("\n [!] Descripción inválida. Intente nuevamente.")
                    dato = prompt("Ingrese la descripción (max 500 caracteres): ")?.trim() || "";
                }
                tareaSeleccionada.setDescripcion(dato);
                tareaSeleccionada.setEdicion();

                prompt("\n Presione Enter para continuar...");
                break;

            case 3:
                console.clear();

                console.log(obtenerListaEstados)

                datonumerico = pedirNumero("Seleccione el nuevo estado actual - Apretar ENTER la dejara en pendiente -", 1, ESTADOS_TAREA.length, true);

                tareaSeleccionada.setEstado(ESTADOS_TAREA[datonumerico - 1]);
                tareaSeleccionada.setEdicion();

                prompt("\n Presione Enter para continuar...");
                break;

            case 4:
                console.clear();

                console.log(obtenerListaDificultades);

                datonumerico = pedirNumero("Seleccione la nueva dificultad. - Apretar ENTER la dejara en Baja: ⭐ - ", 1, DIFICULTADES_TAREA.length, true);

                tareaSeleccionada.setDificultad(DIFICULTADES_TAREA[datonumerico - 1]);
                tareaSeleccionada.setEdicion();

                prompt("\n Presione Enter para continuar...");
                break;

            case 5:
                console.clear();
                do {
                    console.log("\n--- Ingrese la fecha ---");

                    let año: number = pedirNumero("Porfavor indique el año de vencimiento\n", 2025, 2035, false);
                    let mes: number = pedirNumero("Porfavor indique el mes de vencimiento \n", 1, 12, false);
                    let dia: number = pedirNumero("Porfavor indique el dia de vencimiento \n", 1, 31, false);

                    fechaVencimien = new Date(año, mes - 1, dia);
                } while (!esfechaValida(fechaVencimien, new Date()));
                tareaSeleccionada.setEdicion();
                prompt("\n Presione Enter para continuar...");
                break;

            case 6:
                console.clear();
                tareas.actItem();
                console.log("Volviendo al menu principal");
                prompt("\n Presione Enter para continuar...");
                validacion = false;
                break;
        }
    } while (validacion);

}

export { verMisTareas as vertarea };
