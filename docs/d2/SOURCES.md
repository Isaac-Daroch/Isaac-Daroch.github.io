# Fuentes, atribución y límites — D2

Control: 18-10-2026. Se distingue contenido de las fuentes, observación de archivos y diseño propuesto. No se distribuyen los libros adjuntos ni sus figuras.

## Fuentes aportadas

**BROWN.** Simon Brown, Software Architecture for Developers, extracto de 78 páginas, ©2012–2014. El propio PDF, p. 7, declara que es un extracto. Referencias aplicadas: PDF 25 (componentes bien definidos y un despliegue); 36–37 (requisitos funcionales, atributos de calidad, restricciones, principios); 43–46 (niveles C4); 47–52 (responsabilidades y correspondencia arquitectura/código); 55–62 (documentación como guía viva); 68–70 (Definition of Done y equilibrio de trabajo).

**PATTERNS.** Mark Richards, Software Architecture Patterns, O’Reilly, 2015, PDF de 55 páginas. Referencias: PDF 7–8 (justificación de arquitectura); 11–15 (aislamiento y costo de capas); 29–34 (microkernel/contratos); 54 (contexto, capacidades, presupuesto y tamaño al decidir). No se aplican sus valoraciones cualitativas como benchmark del sitio. El capítulo 3 contiene referencias textuales a 'microservices' dentro de una discusión de microkernel; se conserva esa particularidad de la fuente y no se utiliza para inferir que ambos patrones sean equivalentes. No se adopta su recomendación general de microkernel como obligación para este producto.

**HARD.** Neal Ford, Mark Richards, Pramod Sadalage y Zhamak Dehghani, Software Architecture: The Hard Parts, primera edición publicada 2021, copyright 2022, PDF 462 páginas. Referencias: PDF 23–31 (ADR y fitness functions); 67–68 (impulsores y modularidad no necesariamente distribuida); cap. 5 (descomposición); PDF 253, figura 8-12 (dominio, puertos y adaptadores); cap. 13 (contratos); PDF 417–424/cap. 15 (trade-offs en contexto). No se transfieren transacciones distribuidas, sidecars, data mesh ni microservicios al portafolio solo porque figuren en el libro.

**D1-I.** Volumen I, Auditoría Isaac Daroch, edición D1 del 17-10-2026, 58 páginas renderizadas. Aplicados: catálogo H-01…H-38, pp. 31–46; alternativas, pp. 47–50; hoja de ruta, pp. 51–52; capacidades propuestas, pp. 53–54. La comparación modelo congelado/revisable proviene de §10.2.

**D1-II.** Volumen II, Documentación Isaac Daroch, D1 del 17-10-2026, 57 páginas renderizadas. Aplicados: requisitos RF-01…RF-20/RQ-01…RQ-16, pp. 5–13; arquitectura pp. 16–18; plan T-01…T-36, pp. 28–38; ADR-01…ADR-08, pp. 51–54. El corpus describe propuestas y evidencia de alcance determinado, no release certificada.

**PATCH-CORE, PATCH-UI, PATCH-BUILD, PATCH-QUALITY, PATCH-INSTALLER.** Cinco scripts adjuntos recuperables. Revisión estática de instrucciones, no nueva ejecución ni prueba de aplicación completa. Se identifican por nombre exacto; el manifiesto documental no inventa hash de esos adjuntos cuando no puede leer sus bytes. Sus rutas de trabajo no se publican como entorno real del titular.

## Fuente remota examinada

**REMOTE-CHECKPOINT.** Repositorio Isaac-Daroch/Isaac-Daroch.github.io, rama remediation/d1-validation, commit `3d4a9d4c6c0a99d747a7b218e9e082e98db6fb3b`; árbol referenciado por el commit `abbfd278bde98a1b3d06633805e1db192c68ce3d`. Se consultaron inventario y REMEDIATION_STATUS.md. El checkpoint declara que falta transferir la aplicación completa y que la cadena real no está aprobada por fallos de enlaces. Se preserva como estado histórico anterior a D2.

**BASE-ZIP.** Identidad de origen declarada por D1: SHA-256 `7a416e7a17da6ed177952f8d0608fcffd6b545acd303090f1aa04790f9659a3e`. D2 no afirma volver a calcular el hash del ZIP ni haber inspeccionado cambios posteriores en Windows.

## Qué es propuesta propia

Los objetivos O, principios IF numerados, macroelementos M consolidados, contratos LAB/CAT/MOT/PUB/DEL, escenarios QAS y estructura hexagonal son diseño específico D2. Se apoyan en las fuentes pero no son citas literales ni soluciones que los autores hayan recomendado para Astro/Quarto. Los presupuestos nuevos se identifican como tales. Las extensiones RF/RQ requieren aceptación detallada y no se presentan como obligaciones históricas.

## Límites de esta revisión

No se repite lectura visual de 595 páginas ni se atribuye una auditoría nueva tapa a tapa. Se usan los pasajes pertinentes, dossier y parches. No se vuelve a evaluar científicamente el artículo del titular. No se ejecuta ni instala la aplicación completa. Las pruebas nuevas son del registro y verificador documental, con reporte de CI propio. Esa evidencia no se suma a la cobertura del motor ni certifica accesibilidad o recuperación del sitio.
