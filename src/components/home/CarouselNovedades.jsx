import { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import ProductoCard from '../common/ProductoCard'
import './CarouselNovedades.css'

const INTERVALO_MS = 5000

function CarouselNovedades({ productos, onAgregar }) {
  const destacados = productos.filter((producto) => producto.destacado).slice(0, 4)
  const total = destacados.length

  const [activo, setActivo] = useState(0)
  const [pausado, setPausado] = useState(false)
  const [touchStart, setTouchStart] = useState(null)

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

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = (e) => {
    if (touchStart === null) return
    const touchEnd = e.changedTouches[0].clientX
    const diff = touchStart - touchEnd
    if (diff > 45) {
      siguiente()
    } else if (diff < -45) {
      anterior()
    }
    setTouchStart(null)
  }

  const segundoIndice = (activo + 1) % total

  return (
    <section className="section-block novedades-section" aria-labelledby="novedades-titulo">
      <Container>
        <h2 id="novedades-titulo" className="section-title">
          Nuestras novedades
        </h2>

        {/* Versión Desktop (>= 1200px): Carrusel rotativo 3D especial */}
        <div
          className="novedades-rotator d-none d-xl-block"
          onMouseEnter={() => setPausado(true)}
          onMouseLeave={() => setPausado(false)}
          aria-roledescription="carrusel especial"
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

        {/* Versión Tablet y Mobile (< 1200px): Carrusel común de tarjetas */}
        <div
          className="hm-cards-slider d-xl-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={() => setPausado(true)}
          onMouseLeave={() => setPausado(false)}
          aria-roledescription="carrusel de novedades"
        >
          <div className="hm-cards-slider__track">
            {/* Tarjeta 1 (visible en mobile y tablet) */}
            <div className="hm-cards-slider__item">
              <ProductoCard producto={destacados[activo]} onAgregar={onAgregar} />
            </div>

            {/* Tarjeta 2 (visible solo en tablet) */}
            {total > 1 && (
              <div className="hm-cards-slider__item d-none d-md-block">
                <ProductoCard producto={destacados[segundoIndice]} onAgregar={onAgregar} />
              </div>
            )}
          </div>

          {total > 1 && (
            <>
              <Button
                variant="light"
                className="hm-cards-slider__arrow hm-cards-slider__arrow--prev"
                onClick={anterior}
                aria-label="Novedad anterior"
              >
                <i className="bi bi-chevron-left" aria-hidden="true" />
              </Button>
              <Button
                variant="light"
                className="hm-cards-slider__arrow hm-cards-slider__arrow--next"
                onClick={siguiente}
                aria-label="Siguiente novedad"
              >
                <i className="bi bi-chevron-right" aria-hidden="true" />
              </Button>
            </>
          )}
        </div>

        {/* Dots de navegación comunes */}
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
