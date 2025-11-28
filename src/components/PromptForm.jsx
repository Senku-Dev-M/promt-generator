import { deliverables } from '../constants'

function PromptForm({ form, setForm, status, error, note, onSubmit, onPreset, presets }) {
  return (
    <section className="panel form-panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Brief del usuario</p>
          <h2>Cuéntanos qué necesitas</h2>
        </div>
        <span className={`status-pill ${status}`}>
          {status === 'working' && 'Generando...'}
          {status === 'done' && 'Listo'}
          {status === 'error' && 'Error'}
          {status === 'idle' && 'En espera'}
        </span>
      </div>

      <form className="prompt-form" onSubmit={onSubmit}>
        <label>
          Objetivo del prompt
          <textarea
            value={form.objective}
            onChange={(e) => setForm({ ...form, objective: e.target.value })}
            placeholder="Ej: Quiero un prompt que genere un guion persuasivo para vender un curso de UX."
            rows={3}
          />
        </label>

        <label>
          Descripción y contexto
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Audiencia, tono, referencias, restricciones, datos clave que el modelo debe respetar."
            rows={5}
          />
        </label>

        <div className="deliverable-row">
          <p>Tipo de salida</p>
          <div className="pill-group">
            {deliverables.map((item) => (
              <button
                key={item.value}
                type="button"
                className={`pill ${form.deliverable === item.value ? 'active' : ''}`}
                onClick={() => setForm({ ...form, deliverable: item.value })}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <p className="output-hint">
          Selecciona si necesitas texto, imagen o video. Ajustaremos el formato y el tono del prompt a ese tipo de
          salida.
        </p>

        <div className="actions-row">
          <button type="submit" className="primary wide" disabled={status === 'working'}>
            {status === 'working' ? 'Generando...' : 'Mejorar prompt'}
          </button>
          <p className="hint">Tip: Sé explícito con audiencia, tono y restricciones.</p>
        </div>

        {error && <div className="alert error">{error}</div>}
        {note && !error && <div className="alert note">{note}</div>}
      </form>

      <div className="preset-row">
        <p>Plantillas rápidas</p>
        <div className="preset-buttons">
          {presets.map((preset) => (
            <button key={preset.title} type="button" onClick={() => onPreset(preset)}>
              {preset.title}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PromptForm
