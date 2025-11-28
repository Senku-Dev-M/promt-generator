export const deliverables = [
  { value: 'texto', label: 'Texto' },
  { value: 'imagen', label: 'Imagen' },
  { value: 'video', label: 'Video' },
]

export const defaultModel = { value: 'x-ai/grok-4.1-fast:free', label: 'Grok 4.1 fast (free)' }

export const presets = [
  {
    title: 'Landing page SaaS',
    objective: 'Crear un prompt para diseñar la estructura y copy de una landing page SaaS que convierta.',
    description:
      'Producto de analítica en tiempo real para equipos de marketing. Tono profesional pero cercano. Resaltar ROI y velocidad.',
    deliverable: 'texto',
  },
  {
    title: 'Campaña visual',
    objective: 'Generar un prompt de imagen para una campaña digital llamativa.',
    description:
      'Tema: movilidad sostenible. Estilo: futurista, color morado neón con acentos turquesa. Formato 16:9.',
    deliverable: 'imagen',
  },
  {
    title: 'Guion corto',
    objective: 'Mejorar un prompt para un guion de video ágil.',
    description:
      'Video de 45 segundos para TikTok sobre cómo comenzar en IA generativa sin saber programar. Tono enérgico.',
    deliverable: 'video',
  },
]
