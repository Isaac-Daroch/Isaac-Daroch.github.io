# 07 — Reconciliación de requisitos, parches y evidencia

Control: D2 · 18-10-2026. Revisión estática de D1, cinco parches y checkpoint remoto; no nueva ejecución del producto. El registro canónico de desviaciones está en `registers/deviations.json`.

## Hechos de partida

El dossier describe el ZIP con hash 7a416e7a…9659a3e. La rama remota examinada declara explícitamente que no contiene la aplicación remediada completa. Los parches son scripts Python que escriben archivos o aplican `str.replace`; se pueden inspeccionar sus intenciones e instrucciones, pero su existencia no prueba que cada sustitución haya coincidido con el árbol al que se aplicó. No se tiene en esta revisión una nueva identidad verificada del árbol completo de salida.

El checkpoint registra 25 pruebas del núcleo y construcción real de Quarto/Astro seguida de fallo por tres enlaces. Eso es evidencia histórica referida, no un build D2 aprobado. La corrección remota de enlaces necesita integración con el árbol completo y repetición de la cadena.

## DEV-01 — Variable experimental sustituida

**Especificación:** D1 I §10.2 compara política sin revisión con política revisable. **Parche:** `STRATEGIES = ['bfs-east','bfs-north']`; `compareStrategies` invierte vecinos y mantiene revisión. **Diagnóstico:** es otro experimento, no implementación de la necesidad original.

**Tratamiento:** RF-23 conserva revisión/congelamiento; RF-24 identifica desempate. ADR-11 y protocolo 09 impiden intercambiar sus resultados. **Estado:** desviación abierta; documentarla no implementa RF-23. **Cierre:** código y pruebas de ambas políticas bajo controles comunes, o retiro explícito de RF-23 aprobado por titular. No borrar un requisito para obtener una matriz verde.

## DEV-02 — Autoarranque 3D transformado en opt-in

**Fuente:** `patch_core.py`, sección '3D is opt-in on every device'. **Diagnóstico:** cambio de experiencia relevante respecto al encargo dinámico; no simple corrección invisible. **Tratamiento:** RF-26 mantiene obligación de experiencia visual; ADR-10 separa modos y su costo. **Estado:** revisión de experiencia pendiente. **Cierre:** comparación con presupuesto y comprensión, elección del titular y prueba de preferencias. No retirar la escena.

## DEV-03 — Exportación de UI cambia a v2

**Fuente:** `patch_ui.py`, botón 'Export episode v2'; núcleo conserva `export()` v1 y añade `exportEpisode()`. **Diagnóstico:** ampliación compatible a nivel de método no equivale a descarga compatible por defecto. **Tratamiento:** RF-11 v1, RF-21 v2 y RF-22 replay; documentar formato visible, consumidores y rechazo de v1 en replay. **Cierre:** fixtures de ambos contratos, aviso de cambio y pruebas del archivo descargado real.

## DEV-04 — Encapsulación todavía no equivale a hexagonal

**Fuente:** adaptador generado sigue leyendo `world.trueWalls`, `world.agent`, `world.path` y otros campos; núcleo/casos de uso no están reorganizados ni validados como módulo público. **Diagnóstico:** corregir alias de exportación no encapsula todo el estado. **Tratamiento:** RQ-17, ADR-09, fachada y snapshot compartido por vistas. **Cierre:** adaptadores no acceden/escriben internals, imports permitidos, mismo comportamiento headless. No renombrar la arquitectura sin este cambio.

## DEV-05 — Presupuestos del parche sin evaluación propia

**Fuente:** 1 MiB y 1001 comandos de replay; 1000 pasos; timeout 180000 ms; guard de 24 ms durante 12 renders. **Diagnóstico:** son valores implementados/propuestos, no resultados ni presupuestos ratificados. **Tratamiento:** QAS-07/QAS-09/QAS-12 registran origen y límite. **Cierre:** medir consumo y errores de frontera, justificar umbrales y documentar hardware. El tiempo alrededor de renderer.render mide envío CPU y no demuestra costo GPU total.

## DEV-06 — Esquema v2 estructural incompleto

