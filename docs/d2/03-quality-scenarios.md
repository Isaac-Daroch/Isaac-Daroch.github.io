# 03 — Escenarios de atributos de calidad

Control: D2 · 18-10-2026 · presupuestos de trabajo, no mediciones. Cada escenario identifica fuente del estímulo, estímulo, ambiente, artefacto, respuesta y medida. La estructura de seis campos es una convención de especificación D2; no se atribuye como plantilla literal a los tres libros. Los valores nuevos requieren ratificación.

## QAS-01 — Lectura sin mejoras gráficas

**Fuente:** visitante con JavaScript desactivado o biblioteca gráfica fallida. **Estímulo:** abrir portada, publicaciones y una nota. **Ambiente:** artefacto compilado servido por HTTP, escritorio y móvil. **Artefacto:** M-02 y M-04. **Respuesta:** contenido y navegación esenciales presentes; laboratorio no disponible explicado localmente y controles no operativos claramente deshabilitados. **Medida:** completar RF-01, RF-02 y RF-03 sin activar JS/3D; cero controles falsamente operativos. Evidencia: capturas, navegación y DOM del artefacto. No exige ejecutar BFS sin JS.

## QAS-02 — Preferencias de movimiento coherentes

**Fuente:** sistema operativo, usuario y almacenamiento. **Estímulo:** combinaciones de reduce/full, valor guardado inválido y SecurityError al leer/escribir. **Ambiente:** primera carga y cambios en sesión. **Artefacto:** política pura y adaptadores M-02. **Respuesta:** reducción del sistema prevalece; error de almacenamiento no reactiva efectos; elección de sesión se describe como no persistida si guardar falla. **Medida:** tabla completa de combinaciones sin transición inesperada; se verifica primera pintura y estado final. La pausa del laboratorio no borra su estado.

## QAS-03 — Interacción por teclado y texto

**Fuente:** visitante que utiliza teclado y lector. **Estímulo:** iniciar, avanzar, intervenir, exportar y explicar la revisión. **Ambiente:** navegador/lector identificados, zoom 200 % y 400 %. **Artefacto:** laboratorio, menú y transcripción. **Respuesta:** foco visible, controles operables, cambio de estado interpretable, anuncios no redundantes. **Medida:** tareas completas y explicación correcta de mundo/modelo sin depender de color o movimiento. Se registra asistencia requerida. Meta de conformidad WCAG 2.2 AA heredada de D1; no se declara certificación automática.

## QAS-04 — Layout adaptable

**Fuente:** visitante. **Estímulo:** abrir rutas esenciales en 320, 375, 700, 768, 1024 y 1440 píxeles CSS. **Ambiente:** sitio compilado, fuentes predeterminadas y ampliadas. **Artefacto:** M-02/M-04. **Respuesta:** contenido principal y controles no quedan fuera del área utilizable. **Medida:** cero desbordamientos horizontales no justificados; tablas/código pueden tener desplazamiento local etiquetado. No extrapolar a todos los dispositivos desde estos seis anchos.

## QAS-05 — Rendimiento del recorrido esencial

**Fuente:** visitante de primera visita. **Estímulo:** solicitar portada y actuar sobre navegación o un control. **Ambiente:** dispositivo, navegador, red, caché y versión registrados; modo esencial separado de 3D. **Artefacto:** salida real de M-02. **Respuesta:** texto visible y controles responsivos antes del enriquecimiento pesado. **Medida:** conservar de D1 LCP ≤2,5 s, INP ≤200 ms y CLS ≤0,1 como objetivos de percentil 75 cuando exista muestra de campo suficiente. En laboratorio se reportan repeticiones y distribución, nunca se denomina p75 de campo a cinco mediciones locales. No instalar rastreo para alcanzar este requisito sin revisión de datos.

## QAS-06 — Presupuesto de transferencia

**Fuente:** navegador con caché vacía. **Estímulo:** cargar contenido esencial inicial. **Ambiente:** compilación optimizada y compresión definida. **Artefacto:** HTML/CSS/JS esencial de primera vista. **Respuesta:** carga diferida de módulos opcionales. **Medida:** propuesta D1 ≤250 KiB comprimidos para esos recursos; reportar además retrato, fuentes y total transferido para evitar esconder costo fuera de la métrica. Un fracaso del presupuesto requiere optimización o revisión explícita del umbral, no borrar el diseño solicitado.

## QAS-07 — Fallo y costo de la escena

**Fuente:** renderer, navegador o hardware. **Estímulo:** WebGL no disponible, contexto perdido, error de importación o frames costosos. **Ambiente:** 3D encendido/apagado en equipos identificados, móvil incluido. **Artefacto:** adaptador de escena M-02. **Respuesta:** volver a CSS y conservar texto, navegación y botones; liberar listeners y recursos; detener render fuera de vista. **Medida:** ninguna pérdida de recorrido esencial; contabilizar llamadas activas y solicitudes. El guard de 24 ms/12 llamadas del parche es una heurística propuesta de tiempo CPU de envío, NO tiempo GPU ni garantía de FPS. Se mide antes de aprobarlo.

## QAS-08 — Modificabilidad hexagonal

**Fuente:** desarrollador. **Estímulo:** reemplazar cuadrícula visual por adaptador textual. **Ambiente:** misma implementación del dominio y entradas registradas. **Artefacto:** M-03. **Respuesta:** reglas, métricas y transición no se modifican. **Medida:** suite del dominio idéntica; cero imports de DOM, almacenamiento, red, Astro, GSAP o Three.js desde núcleo/casos de uso; misma salida para mismos comandos. La detección sintáctica se complementa con prueba de comportamiento. No usar un simple nombre de carpeta como evidencia.

