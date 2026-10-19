# Editar el currículum y activar módulos

La web se construye desde los archivos de este repositorio. No existe un panel privado conectado a LinkedIn ni una sincronización automática: la consulta pública del 18 de octubre de 2026 se incorporó como una instantánea revisable. No publiques certificados con datos personales que no quieras compartir.

## Currículum, títulos, certificaciones y becas

Edita `site/src/data/cv.mjs`. Cada entrada tiene un identificador estable, categoría, fecha, institución y título en `en`, `es`, `de` y `nl`. Las 18 entradas iniciales proceden de tu perfil público de LinkedIn. Dos pares de certificaciones repetidas se consolidaron por identificador. El doctorado se presenta en curso y 2029 como término previsto. La estancia en Ilmenau se presenta como período de estudios; no se atribuye un título obtenido allí.

El perfil declara la beca ANID 2026. No se incorporó una adjudicación DAAD nueva, monto, documento de título, enlace de credencial ni puesto que no apareciera en las fuentes consultadas. El currículum distingue estas declaraciones de una comprobación independiente de documentos. La fuente figura en cada entrada y al final del módulo.

Las categorías se controlan en `site/src/data/content-settings.json`:

```json
"degrees": {"enabled": true},
"certifications": {"enabled": true},
"scholarships": {"enabled": true}
```

Cambiar un valor a `false` oculta sus entradas y su filtro al reconstruir la web. La experiencia profesional y la navegación del CV permanecen disponibles. Los enlaces a etapas solo aparecen si la entrada correspondiente está activa. La impresión incluye todas las entradas publicadas, aunque el visitante esté usando un filtro; el archivo PDF lo genera el navegador. No se afirma que ese PDF esté etiquetado como PDF/UA.

## Congresos, noticias y divulgación

Están creados y **apagados**: `events`, `news`, `media` tienen `enabled: false`. No aparecen en los menús, el recorrido de inicio ni el mapa del sitio. Las antiguas direcciones inglesas redirigen al mapa general y llevan `noindex`; las rutas nuevas de los demás idiomas se generan al activarlos. Los enlaces conocidos a GitHub, ORCID y LinkedIn siguen en Contacto.

Para publicar uno:

1. Añade material real a la lista correspondiente en `site/src/data/editorial.json`.
2. Completa los campos de procedencia, fecha y las cuatro traducciones. Para vídeos o audio añade alternativas revisadas.
3. Cambia su indicador a `true` en `content-settings.json`.
4. Ejecuta `npm run build` desde `site`, revisa la vista local y las pruebas. El cambio se revisa en Git antes de publicar.

El constructor rechaza un módulo encendido sin entradas publicables o sin sus cuatro traducciones. Un registro común usa `id`, `title` original, `language`, `sourceUrl` HTTPS y `verifiedAt` (AAAA-MM-DD), además de `translations` con `title` y `description` en cada idioma. Los títulos originales conservan su idioma. Usa `status: "draft"` para material que todavía no deba aparecer.

Campos adicionales de los módulos:

- Congresos: `place`, `role`, `description`, `startsAt`, `endsAt`. Distingue asistencia, presentación, taller y viaje; una fecha futura no acredita participación.
- Noticias: `summary`, `commentary`, `eventDate`, `publishedAt`. Las traducciones añaden también `summary` y `commentary`: hecho y opinión aparecen separados.
- Divulgación: `context`, `kind`, `transcriptUrl`, `reviewStatus: "human-reviewed"`. Vídeo con sonido exige `captionsUrl`; según el contenido, añade `descriptionUrl` o una revisión documentada de la cobertura de la narración en `narrationCoverageReview`. Las traducciones de transcripción, subtítulos y descripción se enlazan en cada idioma. No marques una revisión humana si no se realizó.

No se inventaron vídeos ni viajes durante esta actualización. La web no rastrea LinkedIn en segundo plano ni solicita nuevas credenciales.

## Idiomas, contacto y colores

La interfaz compartida está en `site/public/assets/i18n.mjs`; los textos de páginas en `site/src/data/content.mjs`; las notas científicas en `site/src/data/notes.mjs`. El cuaderno original inglés sigue usando Quarto. Los tres idiomas adicionales se generan desde las traducciones. Los nombres de instituciones, DOI, BibTeX y código mantienen sus nombres originales, con idioma identificado donde corresponde.

