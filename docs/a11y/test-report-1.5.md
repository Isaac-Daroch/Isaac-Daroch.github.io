# Verificación 1.5 · traducciones y controles compactos

Fecha: 18 de octubre de 2026, America/Santiago. Los registros UTC pueden corresponder al 19 de octubre.

## Alcance y cambios

Se revisó el catálogo de 573 entradas localizadas: navegación, preferencias, audio, observatorio, biblioteca, docencia, currículum, publicaciones, notas científicas, estados, errores y textos de orientación. La revisión lingüística fue realizada por el agente; no constituye una revisión independiente por hablantes nativos. Los nombres propios, nombres de herramientas, identificadores y citas originales conservan su forma documental.

Se corrigieron expresiones poco naturales en alemán y neerlandés, traducciones incompletas y diferencias de significado entre idiomas. Se unificó «sugerencia externa»; se aclaró que el agente toma las decisiones. Las guías describen el cambio de energía y fatiga sin afirmar que cambia la memoria. Se explican el ajuste al entrenamiento y sus límites sin confundirlo con exactitud en datos separados.

El inspector usa etiquetas localizadas, decimales del idioma, leyendas completas y una abreviatura explicada de entropía cruzada binaria. Las fórmulas usan símbolos y explicaciones traducidas: no exponen claves inglesas de implementación. El cálculo del agente y sus formatos de exportación no cambian.

La biblioteca muestra títulos traducidos en español, alemán y neerlandés. El inglés conserva el título exacto del registro. Los originales están en detalles cerrados, marcados con lang=en. Autores, revistas, DOI y procedencia no se traducen ni se alteran. Se corrige la etiqueta genérica «artículo de revista»: la selección también contiene trabajos de congresos. Las prepublicaciones están diferenciadas.

La barra de accesibilidad comienza con dos controles: Accesibilidad y Escuchar, traducidos. Los ajustes se despliegan dentro del flujo de la página. Se mantienen las paletas, movimiento reducido, concentración, lectura en una columna, voces, velocidad y enlaces a preferencias completas. Los controles principales mantienen un mínimo de 44 píxeles. Escape cierra el panel y devuelve el foco al control. No hay cambio automático de preferencias al abrir o cerrar.

El módulo independiente Investigación está apagado. Se retiraron su tarjeta, su navegación, su entrada en el mapa del sitio y un enlace antiguo en el cuaderno Quarto. El observatorio, la biblioteca, las publicaciones y las notas científicas permanecen disponibles. Inicio tiene cinco tarjetas. Las cuatro direcciones antiguas de Investigación redirigen al observatorio en el mismo idioma. El compilador rechaza enlaces internos que vuelvan a promocionar el módulo retirado, además de la restricción previa sobre repositorios.

## Trazabilidad de la petición

| Petición | Implementación | Verificación |
|---|---|---|
| Revisar los cuatro idiomas | i18n.mjs y catálogos content, studio, minimal, cv, courses, library, notes | translations.test.mjs valida cobertura y fallos ante idiomas ausentes; translations.spec.mjs busca frases de otros idiomas en las páginas publicadas |
| Observatorio sin mezclas | ExperienceAgent, ObservatoryInstruments, observatory-studio.js | Casos en los cuatro idiomas: decisiones, inspector, memoria, comparaciones, entrada inválida y archivo rechazado |
| Biblioteca traducida | READING_TITLES y ResearchLibrary | Títulos locales, originales marcados, filtros, controles de vídeo y preferencia de idioma del reproductor |
| Barra compacta | chrome.mjs, minimal.css y preferences-runtime | Paneles cerrados al inicio, teclado, Escape, persistencia, geometría, texto ampliado, contraste y reflujo |
| Retirar Investigación | content-settings, PortfolioPage, chrome, investigation.astro y cuaderno | Ausencia de enlaces en todas las páginas, navegación y compilación |
| Publicar | Flujo de publicación existente | Artefacto de la rama principal con CI completo y comprobación posterior de identidad y rutas |

Los requisitos relacionados del documento aportado son IA-02, LANG-01, GOV-05 y las reglas de teclado, preferencias, contraste y reflujo. La petición actual del propietario prevalece sobre la lista de secciones de la especificación original. La publicación está autorizada expresamente en esta petición.

## Evidencia

Los resultados definitivos de módulos, tipos, contraste y navegadores se conservan en los registros de esta entrega y en las comprobaciones de publicación. La suite incluye Chromium, Firefox y WebKit móvil emulado. La revisión automática busca frases completas de otros idiomas fuera de las citas explícitamente marcadas; no equivale a un detector lingüístico universal ni demuestra que toda frase sea una traducción perfecta.

La revisión visual local confirma una barra cerrada de unos 56 píxeles CSS en las capturas de 375 y 1440 píxeles. A mayor tamaño de texto o menor anchura, los controles pueden ocupar más filas para conservar su legibilidad. No se bloquea el reflujo para forzar una altura fija.

## Límites

No se realizaron nuevas pruebas físicas con lectores de pantalla, móviles, audición o zoom real. La lectura por voz conserva su dependencia de las voces instaladas. Los vídeos externos mantienen su idioma original; los controles y las explicaciones del sitio están localizados, pero la disponibilidad y calidad de subtítulos depende del proveedor. No se declara conformidad WCAG completa ni una revisión profesional de traducción independiente.
