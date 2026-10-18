# 02 — Especificación y control de requisitos

Control: D2 · 18-10-2026 · responsable: Isaac Daroch para aceptación; asistencia técnica para especificación. Catálogo canónico: `registers/requirements.json`. D1, volumen II pp. 5–13, conserva la referencia histórica.

## Taxonomía

Se mantiene RF para comportamiento funcional, incluidas tareas operativas de instalación y recuperación, y RQ para propiedades de calidad/no funcionales. No se crea una lista RNF duplicada: `classification` y `qualityAttribute` permiten consultarlos con esa denominación sin duplicar identidad. Restricciones C, supuestos S, principios IF y objetivos O tienen naturaleza distinta. Un límite propuesto no es un resultado medido.

Los 36 IDs de D1 se conservan. Cada ficha de catálogo registra el texto de referencia `d1Acceptance`, la aceptación objetivo `acceptance`, origen, prioridad, macroelemento, principios, ADR, prueba, entorno, método, oráculo y evidencia esperada. La vista generada presenta esos campos sin exigir leer JSON.

## Compatibilidad documental

Una aclaración que no cambia comportamiento mantiene ID y señala refinamiento. Un cambio observable incompatible conserva el historial y registra revisión. Una capacidad nueva recibe ID nuevo. RF-11 continúa siendo exportación de snapshot v1; RF-21 especifica episodio v2; RF-22, verificación y visor. No se cambia RF-11 para ocultar que el formato de la descarga evolucionó.

La comparación solicitada de revisión del modelo se registra como RF-23. El desempate BFS presente en el parche recibe RF-24 y no cierra RF-23. RF-25 formaliza identidad pública de versión. RF-26 hace explícita la experiencia científica animada solicitada, porque dejarla implícita facilitó decisiones visuales sin trazabilidad. RQ-17 concreta límites hexagonales; RQ-18 separa esquema estructural y validación semántica. Todas las extensiones son propuestas D2 pendientes de ratificación detallada.

## Estados ortogonales

`specification` indica si la necesidad está formulada y si sus detalles están aprobados. `implementation` describe ausencia, parche inspeccionado, integración o cambio remoto acotado. `verification` distingue no ejecutado, resultado histórico referido, ensayo de componente y aceptación sobre artefacto completo. `acceptanceStatus` pertenece al titular o revisor autorizado. No se reduce todo a una columna verde/roja.

Un parche que contiene una prueba no es un informe de ejecución. Una implementación local descrita por un checkpoint pero no recuperada se clasifica como parche/checkpoint, no como árbol integrado verificado. La resolución real del lockfile acredita resolución de dependencias en ese contexto, no la construcción del sitio. La comprobación de enlaces unitarios no acredita las rutas del despliegue.

## Estructura de una ficha

**Identidad y motivación:** nombre observable, actor, fuente y origen D1/refinamiento/extensión. **Contrato funcional:** precondiciones, estímulo, comportamiento, resultado y manejo de fallos. **Aceptación:** condiciones inequívocas y límites del entorno. **Arquitectura:** principio, macroelemento, ADR y contratos relacionados. **Prueba:** ID estable, entorno, procedimiento y oráculo. **Evidencia:** artefacto esperado y referencia a ejecución real cuando exista.

Las fichas del catálogo incluyen una aceptación detallada, procedimiento de prueba y evidencia. Las invariantes comunes de episodio y las reglas operativas se desarrollan en los protocolos y contratos para no mantener versiones contradictorias en veinte fichas.

## Reglas transversales de aceptación

1. Una afirmación cuantitativa identifica población, entorno, muestra y método. El tiempo de un tick no representa latencia cognitiva de IA.
2. Las pruebas de contenido y rutas se ejecutan sobre el artefacto combinado; el código fuente no prueba publicación.
3. Un resultado de replay acredita consistencia bajo implementación y configuración admitidas; no acredita autoría ni validez externa.
4. Los escenarios de falla verifican estado anterior, estado nuevo y registro de recuperación. No basta comprobar que apareció un mensaje de error.
5. Una comprobación automática de accesibilidad no sustituye tareas manuales con tecnología asistiva.
6. Un requisito crítico no puede cerrarse con una prueba que verifica otro fenómeno. En particular, comparar dos desempates no verifica revisión frente a modelo congelado.

## Priorización

P0 bloquea una entrega verificable, no implica necesariamente una vulnerabilidad crítica. P1 controla integridad, coherencia esencial y uso. P2 controla mantenibilidad y experiencia ampliada. P3 identifica una extensión condicionada. Es posible implementar una corrección acotada antes de completar la arquitectura objetivo, siempre que se preserve el requisito y se registre la transición; no se permite posponer indefinidamente la documentación bajo la etiqueta de emergencia.

Los requisitos con `releaseGate=true` no admiten compensación por estética. Tampoco se aprueba una release como cumplimiento integral del encargo visual si RF-26 no está demostrado; una vista técnica preliminar puede tener otro alcance, expresamente nombrado.

## Gestión de cambios

Una solicitud registra motivo, IDs afectados, aceptación anterior/nueva, compatibilidad, diseño, impacto editorial, prueba y reversibilidad. En la revisión se pregunta qué cambia para el usuario y qué cambia para el mantenedor. Si afecta a un principio o contrato público, necesita ADR o revisión del ADR existente.

El título de un commit puede contener `RF-11 H-11`, pero esas cadenas no bastan: la solicitud de integración debe enlazar la prueba y su resultado. Al modificar datos, se revisan página, bibliografía, protocolo y artefactos generados. Al cambiar preferencias de movimiento, se revisan primera pintura, botón, carga diferida, interacción posterior y fallback.

## Lo que el catálogo no hace

No convierte obligaciones propuestas en contrato legal. No reevalúa el artículo científico citado. No infiere trabajo aplicado al PC. No eleva una muestra de 25 pruebas a cobertura de toda la aplicación. No presenta las hipótesis D2 como resultados obtenidos. La fuente JSON permite automatizar coherencia, no automatizar juicio editorial.

Fundamento: BROWN, PDF 36–37 y 55–62; HARD, PDF 23–31. Los umbrales y escenarios D2 son diseño específico del proyecto salvo aquellos explícitamente heredados de D1.
