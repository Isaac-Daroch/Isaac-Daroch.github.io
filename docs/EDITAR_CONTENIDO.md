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