El correo institucional solicitado es exactamente `i.darochormeo@uandresbello.edu`, en `site/src/data/site.mjs` y el pie compartido. Las 24 paletas conservan la fuente `tokens/paletas-grafito.json`. El selector visible elige una paleta efectiva; lectura en una columna y concentración son preferencias independientes.


## Docencia y biblioteca de investigación · versión 1.3

Las asignaturas confirmadas por el propietario son exclusivamente **Minería de Datos, Econometría y Visualización de Datos**. Sus fichas están en `site/src/data/courses.mjs`. Los temas, métodos y actividades constituyen una propuesta editorial para revisión; no se atribuyen a un programa oficial ni se inventan instituciones o períodos. Los tres experimentos usan datos sintéticos definidos en `site/src/modules/teaching/index.mjs`.

La biblioteca pública `/library/` y sus equivalentes traducidos se editan en `site/src/data/library.mjs`. Tiene seis artículos de otros autores y tres vídeos asociados a proyectos originales. Cada vídeo enlaza el proyecto y su artículo, con explicación escrita en cuatro idiomas. El reproductor se conecta a YouTube al pulsar el botón y se retira al cerrarlo o filtrar su tarjeta. No reproduce automáticamente. La biblioteca externa está separada de `media`, que conserva apagado el archivo de divulgación propia hasta tener material real. Antes de añadir material, verifica la fuente, los derechos, los subtítulos y la cobertura de la información visual. Las explicaciones breves actuales no equivalen a transcripciones completas.

Las ilustraciones y prompts exactos están documentados en `docs/visual-assets-1.3.md`. Son arte conceptual, no evidencia científica. La animación visual sigue la preferencia del sistema por defecto y se puede reducir desde la barra visible. Concentración también la detiene. La simulación temporizada requiere una pulsación y se limita a 24 pasos; se pausa al salir de la página, ocultar la pestaña o dejar de verse el observatorio.

El modo técnico expone la red calculada y los parámetros individuales, un mapa energía/fatiga, siete puntos de entropía cruzada de entrenamiento y el detalle histórico de decisiones. No presenta esa pérdida como precisión de generalización. La comparación por pares copia el historial y la semilla, cambia la influencia inicial del modelo propio (α=1 frente a α=0) y continúa 12 decisiones sin modificar el agente activo.


## Inicio mínimo y biblioteca · versión 1.4

Inicio muestra el retrato real y seis tarjetas de navegación. Las ilustraciones generadas de la revisión anterior dejaron de usarse en las páginas publicadas. `site/src/data/minimal.mjs` contiene los textos breves en los cuatro idiomas. El menú móvil se abre dentro del flujo de la página para mantener sus enlaces dentro de la pantalla; el estado abierto también se comprueba con alto contraste.

Los módulos `projects` y `engineering` están apagados por instrucción del propietario. No se promociona el repositorio de esta web ni el perfil de GitHub. Las antiguas direcciones inglesas redirigen al mapa del sitio; sus equivalentes de idioma se omiten. La construcción rechaza enlaces públicos a github.com mientras repositorios permanezca apagado. No activar ni añadir repositorios sin una nueva instrucción del propietario.

La biblioteca se encuentra exclusivamente en su propia página. Reúne una publicación del propietario, cuatro trabajos recientes de 2025–2026, nueve hitos cronológicos seleccionados y tres vídeos. Los datos adicionales y el orden de lectura están en `library-field.mjs`, junto al catálogo `library.mjs`. La cronología incluye líneas paralelas de memoria, modelos propios y motivación; no se presenta como genealogía exhaustiva. Cada entrada apunta a una fuente primaria y distingue el género o estado editorial disponible. No se añade una publicación al archivo personal si el propietario no figura como autor.

Los vídeos se cargan al pulsar y se cierran con un botón situado debajo del reproductor, para no tapar los controles del proveedor. El idioma de los controles y la preferencia de subtítulos siguen el idioma de la página; la disponibilidad y calidad de subtítulos dependen de YouTube. Las explicaciones escritas en cuatro lenguas siguen disponibles.