## QAS-09 — Integridad de snapshot y replay

**Fuente:** consumidor del contrato o archivo local no confiable. **Estímulo:** mutar todas las estructuras exportadas; introducir campos, comandos, resultados o versiones inválidos. **Ambiente:** instancia viva con estado conocido. **Artefacto:** contratos de M-03. **Respuesta:** snapshot independiente; replay aislado; rechazo explicado. **Medida:** hash lógico del estado vivo antes/después igual; igualdad de resultados válidos; todos los casos negativos prescritos rechazados. El límite inicial de 1 MiB, 1000 pasos y 1001 comandos procede del parche y permanece como propuesta D2, no medición de seguridad suficiente.

## QAS-10 — Integridad del cuaderno

**Fuente:** fallo de construcción o residuo inesperado. **Estímulo:** retirar una nota, alterar recurso o introducir archivo no autorizado. **Ambiente:** workspace limpio y promoción simulada. **Artefacto:** M-04/M-05. **Respuesta:** no aceptar salida incompleta; no copiar contenido no autorizado; conservar última versión válida. **Medida:** manifiesto completo verificado, conjunto de salidas esperado y diagnóstico de archivo. D2 recomienda render limpio sin caché para este corpus hasta justificar otra cosa con mediciones.

## QAS-11 — Recuperación ante interrupciones

**Fuente:** falla inyectada de proceso, acceso o disco simulado. **Estímulo:** interrupción antes/después de respaldar y antes/después de promover cada entrada. **Ambiente:** copia de repositorio Windows con archivos nuevos, previos, ocultos y cambios locales. **Artefacto:** M-05. **Respuesta:** conservar .git y recuperar estado conocido o detenerse con diario inequívoco; cuarentena de lo nuevo. **Medida:** coincidencia de inventario previo tras cada caso, sin pérdidas silenciosas. No prometer atomicidad de directorios entre volúmenes ni recuperación de daño físico no ensayado.

## QAS-12 — Paridad de construcción

**Fuente:** mantenedor/CI. **Estímulo:** construcción limpia repetida y herramientas no aprobadas. **Ambiente:** Windows y Linux separados; lockfile y versiones registradas. **Artefacto:** M-04/M-05. **Respuesta:** aceptar solo combinaciones admitidas para release y registrar versiones efectivas. **Medida:** resolución consistente de dependencias, rutas y contratos equivalentes; no exigir byte a byte sin normalizar timestamps. El build limpio ≤10 min es propuesta D1; el timeout Quarto de 180 s del parche se registra separadamente y debe justificarse.

## QAS-13 — Menor privilegio y publicación explícita

**Fuente:** cambio de código o solicitud de publicación. **Estímulo:** push/PR, luego autorización editorial. **Ambiente:** workflows con confianza y permisos definidos. **Artefacto:** M-05. **Respuesta:** validar sin capacidad de publicar; desplegar solo un artefacto aprobado con permisos específicos. **Medida:** ningún job que instala/prueba obtiene pages:write o id-token:write; no hay publicación en CI de lectura. La infraestructura temporal de resolución con escritura se identifica como bootstrap y no se replica en la CI ordinaria.

## QAS-14 — Coherencia editorial

**Fuente:** mantenedor. **Estímulo:** cambiar título, DOI, autores o estado de publicación. **Ambiente:** catálogo fuente único. **Artefacto:** M-01/M-04. **Respuesta:** regenerar tarjeta, página, JSON y BibTeX coherentes. **Medida:** igualdad semántica de campos; fuentes y estado conservados; resultado sin procedencia bloqueado. Fecha de verificación de metadatos, estado editorial y validez del estudio son tres cosas distintas.

## QAS-15 — Transferencia a otro mantenedor

**Fuente:** persona que no participó en el desarrollo. **Estímulo:** localizar función, construir, ejecutar prueba, preparar cambio y restaurar copia. **Ambiente:** documentación y release identificadas, sin explicaciones privadas imprescindibles. **Artefacto:** todos los macroelementos. **Respuesta:** guías suficientes, errores diagnosticables y trazabilidad bidireccional. **Medida:** informe por tarea, consultas necesarias, contradicciones y archivos de evidencia. No fijar un tiempo universal sin primer ensayo.

## QAS-16 — Comprensión científica y visual

**Fuente:** evaluador académico y público de divulgación. **Estímulo:** recorrido corto de portada, evidencia y laboratorio. **Ambiente:** versiones con motion permitido/reducido. **Artefacto:** narrativa M-01/M-02/M-03. **Respuesta:** distinguir identidad, pregunta, resultado real y visión; explicar observación antes de revisión. **Medida:** protocolo de preguntas, respuestas y errores conceptuales registrado con consentimiento; criterio inicial propuesto 4 de 5 tareas esenciales correctas por participante, con muestra y limitaciones explícitas. No atribuir conversión, reputación o contratación a la web sin diseño de evaluación propio.

## Priorización de escenarios

QAS-09 a QAS-13 controlan integridad y entrega; QAS-01 a QAS-04 aseguran acceso; QAS-08 protege estructura; QAS-14 y QAS-16 protegen exactitud y propósito. No se compensa el fallo de un escenario crítico promediándolo con colores o animaciones. Los escenarios definen qué observar; el registro de ejecución define qué se observó.
