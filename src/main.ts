import PromptSync from "prompt-sync";
const prompt = PromptSync();

import { gestor } from "./logica/Gestor";
import { menu, menuConsultas, menuEstad } from "./Interfaz/Consola";
import { vertarea } from "./Funcionalidades/VerMisTareas";
import { CrearTarea } from "./Funcionalidades/CrearTarea";
import { pedirNumero } from "./Funcionalidades/Verificadores";
import { BusquedaTitulo } from "./funcionalidades-Puras/FiltroSegunEstado";
import { mostrarTitulos, mostrarTareaCompletas } from "./Interfaz/consolaTarea";
import { manejoConsultas, manejoEliminar, manejoEstadisticas } from "./logica/FlujodeNegocio";
import { DIFICULTADES_TAREA, ESTADOS_TAREA } from "./models/Tarea";

/**
 * Función principal que ejecuta el bucle de la aplicación.
 * 
 * Inicializa el gestor de tareas y presenta un menú interactivo
 * que permite al usuario navegar por todas las funcionalidades
 * del sistema hasta que decide salir.
 * 
 * Funcionalidades disponibles:
 * 1. Ver tareas - Visualización con filtrado y ordenamiento
 * 2. Buscar tarea - Búsqueda por título exacto
 * 3. Agregar tarea - Wizard de creación paso a paso
 * 4. Eliminar tarea - Borrado lógico de tareas
 * 5. Estadísticas - Métricas sobre la colección
 * 6. Consultas extras - Análisis avanzado (prioridades, relaciones)
 * 7. Salir - Cierra la aplicación
 */
function main(): void {
    const gestorTareas = new gestor("GuardadoDeTareas");

    let input: number;
    let ESTADOS = ESTADOS_TAREA;
    let DIFICULTAD = DIFICULTADES_TAREA;

    do {
        console.clear();

        input = pedirNumero(menu(), 1, 7, false);

        console.clear();

        switch (input) {
            case 1:
                if (gestorTareas.getItems().length !== 0) {
                    vertarea(gestorTareas);
                } else {
                    console.log("\n [!] No hay tareas para mostrar.");
                    prompt("\n Presione Enter para continuar...");
                }
                break;

            case 2:
                if (gestorTareas.getItems().length == 0) {
                    console.log(" No hay tareas disponibles.");
                }
                else {
                    const titulos = mostrarTitulos(gestorTareas.getItems());
                    console.log("Listado de Tareas:\n");
                    console.log(titulos);
                    let tituloBuscar = prompt("\n Ingrese el título de la tarea a buscar: ").trim();
                    const tareaEncontrada = BusquedaTitulo(gestorTareas.getItems(), tituloBuscar);
                    if (tareaEncontrada) {
                        console.log("Tarea encontrada:");
                        console.log(mostrarTareaCompletas(tareaEncontrada));
                    } else {
                        console.log("No se encontró ninguna tarea con ese título.");
                    }
                    prompt("\n Presione Enter para continuar...");
                }
                break;

            case 3:
                gestorTareas.addItem(CrearTarea(gestorTareas.getItems()));

                console.log("\n [OK] Tarea guardada en el sistema.");
                prompt("\n Presione Enter para continuar...");
                break;

            case 4:
                if (gestorTareas.getItems().length == 0) {
                    console.log(" No hay tareas disponibles.");
                    prompt("\n Presione Enter para continuar...");
                } else {
                    let tareas = gestorTareas.getItems();
                    console.log(mostrarTitulos(tareas))
                    const Eliminar = pedirNumero("Ingrese la tarea que desea eliminar: ", 1, tareas.length, false);
                    let resultadoEliminacion = manejoEliminar(gestorTareas, gestorTareas.getItems()[Eliminar - 1]);
                    console.log(resultadoEliminacion);
                    prompt("\n Presione Enter para continuar...");
                }
                break;
            case 5:
                if (gestorTareas.getItems().length == 0) {
                    console.log(" No hay tareas disponibles.");
                    prompt("\n Presione Enter para continuar...");
                } else {
                    input = pedirNumero(menuEstad(), 1, 4, false);
                    let estadisticas = manejoEstadisticas(input, gestorTareas.getItems(), ESTADOS, DIFICULTAD);
                    console.log(estadisticas);
                    prompt("\n Presione Enter para continuar...");
                }

                break;
            case 6:
                if (gestorTareas.getItems().length == 0) {
                    console.log(" No hay tareas disponibles.");
                    prompt("\n Presione Enter para continuar...");
                } else {
                    input = pedirNumero(menuConsultas(), 1, 5, false);
                    let resultado = manejoConsultas(input, gestorTareas.getItems(), new Date());
                    console.log(resultado);
                    prompt("\n Presione Enter para continuar...");
                }
                break;
            case 7:
                console.log("\nCerrando aplicación... ¡Hasta luego!\n");
                break;
        }

    } while (input !== 7);
}

main();
