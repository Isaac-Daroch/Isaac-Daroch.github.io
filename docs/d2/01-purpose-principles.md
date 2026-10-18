# 01 — Propósito, visión, ideas-fuerza y límites

Control: D2 · 18-10-2026 · diseño de trabajo · responsable de producto: Isaac Daroch. Base: D1, volumen II §§1–2, solicitud de una experiencia científica inmersiva y revisión de los parches. Los IDs siguientes son formalización D2, no categorías atribuidas literalmente a los autores.

## Visión y problema

La web debe parecer una entrada a un mundo digital inteligente y, al mismo tiempo, permitir evaluar trabajo científico real. El visitante puede sentirse atraído por el movimiento y luego seguir una cadena verificable: pregunta, proyecto, contribución, evidencia, límites y contacto. El producto falla si impresiona pero no explica; también falla si, por volverlo austero, elimina la experiencia visual expresamente solicitada.

La ambición de crear mundos digitales e inteligencias adaptativas orienta la narrativa de largo plazo. La versión actual es un portafolio, un cuaderno científico y un laboratorio educativo programado. No implementa conciencia artificial, criaturas autónomas equivalentes a la visión de largo plazo ni realidad virtual inmersiva. Esos temas pueden aparecer como visión, nunca como resultados del laboratorio BFS.

Una plaza de investigación o un reconocimiento internacional dependen de factores externos al software. La web puede facilitar comprensión, acceso a evidencia y contacto; no se convierte la contratación ni un premio en un requisito funcional garantizable.

## Objetivos de producto

| ID | Resultado buscado | Comprobación y límite |
|---|---|---|
| O-01 | Comprensión rápida y correcta de identidad, investigación y visión | Sesión de tareas: el visitante distingue trabajo realizado, demo y aspiración; no se presupone una tasa actual de éxito |
| O-02 | Acceso directo a evidencia científica y contacto | Rutas de publicaciones, proyecto, cuaderno y perfiles comprobadas; la visita no depende del 3D |
| O-03 | Explicación experimental inspeccionable | Mundo y modelo distinguibles, registro y protocolo coherentes, reproducción acotada |
| O-04 | Evolución sostenible y transferencia | Construcción identificable, pruebas pertinentes, cambios localizados y recuperación ensayada |

## Usuarios y recorridos de valor

**Evaluador académico:** entra a publicaciones, examina contribución y procedencia, consulta repositorio/protocolo y decide si contactar. Necesita precisión editorial, no una animación obligatoria de treinta segundos.

**Potencial colaborador:** explora preguntas y proyectos, diferencia experiencia aplicada de ideas abiertas y encuentra un canal válido. La web no registra sus datos ni simula haber enviado una solicitud.

**Estudiante o público de divulgación:** manipula una intervención y explica por qué el mapa interno tarda en cambiar. Debe poder seguir la explicación textual y detenerse sin competir con efectos decorativos.

**Titular/mantenedor:** incorpora una nota o corrige una regla sin romper el resto, inspecciona los cambios y publica una versión recuperable. El flujo actual es basado en archivos; no se inventa un panel CMS.

## IF-01 — Evidencia antes que afirmación

Toda pieza distingue resultado publicado, registro de fuente, demostración educativa, trabajo en curso y visión. El catálogo tiene procedencia y estado; una plantilla no puede elevar una intención a resultado. Una prueba de software valida comportamiento de software, no la validez externa de un artículo. Una reproducción consistente no verifica autoría.

Derivación: RF-04, RF-16, RF-21, RF-22, RF-23, RF-25, RF-26 y RQ-13. Conflicto típico: una etiqueta cauta puede reducir el impacto promocional; se acepta ese costo para proteger credibilidad. No se elimina una publicación real por carecer de una revisión nueva: se conserva la fuente histórica y se registra la revisión pendiente.

## IF-02 — El movimiento comunica ciencia

La experiencia visual es parte del encargo, no un adorno prescindible por defecto. Se mantiene una portada animada, transiciones, microinteracciones y una explicación dinámica del agente. Cada efecto declara función comunicativa y condición de desactivación. Ningún efecto secuestra el scroll, oculta permanentemente texto o exige perseguir un elemento para poder navegar.

Derivación: RF-01, RF-13, RF-14 y RF-26; RQ-08 y RQ-10. La cantidad de animación no es una medida de comprensión. Tampoco un único límite de bytes autoriza suprimir una función sin análisis: se revisa el presupuesto o la técnica con evidencia y se conserva la necesidad original.

## IF-03 — Lo esencial permanece disponible

Identidad, propósito, proyectos, publicaciones, lectura del cuaderno y contacto no dependen de GPU, WebGL, almacenamiento local ni inicialización de las mejoras gráficas. El laboratorio sí requiere JavaScript, y debe decirlo junto a los controles. Degradar es cambiar honestamente la representación y funcionalidad disponible, no fingir que un botón funciona.

