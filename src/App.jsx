import { useMemo, useState } from 'react'
import { OpenRouter } from '@openrouter/sdk'
import Hero from './components/Hero'
import PromptForm from './components/PromptForm'
import OutputPanel from './components/OutputPanel'
import { defaultModel, presets } from './constants'
import './App.css'

function App() {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY
  const client = useMemo(() => (apiKey ? new OpenRouter({ apiKey }) : null), [apiKey])

  const [form, setForm] = useState({
    objective: '',
    description: '',
    deliverable: 'texto',
  })
  const [prompt, setPrompt] = useState('')
  const [status, setStatus] = useState('idle') // idle | working | done | error
  const [error, setError] = useState('')
  const [usage, setUsage] = useState(null)
  const [note, setNote] = useState('')

  const buildLocalPrompt = () => {
    const { objective, description, deliverable } = form
    return [
      '# Rol',
      'Actúas como Prompt Engineer senior especializado en IA generativa. Diseñas prompts claros y verificables.',
      '',
      '# Objetivo',
      objective,
      '',
      '# Contexto',
      description,
      '',
      '# Modelo sugerido',
      defaultModel.label,
      '',
      '# Entregable esperado',
      `Tipo: ${deliverable}. Devuelve un prompt final en español y su versión en inglés, listos para usar.`,
      '',
      '# Instrucciones para la IA',
      '- Reescribe el pedido con mayor claridad y tono adecuado para la audiencia.',
      '- Explica brevemente el plan de acción y valida supuestos críticos (sin detallar pasos de razonamiento).',
      '',
      '# Formato de salida',
      'PROMPT OPTIMIZADO (ES):\n- Rol\n- Contexto\n- Objetivo\n- Formato/estilo esperado\n- Restricciones\n- Entregable final\n\nPROMPT OPTIMIZED (EN):\n- Role\n- Context\n- Goal\n- Format/style\n- Constraints\n- Final deliverable',
    ].join('\n')
  }

  const buildMessages = () => {
    const { objective, description, deliverable } = form
    return [
      {
        role: 'system',
        content:
          'Eres un Prompt Engineer senior. Devuelves prompts listos para usar, con rol, contexto y formato de salida. Entrega el prompt final en español y su versión en inglés. No incluyas checklist ni pasos de razonamiento.',
      },
      {
        role: 'user',
        content: [
          `Objetivo principal: ${objective}`,
          `Descripción y contexto: ${description}`,
          `Tipo de salida esperado: ${deliverable} (optimiza la redacción para este formato).`,
          'Entrega el prompt final estructurado, primero en español y luego en inglés. No añadas pasos de razonamiento ni checklist.',
        ].join('\n'),
      },
    ]
  }

  const handleGenerate = async (event) => {
    event.preventDefault()
    setError('')
    setUsage(null)
    setNote('')
    setPrompt('')

    if (!form.objective.trim() || !form.description.trim()) {
      setError('Completa objetivo y descripción antes de generar.')
      return
    }

    if (!client) {
      setStatus('done')
      setPrompt(buildLocalPrompt())
      setNote('Modo sin IA: agrega VITE_OPENROUTER_API_KEY para usar OpenRouter en vivo.')
      return
    }

    setStatus('working')
    try {
      const stream = await client.chat.send({
        model: defaultModel.value,
        messages: buildMessages(),
        stream: true,
        streamOptions: { includeUsage: true },
      })

      for await (const chunk of stream) {
        const content = chunk.choices?.[0]?.delta?.content
        if (content) {
          setPrompt((current) => current + content)
        }
        if (chunk.usage) {
          setUsage(chunk.usage)
        }
      }

      setStatus('done')
    } catch (err) {
      setStatus('error')
      setError(err?.message || 'No se pudo generar el prompt. Intenta de nuevo.')
    }
  }

  const handleCopy = async () => {
    if (!prompt) return
    await navigator.clipboard.writeText(prompt)
    setNote('Prompt copiado al portapapeles.')
  }

  const handlePreset = (preset) => {
    setForm({
      objective: preset.objective,
      description: preset.description,
      deliverable: preset.deliverable,
    })
    setPrompt('')
    setUsage(null)
    setError('')
    setNote(`Plantilla aplicada: ${preset.title}`)
  }

  return (
    <div className="page">
      <div className="bg-glow" />
      <div className="bg-grid" />
      <div className="bg-stars" />
      <div className="bg-fog" />
      <Hero modelLabel={defaultModel.label} />

      <main className="content">
        <PromptForm
          form={form}
          setForm={setForm}
          status={status}
          error={error}
          note={note}
          onSubmit={handleGenerate}
          onPreset={handlePreset}
          presets={presets}
        />
        <OutputPanel prompt={prompt} status={status} onCopy={handleCopy} usage={usage} />
      </main>
    </div>
  )
}

export default App
