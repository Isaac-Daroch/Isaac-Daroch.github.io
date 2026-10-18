# 09 — Protocolos del laboratorio y experimentos separados

Control: D2 · 18-10-2026. Protocolos educativos y diseño de nuevas comparaciones; no estudio científico ejecutado. Fuente histórica: D1 II §§2–3; propuestas D1 I §10.1–10.3; parches core/UI/build.

## P-BASE — Episodio histórico

Cuadrícula 16×10, coordenadas enteras de base cero, inicio (2,5), meta (13,5), movimiento cardinal y costo uniforme. El sensor observa celda actual y vecinas Manhattan de radio 1. Mundo y modelo inicial tienen copias independientes de un mapa suministrado por el programador. No hay adquisición inicial autónoma del mapa ni pesos aprendidos.

Intervención histórica: cerrar (8,5), abrir (8,7), una sola vez y antes de que el agente esté en x≥8 o termine. Solo cambia el mundo. Cada paso observa primero. Si hay discrepancia que se revisa, actualiza modelo y plan sin mover ese tick. Si no, BFS sobre modelo decide ruta, meta o bloqueo. El guard físico impide atravesar paredes reales; no otorga al planificador el mapa verdadero.

D1 reportó once acciones sin intervención y quince acciones/diecisiete ticks en el episodio intervenido ensayado. Esos números son oráculos históricos para el escenario/versión correspondiente, no una medición repetida en D2. Deben regenerarse como fixtures y compararse antes de refactorizar. El baseline termina blocked sin política de exploración; no se presenta ese límite como defecto de aprendizaje.

## P-REPLAY — RF-21 y RF-22

Objetivo: compartir una secuencia que otra instancia pueda comprobar. La exportación v2 contiene escenario, implementación, configuración, comandos ordenados y resultado; v1 sigue siendo snapshot. El lector admite solo versiones enumeradas. No importa código ni URLs ejecutables desde el archivo.

Procedimiento: exportar; comprobar bytes; validar estructura; comprobar identidad; instanciar mundo nuevo; ejecutar comandos permitidos; comparar métricas, estados y eventos; entregar vista textual/frames. El ensayo vivo no se reemplaza. Un rechazo conserva estado y explica motivo. Un resultado válido significa 'coincide con esta implementación y configuración', no 'fue creado por Isaac' ni 'demuestra una hipótesis científica'.

Límites: presupuesto de entrada, comandos, profundidad y salida. El trace objetivo debe almacenar deltas o snapshots acotados sin copiar repetidamente historiales crecientes. El visor no necesita mantener mil copias del mismo prefijo de eventos para permitir avanzar/retroceder. Esa optimización debe conservar exactamente las vistas reproducidas.

## P-REVISION — RF-23, comparación requerida

**Pregunta didáctica:** qué cambia al permitir revisar la representación cuando una observación contradice el mapa previo. **Variable experimental:** política de actualización del modelo, revisable frente a congelada. **No cambia:** mapa inicial, sensor, BFS y orden de vecinos, costos, inicio/meta, intervención, límites y mecanismo físico de colisión.

Diseño inicial acotado: dos condiciones de entorno (sin intervención y cambio antes del primer paso), dos políticas de revisión, cuatro corridas deterministas. La primera versión no mezcla intervención a tiempos arbitrarios con políticas diferentes; eso complica la atribución de efectos antes de validar el diseño básico. Cualquier ampliación añade condiciones explícitas, no altera silenciosamente este protocolo.

**Política revisable:** incorpora observaciones contradictorias y usa el modelo resultante para planificar. **Política congelada:** recibe las mismas observaciones y puede registrar discrepancias, pero no incorpora correcciones al mapa usado por el planificador. El guard físico común impide una acción inválida; si la política congelada insiste en una celda bloqueada, termina con una razón explícita de bloqueo/colisión impedida. No se permite que un helper actualice su mapa a escondidas para lograr la meta.

Ambas se ejecutan en el mismo motor de transición. El motor aplica la política seleccionada y registra si produjo una corrección; una corrección consume el tick histórico de revisión. La diferencia temporal resultante es un efecto de la política, no se oculta. Se documenta cómo se contabiliza el intento bloqueado separándolo de movimientos exitosos; si se modifica una métrica v1, se requiere versión distinta, no reutilización de etiqueta.

**Medidas:** meta alcanzada, movimientos exitosos, ticks, observaciones únicas, discrepancias, correcciones aplicadas, intentos impedidos y motivo terminal. Discrepancias/correcciones históricas eran iguales por diseño en el baseline revisable; ya no deben presentarse como idénticas por definición cuando se admite política congelada. No sumar métricas correlacionadas para fabricar un índice de inteligencia.

**Pruebas de control:** sin cambio, ambas políticas deben compartir trayectoria bajo mismo desempate; antes de observar la celda alterada no pueden diferir por conocimiento del evento; la política congelada conserva el mapa; la revisable cambia solo celdas observadas; ninguna atraviesa muro. **Resultado esperado:** se especifican estas invariantes, no una cifra inventada de ventaja. Se conservarán resultados aunque no ilustren la narrativa deseada.

**Límite inferencial:** un escenario construido no acredita generalización a robots, eficiencia de aprendizaje continuo ni superioridad estadística. No requiere p-valores ni repetir una corrida determinista para fingir una muestra independiente.

## P-TIEBREAK — RF-24, comparación presente en el parche

Pregunta diferente: qué efecto tiene el orden de vecinos de BFS manteniendo la política de revisión. El parche usa east/south/west/north frente a north/west/south/east. Comparte prior, sensor, costos y momento de intervención. Puede mostrar rutas equivalentes o diferentes sin implicar aprendizaje.

La UI debe llamar a esta sección 'Comparación de desempates BFS', no usarla como prueba de P-REVISION. Puede convivir como actividad secundaria o quedar desactivada hasta cerrar lo requerido. El lector de episodios identifica la variante para reproducir. No se altera el significado de `bfs-east` en una versión futura.

## P-TEXT — Explicación accesible

La transcripción procede del mismo evento/snapshot que la vista gráfica. Debe expresar posición, información recién observada, contradicción, corrección y consecuencia en el plan. El modo paso a paso permite comprender antes de avanzar. Las regiones live anuncian eventos relevantes, no cada celda ni dos mensajes redundantes por tick rápido.

Validación humana: el participante explica por qué el mundo cambia antes que el modelo y qué representa el bloqueo. Se registra lector/navegador y ayuda requerida. Tener una etiqueta ARIA o un panel de texto no demuestra por sí solo comprensión accesible.

## Actividad docente reutilizable

Actividad propuesta: predecir en qué punto aparecerá la primera discrepancia, ejecutar un paso, comparar con predicción, exportar y explicar límites. No se crean cuentas, notas ni seguimiento individual. Una futura evaluación de estudiantes exigiría requisitos de privacidad y otro flujo separado. La solución docente debe vincularse a escenario y versión del motor.
