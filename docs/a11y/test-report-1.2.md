# Verificación de la versión 1.2

Fecha: **18 de octubre de 2026**. Rama: `fix/grafito-accessibility-complete`. El identificador definitivo del código se registra en el `release.json` de la construcción limpia y en el manifiesto de entrega; este documento no incorpora su propio hash circular.

**Resultado: rediseño multilingüe funcional, con currículum interactivo y observatorio neuronal. La aceptación manual de accesibilidad sigue pendiente.** No se declara conformidad WCAG completa ni validación científica del agente. Los resultados anteriores se conservan en `test-report-1.1-history.md`; no se usan como evidencia de esta interfaz.

## Cambios cubiertos

- 76 páginas de contenido en inglés, español, alemán y neerlandés. Interfaz, preferencias, errores, observatorio, CV, búsqueda y explicaciones científicas localizadas. Títulos científicos originales, instituciones, código y DOI conservan su idioma.
- 24 paletas originales y selector rápido de necesidad visual. Composición amplia por defecto; lectura en una columna, concentración y lectura guiada opcionales.
- Lectura por voz iniciada por el visitante; voz del idioma actual, velocidad, pausa, continuación, detención y fallback por falta de voz.
- Breadcrumbs jerárquicos y procedencia interna de la sesión. Las notas Quarto reciben su ubicación y equivalencias de idioma propias; navegación y pie compartidos fuera de `main`.
- CV con 18 entradas del LinkedIn público: cinco experiencias, cuatro entradas de formación, ocho certificaciones únicas y una beca ANID. Filtros, búsqueda local, etapas e impresión completa. Declaraciones del perfil, sin contraste independiente de documentos.
- Congresos/viajes, noticias y vídeos preparados y apagados; ausentes de menús y sitemap. Activación condicionada a registros, fuentes, fechas y cuatro traducciones. Audiovisuales requieren alternativas revisadas.
- Agente educativo con MLP 4→8→6→1 aprendido de experiencias conservadas: estado interno, olvido/refit, evaluación ponderada, contrafactuales y replay determinista. BFS queda como ejemplo secundario.

## Entorno y comprobaciones ejecutadas

Windows; Node 24.19.0, npm 12.2.0, Python 3.13, Quarto 1.10.18, Astro 7.4.0, TypeScript 6.0.3, Playwright 1.64.1 y axe 4.14.0. Chromium 156.0.8078.4 y Firefox 157.0, sin interfaz. Capturas inspeccionadas por el agente de implementación; no equivalen a sesiones con usuarios o tecnología de apoyo.

| Comprobación | Resultado observado | Alcance |
|---|---|---|
| `npm test` | 93 pruebas aprobadas | Dominios anteriores, agente neuronal, memoria, contrafactuales, importación, idiomas, CV y activación de módulos |
| `npm run check` | 0 errores, advertencias o hints | 74 archivos analizados por Astro |
| `npm run check-js` | Sintaxis válida | Módulos, herramientas y pruebas |
| `npm run check:architecture` | Sin infracciones | Fronteras del laboratorio histórico; agente nuevo comprobado por contratos puros |
| `npm run build` | 77 salidas Astro, 6 páginas Quarto; 128 archivos, cero recursos internos ausentes | Cuatro páginas de error y tres redirecciones `noindex`; 76 páginas de contenido |
| `npm run check:palettes` | 24 combinaciones iguales al JSON | Tokens de los anexos conservados |
| `npm run check:contrast` | 384 pares, cero fallos; 3 pruebas del verificador aprobadas | Pares opacos; no certificación perceptiva |
| `npm run test:e2e` | 56 pruebas aprobadas | Chromium y recorridos compartidos en Firefox; JSON y trazas separados de fallos anteriores |
| axe en las 76 páginas en claro y oscuro | Cero infracciones automáticas detectadas | Criterios A/AA seleccionados por axe; sin cobertura manual completa |
| Contraste renderizado en las 24 paletas | Cero fallos de texto en cinco tipos de página | Preferencias, artículo, agente con resultados, CV y código Quarto; mínimo 4,5:1 o 7:1 en alto contraste |
| Reflujo | Sin desbordamiento a 320/375/768/1280/1920; combinación de texto 200 %, espaciado, oscuro, monocromo y lectura a 320 | Emulación CSS; no zoom real ni dispositivo físico |
| CV | 18 entradas, 8 certificaciones, filtros y búsqueda; impresión completa | PDF de prueba generado por Chromium; no PDF/UA declarado |
| Voz | Inicio voluntario, idioma, pausa/continuación/detención y falta de voz con API simulada | Sin audición física ni proveedor real comprobados |
| Gobernanza documental | 18 pruebas Python y validador D2 aprobados | Registro documental separado del producto |

