# Cuentas Claras v2

Proyecto estático listo para Vercel.

## Qué incluye
- Home nueva con 10 calculadoras.
- URL individual para cada calculadora.
- 3 guías educativas.
- SEO básico: títulos, descriptions, canonical, Open Graph, sitemap y robots.
- JSON-LD WebApplication en calculadoras.
- Captura local de UTM para atribución.
- Google Analytics 4 preparado pero **desactivado por defecto**.
- Páginas de aviso legal, privacidad y cookies con campos pendientes de completar.

## Despliegue en Vercel
1. Sustituye los archivos de tu proyecto por el contenido de esta carpeta.
2. Sube a GitHub o arrastra el proyecto a Vercel.
3. Comprueba `Settings > Deployment Protection` para que el deployment de producción sea público.
4. `vercel.json` activa `cleanUrls`, así `hipoteca.html` se publica como `/hipoteca`.

## Antes de publicar
- Completa los campos `[COMPLETAR]` del aviso legal y revisa privacidad/cookies para tu caso real.
- Si compras un dominio, reemplaza `https://cuentas-claras-nvsblw3yw-los-cuajaos.vercel.app` en:
  - `assets/config.js`
  - `sitemap.xml`
  - `robots.txt`
  - canonical/OG de los HTML (puedes hacer un reemplazo global).
- Añade Search Console cuando tengas el dominio definitivo.

## Activar GA4
En `assets/config.js`, cambia:
```js
GA_MEASUREMENT_ID: ""
```
por tu ID, por ejemplo `G-XXXXXXXXXX`. El código mostrará consentimiento antes de cargar Analytics.

## AdSense
No está integrado todavía. Es intencionado: primero completa identidad/legal, genera contenido y tráfico y, cuando lo vayas a activar, implementa el sistema de consentimiento/CMP que corresponda en ese momento.

## UTMs para Shorts/Reels/TikTok
Ejemplo:
`/coche?utm_source=tiktok&utm_medium=organic&utm_campaign=coche&utm_content=sueldo_1600`

Así puedes diferenciar campañas cuando actives tu analítica.
