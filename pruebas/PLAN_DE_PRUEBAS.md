# Acceptance procedures supplied by owner

This is a preserved plan, not executed results. Current results: `docs/a11y/acceptance-cases.md` and `test-report.md`.



# Guiones de aceptación — Grafito editorial

**Estado inicial:** estos guiones NO se han ejecutado sobre la web. Solo se ejecutó el cálculo de 384 pares de tokens, documentado en `resultado-contrastes.json`.

Para cada caso registrar: fecha, commit, ruta, pasos, resultado observado, navegador y versión, sistema, tecnología de asistencia, paleta, tamaño de ventana, zoom, estado PASS/FAIL/NO_EVALUADO/PENDIENTE_MANUAL/NO_APLICA y evidencia. Una prueba automática no equivale a una prueba manual aunque comparta el mismo caso.

Usar cuentas, perfiles y datos de prueba. No cambiar ajustes globales de un equipo ajeno sin permiso. Los casos condicionales necesitan evidencia del inventario para NO_APLICA. No inventar contenido público para probar un estado: crear fixtures claramente aisladas de producción.

## T01. Inventario y construcción de referencia

**Requisitos:** AUD-01–03, GOV-04–05.
**Procedimiento:** registrar rama y cambios existentes; localizar comandos oficiales del proyecto; construir sin modificaciones; enumerar rutas y plantillas; identificar Astro, Quarto u otros generadores por archivos reales.
**Aceptación:** versión, alcance y problemas previos documentados; ningún borrado ni migración no autorizada; build ejecutado o limitación explícita.
**Evidencia:** salida de construcción y tabla de rutas. No sustituir por una captura de la portada.

## T02. Estructura, nombres y orden de lectura

**Requisitos:** SEM-01–04, IA-02, COMP-02.
**Procedimiento:** inspeccionar encabezados y regiones en cada plantilla; recorrerlas con lector real; comparar orden de DOM y visual; revisar títulos de página, etiquetas y enlaces fuera de contexto inmediato; inspeccionar alt de fotos e iconos.
**Aceptación:** un contenido principal identificable, jerarquía útil, nombres comprensibles y estados expuestos. Ningún botón depende exclusivamente de un icono sin nombre.
**Evidencia:** registro de lectura y hallazgos por componente. El árbol de accesibilidad apoya, pero no reemplaza, la prueba con lector.

## T03. Recorrido global solo con teclado

**Requisitos:** INPUT-01, VIS-06, SEM-03.
**Procedimiento:** desde una carga nueva navegar con Tab/Shift+Tab; abrir una publicación, consultar código, copiar cita y volver; verificar Enter, Espacio y Escape donde corresponda; inspeccionar atajos de letras. Repetir con cabecera sticky y pantalla pequeña.
**Aceptación:** se completa el recorrido sin ratón, sin trampas, sin tabuladores positivos y con foco visible completo. Ninguna pulsación genera navegación inesperada al recibir foco.
**Evidencia:** secuencia de foco y grabación o registro de cada barrera.

## T04. Menú móvil y navegación consistente

**Requisitos:** COMP-01, IA-02.
**Procedimiento:** abrir/cerrar menú con teclado y tacto; comprobar estado expandido, foco y enlaces ocultos; cambiar rutas e idioma; repetir a 200 % de texto y con poca altura.
**Aceptación:** menú cerrado fuera del orden de foco; menú no modal sin trampa; menú modal con comportamiento modal completo. Orden y nombres consistentes entre plantillas.
**Evidencia:** estados abierto/cerrado, dimensiones y lectura del nombre del botón.

## T05. Salto al contenido

**Requisitos:** SEM-03.
**Procedimiento:** cargar una página; avanzar hasta “Saltar al contenido”; activarlo; leer y continuar navegando; repetir en nota científica y en móvil.
**Aceptación:** enlace visible al foco; desplazamiento y posición de lectura coherentes en el contenido; encabezado fijo no tapa el destino; no obliga a recorrer la cabecera de nuevo.
**Evidencia:** elemento activo y comportamiento observado con navegador y lector indicados.

## T06. Diálogo de preferencias o panel equivalente