Las pruebas iniciales detectaron colores de Bootstrap en desplegables y desbordamiento de la red decorativa bajo ampliación extrema. Se corrigieron los consumidores de tokens y la composición. Una expectativa de URL relativa se corrigió para aceptar la URL absoluta equivalente de Quarto. La inspección visual motivó la comprobación expresa de migas y equivalencias por nota. Una prueba adicional detectó que las funciones trascendentes nativas podían amplificar diferencias entre motores durante el entrenamiento. La implementación `experience-self-mlp-1.0.1` usa pesos iniciales enteros deterministas y una aproximación exponencial de aritmética fija para las activaciones; 601 puntos del rango acotado se contrastan numéricamente. Se conserva la comparación exacta del replay, sin tolerancia añadida. La nueva prueba exporta 48 decisiones en ambos navegadores, compara todos los datos y verifica el intercambio en ambas direcciones; una alteración de un peso de 1e-10 se rechaza.

## Evidencia editorial y científica

El artículo se contrastó con la [fuente institucional UNAB](https://researchers.unab.cl/en/publications/a-governed-nl-to-sql-architecture-for-reliable-clinical-data-quer/). El CV usa el [perfil público de LinkedIn](https://cl.linkedin.com/in/isaac-german-daroch-ormeno), consultado en esta fecha; véase `linkedin-provenance.json`. No se inventaron enlaces a títulos, vídeos, viajes ni repositorios clínicos. El término doctoral de 2029 se presenta como previsto.

El agente tiene entorno sintético, utilidad y retención diseñadas y una red pequeña entrenada con memoria limitada. La incertidumbre es un indicador heurístico sin calibración empírica. Una prueba reproduce una elección distinta al retirar la influencia del modelo propio bajo el mismo estado actual y sin órdenes externas. Esto demuestra el mecanismo programado; no establece conciencia, libre albedrío, equivalencia con decisiones humanas ni resultados con participantes.

## Pendientes y límites prácticos

- NVDA con Chrome/Firefox, VoiceOver con Safari/iOS y TalkBack con Android; navegación matemática, estructura del CV, anuncios, figuras y tablas.
- Zoom real de navegador al 200/400 %, ampliación propia del navegador, temas reales del sistema, dispositivos táctiles y control real por voz.
- Audición de las cuatro lenguas con voces instaladas. Su disponibilidad depende del dispositivo; algunas usan servicios en línea. El audio no sustituye al lector de pantalla.
- Revisión humana de las traducciones y del contenido por el propietario. Las ayudas de atención son preferencias de uso, sin afirmaciones clínicas para TEA/TDAH.
- Verificación documental de títulos y certificados si se desea elevar su estado; revisión de PDF accesible y audiovisuales cuando existan esos archivos.

Los 77 requisitos, 55 criterios y 42 guiones de los adjuntos conservan sus alcances y pendientes. Las nuevas peticiones están en `user-request-mapping.md`; el mantenimiento en `../EDITAR_CONTENIDO.md`. Con ambos almacenamientos bloqueados, los ajustes duran solo en la página actual. Bajo carga lenta puede aparecer brevemente el tema del sistema antes de la preferencia guardada. No se añadió un overlay ni una pantalla bloqueante.

La versión se entrega en una rama revisable; la publicación en producción sigue siendo una operación separada del propietario.