Derivación: RF-02, RF-13, RF-14, RQ-07, RQ-08, RQ-09. Se prioriza la preferencia de reducción del sistema; un error de almacenamiento no debe reactivar movimiento. La simulación y la decoración son mecanismos distintos: reducir animaciones no invalida la posibilidad de inspeccionar un paso lógico con texto.

## IF-04 — El experimento es inspeccionable y acotado

El observador puede ver el mundo; el planificador no recibe conocimiento oculto a través de la interfaz. Las reglas, costos y límites se publican. El snapshot es independiente del estado vivo; la reproducción crea otra instancia. Se rechazan entradas incompatibles antes de alterar una sesión. Las métricas mantienen definición y unidad.

Derivación: RF-05…RF-12, RF-21…RF-24, RQ-12 y RQ-18. El mapa fijo favorece explicación, no generalización científica. Un cambio de desempate y una política de revisión son experimentos diferentes y conservan identificadores diferentes.

## IF-05 — La evolución está localizada

Se agrupa por responsabilidades de producto. El laboratorio tiene núcleo y casos de uso sin dependencias de interfaz, almacenamiento o renderizado. Los adaptadores traducen mecanismos. No se exige una capa abstracta para cada función ni un microservicio por sección. Cambiar el generador científico no cambia la transición del agente.

Derivación: RQ-12, RQ-17; ADR-01, ADR-02, ADR-04 y ADR-09. El costo aceptado es un número pequeño de contratos y verificaciones explícitas. Una carpeta denominada `domain` no demuestra aislamiento; las dependencias y pruebas deben confirmarlo.

## IF-06 — Entrega identificable y recuperable

Una versión se acepta por entradas, resolución de dependencias, artefacto, pruebas y recuperación, no por capturas. La instalación no puede usar el único árbol de trabajo como experimento destructivo. Los documentos se versionan con los cambios que gobiernan. No se publican libros, secretos, respaldos ni fotografías privadas no autorizadas.

Derivación: RF-18…RF-20, RF-25, RQ-01…RQ-06, RQ-11, RQ-15 y RQ-16. Se acepta trabajo de verificación adicional; no se promete recuperación universal frente a toda falla física.

## Restricciones y supuestos diferenciados

| ID | Clase | Enunciado | Consecuencia |
|---|---|---|---|
| C-01 | Económica, aportada por titular | Evitar gasto recurrente para el alcance inicial | No introducir servicios de pago sin autorización; no prometer gratuidad ilimitada de terceros |
| C-02 | Producto, aportada | Portada dinámica y publicaciones científicas | No sustituir la experiencia por un CV estático sin cambio de alcance |
| C-03 | Plataforma existente | Repositorio Isaac-Daroch.github.io; cadena Astro/Quarto | Conservar como punto de partida, sin convertir tecnologías en fines |
| C-04 | Operación existente | Autor trabaja en Windows; CI utiliza runners separados | Ensayar cada entorno, no extrapolar Linux a Windows |
| C-05 | Entrega | Cambios locales, validación y publicación son etapas separadas | Ningún comando documental instala o despliega |
| C-06 | Datos | Sin cuentas, secretos del visitante ni persistencia multiusuario requerida | No diseñar autenticación o base transaccional ficticias |
| C-07 | Editorial | Inglés inicial; español puede evolucionar después | Documentación técnica en español no implica traducir silenciosamente la interfaz |
| C-08 | Interacción conocida | Pegado multilínea problemático en PowerShell del titular | Preferir scripts revisables y comandos de una sola línea |
| C-09 | Seguridad operativa | Conservar .git y archivos no gestionados | Reemplazar solo entradas autorizadas, con registro y respaldo |
| C-10 | Integridad científica | Demo determinista, no entrenamiento ni conciencia | Etiquetas y protocolos explícitos en todas las representaciones |
| S-01 | Supuesto pendiente | Titular autoriza cada contenido de identidad y retrato publicado | Revisión editorial separada; no asumir autorización de terceros |
| S-02 | Supuesto comprobable | Se podrán obtener versiones compatibles y dependencias fijadas | Preflight y manifiesto real; fallo explicado si no se resuelve |
| S-03 | Supuesto de uso | Navegador moderno para interactividad; lectura degradada disponible | Matriz de compatibilidad y alternativas, no soporte universal |

## Priorización sin borrar la visión

Primero se protege la evidencia y la entrega, después se cierran accesibilidad y rendimiento de la experiencia completa, y luego se incorporan experimentos nuevos. Esto no degrada el alcance visual a opcional: separa la prioridad de implementación del requisito de producto. Un recorte temporal debe quedar visible como pendiente y no como cumplimiento.

Fundamento: BROWN, cap. 10, PDF 36–37, distingue requisitos funcionales, atributos de calidad, restricciones y principios. HARD, cap. 3, PDF 67–68, relaciona modularidad con impulsores concretos y admite modularidad sin distribución. La formulación IF/O/C/S es propia de D2.