**Requisitos:** COMP-04, PREF-01.
**Procedimiento:** abrir mediante su control; comprobar título anunciado, foco inicial, recorrido completo, cierre visible y Escape; probar fondo con teclado y puntero; cerrar; repetir con 200 % de texto y teclado virtual.
**Aceptación:** un modal hace inerte el fondo, confina Tab solo mientras está abierto y restaura foco al cerrar; no recorta controles. Un panel no modal no anuncia modalidad ni atrapa foco.
**Evidencia:** registro completo de apertura, operación y cierre.

## T07. Formulario: etiquetas, error y recuperación

**Requisitos:** COMP-07, COG-01.
**Procedimiento:** revisar etiquetas y autocompletado; enviar vacío, enviar correo inválido y provocar fallo de red; corregir con teclado; comprobar resumen de errores, asociaciones y datos conservados. Si existen procesos de varios pasos o con consecuencias, evaluar repetición de información y revisión/confirmación.
**Aceptación:** errores legibles y relacionados, instrucciones previas, foco útil sin saltos continuos; solo se anuncia éxito tras éxito real. Si no existe backend no hay formulario ficticio.
**Evidencia:** entradas de prueba, mensajes y respuesta real del servicio cuando exista.

## T08. Búsqueda, filtros, resultados y estado

**Requisitos:** COMP-03, SEM-02.
**Procedimiento:** buscar con teclado, aplicar filtros, alcanzar cero resultados, limpiar, cargar más o paginar y usar atrás/adelante; repetir con lector de pantalla; simular error de índice.
**Aceptación:** controles con etiquetas, foco conservado, conteo discreto, resultados navegables y alternativa útil sin búsqueda. No se anuncian todas las filas tras cada cambio. Preferencias visuales no aparecen en la URL.
**Evidencia:** URLs, anuncios y estados de resultados reales.

## T09. Paletas y contraste en componentes renderizados

**Requisitos:** VIS-02–07, QA-02.
**Procedimiento:** ejecutar el verificador de tokens; cargar la página de componentes con cada una de las 24 combinaciones; activar hover, foco, selección, error, expansión, visita y deshabilitado donde aplique; comprobar colores computados y fondo efectivo.
**Aceptación:** texto informativo ≥4,5:1; tokens y estados respetan sus pares; bordes/símbolos necesarios cumplen su contraste. Los fondos nuevos, transparencias y gráficos tienen evidencia independiente.
**Evidencia:** informe de tokens y reporte de componentes, claramente diferenciados.

## T10. Comprensión sin discriminación del color

**Requisitos:** VIS-04–07, SEM-04.
**Procedimiento:** inspeccionar versión monocroma y simulaciones cromáticas como apoyo; localizar estado de publicación, filtro seleccionado, enlace, error y serie de gráfico sin usar el matiz.
**Aceptación:** texto, forma, patrón o asociación transmiten significado; ni oro ni rojo/verde son el único código. No se aplica filtro global a figuras y fotos.
**Evidencia:** ejemplos de codificación redundante. No afirmar validación clínica ni equivalencia a prueba con personas con daltonismo.

## T11. Contraste alto

**Requisitos:** VIS-05, PREF-03.
**Procedimiento:** activar `high` con los cuatro perfiles y ambos temas; inspeccionar artículos, metadatos, placeholders, botones y sintaxis.
**Aceptación:** texto informativo del alcance ≥7:1 en fondos reales, no solo el título. La selección persiste y no borra perfil cromático. No se declara AAA global.
**Evidencia:** pares y estados de cada componente distinto.

## T12. Colores forzados del sistema

**Requisitos:** VIS-08.
**Procedimiento:** probar emulación para desarrollo y modo real de contraste de Windows cuando esté disponible; recorrer menú, campos, radios, casillas, foco, gráficos y botones; desactivar el modo del sistema.
**Aceptación:** controles y seleccionados identificables, sin dependencia de sombras; el sitio no impone sus colores sobre el sistema; al salir se recupera la preferencia guardada.
**Evidencia:** configuración del sistema y registro manual. La emulación sola deja pendiente la parte de sistema real.

## T13. Resolución de preferencias de sistema

**Requisitos:** PREF-02–05.
**Procedimiento:** en un perfil de prueba sin preferencias propias, variar tema de sistema, `prefers-contrast` y movimiento reducido; cargar con y sin JavaScript; cambiar preferencias mientras la página está abierta.
**Aceptación:** resultados efectivos coinciden con la función de resolución; `system` nunca busca una paleta inexistente; no hay pantalla vacía ni dependencia de almacenamiento para leer.
**Evidencia:** pruebas unitarias de resolución y comportamiento de navegador.

