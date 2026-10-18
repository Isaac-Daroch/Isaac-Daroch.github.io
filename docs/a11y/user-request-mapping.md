# Correcciones solicitadas — versión 1.2

Las peticiones directas posteriores del propietario actualizan la presentación de los documentos adjuntos: tipografía del sistema, composición contemporánea amplia y lectura en una columna opcional. Se conservan los 24 conjuntos exactos de tokens. La aplicación sigue siendo usable por defecto; ninguna adaptación pretende diagnosticar o tratar una condición.

| Petición | Implementación | Comprobación y límite |
|---|---|---|
| Inglés, alemán, neerlandés y español | `public/assets/i18n.mjs`; `data/content.mjs`, `notes.mjs`, `cv.mjs`; rutas dinámicas y chrome compartido | Paridad de claves, recorridos completos, búsqueda y estados localizados; revisión humana lingüística pendiente |
| Eliminar frase bajo la foto | `PortfolioPage.astro`; eliminación también del Hero histórico | Inspección del texto y capturas |
| Opciones visuales rápidas y paleta efectiva | Selector visible; `preferences-core.mjs`, `preferences-runtime.mjs`; tokens originales | 24 combinaciones exactas y contraste renderizado; percepción cromática individual no certificada |
| Acceso por audio y ceguera | `reading-tools.mjs`; estructura HTML, salto, foco, textos equivalentes y controles nativos | API de voz simulada, inicio voluntario y fallback; audición física, NVDA/VoiceOver/TalkBack pendientes |
| Corregir columnas forzadas | `editorial.css`; entorno amplio, apilado responsive y lectura opcional | Anchos 320/375/768/1280/1920; combinación de texto 200 %, espaciado y monocromo |
| Apoyos para TEA/TDAH | Concentración opcional, lectura guiada, estructura estable, controles explícitos, sin autoplay ni cuenta atrás | Recorridos automatizados; no estudio con usuarios ni beneficio clínico afirmado |
| Breadcrumbs y procedencia | `chrome.mjs`; `reading-tools.mjs` | Ubicación jerárquica y enlace a la página anterior de la sesión; no historial remoto |
| Correo institucional | `site.mjs`, `chrome.mjs` | Se conserva exactamente `i.darochormeo@uandresbello.edu` |
| Investigación, publicaciones, repositorios y redes | `PortfolioPage.astro`, catálogo bibliográfico, Contacto | Artículo con DOI y fuente institucional; repositorio público confirmado; enlaces GitHub/ORCID/LinkedIn |
| Congresos, viajes, noticias y vídeos sin material | `content-settings.json`; `editorial.json`; `module-contracts.mjs` | Módulos preparados, apagados y sin enlaces públicos; activación exige contenido real y traducciones |
| Comportamiento desde el estado interno y modelo propio | `modules/experience-agent/index.mjs`; `ExperienceAgent.astro`; notas de self-model | MLP 4→8→6→1, memoria conservada, olvido, refit, decisión ponderada y contrafactual; simulación educativa diseñada, no evidencia de agencia humana |
| Renovar el estilo | `editorial.css`, `PortfolioPage.astro`, chrome compartido | Inspección visual y responsive; paletas y legibilidad se conservan |
| CV, títulos, certificaciones y becas desde LinkedIn | `cv.mjs`; `InteractiveCV.astro`; `scripts/cv.js` | 18 entradas, duplicados consolidados, doctorado en curso; procedencia declarada, sin inventar documentos ni enlaces de credencial |

Fuentes de diseño verificadas: [W3C Cognitive Accessibility Guidance](https://www.w3.org/TR/coga-usable/), [patrón WAI de breadcrumbs](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/), [SpeechSynthesis de MDN](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis). Estas guías informan los controles; no sustituyen evaluación humana de accesibilidad.
