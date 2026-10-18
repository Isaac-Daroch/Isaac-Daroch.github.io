# 06 — Registro de decisiones y trade-offs

Control: D2 · 18-10-2026. ADR-01…ADR-08 conservan intención e identidad de D1. D2 selecciona un diseño de trabajo para implementar; no declara aceptación de release. Los umbrales y cambios editoriales sensibles continúan pendientes de ratificación. ADR-09…ADR-12 son nuevos. Fuentes: D1 II pp. 51–54; BROWN PDF 25, 36–37, 47–62; HARD caps. 1, 8, 13 y 15; PATTERNS PDF 15 y 54.

## Método y escalas

Se compara la misma decisión y alcance. Una librería no se compara con una arquitectura completa; un sitio estático no se compara con microservicios atribuyendo a este último funciones que nadie pidió. Se explicitan beneficio, costo, riesgo, reversibilidad y condición de revisión. Las puntuaciones D1 eran juicio contextual, no rendimiento medido. D2 no las convierte en superioridad objetiva ni crea una nota nueva sin ensayos.

## ADR-01 — Una unidad estática modular

**Contexto:** contenido público y demo local, sin persistencia multiusuario requerida. **Selección de trabajo:** mantener un artefacto de publicación con módulos delimitados. **Alternativas:** generador único; frontend con CMS; backend modular; microservicios. **Razón:** resolver transferencia, integridad y presentación sin operación remota innecesaria.

**Consecuencias:** un cambio transversal exige construir/verificar el conjunto; la entrega no es independiente por sección. Se gana simplicidad de operación, no inmunidad a fallos JavaScript. **Verificación:** RF-01, RF-02, RQ-12/RQ-17; pruebas por módulos y dist. **Revisión:** aparece persistencia privada, varios editores remotos o cómputo que no cabe en el cliente. **No decidido:** proveedor de backend o presupuesto nuevo.

## ADR-02 — Quarto como frontera de construcción

**Contexto:** ecuaciones, referencias y notas científicas junto a portada personalizada. **Selección:** conservar Astro y Quarto, con contrato de rutas y recursos. **Alternativas:** solo Astro o solo Quarto. **Beneficio:** mantener capacidades editoriales y visuales. **Costo:** dos herramientas, orden de construcción, convenciones URL y pruebas de integración.

**Consecuencia:** el render fallido bloquea una publicación nueva, no debe retirar la anterior. Se revisa la conveniencia con una nota representativa y tiempo real de mantenimiento, no por moda. **Verificación:** RF-03/RF-04, RQ-02/RQ-03; T-03, T-04, T-22/T-23. **Revisión:** costo persistente de integración superior al de un generador único con capacidades equivalentes. El adaptador remoto de enlaces es acotado; no certifica el build completo.

## ADR-03 — Integridad antes de promoción

**Contexto:** caché y copia podían aceptar salida incompleta o dejar reemplazo parcial. **Selección:** render limpio para el corpus actual, inventario de entradas/salidas, bloqueo y promoción recuperable. **Alternativas:** caché por índice, caché completa o eliminar caché. **Beneficio:** contrato más simple y verificable. **Costo:** render más frecuente y staging adicional.

No se denomina transacción distribuida ni atomicidad universal a la secuencia de renombrados. Debe existir recuperación ante interrupciones en cada etapa. **Verificación:** RQ-02/RQ-03/RQ-04, QAS-10/QAS-11. **Revisión:** crecimiento medido del cuaderno justifica caché; entonces incluir herramientas, argumentos, normalización y validación de cada salida.

## ADR-04 — Simulación, interfaz y evidencia separadas

**Contexto:** núcleo separado parcialmente y snapshot mutable en D1. **Selección:** corregir aislamiento, conservar v1 y especificar v2 aparte. **Alternativas:** cambiar v1 silenciosamente; serializar todo sin contrato; estado compartido con UI. **Beneficio:** compatibilidad e inspección. **Costo:** dos contratos y lectores diferenciados.

