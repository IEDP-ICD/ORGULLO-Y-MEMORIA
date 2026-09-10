# ORGULLO Y MEMORIA

Sitio web promocional del canal de YouTube **Orgullo y Memoria**.

Proyecto de **Paula Castellanos** y **Stiven León Pacheco**
Técnica en Integración de Contenidos Digitales — SENA
Institución Educativa La Divina Pastora

---

## Cómo está organizado

```
orgullo-y-memoria/
├── index.html                  ← la página (casi nunca hay que tocarla)
├── assets/
│   ├── css/estilos.css         ← colores y diseño
│   ├── js/app.js               ← lógica (no hay que tocarla)
│   └── img/                    ← logo del proyecto, escudo del colegio, logo SENA
├── secciones/
│   ├── configuracion/          ← nombre, textos, logos y redes sociales
│   ├── quienes-somos/          ← misión, visión, integrantes  (+ carpeta fotos/)
│   ├── videos/                 ← lista de videos de YouTube
│   └── galeria/                ← detrás de cámaras           (+ carpeta fotos/)
└── herramientas/
    └── generar-respaldo.mjs    ← script opcional (ver más abajo)
```

**Todo el contenido se edita en los archivos `.json` de `secciones/`.**
No hace falta saber programar: solo cambiar el texto que está entre comillas.

---

## Las tres reglas del JSON

1. Todo lo que sea texto va **entre comillas dobles**: `"Paula Castellanos"`
2. Cada línea termina en **coma**, menos la última del bloque.
3. No se borran las llaves `{ }` ni los corchetes `[ ]`.

Si la página aparece vacía, casi siempre es una coma de más o de menos.
Pega el archivo en <https://jsonlint.com> para que te diga en qué línea está el error.

---

## Editar cada sección

### 1. Datos generales y redes — `secciones/configuracion/configuracion.json`

Ahí se cambian el nombre del proyecto, el lema, el texto de la portada y **los @ de las redes**:

```json
"redes": {
  "youtube": "@orgulloymemoria",
  "instagram": "@orgulloymemoria",
  "twitter": "@orgulloymemoria"
}
```

Solo se escribe el arroba. El sitio arma solo las direcciones
`youtube.com/@…`, `instagram.com/…` y `x.com/…`.
Si una red no existe todavía, deja las comillas vacías `""` y ese botón no aparece.

### 2. Quiénes somos — `secciones/quienes-somos/quienes-somos.json`

Aquí van la **misión**, la **visión** y la lista de **integrantes**.
Para agregar a alguien, se copia un bloque completo:

```json
{
  "nombre": "Nombre Apellido",
  "rol": "Sonido",
  "foto": "secciones/quienes-somos/fotos/nombre.jpg",
  "descripcion": "Qué hace en el equipo."
}
```

Las fotos se suben a `secciones/quienes-somos/fotos/`. Cuadradas se ven mejor (por ejemplo 600×600).

### 3. Videos — `secciones/videos/videos.json`

**Las miniaturas se sacan solas de YouTube.** Solo hay que copiar el ID del video:

> `https://www.youtube.com/watch?v=`**`dQw4w9WgXcQ`** ← esto es el ID

```json
{
  "titulo": "El primer timbre",
  "descripcion": "De qué trata el video.",
  "video": "dQw4w9WgXcQ"
}
```

Si en algún caso quieren una miniatura propia (distinta a la de YouTube), se agrega
la línea `"miniatura"` y esa manda:

```json
"miniatura": "secciones/videos/portada-especial.jpg"
```

Los tres videos de ejemplo traen miniatura propia justamente para mostrar cómo funciona.
Al poner el ID real, **borren la línea `"miniatura"`** y quedará la de YouTube.

### 4. Galería (detrás de cámaras) — `secciones/galeria/galeria.json`

Se suben las fotos a `secciones/galeria/fotos/` y se agrega un bloque por cada una:

```json
{
  "titulo": "Montaje de luces",
  "descripcion": "Prueba de iluminación antes de grabar.",
  "imagen": "secciones/galeria/fotos/luces.jpg"
}
```

Al hacer clic, la foto se abre ampliada y se puede pasar con las flechas del teclado.

### 5. Logos

Reemplazar los tres archivos de `assets/img/` conservando el nombre, o cambiar la ruta
en `configuracion.json`:

| Archivo | Qué es |
|---|---|
| `logo-proyecto.svg` | Logo de Orgullo y Memoria |
| `escudo-colegio.svg` | Escudo de la institución |
| `logo-sena.svg` | Logo del SENA |

Sirven `.png`, `.jpg` o `.svg`. Con fondo transparente se ven mejor.

---

## Ver el sitio

**En GitHub Pages (recomendado):** repositorio → *Settings* → *Pages* → rama `main`, carpeta `/root`.
En un par de minutos queda en `https://usuario.github.io/orgullo-y-memoria/`.

**Abriendo el `index.html` con doble clic:** también funciona, porque cada sección tiene
un archivo de respaldo (`*.respaldo.js`) con una copia de su JSON.

> ⚠️ Al abrirlo con doble clic, el navegador **no puede leer los `.json`** (es una restricción
> de seguridad). En ese caso se usa el respaldo. Por eso, si editaron un `.json` y no ven el
> cambio al abrirlo localmente, hay dos opciones:
>
> - Publicarlo en GitHub Pages (ahí siempre se leen los `.json`), o
> - Regenerar los respaldos con Node: `node herramientas/generar-respaldo.mjs`

**Con servidor local (si tienen Python):** dentro de la carpeta, `python -m http.server`
y abrir <http://localhost:8000>. Así se leen los `.json` de verdad.

---

## Diseño

Colores tomados de la bandera de Colombia: amarillo `#FCD116`, azul `#003893`, rojo `#CE1126`.
La franja tricolor que aparece en las fichas y en los separadores respeta la proporción real
de la bandera: mitad amarillo, un cuarto azul, un cuarto rojo.
Todo eso está en las variables del inicio de `assets/css/estilos.css`.

## Créditos de las imágenes de ejemplo

Los `.svg` de ejemplo (miniaturas, fotos de galería, escudo y logo SENA) son marcadores
hechos para este repositorio y están para reemplazarse por el material real del proyecto.
