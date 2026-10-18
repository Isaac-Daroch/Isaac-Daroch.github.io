# 05 — Arquitectura hexagonal modular y contratos

Control: D2 · 18-10-2026. **Diseño objetivo**, no conformidad actual. Decisión rectora: ADR-09. Alcance primario: M-03; inversión de mecanismos también en M-04/M-05 donde aporte pruebas de fallos. Fuentes: HARD PDF 253, figura 8-12; BROWN PDF 47–52. Los nombres de contratos son decisiones propias D2.

## Regla central

El comportamiento no depende de cómo se solicita, muestra, guarda o publica. El núcleo define valores y reglas. Los casos de uso coordinan operaciones. Los puertos expresan contratos; los adaptadores implementan mecanismos. Las dependencias de código se orientan hacia contratos/núcleo, aunque el flujo de ejecución pueda salir a un adaptador a través de un puerto. No confundir ambas direcciones.

Un único artefacto estático es compatible con esta estructura. Astro/Quarto no son alternativas a hexagonal: son tecnologías periféricas. No se exige hexagonal para cada tarjeta sin reglas; tampoco contenedor de inyección, bus de eventos, repositorio genérico o microservicio por componente.

## Estructura objetivo del laboratorio

```text
site/src/modules/agent-lab/
  index.mjs                 API pública estable
  contracts/                tipos de comandos, snapshots y errores
  domain/                   valores, mapas, sensor, transición, políticas
  application/              iniciar, avanzar, intervenir, exportar, replay
  adapters/browser/         DOM, carga de archivo, descarga, temporizador
  adapters/headless/        ejecución por pruebas/CLI
```

Esta estructura no existe todavía como árbol integrado verificado en la rama examinada. `agent-world.mjs` puede mantenerse como fachada de compatibilidad mientras delega a módulos nuevos. No mover todo y cambiar reglas simultáneamente. Las pruebas importan API pública, salvo pruebas internas de unidad claramente identificadas.

## Puertos de entrada y valores

### LAB-01 — Sesión de episodio

Operaciones objetivo: `createEpisode(config)`, `step(session)`, `intervene(session, command)`, `reset(session)`, `snapshot(session)`. La interfaz no expone referencia mutable al estado. Configuración inicial admite únicamente escenario y políticas enumeradas; abrir mapas arbitrarios es otro requisito.

Precondiciones: coordenadas enteras dentro de 16×10; costos uniformes; estado válido. Postcondición de `step`: una transición lógica; observa antes de decidir; una revisión consume tick sin movimiento. Si terminal, no acumula actividad. `intervene` solo cambia el mundo verdadero según reglas del escenario; no informa al modelo mediante un atajo. Error de entrada no modifica estado ni añade un comando exitoso al registro.

### LAB-02 — Planificación

Entrada: posición, meta, mapa permitido y orden de vecinos enumerado. Salida discriminada: `found`, `already-at-goal`, `unreachable` o `invalid`, con ruta y diagnóstico cuando corresponda. BFS legado puede conservar su array, pero los consumidores nuevos no deben adivinar el significado de `[]`.

El planificador recibe el modelo, no el mundo del observador. El algoritmo BFS es una política del dominio; **no es infraestructura solo porque tenga una interfaz**. La abstracción de estrategia se introduce para la variación aprobada, no para simular plugins externos. Un nuevo algoritmo debe declarar costo, información permitida y condiciones de equivalencia.

### LAB-03 — Snapshot y presentación

`getSnapshot` devuelve una copia independiente de posición, mapas, ruta, observaciones, contadores y eventos. Los valores son serializables; no se expone Set vivo ni objeto de DOM. Un mismo snapshot alimenta representación gráfica y textual. El modelo de vista puede formatear texto, pero no recalcula métricas con reglas distintas.

### LAB-04 — Exportación v1/v2

v1 conserva nombre y semántica histórica de fotografía; v2 describe configuración inicial, comandos e identidad para reproducción. La UI debe nombrar qué exporta. v1 no se promueve silenciosamente a v2 porque no contiene necesariamente una secuencia suficiente. Se documenta una política de lectura: compatibilidad de visualización v1 y replay solo para versiones enumeradas.

El núcleo construye el valor; el adaptador de descarga decide Blob, nombre de archivo y mecanismo de guardado. Esa operación no debe afectar al episodio y revoca los recursos temporales del navegador.

### LAB-05 — Verificación/reproducción

Entrada: texto JSON limitado antes de parsear. El adaptador comprueba bytes de archivo; el caso de uso valida esquema e identidad, reproduce comandos permitidos en instancia independiente y compara resultado. Salida: vista verificada o error tipado; no reemplaza la sesión viva. Los IDs `implementationId` y `mapId` son identificadores de compatibilidad, no firmas criptográficas.

Límites de trabajo derivados del parche: 1 MiB de UTF-8, 1000 pasos y hasta 1001 comandos al incluir una intervención. Estos límites no bastan para evitar JSON excesivamente anidado o crecimiento de snapshots de trace: debe añadirse un límite explícito de profundidad y un presupuesto de memoria/frames. El visor objetivo no conserva una copia acumulativa de todo el historial para cada frame si con ello el espacio crece cuadráticamente.