**Fuente:** `patch_quality.py` crea schema con `initial` como objeto y métricas/estado poco restringidos; el replay valida por reconstrucción y comparación. **Diagnóstico:** existe defensa semántica útil, pero no un JSON Schema completo intercambiable que otro consumidor pueda usar solo. **Tratamiento:** RQ-18 exige estructura de campos más invariantes semánticas; no anunciar que el esquema por sí solo valida todo. **Cierre:** negativos estructurales, límites y comparación semántica versionada.

## DEV-07 — Fuente de versiones y procedencia del artefacto

**Fuente:** wrapper de build escribe `toolchain.reference` en manifiesto, mientras preflight registra herramientas efectivas; `verify-dist` acepta HEAD aunque no compruebe árbol limpio. **Diagnóstico:** referencia no equivale a versión ejecutada; HEAD no identifica por sí solo cambios sin commit. **Tratamiento:** RQ-03 exige hash de fuentes efectivas o árbol limpio, versiones observadas y dist vinculado. **Cierre:** prueba con árbol sucio y herramienta distinta no puede producir procedencia falsamente idéntica. Diferenciar hash de contenido, identidad de fuente y timestamp.

## DEV-08 — Parches por sustitución sin comprobación de coincidencias

**Fuente:** `str.replace` y cortes por `.index` en patch_core/UI/build. **Diagnóstico:** algunas ausencias abortan; otras sustituciones sin coincidencia son silenciosas. No se prueba que haya ocurrido un fallo real, pero el mecanismo no garantiza aplicación completa en otra base. **Tratamiento:** usar diff/commit revisable contra hash de origen; precondiciones y postcondiciones si se conserva generador. **Cierre:** base incompatible rechazada antes de mutaciones y prueba de árbol final. No distribuir estos scripts como instalador Windows.

## DEV-09 — Resultados y documentación quedaron desacoplados

**Fuente:** checkpoint remoto y dossier D1 conservan estados distintos; parches suprimen reportes históricos en la copia sin un catálogo D2 de procedencia. **Diagnóstico:** no se deben trasladar aprobaciones antiguas ni perderlas sin archivo histórico. **Tratamiento:** RQ-15 y ADR-12, registro por identidad de fuente y alcance, pruebas documentales separadas de pruebas de producto. **Cierre:** cada afirmación verified enlaza reporte existente con método/entorno/versiones. D2 no genera esos reportes de producto por inferencia.

## DEV-10 — Verificación editorial tiene dimensiones distintas

**Fuente:** catálogo del parche conserva referencia pero fija `verifiedAt:null` y `source-recorded`, mientras D1 registraba consulta institucional. **Diagnóstico:** prudencia válida, pero no debe borrar la procedencia histórica ni mezclar publicación, verificación de metadatos y aprobación para mostrar. **Tratamiento:** ADR-07, CAT-01, RQ-13; conservar referencia a D1 y registrar alcance nuevo pendiente. **Cierre:** estados separados y todos los formatos consistentes; no volver a verificar el estudio por una operación de software.

## Evidencia adicional de riesgo, no defecto reproducido

El trace del replay guarda snapshots con historial acumulado para cada comando. Para episodios largos podría crecer más que linealmente en memoria; el límite de entrada no basta para limitar esa salida. Es una inferencia de la implementación observada y debe probarse antes de convertirla en hallazgo de rendimiento. RQ-18 exige presupuesto de salida y prueba del límite.

La restauración propuesta incluye diario y cuarentena, pero no se acredita un simulacro Windows por leer sus funciones. La validación de payload no implica recuperación completa. Los controles operativos permanecen pendientes en RF-18/RF-20/RQ-04.

## Qué se conserva

Separación histórica de motor/DOM, reglas educativas, honestidad científica, tres áreas de investigación, lectura estática, publicación manual, fallback visual y tests útiles. No se deshace todo porque haya desviaciones. La migración debe minimizar cambio simultáneo y conservar comportamiento observable que ya esté soportado por evidencia.

## Conclusión de reconciliación

D2 cierra la falta de registro de estas discrepancias y define su tratamiento. No cierra su implementación. La siguiente intervención de código se juzga contra esta línea base y conserva las diferencias abiertas hasta que exista evidencia pertinente.
