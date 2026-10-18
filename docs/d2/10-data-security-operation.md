# 10 — Datos, seguridad, operación y transferencia

Control: D2 · 18-10-2026. Complemento rector de los dieciséis ámbitos D1. No constituye manual de instalación de una release terminada. Los scripts de remediación no deben ejecutarse en el único árbol del usuario antes de validarse.

## Modelo de datos y autoridad

| Clase | Autoridad | Derivados | Retención y límite |
|---|---|---|---|
| Identidad y trayectoria públicas | Titular y fuentes autorizadas | Página, metadatos | Mantener historia editorial; no añadir salud/identificación privada |
| Publicaciones y proyectos | Catálogo y referencias de origen | Tarjetas, JSON y BibTeX | Estado de metadatos separado de validez científica |
| Episodio vivo | Núcleo por sesión | Snapshot y transcripción | Memoria local; recarga no promete persistencia |
| Archivo de episodio | Exportación o importación del visitante | Resultado de replay | Se lee localmente; no se envía a servidor por defecto |
| Fuentes Quarto | Lista autorizada | HTML y recursos | Borradores privados fuera del árbol publicable |
| Build/release | Fuente efectiva, herramientas y manifiesto | Artefacto y receipt | Guardar versión anterior recuperable |
| Diario de instalación | Transacción local | Respaldo y cuarentena | No limpiar automáticamente antes de verificar recuperación |
| Evidencia de pruebas | Ejecución identificada | Resúmenes | No atribuir a otra versión; revisar privacidad antes de publicar |

## Diccionario conceptual

`tick` es transición lógica, no milisegundos. `actions` cuenta movimientos según contrato v1, no todas las acciones de UI. `mismatches` y `cellRevisions` no son indicadores independientes en el baseline. `strategy` del parche expresa desempate BFS, no política de aprendizaje. `implementationId` expresa compatibilidad, no autenticidad. `mapId` refiere un escenario fijo. `verifiedAt` necesita alcance: metadatos, no estudio completo. `approvedAt` requiere responsable y versión autorizada; no se rellena con la hora del build.

Coordenadas: x derecha, y abajo, base cero. Recursos: bytes de UTF-8 para límites de archivos. Versiones: contrato v1/v2 distintas de versión del producto 1.1.0-rc.1 y de edición documental D2. Fuente y artefacto tienen hashes distintos. `HEAD` no acredita árbol limpio.

## Amenazas y controles proporcionales

Archivo de replay manipulado: esquema, comandos permitidos, límites y instancia aislada. El JSON válido no es código; no usar eval ni imports indicados por contenido. Escena de tercero: importación en periferia y fallback, no acceso a secretos. Dependencia transitiva alterada: resolución real revisada, instalación consistente y actualización controlada. Publicación accidental: artefacto autorizado, revisión editorial y permisos mínimos. Reemplazo de archivos: preflight, diario, inventarios, respaldo y recuperación probada.

Un sitio estático reduce ciertos mecanismos de ataque, no elimina XSS, cadena de suministro ni riesgos de archivos. La comprobación de cero avisos de npm en un momento no es una garantía general. No se agregan formularios o analítica invasiva sin un requisito nuevo y revisión de datos.

## Instalación y configuración objetivo

La release deberá incluir manifiesto completo, versiones compatibles comprobadas, scripts, README y evidencia. El mantenedor verifica archivo/versión y ruta de destino; detiene su servidor; ejecuta una instrucción de una sola línea al script local. El instalador muestra máquina y destino para no confundir PERSONAL-LOQ con LAB-CTE. D2 no infiere en cuál está trabajando el titular.

La fase de preparación valida todo antes de reemplazar y construye en staging. `npm ci` usa lockfile; falta de lock no se resuelve silenciosamente con install. La promoción no publica, no hace commits ni modifica `.git`. El modo ValidateOnly debe dejar explícito qué temporales creó y qué no modificó. Detalles exactos del comando de aplicación se entregarán con la release validada, no con D2.

## Recuperación objetivo

Reconocer falla por etapa y localizar diario. Comprobar que ruta/identidad y respaldo corresponden al repositorio. No matar procesos Node ajenos ni eliminar locks sin comprobar proceso/interrupción. Restaurar solo entradas gestionadas; lo nuevo se conserva en cuarentena. Verificar inventario después y ejecutar humo del estado restaurado. Registrar el resultado y no borrar respaldos hasta aceptación.

