function OutputPanel({ prompt, status, onCopy, usage }) {
  return (
    <section className="panel output-panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Prompt optimizado</p>
          <h2>Listo en español e inglés</h2>
        </div>
        <div className="output-actions">
          <button type="button" className="ghost" onClick={onCopy} disabled={!prompt}>
            Copiar
          </button>
        </div>
      </div>

      <div className={`output-box ${status === 'working' ? 'streaming' : ''}`}>
        {!prompt && <p className="placeholder">Aquí verás el prompt final con rol y contexto.</p>}
        {prompt && <pre>{prompt}</pre>}
      </div>

      <div className="usage">
        <p className="eyebrow">Uso</p>
        {usage ? (
          <div className="usage-grid">
            <div>
              <span className="label">Razona</span>
              <strong>{usage.reasoningTokens ?? 0}</strong>
            </div>
            <div>
              <span className="label">Prompt</span>
              <strong>{usage.promptTokens ?? 0}</strong>
            </div>
            <div>
              <span className="label">Salida</span>
              <strong>{usage.completionTokens ?? 0}</strong>
            </div>
          </div>
        ) : (
          <p className="placeholder small">Verás tokens cuando se complete el streaming.</p>
        )}
      </div>
    </section>
  )
}

export default OutputPanel
