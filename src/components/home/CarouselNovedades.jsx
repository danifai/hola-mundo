import { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import ProductoCard from '../common/ProductoCard'
import './CarouselNovedades.css'

const INTERVALO_MS = 5000

/**
 * Carrusel rotativo: se ven 3 tarjetas (izquierda, centro, derecha).
 * Al avanzar, la central pasa a la izquierda, la derecha al centro y la
 * que estaba oculta entra por la derecha.
 */
function CarouselNovedades({ productos, onAgregar }) {
  const destacados = productos.filter((producto) => producto.destacado).slice(0, 4)
  const total = destacados.length

  const [activo, setActivo] = useState(0)
  const [pausado, setPausado] = useState(false)

  useEffect(() => {
    if (pausado || total < 2) return undefined
    const timer = setInterval(() => setActivo((prev) => (prev + 1) % total), INTERVALO_MS)
    return () => clearInterval(timer)
  }, [pausado, total])

  if (total === 0) {
    return null
  }

  const siguiente = () => setActivo((prev) => (prev + 1) % total)
  const anterior = () => setActivo((prev) => (prev - 1 + total) % total)

  const posicionDe = (index) => {
    const rel = (index - activo + total) % total
    if (rel === 0) return 'centro'
    if (rel === 1) return 'derecha'
    if (rel === total - 1) return 'izquierda'
    return 'oculta'
  }

  return (
    <section className="section-block novedades-section" aria-labelledby="novedades-titulo">
      <Container>
        <h2 id="novedades-titulo" className="section-title">
          Nuestras novedades
        </h2>

        <div
          className="novedades-rotator"
          onMouseEnter={() => setPausado(true)}
          onMouseLeave={() => setPausado(false)}
          aria-roledescription="carrusel"
        >
          <div className="novedades-rotator__stage">
            {destacados.map((producto, index) => {
              const posicion = posicionDe(index)
              const esCentro = posicion === 'centro'
              return (
                <div
                  key={producto.id}
                  className={`novedades-rotator__item novedades-rotator__item--${posicion}`}
                >
                  <div inert={!esCentro} aria-hidden={!esCentro} className="h-100">
                    <ProductoCard producto={producto} onAgregar={onAgregar} />
                  </div>
                  {(posicion === 'izquierda' || posicion === 'derecha') && (
                    <button
                      type="button"
                      className="novedades-rotator__peek-btn"
                      onClick={() => setActivo(index)}
                      aria-label={`Ver ${producto.nombre}`}
                      tabIndex={-1}
                    />
                  )}
                </div>
              )
            })}
          </div>

          <Button
            variant="light"
            className="novedades-rotator__arrow novedades-rotator__arrow--prev"
            onClick={anterior}
            aria-label="Anterior"
          >
            <i className="bi bi-chevron-left" aria-hidden="true" />
          </Button>
          <Button
            variant="light"
            className="novedades-rotator__arrow novedades-rotator__arrow--next"
            onClick={siguiente}
            aria-label="Siguiente"
          >
            <i className="bi bi-chevron-right" aria-hidden="true" />
          </Button>
        </div>

        <div className="d-flex justify-content-center gap-2 mt-3" role="tablist" aria-label="Novedades">
          {destacados.map((producto, index) => (
            <button
              key={producto.id}
              type="button"
              role="tab"
              aria-selected={index === activo}
              aria-label={`Ir a ${producto.nombre}`}
              className={`novedades-rotator__dot${index === activo ? ' is-active' : ''}`}
              onClick={() => setActivo(index)}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}

export default CarouselNovedades
