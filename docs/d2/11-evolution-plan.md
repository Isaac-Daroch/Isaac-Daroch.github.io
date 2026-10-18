# 11 — Migración, secuencia de construcción y cambios trazables

Control: D2 · 18-10-2026 · secuencia de trabajo, sin plazos ni resultados inventados. La revisión actual elabora documentación y controles documentales, no cierra toda la aplicación.

## Incremento I0 — Adoptar la base y recuperar el árbol

Producto: D2, registro de divergencias y fuente completa identificada. Conservar D1 como historia. Recuperar el ZIP/árbol de remediación y verificar sus bytes; no reconstruirlo exclusivamente a partir de fragmentos de conversación. Aplicar parches solo contra origen conocido o, preferiblemente, convertirlos en diff revisable. Clasificar instrucciones no aplicadas. Puerta: G0/G1. No necesita instalar sobre el PC del titular.

## I1 — Aislamiento del núcleo, sin funciones nuevas

Corregir snapshot y mantener RF-05…RF-12. Introducir fachada de sesión/snapshot sin cambiar BFS, sensor o política. Adaptar DOM a valores públicos. Mover dominio/casos de uso y agregar comprobación de imports/ciclos. Probar con adaptador headless. Asociar RF-11, RQ-12/RQ-17, H-11/H-12 y ADR-04/ADR-09. Puerta: G2 parcial. Si cambia una trayectoria, detener y explicar antes de aceptar.

## I2 — Contratos v1/v2 y evidencia

Integrar esquema completo y validador semántico con límites de recursos y salida. Descargar e importar episodios reales en navegador; evitar crecimiento cuadrático del trace. Conservar fixtures v1 sin fingir upgrade. Asociar RF-21/RF-22, RQ-18, DEV-03/DEV-06 y ADR-04. Puerta: contrato completo y casos negativos. No confundir consistencia con autenticidad.

## I3 — Resolver la discrepancia experimental

Implementar P-REVISION según RF-23 con política separada, mismo desempate y guard físico. Mantener P-TIEBREAK como RF-24 opcional. Publicar nombres y límites diferentes. Revisar métricas que dejaron de ser equivalentes; versionar. Asociar DEV-01 y ADR-11. No introducir aprendizaje entrenado para maquillar una comparación educativa.

## I4 — Integridad del build y procedencia

Integrar normalización Quarto, render limpio, manifiestos y promoción recuperable. Registrar herramientas efectivas y fuente real (árbol limpio o hash completo), no solo HEAD. Resolver lockfile y comprobarlo contra package. Probar con renderer real y stubs de fallo por separado. Asociar RF-03, RQ-01…RQ-04, H-02…H-07, DEV-07 y ADR-02/ADR-03/ADR-06. Puerta: G3.

## I5 — Experiencia completa y accesibilidad

Integrar política de movimiento, no-JS, navegación, impresión y presentación textual. Evaluar autoarranque condicional frente a opt-in sin retirar animaciones/escena. Medir dist y tareas en móvil. Conservar alcance RF-26. Asociar RF-13/RF-14, RQ-07…RQ-10/RQ-14, DEV-02/DEV-05 y ADR-05/ADR-10. Puerta: G4, incluidos ensayos manuales documentados.

## I6 — Instalación y recuperación Windows

Ejecutar fixture de repositorio, inventarios y fallos para todas las entradas gestionadas. Verificar `.gitignore`, entradas nuevas y cambios locales; proteger .git. Asociar RF-18/RF-20, RQ-04 y ADR-08. Puerta: G5. Solo después generar instalador de entrega y un comando de una línea. No pedir al titular que depure reemplazos sobre su única copia.

## I7 — Catálogo, manuales y release

Unificar fuentes y estados editoriales, completar avisos de licencia con decisión del titular, generar ejemplos del motor correcto, actualizar guías y trazabilidad por commit. Asociar RF-04/RF-16/RF-25, RQ-13/RQ-15/RQ-16 y ADR-07/ADR-12. Puerta: G6. Publicación solo tras autorización, smoke y ruta de rollback G7.

## Política de integración

Un incremento pequeño puede resolver un riesgo sin esperar todo I7, pero su estado no se anuncia como release completa. No mezclar la rama documental con main por la mera existencia de un ZIP documental. La aplicación y su documentación deben integrarse en un cambio de producto revisable, manteniendo la aceptación editorial aparte.

## Registro de una modificación

Plantilla mínima: motivo; requisito; estado antes/después; IF/M/ADR; contrato; comportamiento observable; diff y fuente; prueba/oráculo; ejecución y alcance; manuales; riesgo residual; reversión. Las decisiones costosas registran alternativas. Las decisiones menores no necesitan un ADR por línea, pero sí deben respetar los existentes.

## Cuándo volver a la arquitectura

Revisar cuando un nuevo requisito exige persistencia, cómputo remoto, varias personas editando, escenarios experimentales externos, otra plataforma de entrega o conflictos medidos entre experiencia y presupuesto. No revisar toda la arquitectura por un enlace roto. No mantener una decisión solo porque ya tiene un documento: registrar sustitución y conservar contexto histórico.

## Resultado de esta revisión

D2 define principios, objetivos, restricciones, requisitos, escenarios, macroelementos, contratos, decisiones, divergencias y pruebas. Su verificador hace control documental ejecutable. La aceptación del producto continúa abierta hasta integrar fuente completa y ejecutar las puertas correspondientes. Esa separación permite trabajar con rigor sin fingir que un documento sustituye el software.
