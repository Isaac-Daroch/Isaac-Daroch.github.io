# D2 — Línea base rectora y reconciliación de IsaacDaroch-Web

**Edición:** D2, 18 de octubre de 2026. **Estado:** especificación de trabajo y control de cambios; no release del sitio ni certificación. **Responsable de producto:** Isaac Daroch. **Redacción:** asistencia de IA, con fuentes y límites declarados.

## Para qué existe este conjunto

Este conjunto convierte los objetivos, requisitos y decisiones del dossier D1 en una guía que pueda gobernar la siguiente implementación. No reescribe la historia: conserva RF-01…RF-20, RQ-01…RQ-16, T-01…T-36 y ADR-01…ADR-08. Las extensiones tienen identificadores nuevos; los refinamientos conservan la aceptación de referencia y explican lo que cambia. Los hallazgos H-01…H-38 siguen perteneciendo a D1.

La solicitud del titular autoriza elaborar esta reconciliación. No equivale a aprobar cada umbral nuevo, la licencia, un cambio de hipótesis experimental o una publicación pública. D2 distingue **especificado**, **representado en un parche**, **integrado**, **verificado** y **aceptado**. Ninguna relación de trazabilidad implica por sí sola cumplimiento.

## Versiones que no deben confundirse

| Identidad | Qué representa | Qué no demuestra |
|---|---|---|
| ZIP D1 SHA-256 `7a416e7a17da6ed177952f8d0608fcffd6b545acd303090f1aa04790f9659a3e` | Fuente histórica auditada, versión declarada 1.0.0 | Instalación local actual, commit de producción o publicación |
| Dossier D1, 115 páginas en dos volúmenes | Auditoría, propuestas, plan y resultados con alcance propio | Correcciones incorporadas al producto |
| Cinco archivos `patch_*.py` | Instrucciones de transformación recuperables, inspeccionadas en esta revisión | Que todos los reemplazos se aplicaran, ni identidad del árbol resultante |
| Commit previo `3d4a9d4c6c0a99d747a7b218e9e082e98db6fb3b` | Checkpoint remoto de remediación y herramientas | Aplicación completa: su propio REMEDIATION_STATUS.md declara que falta transferirla |
| D2 en `docs/d2/` | Diseño rector y registro de reconciliación del siguiente cambio | Release 1.1 instalada, conformidad hexagonal ya lograda o aceptación editorial |

La consulta del árbol remoto en esta revisión encontró manifiesto y lockfile de dependencias, workflows de aprovisionamiento, adaptador de enlaces Quarto y sus pruebas. No encontró la aplicación completa en esa rama. El estado de tu computador no se ha inspeccionado en esta revisión. Los resultados históricos de 25 pruebas son un checkpoint registrado, no una nueva ejecución D2 del producto.

## Ruta de lectura

1. [Propósito, ideas-fuerza y restricciones](01-purpose-principles.md).
2. [Método de requisitos y compatibilidad con D1](02-requirement-method.md), junto al catálogo canónico `registers/requirements.json`.
3. [Escenarios de calidad](03-quality-scenarios.md).
4. [Macroelementos y vistas](04-macro-elements.md).
5. [Arquitectura hexagonal selectiva y contratos](05-hexagonal-design.md).
6. [ADR y trade-offs](06-decisions.md).
7. [Desviaciones y reconciliación de parches](07-reconciliation.md).
8. [Validación, evidencias y puertas de aceptación](08-validation-delivery.md).
9. [Protocolos de reproducción y comparación](09-experiment-protocols.md).
10. [Datos, seguridad, operación y transferencia](10-data-security-operation.md).
11. [Plan de migración y trabajo trazable](11-evolution-plan.md).
12. [Fuentes y límites](SOURCES.md).

El catálogo JSON es la fuente canónica de las fichas RF/RQ y sus casos de aceptación. El verificador genera vistas Markdown, CSV y HTML para leerlas sin editar múltiples copias. Las vistas generadas no se editan. La narrativa amplía responsabilidades y decisiones; no modifica silenciosamente el significado de un ID.

## Comandos de documentación, no de instalación

En una copia de esta rama, desde la raíz, se puede ejecutar una sola línea:

```text
python tools/governance/validate_d2.py --out build-docs
```

El comando comprueba el registro documental y genera la entrega de documentación. No ejecuta los parches, no instala Node, no modifica el sitio, no hace push y no publica Pages. En Windows, `py` puede sustituir a `python` si ese es el lanzador instalado. La CI de documentación ejecuta además las pruebas del propio verificador.

**Interpretación de un resultado verde:** IDs, referencias, estados y pruebas negativas del verificador son coherentes. **No significa:** que el sitio cumpla todos los requisitos. Los requisitos sin integración o evidencia permanecen abiertos en las vistas generadas.

## Autoridad y revisión

Isaac decide propósito, alcance público, narrativa, licencia y publicación. La asistencia técnica propone contratos, mecanismos y presupuestos; debe justificar cambios significativos. Un revisor verifica conformidad y evidencia. Si una misma persona ocupa varios roles, registra las decisiones separadamente y no declara revisión independiente.

Una modificación significativa debe actualizar requisito, contrato o ADR, prueba, evidencia y manuales afectados en el mismo cambio. Si implementación y especificación divergen, se registra la desviación: no se altera la especificación para convertir retroactivamente un fallo en éxito.

**Relación con D1:** D2 complementa el dossier histórico; no borra sus hallazgos ni copia los libros adjuntos al repositorio. Su adopción como diseño de trabajo queda separada de la aceptación de una release.