D2 amplía a RF-21/RF-22; una etiqueta v2 no prueba replay hasta validar comandos y resultados. La identidad del motor no es una firma. **Verificación:** RF-05…RF-12, RF-21/RF-22 y RQ-18. **Revisión:** escenarios configurables, nuevas políticas o persistencia; actualizar versión e invariantes antes de admitirlas.

## ADR-05 — Una política de movimiento y mejora progresiva

**Contexto:** decisiones inconsistentes ante almacenamiento fallido y controles inertes. **Selección:** política pura única, fallback conservador y habilitación después de inicializar. **Alternativas:** duplicar políticas, eliminar interactividad o forzar movimiento. **Beneficio:** coherencia sin retirar ciencia visual. **Costo:** probar primer render, eventos y reactivación.

La preferencia del sistema prevalece. Los controles se deshabilitan inicialmente y el aviso está en el punto de falla. **Verificación:** RF-13/RF-14, RQ-07/RQ-08, QAS-01/QAS-02. **Revisión:** router, persistencia o framework de animación cambia. El modo de autoarranque de 3D se decide separadamente en ADR-10.

## ADR-06 — Validar cambios y publicar explícitamente

**Contexto:** resolución sin lockfile y validación ligada a publicar. **Selección:** lockfile real, instalación limpia, CI de lectura y despliegue manual del artefacto aprobado. **Alternativas:** auto-publicar cada push; instalar sin lock; validar solo al publicar. **Beneficio:** detección temprana y revisión editorial. **Costo:** etapa humana y evidencia de identidad.

Los permisos de publicación no pertenecen al trabajo de instalar dependencias. Los workflows temporales de bootstrap con escritura no se convierten en patrón de CI. **Verificación:** RF-19, RQ-01/RQ-03/RQ-05. **Revisión:** colaboradores, hosting o política editorial. La CI documental D2 valida documentación y no cambia permisos de Pages.

## ADR-07 — Una fuente editorial con procedencia

**Contexto:** bibliografía y estados repetidos. **Selección:** catálogo autorizado y salidas generadas. **Alternativas:** copias manuales con checklist; CMS; servicio de referencias en runtime. **Beneficio:** consistencia sin red por visita. **Costo:** esquema, generadores y validación.

D2 distingue `publicationStatus`, `metadataVerification` y `editorialApproval` como conceptos, aunque el parche solo tenga `status`. No se invalida un registro histórico porque una nueva revisión no se haya realizado. **Verificación:** RF-04/RF-16, RQ-13, QAS-14. **Revisión:** múltiples editores no desarrolladores o volumen editorial que justifique CMS.

## ADR-08 — Recuperación como criterio de aceptación

**Contexto:** respaldo parcial sin simulacro completo. **Selección:** preflight íntegro, staging, diario previo a mutaciones, cuarentena y verificación de restauración. **Alternativas:** rollback manual sin inventario; rollback ciego; reemplazo directo. **Beneficio:** estado previo recuperable y explicable. **Costo:** espacio, tiempo y pruebas de falla.

La restauración se detiene ante rutas/inventarios desconocidos. No elimina `.git`; no promete recuperación de daño físico. **Verificación:** RF-18/RF-20, RQ-04 y QAS-11. **Revisión:** worktrees, volúmenes, política de reemplazo o concurrencia. Los scripts presentes en parches siguen sin aceptación Windows integral.

## ADR-09 — Hexagonal selectiva dentro del producto modular

**Contexto:** el núcleo debe ser sustituible por distintas interfaces y verificable sin navegador; una única unidad estática no resuelve por sí sola esta independencia. **Selección técnica:** puertos/casos de uso y adaptadores en M-03; contratos de mecanismos donde faciliten pruebas de M-04/M-05. **Alternativas:** núcleo e UI acoplados; separación informal; hexagonal en cada tarjeta; servicios separados.

