# Cuentas Claras

Sitio educativo de calculadoras financieras gratuitas, publicado en Vercel.

**URL actual:** https://cuentas-claras-murex-delta.vercel.app/

## Funcionalidades
- 10 calculadoras con URL individual: ahorro, interés compuesto, objetivo de ahorro, hipoteca, préstamo, depósito, coche, independizarse, fondo de emergencia, regla 50/30/20 y compra de vivienda.
- Comparador interactivo de **dos hipotecas** (tipo y plazo) en `/hipoteca#comparador`.
- Comparador interactivo de **dos escenarios de interés compuesto** en `/interes-compuesto#comparador-ahorro`.
- Ejemplos rápidos de 100/200/300 € mensuales y enlaces compartibles con las cifras del simulador.
- Guías originales con fórmulas, supuestos, limitaciones y vínculos a herramientas relacionadas.

## Tecnología y SEO
- HTML, CSS y JavaScript sin framework.
- `vercel.json` activa `cleanUrls`; usar `/hipoteca`, no `/hipoteca.html`.
- Cada página indexable tiene título y descripción, URL canónica, OG y, donde procede, datos estructurados.
- Sitemap `/sitemap.xml` y robots `/robots.txt` disponibles.
- SEO: priorizar contenido correcto y original, experiencia móvil y enlaces internos. No hay garantía de posiciones o tráfico.
- Si se cambia el dominio, actualizar canonical, OG, sitemap, robots y `assets/config.js`, configurar redirecciones permanentes desde el dominio anterior y revisar Search Console.

## Google Analytics y privacidad
- `assets/config.js` contiene la configuración actual de GA4.
- `assets/app.js` solo inicia el script de Analytics después de aceptar la medición; el pie permite abrir **Configurar privacidad** y retirarla.
- No confundir el consentimiento actual de Analytics con una CMP certificada de AdSense.
- Las páginas `aviso-legal.html`, `privacidad.html` y `cookies.html` aún requieren revisión final y completar la identificación del titular. No publicar documentos personales o identificadores fiscales en este repositorio sin autorización explícita.

## AdSense
- **No está conectado ni aprobado**. No insertar IDs falsos ni afirmar que un `ads.txt` vacío implica autorización.
- Consultar `ADSENSE_PREPARACION.md` para requisitos, pasos y fuentes oficiales.
- La integración de verificación y `ads.txt` requiere los datos reales de la cuenta; la publicación de anuncios también exige revisar privacidad y CMP aplicable.

## Campañas para Shorts
Ejemplo de URL para etiquetar visitas orgánicas:
```
/interes-compuesto?mensual=100&anios=20&interes=6&utm_source=tiktok&utm_medium=organic&utm_campaign=ahorro_100
```
Las cantidades de la calculadora pueden recibirse por URL; la atribución UTM solo se conserva en el navegador cuando se acepta Analytics.

## Despliegue
Los commits en la rama por defecto de GitHub desencadenan despliegues automáticos en Vercel. Revisar el estado de Vercel después de cada modificación.
