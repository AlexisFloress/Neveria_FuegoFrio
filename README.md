# Ruleta Fuego Frío

Sitio estático y responsive para la campaña académica de la paleta Fuego Frío. Tiene seis sectores; cada uno de los tres resultados aparece dos veces en posiciones opuestas. Los resultados tienen la misma probabilidad en esta demostración.

## Probar localmente

Abre `index.html` o ejecuta un servidor estático en esta carpeta, por ejemplo `python3 -m http.server 8000`, y visita `http://localhost:8000`.

## Publicar en GitHub Pages

1. Crea un repositorio y copia **el contenido de esta carpeta** a la raíz de la rama `main` (el archivo `index.html` debe quedar en la raíz).
2. En el repositorio, ve a **Settings → Pages → Build and deployment**.
3. En **Source**, elige **Deploy from a branch**; selecciona `main` y `/(root)`; guarda.
4. Abre la URL que muestre GitHub Pages. Las rutas de CSS, JavaScript e imágenes son relativas y funcionan también en repositorios de proyecto con subruta.

No requiere Node, paquetes ni compilación. La fuente web tiene alternativas locales si no puede cargarse.

## Alcance de la dinámica

Esta es una demostración visual: la selección y los giros ocurren en el navegador, no se guardan premios ni se impide volver a girar. Para una promoción real se necesitarían reglas, vigencia, validación de premios y un servidor que controle la participación. El precio o descuento de los artes es conceptual y debe aprobarse antes de publicar.