**Beneficio:** pruebas directas, cambio de presentación localizado, límites explícitos. **Costo:** fachada, valores de frontera, migración gradual y comprobación de dependencias. **Reversibilidad:** módulos locales, sin migración de datos distribuida. **Riesgo:** crear capas que solo reenvían llamadas; se evita definiendo responsabilidades reales. **Verificación:** RQ-12/RQ-17, QAS-08, sustitución DOM/headless, cero dependencias prohibidas y sin escritura de estado. **Estado:** diseño seleccionado para implementación; conformidad no demostrada. **Revisión:** nuevos puertos sin consumidores, complejidad sin variación o dominio ampliado.

## ADR-10 — Impacto visual, carga y elección del 3D

**Contexto:** el titular pidió muchas animaciones. El parche cambió el autoarranque a activación voluntaria en todos los dispositivos sin una aprobación específica documentada. **Selección provisional:** conservar la escena y experiencia CSS/microanimaciones; mantener el 3D de alto costo separado y exponer control. **Alternativas:** autoarranque universal; autoarranque condicional; activación voluntaria; retirar 3D.

**Trade-off:** opt-in disminuye carga y movimiento no solicitado, pero reduce impacto inmediato. Autoarranque condicional puede conservar impacto en hardware apto, a costo de heurísticas y pruebas. El diseño final debe evaluar ambos con RF-26/QAS-16 y rendimiento. **No se autoriza** eliminar 3D por conveniencia. **Verificación:** QAS-02/QAS-05/QAS-07/QAS-16. **Estado:** elección final de experiencia pendiente de comparación y titular; la variación queda abierta, no se declara corregida automáticamente.

## ADR-11 — Separar revisión del modelo y desempate BFS

**Contexto:** propuesta D1 y parche comparan variables diferentes. **Selección:** RF-23 mantiene experimento revisable/congelado; RF-24 conserva el desempate como experimento distinto, opcional y rotulado. **Alternativas:** renombrar el requisito para que parezca cumplido; retirar ambos; confundir dos controles a la vez. **Beneficio:** fidelidad a la pregunta experimental. **Costo:** protocolo y casos adicionales.

El orden de vecinos se fija para RF-23 y la política de revisión se fija para RF-24. Se informa bloqueo, colisión impedida y límites; no se elimina un resultado desfavorable. **Verificación:** T-39/T-40, protocolo 09 y misma información permitida. **Estado:** diseño de RF-23 especificado, no implementado por el parche de desempate. **Revisión:** hipótesis cambia por solicitud explícita, con nueva versión de protocolo.

## ADR-12 — Documentación viva y evidencia no inflacionaria

**Contexto:** D1 existía pero no controló cada cambio. **Selección:** catálogo canónico, vistas generadas, registro de desviaciones, evidencia por alcance y CI documental. **Alternativas:** Word aislado, comentarios sin trazabilidad o generación automática de estados de cumplimiento a partir de nombres de tests. **Beneficio:** consistencia verificable y transferencia. **Costo:** mantener enlaces y separar planes de resultados.

El validador detecta IDs inválidos, ausencia de aceptación/prueba, estados no justificados y pérdida de IDs D1. No declara validez de contenido ni conformidad del código ausente. **Verificación:** RQ-15/RQ-17, pruebas negativas del propio verificador y ejercicio de transferencia. **Revisión:** mantenimiento documental cuesta más que el valor obtenido; simplificar representaciones duplicadas, no suprimir decisiones/evidencia.

## Consecuencias no compensables

Una tecnología más simple no justifica alterar el experimento. Más tests no justifican atribuir validación de Windows. Una nota arquitectónica no acredita independencia real. Una página vistosa no compensa publicación de información no autorizada. Una comprobación de documentación verde no permite publicar el sitio sin las puertas de producto.