La recuperación se ensaya con entradas preexistentes, archivos nuevos, cambios locales, `.gitignore`, archivos ocultos y fallos después de cada operación. Si falta el original esperado, no adivinar. RTO/RPO quedan pendientes de primer simulacro; no se inventa SLA para una instalación aún no ensayada.

## Desarrollo y contribución

Los cambios comienzan con ID de requisito/desviación. Se trabajan en rama; no se integra documentación D2 como si fuera todo el sitio. Un PR explica qué cambia para visitante/mantenedor, contrato, prueba y evidencia. Los fixtures de dominio se versionan; se evita modificar algoritmo y estructura simultáneamente. Los comentarios explican decisiones y límites, no repiten cada línea.

La raíz del repositorio gobierna el único historial Git. No se vuelve a inicializar Git en site. Las fuentes generadas, node_modules, dist y reportes temporales se excluyen de la fuente mantenida, pero la evidencia de aceptación se conserva con identidad en artefactos o ubicación controlada. No confundir excluir de Git con descartar prueba.

## Despliegue y operación

Validar automáticamente y publicar explícitamente, conforme ADR-06. La entrega pública requiere ruta, identidad, aprobación y artefacto verificado. Después de publicar, comprobar portada, publicaciones, proyectos, cuaderno, protocolo, retrato y manifiesto; un missing resource impide aceptar aunque deploy termine verde. El procedimiento de rollback debe escoger un artefacto previo identificado, no reconstruir arbitrariamente una versión antigua con dependencias nuevas.

Monitoreo mínimo propuesto: verificación posterior a cada publicación y revisión manual periódica de enlaces y dependencias. No se ha creado aquí un monitoreo continuo ni una tarea programada. La frecuencia y canal se adoptan con el mantenedor cuando exista publicación verificable.

## Manual de usuario: cambios que debe reflejar

Explicar lectura sin JS, control de movimiento, activación 3D, Run/Pause/One step, intervención, límites de bloqueo, velocidad, exportación v1/v2 cuando corresponda, importación local y error de incompatibilidad. Separar comparación de políticas y desempates. Indicar reinicio de estado por recarga/navegación. No prometer envío de correo mediante un simple enlace ni persistencia que no existe.

## Licencias y entrega

No se elige licencia de código propio en nombre del titular en esta revisión. Mantener decisión de código, contenido, retrato y terceros por separado. El inventario se construye desde dependencias resueltas y avisos reales; no denominar GSAP MIT sin verificar su licencia concreta. Los libros aportados no se incorporan al ZIP documental ni como activos web. Solo se incluyen referencias y análisis propio.

## Cobertura de los dieciséis ámbitos D1

| Ámbito | Fuente rectora D2 | Estado de aplicación |
|---|---|---|
| 1 Descripción/alcance | 01 | Formalizado; narrativa final por revisar |
| 2 Requisitos | 02 + catálogo | Conservados/ampliados; aceptación no inferida |
| 3 UX/flujos | 03 + 09 | Escenarios y protocolos; prueba real pendiente |
| 4 Arquitectura | 04–06 | Objetivo explícito; migración pendiente |
| 5 Diseño/código | 05 + 11 | Contratos/mapeo; no árbol final certificado |
| 6 Datos | 05 + 10 | Autoridad/unidades/versiones definidas |
| 7 Integraciones | 04–05 | Puertos locales/build; sin API HTTP ficticia |
| 8 Instalación | 08 + 10 | Aceptación/preflight; validar Windows |
| 9 Desarrollo | 10–11 | Flujo trazable y ramas |
| 10 Pruebas | 08 + catálogo | Plan separado de reportes |
| 11 Seguridad | 10 | Amenazas y controles proporcionados |
| 12 Despliegue | 08 + 10 | Publicación separada, no ejecutada |
| 13 Operación | 10 | Recuperación/identidad, simulacro pendiente |
| 14 Manual | 09 + 10 | Tareas y cambios que incorporar |
| 15 Mantenimiento | 10–11 | Gestión de versiones y desviaciones |
| 16 Licencias/entrega | 10 | Decisión del titular y terceros pendientes |

Esta tabla no sustituye los manuales D1; indica qué debe actualizarse para que la siguiente entrega no tenga dos verdades documentales contradictorias.
