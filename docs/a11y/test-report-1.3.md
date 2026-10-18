# Verificación de la versión 1.3

Fecha: **18 de octubre de 2026**. Rama: `fix/grafito-accessibility-complete`. El commit definitivo queda registrado en `release.json` y en el manifiesto de la entrega; se evita un hash circular dentro de este documento.

**Resultado: rediseño visual ampliado, docencia interactiva y observatorio con instrumentos calculados. La aceptación manual de accesibilidad y la revisión audiovisual siguen pendientes.** No se declara conformidad WCAG completa, validación científica del agente ni revisión humana de subtítulos. Los informes 1.1 y 1.2 se conservan como históricos.

## Cambios cubiertos

- **80 páginas de contenido** en inglés, español, alemán y neerlandés. La nueva biblioteca tiene equivalentes en los cuatro idiomas. Se mantienen CV, publicaciones propias, repositorios, contacto, navegación, lectura por voz voluntaria y breadcrumbs.
- Portada con una nueva composición visual, tres ilustraciones conceptuales originales y derivados WebP responsive. Imágenes de memoria y docencia, movimiento escultórico, órbita y transición de decisiones. Los prompts exactos y hashes se conservan en `../visual-assets-1.3.md`.
- Animación CSS detenible desde la barra visible; por defecto sigue el sistema. Concentración y movimiento reducido detienen las animaciones. El avance temporizado del agente requiere una pulsación, se limita a 24 pasos y se pausa con pestaña oculta, salida o pérdida de visibilidad del observatorio.
- Solo las asignaturas confirmadas por el propietario: **Minería de Datos, Econometría y Visualización de Datos**. Unidades, herramientas y actividades descritas como esquema editorial pendiente de revisión. Tres ejemplos manipulables con datos sintéticos: umbral de clasificación y matriz de confusión; sesgo por variable omitida y ajuste; observaciones frente a medias agrupadas.
- Observatorio con exploración guiada, cuatro intervenciones de situación, escena de acciones, controles numéricos y deslizadores. Modo técnico con las **19 unidades de la red 4→8→6→1**, pesos, sesgos, activaciones actuales, mapa 5×5 de energía/fatiga, siete puntos de pérdida de entrenamiento y fórmulas. Las leyendas explican símbolos, líneas y límites; el mapa bidimensional tiene desplazamiento local con teclado bajo ampliación.
- Línea temporal e inspector de decisiones registradas. Dos copias continúan 12 decisiones desde el mismo historial y semilla, con influencia del modelo propio α=1 frente a α=0. El agente activo se conserva. El replay exacto entre motores mantiene el identificador `experience-self-mlp-1.0.1`.
- Biblioteca con **tres vídeos externos y seis trabajos del campo**, separados de las publicaciones propias. El reproductor se crea tras una pulsación, sin autoplay, y se elimina al cerrar o filtrar la tarjeta. Las explicaciones escritas en cuatro idiomas son acompañamientos temáticos breves, no transcripciones completas.
- Se mantienen las 24 paletas originales. Congresos/viajes, noticias y vídeos propios siguen preparados y apagados hasta disponer de material real. El correo se conserva exactamente como `i.darochormeo@uandresbello.edu`.

## Entorno y evidencia

Windows; Node 24.19.0, npm 12.2.0, Python 3.13, Quarto 1.10.18, Astro 7.4.0, TypeScript 6.0.3, Playwright 1.64.1 y axe 4.14.0. Navegadores sin interfaz: Chromium 156.0.8078.4 y Firefox 157.0. Capturas inspeccionadas por el agente de implementación, sin dispositivo físico ni sesión de tecnología de apoyo.

