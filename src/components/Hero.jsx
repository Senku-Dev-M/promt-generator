function Hero({ modelLabel }) {
  return (
    <header className="hero">
      <div className="badge">OpenRouter · {modelLabel}</div>
      <h1>
        Generador de prompts <span>afinados</span>
      </h1>
      <p>
        Ingresa objetivo, contexto y el tipo de salida. Mejoramos tu solicitud con prácticas de prompt engineering: rol
        y estructura listos para español e inglés.
      </p>
      <div className="hero-actions">
        <div className="stat">
          <span>⚡</span>
          <div>
            <strong>Streaming</strong>
            <small>Tokens en vivo con OpenRouter</small>
          </div>
        </div>
        <div className="stat">
          <span>🛠️</span>
          <div>
            <strong>Prompt completo</strong>
            <small>Rol + contexto + formato final</small>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Hero
