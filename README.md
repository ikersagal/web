# Iker Sagal / Real Estate
Sitio estático publicado en https://ikersagal.github.io/web/ con GitHub Pages mediante Actions.

Incluye 10 propiedades con galerías, filtros accesibles, video de presentación local, contactos y perfiles de Instagram y TikTok. Sin formulario. Los precios son referencias de fichas y requieren confirmar vigencia. No se publican los PDF originales con contactos de terceros. Algunas imágenes de desarrollos se identifican como ilustrativas.

## Medición preparada
Cada enlace de WhatsApp emite `whatsapp_click` a `window.dataLayer` y `sagal:whatsapp_click` como CustomEvent. Incluye cta_location, intent, property_id, page_path y UTM permitidas. Las UTM se conservan al navegar a una propiedad. No se recopilan otros parámetros ni se instala un proveedor de analítica. Para reportes centralizados falta conectar una herramienta de medición y su configuración correspondiente. Abrir WhatsApp no confirma que se haya enviado un mensaje.

## Publicación
El workflow copia solamente los archivos públicos, assets y propiedades. No hay dominio personalizado configurado. El diseño y el catálogo pueden actualizarse independientemente.

