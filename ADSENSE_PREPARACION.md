# Cuentas Claras — preparación para Google AdSense

Estado de revisión: 29 de octubre de 2026.

**Importante:** este documento es una lista de trabajo, no acredita aprobación de Google ni cumplimiento legal definitivo. No insertar anuncios o IDs inventados.

## Situación comprobada en el código
- Sitio estático desplegado con Vercel, URLs sin `.html`, sitemap, robots.txt y canonical.
- Calculadoras y guías originales, con ejemplos y metodología explicada.
- Google Analytics 4 está integrado con consentimiento previo y un control para cambiar las preferencias.
- Existen páginas públicas de aviso legal, privacidad y cookies, **todavía con información identificativa pendiente**.
- **Verificación AdSense preparada**: metaetiqueta `google-adsense-account` instalada en la portada y tres calculadoras principales; archivo `ads.txt` creado con el ID de editor aportado por el titular. No se ha cargado el script publicitario ni configurado una CMP publicitaria.
- Los contenidos sobre finanzas son informativos, no asesoramiento financiero.

## Paso 1 — Revisar la identidad y la información legal
- Revisar con un profesional o fuente oficial los datos del titular que deben publicarse conforme al artículo 10 LSSI, sin introducir NIF ni domicilio particulares en el repositorio antes de autorización explícita.
- Completar el aviso legal y la política de privacidad con datos reales, información de proveedores, destinatarios, transferencias y conservación.
- Auditar cookies reales y almacenamiento local. Revisar además el uso externo de Google Fonts.
- Publicar los textos finales solo después de validarlos.

## Paso 2 — Abrir/configurar cuenta AdSense (requiere acción del titular)
1. Acceder a https://www.google.com/adsense/start/ .
2. Registrar una cuenta personal con datos reales y completar datos fiscales/de pago que solicite Google. Nunca guardar documentos o identificadores fiscales de la cuenta en GitHub.
3. En **Sitios**, añadir la dirección pública del sitio o el dominio propio si se decide usarlo.
4. Comprobar en la interfaz de Google que la URL propuesta es admitida.
5. Elegir método de verificación que proporcione Google y conservar el fragmento exacto para añadirlo a la web.

**Sobre el dominio:** Google admite dominios normales y determinados subdominios de plataformas registradas en la Public Suffix List. Vercel indica que `vercel.app` figura en ella. Esta circunstancia no garantiza aprobación ni admisión de una URL concreta. Un dominio propio es recomendable a largo plazo por identidad de marca, pero no migrar de dominio por SEO sin redirecciones 301 y cambio cuidadoso de canonical/sitemap/Search Console.

## Paso 3 — Integración técnica, solo cuando tengamos datos reales de AdSense
- Añadir el **código de verificación exacto** de Google en las etiquetas `head` de las páginas aplicables. Revisar cómo encaja con la gestión del consentimiento.
- Crear `/ads.txt` en la raíz únicamente con el ID `pub-...` real y el registro que facilite AdSense. **No publicar registros falsos ni un archivo vacío como si fuese válido**.
- Verificar respuesta HTTP 200 y contenido exacto en `https://DOMINIO/ads.txt`.
- Configurar una CMP certificada por Google e integrada con el TCF de IAB Europe, según requisitos aplicables al tráfico del EEE, Reino Unido y Suiza.
- Actualizar privacidad y cookies para incluir los tratamientos, proveedores y tecnologías realmente usados antes de activar la publicidad.
- Pedir revisión del sitio desde AdSense, sin asumir que la aprobación sea inmediata.

## Paso 4 — Contenido y SEO
- Prioridad: herramientas propias, ejemplos correctos, fuentes acreditadas, metodología y límites de cálculo visibles.
- Mejorar las páginas que ya se rastrean, sin producir contenido repetitivo o páginas vacías para colocar anuncios.
- Controlar impresiones, clics, CTR y consultas de Search Console por URL.
- Comprobar Core Web Vitals y experiencia móvil; evitar anuncios intrusivos o que oculten la calculadora.
- No hacer clic en anuncios propios ni provocar tráfico o clics artificiales.

## Pendientes que bloquean la activación de anuncios
- [ ] Confirmación y publicación adecuada de la identidad legal del titular.
- [ ] Política de privacidad y cookies revisadas y auditadas.
- [x] Cuenta AdSense creada; método de etiqueta meta configurado en el sitio (el titular debe seleccionar **Etiqueta meta** y hacer clic en **Verificar** en AdSense).
- [x] ID de editor real configurado en `ads.txt` y en la etiqueta meta (sin mostrarlo de nuevo en esta lista).
- [ ] CMP de Google configurada y probada antes de mostrar publicidad.
- [ ] Confirmación de verificación por AdSense.
- [ ] Revisión/aceptación por AdSense.

## Referencias oficiales
- https://support.google.com/adsense/answer/9724?hl=es
- https://support.google.com/adsense/answer/12169212?hl=es
- https://support.google.com/adsense/answer/12171612?hl=es-ES
- https://support.google.com/adsense/answer/13554116?hl=es
- https://support.google.com/adsense/answer/2784438?hl=es
- https://developers.google.com/search/docs/fundamentals/creating-helpful-content?hl=es

## Estado de esta integración — 29/10/2026
- Vercel informa de un despliegue correcto de los archivos modificados.
- Se ha configurado `<meta name="google-adsense-account" ...>` en la portada y tres calculadoras principales.
- El archivo `/ads.txt` contiene la línea estándar de Google con el ID real facilitado en una captura de AdSense.
- El script de anuncios no se ha añadido, y ningún código publicitario se activa por la metaetiqueta ni por `ads.txt`.
- **Pendiente:** verificar en la interfaz de AdSense con el método «Etiqueta meta». Google realiza la comprobación en sus servidores.
- **Pendiente:** confirmar respuesta HTTP 200 y contenido correcto de `https://cuentas-claras-murex-delta.vercel.app/ads.txt` en un navegador externo; el despliegue exitoso no sustituye esta prueba.
- **No solicitar revisión final hasta resolver** la identificación legal del sitio y completar las políticas de privacidad/cookies y el plan de consentimiento publicitario. Estos asuntos pueden afectar a la aprobación y al cumplimiento legal.