## T14. Elección explícita y ausencia de cambios inesperados

**Requisitos:** PREF-03, PREF-05.
**Procedimiento:** elegir oscuro y luz suave explícitos, luego cambiar preferencias del sistema; modificar color y escala con teclado durante lectura; activar colores forzados por separado.
**Aceptación:** elecciones explícitas persisten salvo la representación impuesta por colores forzados; el cambio de presentación no recarga ni mueve foco. Reducir movimiento en el sistema nunca puede anularse con una opción local.
**Evidencia:** estado guardado, atributos efectivos y elemento enfocado.

## T15. Persistencia, migración y navegación entre áreas

**Requisitos:** PREF-04–05, ARCH-02.
**Procedimiento:** elegir combinación no predeterminada; navegar inicio → investigación → nota Quarto → publicación → otra lengua; recargar; abrir segunda pestaña; cambiar ajuste en una pestaña. Si la clave v1 existe, usar una fixture validada de sus valores.
**Aceptación:** consistencia entre rutas, sin listeners duplicados ni reinterpretación de strings; migración solo de campos válidos y sin borrar almacenamiento ajeno.
**Evidencia:** estado y secuencia de páginas.

## T16. Almacenamiento denegado y estado corrupto

**Requisitos:** PREF-04.
**Procedimiento:** simular excepción en escritura y lectura de almacenamiento; introducir JSON inválido, tipos erróneos, valores fuera de rango y campos desconocidos en la clave propia de un perfil de prueba.
**Aceptación:** no hay caída; la interfaz aplica cambios en memoria; se informa que no se guardaron cuando corresponde; datos inválidos vuelven a valores seguros.
**Evidencia:** pruebas negativas automatizadas, consola sin errores no manejados y mensajes al usuario.

## T17. Restablecer y privacidad

**Requisitos:** PREF-06, GOV-05.
**Procedimiento:** personalizar todo, restablecer y recargar; colocar un valor ajeno de prueba en almacenamiento y verificar que permanece; inspeccionar solicitudes de red y parámetros de URL.
**Aceptación:** valores iniciales restaurados; foco conservado; una confirmación; ninguna preferencia o diagnóstico enviado a terceros y ningún `localStorage.clear()`.
**Evidencia:** comparación de almacenamiento propio/ajeno y revisión de red.

## T18. Vídeo con subtítulos y controles

**Requisitos:** MEDIA-01–02.
**Procedimiento:** cargar sin reproducir; operar por teclado; activar subtítulos; revisar sincronización, hablantes, sonidos relevantes y términos científicos contra el audio; entrar y salir del reproductor/iframe.
**Aceptación:** reproducción solo por acción, controles accesibles, subtítulos revisados y transcripción local enlazada; no hay trampa de foco.
**Evidencia:** revisión temporal del vídeo y archivo de subtítulos; no basta constatar que existe un `.vtt`.

## T19. Información visual y audiodescripción

**Requisitos:** MEDIA-02.
**Procedimiento:** escuchar el vídeo sin verlo; identificar información necesaria solo visual —valores, diagramas, acciones del robot, cambios en pantalla—; comprobar narración original o versión audiodescrita.
**Aceptación:** información necesaria verbalizada en el momento útil o en versión descrita apropiada. Una transcripción textual aislada no se presenta como sustituto de 1.2.5 AA.
**Evidencia:** lista de segmentos y cómo se resuelven. Si la narración ya es suficiente, registrar esa revisión.

## T20. Audio solo y vídeo sin audio

**Requisitos:** MEDIA-02.
**Procedimiento:** inventariar podcasts, audios y demostraciones silenciosas; comparar contenido original y alternativa; recorrer controles con teclado.
**Aceptación:** audio con transcripción y vídeo silencioso con alternativa equivalente apropiada. Los nombres, pasos, sonidos o eventos relevantes no desaparecen en la alternativa.
**Evidencia:** archivos, rutas y revisión humana. Si no existen, documentar el inventario para NO_APLICA.

## T21. Emisiones en directo

