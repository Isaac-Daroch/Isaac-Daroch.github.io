# 08 — Validación, evidencias y puertas de aceptación

Control: D2 · 18-10-2026. Este capítulo es plan y reglas de interpretación. Los resultados del verificador documental se producen en CI; los resultados históricos de producto pertenecen a su checkpoint, no a una ejecución D2.

## Capas de verificación

| Capa | Qué comprueba | Qué no demuestra |
|---|---|---|
| Documentación | IDs, aceptación, relaciones, estados y conservación de referencias | Cumplimiento funcional del sitio |
| Dominio | Transiciones, planificación, copia, reproducción e invariantes | DOM, instalación o publicación |
| Arquitectura | Grafo de imports, encapsulación, sustitución de adaptadores | Comprensión humana o calidad editorial |
| Contrato de build con stub | Orquestación, fallos, copia y promoción | Salida auténtica de Quarto |
| Build real | Resolución, render y artefacto combinado | Navegación en todas las condiciones ni deploy |
| Navegador sobre dist | Rutas, controles, imports, descarga, teclado, estados | Windows installer ni disponibilidad pública |
| Operación Windows | Instalación, fallos y restauración de copia | Otros equipos o daño físico universal |
| Post-publicación | Rutas e identidad del artefacto servido | Validez científica de publicaciones |
| Editorial/usuarios | Exactitud autorizada y comprensión de tareas | Seguridad absoluta o éxito profesional |

## Qué es una evidencia aceptable

Cada resultado identifica ID de prueba, versión de especificación, commit o hash efectivo de fuentes, artefacto, fecha, herramientas, OS/navegador, comandos, datos, esperado/observado, salida y alcance. Un log sin asociación de versión es antecedente, no cierre. Un reporte vacío con `passed:true` no es evidencia suficiente. Capturas complementan, no sustituyen resultados.

Los datos públicos de release excluyen rutas personales. Los logs completos que contengan rutas se guardan como artefactos adecuados y se publican solo tras revisión. Los hashes prueban igualdad de bytes respecto a una referencia, no autenticidad si el atacante controla referencia y archivo.

## Puertas de trabajo

**G0 — Línea base documental:** objetivos/IF/M/RF/RQ/ADR/contratos y pruebas enlazados; desviaciones visibles. Su aprobación habilita implementación, no publicación.

**G1 — Identidad del código:** recuperar fuente completa, inventariar, comparar con D1 y parches, registrar modificaciones. No adoptar un árbol parcial remoto como aplicación completa.

**G2 — Conformidad del núcleo:** regresión de D1, copia independiente, contratos v1/v2, replay acotado y separación del experimento. Tests de arquitectura sobre árbol real. Un cambio de carpetas no cierra esta puerta.

**G3 — Construcción reproducible:** lockfile consistente, herramientas efectivas, instalación limpia y Quarto/Astro reales, salida inventariada y enlaces correctos. Si postbuild falla, el pipeline falla aunque cada compilador devuelva 0.

**G4 — Experiencia real:** tareas sobre dist con JS/no-JS, movimiento, móvil, impresión, foco y fallos de escena; mediciones de rendimiento y evaluación visual frente a RF-26. Prueba automática de accesibilidad más tareas manuales.

**G5 — Recuperación:** Windows en copia, interrupciones e inventarios antes/después; documentos suficientes para otra persona. No usar el único árbol del titular.

**G6 — Editorial y licencia:** identidad, fuentes, estado de publicaciones, límites de demo, retrato y derechos. Aprobación explícita para el contenido de esa versión. No asignar MIT a todo por defecto.

**G7 — Publicación y smoke:** desplegar artefacto aprobado, verificar identidad y rutas públicas; registrar rollback. Esta revisión D2 no publica.

## Definition of Ready

Un cambio está preparado cuando especifica necesidad/ID, comportamiento observable, contrato afectado, riesgos, prueba, datos y criterio de reversión. Para arquitectura, existe ADR que explica ganancia/costo. Para una comparación, existe variable experimental identificada. Para un cambio visual, existe recorrido y presupuesto que preservan el objetivo.

## Definition of Done

Código integrado en una versión identificable; pruebas pertinentes ejecutadas; docs/catálogo/protocolo actualizados; evidencias con alcance; desviaciones resueltas o aceptadas explícitamente; no regresión de comportamiento ajeno. La aceptación del ítem es distinta de autorización de publicar el sitio completo. No se cierra un ítem únicamente porque el commit lo mencione.

## Pruebas de producto planificadas

T-01…T-36 mantienen correspondencia D1. T-37…T-44 cubren extensiones D2. Los procedimientos, oráculos y evidencias esperadas están en el catálogo canónico y la vista generada. La ejecución registra cada caso por separado aunque un mismo comando cubra varios. La relación muchos-a-muchos puede ampliarse sin cambiar IDs.

Probar dominios con datos válidos e inválidos: coordenadas fuera de rango, NaN, fracciones, origen/meta bloqueados, origen igual a meta, estado terminal y entradas inmutables. Replay: versión desconocida, comando extra, intervención inválida, resultado alterado, campo inesperado, bytes excesivos y estructura profunda. Build: nota ausente, archivo inesperado, symlink, error de renderer, timeout y promoción fallida. UI: inicialización incompleta, error de storage, navegación móvil y descarga de JSON real.

## Verificador de documentación D2

`tools/governance/validate_d2.py` valida estructura del catálogo, conservación de IDs, referencias a principios/módulos/ADR/pruebas, aceptación no vacía, estados permitidos y evidencia necesaria para declarar verificación. Genera catálogo, matriz CSV, registro de desviaciones, Markdown consolidado y una guía HTML local. No ejecuta los parches ni solicita secretos.

Las pruebas del verificador introducen fallos deliberados: ID duplicado, pérdida de RF heredado, relación a módulo inexistente, prueba duplicada, aceptación vacía, evidencia ausente tras declarar verified y documentos faltantes. Si el verificador acepta esas corrupciones, la CI documental debe fallar. Estas pruebas son controles de gobierno, no se suman a las pruebas del agente.

## Integración progresiva de fitness functions

En el primer incremento del núcleo se incorpora un análisis real de imports y ciclos, con prueba negativa que introduzca una dependencia prohibida. Se debe inspeccionar alias, imports dinámicos y acceso global, no solo cadenas literales. En build se incorpora manifiesto completo y comparación de identidad; en publicación, smoke. Las funciones se seleccionan por riesgo, evitando un conjunto tan complejo que nadie lo mantenga. HARD PDF 23–31 inspira esa disciplina; las reglas concretas son D2.

## Revisión de resultados

Una ejecución fallida conserva logs y artefactos de diagnóstico. Se corrige la causa, no el oráculo para que coincida. Si el oráculo estaba mal, se registra un cambio de especificación con razón. Las métricas agregadas se reportan por capa: nunca 'cobertura del sitio 97 %' usando solo el módulo del motor. Un pendiente no se transforma en cero ni en aprobado para mejorar una nota.
