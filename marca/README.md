# Recursos de marca

## `originales/`

Los archivos **tal como los entregó diseño**, sin modificar. Vienen en el verde
`#CCFF00` y con el texto ya convertido a curvas, así que **no hacen falta las
fuentes Horizon Bold ni Michroma** para renderizarlos.

Estos archivos no los sirve el sitio: son la fuente de verdad. Si alguna vez
hay que regenerar los del sitio, se parte de aquí.

## Los que usa el sitio

Están en `web/public/marca/` y se derivan de los originales con un solo cambio:
el color pasa de `#CCFF00` a **`#AEEA00`**, el verde neón de la paleta oficial,
para que el logotipo y la interfaz usen exactamente el mismo verde.

| Archivo en `web/public/marca/` | Qué es |
|---|---|
| `aburra-motors-logo.svg` | Imagotipo completo, en verde neón. Cabecera y pie. |
| `aburra-motors-logo-hueso.svg` | Igual, en blanco roto `#F4F7F6`. |
| `aburra-motors-isotipo.svg` | Solo el isotipo, en verde neón. |
| `aburra-motors-isotipo-hueso.svg` | Igual, en blanco roto. |
| `favicon.svg` | Isotipo sobre un cuadro oscuro redondeado. |

El favicon lleva fondo oscuro a propósito: el original es transparente y el
verde neón sobre la pestaña clara de un navegador no se distingue. La copia que
usa Next está en `web/src/app/icon.svg`.

## Para cambiar el color de marca

Edita los cinco archivos de `web/public/marca/` (y `web/src/app/icon.svg`)
reemplazando el hex, y ajusta `--color-neon` en `web/src/app/globals.css` para
que la interfaz acompañe.