**Requisitos:** MEDIA-02.
**Procedimiento:** determinar si el alcance incluye una emisión real o un reproductor en directo; comprobar disponibilidad y funcionamiento de subtítulos durante un ensayo autorizado; revisar controles y alternativa posterior.
**Aceptación:** el servicio previsto existe y opera; no se promete subtitulado sin proveedor o recurso real. Al publicar una grabación, revisar los requisitos de pregrabado.
**Evidencia:** ensayo o inventario que justifique NO_APLICA.

## T22. Movimiento, pausa y actualizaciones

**Requisitos:** TECH-01, MEDIA-03, PREF-03.
**Procedimiento:** activar reducción de movimiento; recorrer transiciones, galerías, GIF, loaders y estados; dejar la página abierta y observar actualizaciones automáticas; activar pausa donde corresponda.
**Aceptación:** contenido disponible sin animación; controles de pausa efectivos; no se reinicia movimiento inesperadamente ni se rompe un componente por esperar `animationend`.
**Evidencia:** comparativa funcional de ambos estados y fuentes de movimiento inventariadas.

## T23. Destellos

**Requisitos:** MEDIA-03.
**Procedimiento:** inventariar animaciones y vídeos potencialmente problemáticos; no reproducir material sospechoso de forma repetitiva a una persona para “probar tolerancia”; usar revisión técnica y herramienta específica cuando sea necesaria.
**Aceptación:** ausencia de efectos creados por el sitio que violen el criterio y análisis apropiado de material relevante; una advertencia no se cuenta como corrección.
**Evidencia:** inventario, análisis y decisión; si no hay análisis disponible para un material sospechoso, registrar bloqueo o pendiente, no PASS.

## T24. Texto a 200 %

**Requisitos:** READ-01, READ-03.
**Procedimiento:** usar tamaño del sitio 200 % y, separadamente, zoom real 200 % y ampliación de texto del navegador cuando exista; verificar títulos, navegación, etiquetas, errores, tablas y vídeo.
**Aceptación:** sin texto cortado, elementos solapados ni acciones inaccesibles; el usuario conserva zoom nativo.
**Evidencia:** configuración y revisión por plantilla; no confundir duplicar CSS con haber probado zoom real.

## T25. Reflujo y zoom 400 %

**Requisitos:** READ-03, COMP-01, VIS-06.
**Procedimiento:** comprobar 320 píxeles CSS y ventana de 1280 a zoom real 400 %; recorrer formularios, notas, diálogo y cabecera; inspeccionar scroll horizontal.
**Aceptación:** no existe scroll horizontal de toda la página para lectura habitual; excepciones bidimensionales se limitan a regiones accesibles y justificadas; no se oculta contenido con `overflow-x:hidden`.
**Evidencia:** medición y registro de excepciones, no solo ausencia visual de barra.

## T26. Espaciado simultáneo

**Requisitos:** READ-04.
**Procedimiento:** aplicar hoja de usuario con interlineado 1.5, párrafos 2em, letras 0.12em y palabras 0.16em conjuntamente; recorrer todas las plantillas y controles de estados largos en ambos idiomas.
**Aceptación:** no se recorta ni pierde información o funcionalidad; ningún contenedor exige altura fija incompatible.
**Evidencia:** hoja usada y hallazgos por ruta.

## T27. Modo lectura y fuente del sistema

**Requisitos:** READ-01–02, SEM-03.
**Procedimiento:** activar lectura en artículo científico, noticia y bitácora; alternar fuente y espaciado; navegar con lector de pantalla y comparar contenido antes/después.
**Aceptación:** una columna, sin duplicación de IDs ni desaparición de datos, bibliografía, pies, advertencias o salida del modo. Los complementos ocultos no reciben foco.
**Evidencia:** comparación estructural, lectura y control de salida.

## T28. Idiomas y localización

**Requisitos:** LANG-01.
**Procedimiento:** cambiar español/inglés desde una página profunda; revisar idioma de documento y partes, nombres de controles, errores y fechas; abrir traducción faltante y volver al original.
**Aceptación:** equivalencia cuando existe, ausencia explícita cuando no; preferencias preservadas; sin banderas como único nombre ni traducciones ficticias.
**Evidencia:** rutas, etiquetas `lang`, anuncios y revisión editorial.

## T29. Figuras, diagramas y datos