### LAB-06 — Comparaciones educativas

Dos contratos distintos: `compareRevisionPolicies` para modelo revisable/congelado (RF-23) y `compareTieBreaks` para orden BFS (RF-24). La misma etiqueta genérica no sirve para afirmar que se implementaron ambos. Salida registra variable intervenida, controles constantes, política, escenario, secuencia y métricas. Protocolo completo en capítulo 09.

## Puertos periféricos y composición

### CAT-01 / CAT-02 — Catálogo

CAT-01 valida registros: identidad única, tipo, estado editorial, fuente, responsables y fechas. CAT-02 ofrece vistas públicas y bibliografía derivadas. `source-recorded` no significa falso; `verified` requiere especificar qué se verificó. La confirmación de metadatos y la revisión científica del estudio no se fusionan.

### MOT-01 — Preferencia de movimiento

Función pura sobre preferencia del sistema, valor persistido, disponibilidad de almacenamiento y elección de sesión. Devuelve modo y motivo; no accede directamente a localStorage. El adaptador consulta mecanismos y aplica efectos. Primera pintura conservadora y política posterior deben ser coherentes; una preferencia explícita de sesión puede existir sin persistencia. La escena debe obedecer el resultado sin forzar al visitante a habilitarla.

### PUB-01 / PUB-02 — Generación científica

PUB-01 recibe workspace autorizado, versión requerida, argumentos y timeout; devuelve resultado de proceso y versiones observadas. PUB-02 recibe árbol generado y política; devuelve inventario verificado o lista de defectos. El orquestador valida antes de promover. El adaptador de enlaces se prueba con fixtures y con salida real; no se certifica render a partir de fixtures.

### DEL-01 / DEL-02 / DEL-03 — Entrega

DEL-01 valida paquete y destino sin mutarlos. DEL-02 prepara/promueve con diario previo a cada mutación. DEL-03 restaura desde un diario validado, cuarentena el estado nuevo y verifica inventario. Los adaptadores son filesystem, PowerShell y GitHub Actions; el contrato de recuperación no depende de una instrucción informal de mover carpetas a mano. Si falla la identificación de ruta o inventario, la respuesta es detenerse, no forzar.

## Catálogo de errores objetivo

| Código | Frontera | Respuesta |
|---|---|---|
| INPUT_INVALID | LAB-01/LAB-02 | Rechazo explicado sin mutación |
| EPISODE_TERMINAL | LAB-01 | Estado terminal idempotente; sin nuevos movimientos |
| INTERVENTION_NOT_ALLOWED | LAB-01 | Comando rechazado y razón; no se registra éxito |
| SCHEMA_UNSUPPORTED | LAB-05 | Identificar versión admitida; no migración inferida |
| RESOURCE_LIMIT | LAB-05 | Detener antes de trabajo costoso; sesión intacta |
| REPLAY_MISMATCH | LAB-05 | Resultado declarado no coincide; no cargar como verificado |
| CATALOG_INVALID | CAT-01 | Registro y campo identificados; sin publicar |
| RENDER_FAILED / RENDER_TIMEOUT | PUB-01 | Diagnóstico y preservación de salida previa |
| ARTIFACT_INCOMPLETE | PUB-02 | No promover; lista de recursos faltantes |
| RECOVERY_REQUIRED | DEL-02/DEL-03 | Preservar staging/diario; intervención controlada |

Estos códigos normalizan futuros contratos. Los TypeError/RangeError del parche son una implementación parcial que debe mapearse sin inventar compatibilidad ya existente.

## Conformidad y pruebas

Regla A: dominio/casos de uso no importan `window`, `document`, red, almacenamiento, frameworks visuales o herramientas de publicación. Regla B: UI no importa archivos internos salvo la fachada pública. Regla C: sin ciclos de módulos. Regla D: el mismo puerto admite adaptadores DOM y headless sin cambiar resultados. Regla E: datos cruzan la frontera como valores independientes. Regla F: no se usan permisos del visitante o mecanismos de build para otorgar conocimiento adicional al agente.

Las reglas A–C requieren inspección del grafo real de imports, incluidos imports dinámicos y alias. Un grep puede ayudar a detectar, pero no demostrar ausencia. D–F requieren conocimiento del dominio y pruebas semánticas. Las comprobaciones documentales de D2 solo verifican que estas obligaciones estén especificadas y trazadas: no aprueban el grafo ausente del producto.

## Evolución sin sobrearquitectura

Primero encapsular estado y API; después adaptar consumidores; luego mover archivos y comprobar dependencias; finalmente añadir políticas nuevas. No se añade almacenamiento porque el patrón tenga un dibujo de base de datos. No se crea una interfaz para una única llamada pura sin razón de variación. Un futuro backend debe responder a datos privados, persistencia multiusuario o cómputo remoto aprobado, manteniendo lectura pública independiente.
