# Iker Sagal / Real Estate

Landing estática de compra y renta en Querétaro. Sin formulario, dependencias, cookies de analítica, fotos de inventario ni datos de una identidad legal. La ilustración arquitectónica es conceptual.

## Publicación

GitHub Pages: https://ikersagal.github.io/web/

En Settings → Pages, seleccionar GitHub Actions como Source. El workflow `pages.yml` publica únicamente los archivos públicos al actualizar `main`. No se configura dominio propio ni DNS.

## Medición preparada

Cada CTA a WhatsApp agrega a `window.dataLayer` el evento `whatsapp_click`, con `cta_location`, `intent`, `page_path` y los parámetros UTM presentes en la URL. También emite `sagal:whatsapp_click` como evento del navegador. Los enlaces funcionan sin JavaScript.

Esto **no es un conteo centralizado ni una conversión confirmada**. La cola vive en la página y no envía eventos a ningún servidor. Para recopilar métricas, conectar un contenedor de Google Tag Manager o un proveedor aprobado, configurar `whatsapp_click` y revisar los requisitos de privacidad antes de habilitarlo. No se incluyó un ID ficticio ni un pixel de OpenAI.

URL de campaña sugerida:

`https://ikersagal.github.io/web/?utm_source=openai&utm_medium=paid&utm_campaign=queretaro&utm_content=compra`

Un clic no confirma conversación, lead calificado, visita ni cierre; esos resultados deben contrastarse con el CRM. No se envían UTMs ni datos personales en el mensaje prellenado de WhatsApp.

## Contenido

Contactos suministrados: WhatsApp +525518934226, Instagram @ikersagal y sagalreals@gmail.com. No publicar precios, testimonios, rentabilidad ni disponibilidad sin verificación. Las referencias de zona no constituyen inventario disponible.

Para conectar un dominio después, actualizar canonical, og:url y sitemap, además de la configuración de Pages y DNS.