**Requisitos:** SCI-02, VIS-07, SEM-04.
**Procedimiento:** elegir gráfico de resultados, arquitectura y fotografía; ocultar visualmente la figura para revisar alternativa con lector; contrastar texto y tabla contra los datos originales; comprobar acceso por teclado a datos interactivos.
**Aceptación:** descripción útil, datos fieles, incertidumbre conservada, sin color exclusivo ni valores inventados. La descripción larga puede navegarse como HTML.
**Evidencia:** figura, fuente de datos y revisión de su alternativa.

## T30. Tablas

**Requisitos:** SCI-03.
**Procedimiento:** navegar tabla simple y compleja con lector; verificar encabezados y captions; ordenar si existe esa función; repetir en 320 CSS px y con texto ampliado.
**Aceptación:** valores mantienen su contexto, ordenación anunciada, desplazamiento local operable; conversión responsive no elimina semántica.
**Evidencia:** lectura de celdas de muestra y asociación de encabezados.

## T31. Matemáticas

**Requisitos:** SCI-04, ARCH-02.
**Procedimiento:** probar ecuación inline y de bloque, fracción/matriz cuando existan; leer y navegar estructura con herramientas reales; copiar LaTeX; comparar semántica expuesta con visualización; cambiar idioma y paleta.
**Aceptación:** expresión utilizable, variables explicadas, sin anuncio duplicado ni imagen muda; copia fiel.
**Evidencia:** versiones de renderizador, navegador y lector, expresión probada y limitaciones observadas.

## T32. Documentos descargables

**Requisitos:** SCI-01, SCI-05.
**Procedimiento:** revisar CV y documento propio representativo; comprobar alternativa HTML, nombre/formato de enlace, texto, estructura, idioma y lectura de PDF; contrastar con archivo fuente.
**Aceptación:** acceso útil en HTML y documento revisado según su alcance; no se declara accesibilidad por mera existencia del PDF. Barreras de materiales externos indicadas sin ocultar su disponibilidad.
**Evidencia:** archivo y versiones de herramientas realmente usadas; resultados manuales y automáticos separados.

## T33. JavaScript desactivado y error de carga

**Requisitos:** TECH-02, PREF-05.
**Procedimiento:** desactivar JavaScript; abrir directamente inicio, archivo de publicaciones y nota científica; bloquear inicializador de preferencias en otra ejecución.
**Aceptación:** contenido y enlaces principales en HTML, navegación funcional, colores legibles de respaldo; ningún loader perpetuo ni pantalla vacía. Ajustes avanzados no disponibles se explican sin bloquear lectura.
**Evidencia:** navegación real y fuentes entregadas al navegador.

## T34. Datos reducidos y terceros

**Requisitos:** TECH-03–04, MEDIA-01.
**Procedimiento:** inspeccionar red en carga inicial; activar modo de datos reducidos; bloquear reproductor y mapa externos; comprobar que una miniatura no inicia descarga completa; medir presupuesto de recursos con método documentado.
**Aceptación:** medios bajo demanda, alternativa textual mantenida, errores claros sin falsa carga o éxito; no se envían preferencias a proveedores.
**Evidencia:** solicitudes y pesos, incluidos método de compresión y exclusiones; los presupuestos son objetivos del proyecto.

## T35. Arrastre y gestos equivalentes

**Requisitos:** INPUT-03.
**Procedimiento:** para cada interacción de arrastre, completar la tarea con teclado y luego con clics/toques simples sin arrastrar; comprobar galerías, mapas y visualizadores si existen.
**Aceptación:** ambas alternativas disponibles donde se requieran; no basta la opción de teclado para afirmar cumplimiento de 2.5.7.
**Evidencia:** pasos de las tres modalidades o inventario que justifique ausencia.

## T36. Tacto, cancelación, orientación y tamaño

**Requisitos:** INPUT-02–03.
**Procedimiento:** medir región activable de controles principales; probar con fuente del navegador reducida; pulsar y salir antes de soltar; usar orientación horizontal y pantalla pequeña; inspeccionar dependencia de sensores.
**Aceptación:** controles principales alcanzan 44×44 CSS px de proyecto; sin solapamiento; acciones cancelables; orientación y modalidades no bloqueadas; enlaces inline tratados según las condiciones correspondientes.
**Evidencia:** mediciones y operaciones reales, no tamaño del icono aislado.

## T37. Etiquetas y control por voz