| Comprobación | Resultado observado | Alcance |
|---|---|---|
| Pruebas de módulos | 101 aprobadas | Red, memoria, replay, diagnóstico, continuaciones por pares, cálculos didácticos, catálogos y contratos anteriores |
| Diagnóstico Astro | 88 archivos; cero errores, advertencias o hints | Componentes y rutas |
| Sintaxis JavaScript | 77 módulos comprobados | Código, herramientas y pruebas |
| Construcción | 81 salidas Astro y 6 páginas Quarto; 151 archivos; cero recursos internos ausentes | 80 páginas de contenido, cuatro páginas de error y tres redirecciones noindex |
| Navegadores | 65 pruebas aprobadas: 56 Chromium, 9 Firefox | Rutas, preferencias, teclado, CV, voz simulada, docencia, nuevos instrumentos, vídeos bajo demanda y replay exacto |
| axe claro y oscuro | 80 páginas por tema, cero infracciones automáticas detectadas | Selección A/AA de axe; no sustituye evaluación humana |
| Contraste renderizado | 24 paletas en ocho tipos de página, cero fallos de texto | Incluye portada, docencia, biblioteca y modo técnico con datos; 4,5:1 o 7:1 en alto contraste |
| Tokens | 24 combinaciones iguales al JSON; 384 pares opacos sin fallo; 3 pruebas del verificador | No certificación perceptiva |
| Reflujo | 320/375/768/1280/1920; ampliación de texto 200 %, espaciado, oscuro y monocromo | Incluye nuevas vistas y modo técnico abierto; no zoom real del navegador |
| Gobernanza | 18 pruebas Python y validador D2 aprobados | Documentación y trazabilidad |
| Inspección visual | Nueve capturas y medición de recursos solicitados | Escritorio, móvil, docencia, biblioteca, red, CV, Quarto y alto contraste |

La medición de la portada inglesa observó 305.368 bytes de recursos iniciales locales, incluidos los tres WebP de arte y el retrato optimizado. La suma estimada con gzip fue 227.995 bytes, con 16.690 bytes estimados de JavaScript externo crítico; estas son estimaciones locales de compresión, no velocidad real, Core Web Vitals ni presupuesto universal de dispositivo. Los scripts inline están incluidos en el HTML. El informe JSON desglosa los archivos y el método.

Las comprobaciones específicas reproducen el pase hacia delante, contrastan la pérdida final con las predicciones reales y verifican que inspección y comparación preservan el agente activo. En econometría se recupera el coeficiente sintético conocido tras ajustar por la causa común. Los tests del reproductor interceptan la petición al proveedor: prueban consentimiento de carga y retirada del iframe, **no reproducción real ni calidad audiovisual**.

## Procedencia científica

Los dos trabajos sobre modelos propios corporales se enlazan a las páginas originales de [evolutionary self-modeling](https://www.creativemachineslab.com/evolutionary-self-modeling.html) y [visual self-modeling](https://www.creativemachineslab.com/visual-self-modeling.html). Curiosidad enlaza al [proyecto original de Pathak y colaboradores](https://pathak22.github.io/noreward-rl/). Los otros trabajos son [Random Network Distillation](https://arxiv.org/abs/1810.12894), [Experience Replay for Continual Learning](https://arxiv.org/abs/1811.11682) y [DreamerV3](https://danijar.com/project/dreamerv3/). Las páginas primarias suministran los identificadores de los vídeos. La consulta de las URL directas de YouTube estuvo limitada; no se revisaron subtítulos ni reproducción real.

El artículo propio y el CV conservan la procedencia de la versión 1.2, incluida la distinción entre declaración de LinkedIn y documento independiente. No se inventaron nuevas publicaciones, cursos, títulos, viajes o redes del propietario.

La red del observatorio estima capacidad desde recuerdos conservados en un entorno sintético. La utilidad y retención son reglas diseñadas, la incertidumbre es heurística y la pérdida mostrada mide ajuste al entrenamiento. Esto no prueba conciencia, libre albedrío, autonomía humana, generalización ni calibración empírica. Los modelos del cuerpo y del mundo citados son referencias relacionadas, no implementaciones reproducidas por este pequeño laboratorio.

## Pendientes de aceptación manual

- NVDA, VoiceOver, TalkBack, control real por voz, audición en cuatro lenguas y dispositivos físicos; anuncios dinámicos, tablas, navegación por figuras y mapa bidimensional.
- Zoom real 200/400 %, temas reales, tacto y percepción de foco/colores. Los tests de reflujo usan emulación y ampliación CSS.
- Subtítulos, transcripciones completas, audiodescripción o cobertura de narración y manejo real de los tres reproductores externos. Los criterios 1.2 y guiones T18–T20 se reabren como pendientes.
- Revisión humana lingüística y del esquema temático de asignaturas. No se afirma un beneficio clínico de las preferencias para TEA/TDAH.
- Documentos de títulos/certificados y futuros archivos PDF o medios propios, cuando se aporten.

El código se entrega en una rama y una solicitud de cambios en borrador. **No se desplegó en producción.** La evidencia de CI, identidad del código y comprobación de archivos se registra junto a la entrega.
