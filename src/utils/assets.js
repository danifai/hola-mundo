/** Ruta a un archivo de `public/`, respetando el `base` de Vite (ej. GitHub Pages). */
export function publicUrl(path) {
  const base = import.meta.env.BASE_URL
  return `${base}${String(path).replace(/^\//, '')}`
}