**Requisitos:** SEM-02, INPUT-04.
**Procedimiento:** comparar texto visible y nombre accesible de controles; invocar acciones por su etiqueta con herramienta real de voz cuando esté disponible; comprobar que búsqueda y contacto también funcionan sin micrófono.
**Aceptación:** nombres coherentes y activación reconocible; modalidades concurrentes.
**Evidencia:** inspección automatizable y prueba real separadas. Sin herramienta, la parte de voz queda PENDIENTE_MANUAL.

## T38. Tooltips, desplegables y acordeones

**Requisitos:** COMP-05.
**Procedimiento:** activar contenido por foco y puntero; mover puntero al emergente, intentar cerrar, permanecer en él y navegar fuera; operar acordeones nativos con teclado.
**Aceptación:** emergentes accesibles según su caso, sin instrucciones esenciales solo en hover; apertura/cierre y semántica coherentes; texto no desaparece antes de poder leerlo.
**Evidencia:** secuencias de interacción por mecanismo.

## T39. Copiar cita, enlaces sociales y código

**Requisitos:** COMP-02, COMP-06, VIS-07.
**Procedimiento:** copiar cita y código, simular rechazo de portapapeles; seleccionar manualmente; comprobar enlaces a redes y aviso de nueva pestaña cuando proceda; revisar resaltado de código en cada perfil.
**Aceptación:** contenido copiado fiel, feedback sin mover foco, alternativa manual; enlaces nombrados y formatos indicados; ningún color de sintaxis ilegible.
**Evidencia:** texto original/copiado y anuncios reales.

## T40. Autenticación o procesos especiales, si existen

**Requisitos:** COMP-07.
**Procedimiento:** inspeccionar si existen login, recuperación, códigos, procesos de varios pasos o cambios con consecuencias; probar pegado, gestor y alternativas permitidas; detectar transcripción o memoria obligatoria.
**Aceptación:** se atienden criterios aplicables sin añadir autenticación al contenido público. Si no existen estos procesos, NO_APLICA con inventario.
**Evidencia:** alcance exacto y recorrido de prueba; no recopilar credenciales reales en reportes.

## T41. Atención, límites temporales y ayuda

**Requisitos:** COG-01, OUT-02, TECH-04.
**Procedimiento:** revisar navegación y contenido con énfasis en instrucciones y carga cognitiva; dejar formularios o búsquedas abiertos; revisar expiraciones y mensajes temporales; encontrar contacto y reporte de barreras desde varias rutas.
**Aceptación:** no hay presión artificial, expiraciones inesperadas ni información esencial efímera; ayuda consistente y reporte no exclusivamente oral.
**Evidencia:** revisión humana y comportamiento temporal, sin afirmar que un simulador reproduce una discapacidad cognitiva.

## T42. Recorrido integral, integración y entrega

**Requisitos:** IA-01–03, ARCH-01–03, CI-01–02, DONE-01–02.
**Procedimiento:** encontrar investigación → leer explicación → consultar figura y ecuación → abrir publicación → copiar cita → localizar repositorio → comprender vídeo → contactar. Repetir entre generadores, idiomas y modalidades; construir desde limpio respetando archivos del usuario; revisar reporte, matriz y declaración pública.
**Aceptación:** recorrido completo posible; mismo sistema de preferencias; pruebas y limitaciones honestas; todos los requisitos tienen responsable/componente y evidencia o pendiente explícito.
**Evidencia:** reporte final por entorno. Cero fallas automáticas no elimina pendientes manuales ni habilita un sello de accesibilidad total.

---

## Plantilla mínima de evidencia por ejecución

```json
{
  "caseId": "T06",
  "requirementIds": ["COMP-04", "PREF-01"],
  "wcag": ["2.1.1", "2.1.2", "2.4.3", "4.1.2"],
  "route": "RUTA_REAL",
  "commit": "COMMIT_REAL",
  "environment": {
    "os": "VERIFICAR",
    "browser": "VERIFICAR",
    "assistiveTechnology": "VERIFICAR_O_NO_USADA",
    "viewportCssPx": "VERIFICAR",
    "zoom": "VERIFICAR",
    "palette": "editorial|editorial|light"
  },
  "status": "NO_EVALUADO",
  "observed": null,
  "evidencePath": null,
  "testedAt": null
}
```

Los valores de la plantilla no son resultados. Sustituir solo por lo realmente observado; `null` permanece cuando no existe evidencia.


---
