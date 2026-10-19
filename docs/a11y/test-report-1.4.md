# Verificación 1.4 · revisión de la web publicada

Fecha del propietario: 18 de octubre de 2026, America/Santiago. Algunos registros de ejecución ya corresponden al 19 de octubre en UTC. La identidad final queda en release.json y en la ejecución de publicación.

## Hallazgos y correcciones

La revisión del sitio público reprodujo el fallo del menú: en una pantalla de 375 píxeles, el desplegable empezaba en −134,17 y terminaba en 184,58. La comprobación anterior solo verificaba que el elemento existía y fuera visible, sin comprobar su posición ni su capacidad real de recibir pulsaciones. La nueva navegación se abre en el flujo de la página en móvil y se ancla al encabezado en escritorio. Se comprueban límites, pulsación de enlaces, idiomas, texto ampliado y el estado abierto del control. Una captura adicional detectó una regla global de summary con !important que causaba texto oscuro sobre el botón abierto; se corrigió expresamente.

Inicio se reduce al retrato real, una presentación breve y seis tarjetas. Se retiran las ilustraciones generadas, sus rótulos, el escaparate investigación/memoria/docencia y la biblioteca incrustada. Docencia conserva sus tres asignaturas, sin banner artificial. Las tarjetas mantienen su formato, con jerarquía y acentos del sistema de paletas. Los enlaces a repositorios y al perfil de GitHub se eliminan de la interfaz y los datos estructurados. Proyectos e ingeniería quedan apagados; el verificador rechaza su promoción no autorizada.

La biblioteca tiene una publicación personal, cuatro lecturas recientes de 2025–2026, nueve hitos desde 1997 a 2026 y tres vídeos. Los hitos recogen líneas paralelas, no una genealogía exhaustiva. Los trabajos recientes distinguen artículo de revista, preprint en desarrollo, artículo de posición y revisión. La selección apunta a los originales; no se atribuye al propietario ningún artículo ajeno.

El vídeo se conecta a YouTube solo por petición, con idioma de controles y preferencia de subtítulos de la página. El botón de cierre queda fuera del área del reproductor, dejando libres los controles nativos. Se corrigieron las etiquetas de procedencia para mostrar a BotJunkie, Pulkit Agrawal y Hod Lipson como canales de subida de los vídeos originales enlazados por los proyectos.

## Comprobaciones y evidencia

- Astro: 90 archivos comprobados, sin errores, advertencias ni hints.
- Módulos: 104 pruebas aprobadas, incluida cronología, procedencia, recientes y restricción de repositorios.
- Construcción: 75 salidas Astro y seis páginas Quarto; 72 páginas de contenido en cuatro idiomas. El inventario compilado tiene 132 archivos y cero recursos internos ausentes.
- Navegadores: pruebas en Chromium, Firefox y WebKit con perfil móvil. El recuento y resultado definitivo de la suite completa quedan en el JSON de ejecución y en CI. Hay regresiones específicas para el menú abierto, los cuatro idiomas, ampliación, separación de la biblioteca, ausencia de repositorios y controles del vídeo sin superposición.
- Contraste: 24 paletas originales; 384 pares opacos sin fallos. Se comprueba texto renderizado en ocho tipos de página y con el menú abierto, además del análisis axe en claro y oscuro. Es evidencia parcial de accesibilidad, no certificación.
- Visual: emulación de 320, 375, 390, 768, 1440 y 1920 píxeles, captura de Inicio, menú, biblioteca, cronología y observatorio. La ampliación se simula con CSS y no equivale a zoom real o dispositivo físico.
- Observatorio: se mantienen activaciones, memoria, escenarios, comparación por pares y verificación exacta de episodios entre motores. La simplificación de Inicio no elimina los instrumentos del laboratorio.
- Vídeo externo: se comprobaron los tres reproductores y el inicio de reproducción real, con avance temporal, sin anuncio y silenciado, en Google Chrome instalado. El Chromium empaquetado no confirmó avance en esa prueba; se conserva el registro separado, sin etiquetarlo como reproducción aprobada. No se revisó la reproducción completa, audición física, calidad de subtítulos ni audiodescripción.
- Gobernanza: 18 pruebas Python y validador documental D2 ejecutados. Sintaxis y fronteras de módulos se comprueban aparte.

## Fuentes de la nueva biblioteca

Los registros primarios incluyen [LSTM (1997)](https://doi.org/10.1162/neco.1997.9.8.1735), [World Models (2018)](https://arxiv.org/abs/1803.10122), [Titans, publicación NeurIPS 2025](https://papers.nips.cc/paper_files/paper/2025/file/a4ca07aa108036f80cbb5b82285fd4b1-Paper-Conference.pdf), [simulación del propio robot (2025)](https://arxiv.org/abs/2311.12151), [reutilización de experiencias (2026)](https://arxiv.org/abs/2604.27003), [memoria modular (2026)](https://arxiv.org/abs/2603.01761) y [revisión de memoria de agentes (2026)](https://arxiv.org/abs/2605.06716). Los seis registros de la biblioteca anterior conservan su procedencia. La fecha de publicación de un artículo se distingue de la primera versión de su preprint.

## Límites

La revisión humana lingüística, los programas docentes definitivos, NVDA/VoiceOver/TalkBack, dispositivos reales, control real por voz, zoom real y calidad audiovisual siguen pendientes. WebKit emulado no acredita Safari físico. Las ayudas de lectura no constituyen afirmaciones clínicas. El observatorio conserva un entorno y reglas diseñados y una red educativa pequeña: no demuestra conciencia, libre albedrío o equivalencia con decisiones humanas.

Las pruebas de CI y la comprobación posterior del sitio público deben vincularse al commit publicado. Los informes anteriores se conservan como históricos.
