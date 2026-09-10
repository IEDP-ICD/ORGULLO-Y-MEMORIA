/**
 * Regenera los archivos *.respaldo.js a partir de los .json.
 *
 * Uso (necesitas Node.js instalado):
 *    node herramientas/generar-respaldo.mjs
 *
 * Los respaldos SOLO se usan cuando la página se abre con doble clic
 * (file://). Si el sitio está publicado en GitHub Pages, se leen los .json
 * y este script es opcional.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const SECCIONES = [
  { clave: 'configuracion', carpeta: 'configuracion',  archivo: 'configuracion'  },
  { clave: 'quienesSomos',  carpeta: 'quienes-somos',  archivo: 'quienes-somos'  },
  { clave: 'videos',        carpeta: 'videos',         archivo: 'videos'         },
  { clave: 'galeria',       carpeta: 'galeria',        archivo: 'galeria'        }
];

let errores = 0;

for (const { clave, carpeta, archivo } of SECCIONES) {
  const rutaJson = resolve(raiz, 'secciones', carpeta, `${archivo}.json`);
  const rutaJs   = resolve(raiz, 'secciones', carpeta, `${archivo}.respaldo.js`);

  try {
    const datos = JSON.parse(readFileSync(rutaJson, 'utf8'));
    const contenido =
`/* Generado por herramientas/generar-respaldo.mjs — NO editar a mano.
   Copia de ${archivo}.json para cuando el sitio se abre con doble clic. */
window.RESPALDO = window.RESPALDO || {};
window.RESPALDO.${clave} = ${JSON.stringify(datos, null, 2)};
`;
    writeFileSync(rutaJs, contenido, 'utf8');
    console.log(`OK  ${archivo}.respaldo.js`);
  } catch (e) {
    errores++;
    console.error(`ERROR en ${archivo}.json → ${e.message}`);
  }
}

console.log(errores === 0
  ? '\nListo. Todos los respaldos quedaron actualizados.'
  : `\nTerminó con ${errores} error(es). Revisa las comas y las comillas del JSON.`);
