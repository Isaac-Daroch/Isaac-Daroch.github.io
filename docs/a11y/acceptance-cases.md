# All 42 acceptance cases — scope-aware results

Full original procedures: `pruebas/PLAN_DE_PRUEBAS.md`. PASS here is limited to the named automatic case scope, never a screen-reader/device session. Evidence: test-report, actual browser JSON, traces and contrast JSON in the delivered evidence bundle. PENDIENTE_MANUAL cases may have passing automatic subchecks. No test technology was impersonated.

| Case | Supplied title | Acceptance status | Observed scope / pending / applicability |
|---|---|---|---|
| T01 | Inventario y construcción de referencia | PASS | Baseline failed build retained; current build, source identity and generated routes separately recorded. |
| T02 | Estructura, nombres y orden de lectura | PENDIENTE_MANUAL | Automatic structure/interaction checks support this case; human reading, perception or physical-device acceptance has not been performed. |
| T03 | Recorrido global solo con teclado | PENDIENTE_MANUAL | Automatic structure/interaction checks support this case; human reading, perception or physical-device acceptance has not been performed. |
| T04 | Menú móvil y navegación consistente | PENDIENTE_MANUAL | Automatic structure/interaction checks support this case; human reading, perception or physical-device acceptance has not been performed. |
| T05 | Salto al contenido | PENDIENTE_MANUAL | Automatic structure/interaction checks support this case; human reading, perception or physical-device acceptance has not been performed. |
| T06 | Diálogo de preferencias o panel equivalente | PENDIENTE_MANUAL | Full-page preferences, no modal. Native controls tested. Screen-reader review and virtual keyboard pending. |
| T07 | Formulario: etiquetas, error y recuperación | PENDIENTE_MANUAL | No backend/contact submission. JSON-import rejection tested with preserved live episode. No claim of message delivery. |
| T08 | Búsqueda, filtros, resultados y estado | PENDIENTE_MANUAL | Nonmodal full-text search over real Quarto index: submit, empty, clear, history and network-error test. Actual screen-reader announcements pending. |
| T09 | Paletas y contraste en componentes renderizados | PENDIENTE_MANUAL | 384 token pairs plus computed text/background checks in 24 palettes across four representative routes. Complete human visual-state review remains pending. |
| T10 | Comprensión sin discriminación del color | PENDIENTE_MANUAL | Automatic structure/interaction checks support this case; human reading, perception or physical-device acceptance has not been performed. |
| T11 | Contraste alto | PENDIENTE_MANUAL | Automatic structure/interaction checks support this case; human reading, perception or physical-device acceptance has not been performed. |
| T12 | Colores forzados del sistema | PENDIENTE_MANUAL | Forced-color emulation tested. Actual Windows contrast themes not changed; PENDIENTE_MANUAL. |
| T13 | Resolución de preferencias de sistema | PASS | Automatic structure/interaction checks support this case; human reading, perception or physical-device acceptance has not been performed. |
| T14 | Elección explícita y ausencia de cambios inesperados | PASS | Automatic structure/interaction checks support this case; human reading, perception or physical-device acceptance has not been performed. |
| T15 | Persistencia, migración y navegación entre áreas | PASS | Automatic structure/interaction checks support this case; human reading, perception or physical-device acceptance has not been performed. |
| T16 | Almacenamiento denegado y estado corrupto | PASS | Automatic structure/interaction checks support this case; human reading, perception or physical-device acceptance has not been performed. |
| T17 | Restablecer y privacidad | PASS | Automatic structure/interaction checks support this case; human reading, perception or physical-device acceptance has not been performed. |
| T18 | Vídeo con subtítulos y controles | NO_APLICA | No owned prerecorded video/audio entries or embeds in catalog/source tree. |
| T19 | Información visual y audiodescripción | NO_APLICA | No owned recorded audiovisual content. Do not infer audiodescription quality for external links. |
| T20 | Audio solo y vídeo sin audio | NO_APLICA | No owned audio-only or silent-video items. |
| T21 | Emisiones en directo | NO_APLICA | No live emission or live player. |
| T22 | Movimiento, pausa y actualizaciones | PENDIENTE_MANUAL | Automatic structure/interaction checks support this case; human reading, perception or physical-device acceptance has not been performed. |
| T23 | Destellos | PENDIENTE_MANUAL | Automatic structure/interaction checks support this case; human reading, perception or physical-device acceptance has not been performed. |
| T24 | Texto a 200 % | PENDIENTE_MANUAL | 200 percent site text tested; real browser zoom 200 percent and browser text-only enlargement pending. |
| T25 | Reflujo y zoom 400 % | PENDIENTE_MANUAL | 320 CSS px and combined preferences tested. Real 1280-window/400 percent browser zoom pending. Mathematical expressions use a named local scroll region. |
| T26 | Espaciado simultáneo | PENDIENTE_MANUAL | Automatic structure/interaction checks support this case; human reading, perception or physical-device acceptance has not been performed. |
| T27 | Modo lectura y fuente del sistema | PENDIENTE_MANUAL | Automatic structure/interaction checks support this case; human reading, perception or physical-device acceptance has not been performed. |
| T28 | Idiomas y localización | PENDIENTE_MANUAL | English primary preserved; actual Spanish preferences/map/entry pages label English-only destinations. Scientific translation and human proofreading pending. |
| T29 | Figuras, diagramas y datos | PENDIENTE_MANUAL | World/model grids have named figures and chronological HTML transcript; no clinical charts/data invented. Human alternative-quality review pending. |
| T30 | Tablas | PENDIENTE_MANUAL | Dynamic comparison table captions, row/column headers and local scroll retained. Human screen-reader table navigation pending. |
| T31 | Matemáticas | PENDIENTE_MANUAL | Native MathML, explanatory variables and selectable LaTeX present. Actual math navigation/duplicate announcement check with screen reader pending. |
| T32 | Documentos descargables | PENDIENTE_MANUAL | No owned PDF/CV download/source in baseline. HTML about page preserved; article publisher controlled externally. No PDF accessibility result claimed. |
| T33 | JavaScript desactivado y error de carga | PASS | Automatic structure/interaction checks support this case; human reading, perception or physical-device acceptance has not been performed. |
| T34 | Datos reducidos y terceros | PENDIENTE_MANUAL | No unsolicited external requests or 3D/motion bundles on home. Resource bytes and gzip size recorded; unavailable external media cannot be reviewed. |
| T35 | Arrastre y gestos equivalentes | NO_APLICA | No mandatory drag task, multipoint gesture, map or gallery in inventory; replay uses native range plus arrow keys and native track clicks. |
| T36 | Tacto, cancelación, orientación y tamaño | PENDIENTE_MANUAL | Automated target sizes and portrait/landscape viewport checks. Physical touch and cancellation on device pending. |
| T37 | Etiquetas y control por voz | PENDIENTE_MANUAL | Native visible labels inspected; real voice-control tool not used. |
| T38 | Tooltips, desplegables y acordeones | PENDIENTE_MANUAL | Automatic structure/interaction checks support this case; human reading, perception or physical-device acceptance has not been performed. |
| T39 | Copiar cita, enlaces sociales y código | PASS | Automatic structure/interaction checks support this case; human reading, perception or physical-device acceptance has not been performed. |
| T40 | Autenticación o procesos especiales, si existen | NO_APLICA | No accounts, CAPTCHA, authentication, recovery or consequential multistep process. |
| T41 | Atención, límites temporales y ayuda | PENDIENTE_MANUAL | Automatic structure/interaction checks support this case; human reading, perception or physical-device acceptance has not been performed. |
| T42 | Recorrido integral, integración y entrega | PENDIENTE_MANUAL | Core research/publication/citation/code/contact routes tested. No confirmed clinical code or audiovisual demo to fabricate; whole manual/device route acceptance pending. |
