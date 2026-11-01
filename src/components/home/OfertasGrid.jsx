import { useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import ProductoCard from '../common/ProductoCard'
import './OfertasGrid.css'

function OfertasGrid({ productos, onAgregar }) {
  const ofertas = productos.filter((producto) => producto.oferta)

  const [activo, setActivo] = useState(0)
  const [touchStart, setTouchStart] = useState(null)

  if (ofertas.length === 0) {
    return null
  }

  const total = ofertas.length

  const siguiente = () => setActivo((prev) => (prev + 1) % total)
  const anterior = () => setActivo((prev) => (prev - 1 + total) % total)

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
    <section className="section-block ofertas-section" aria-labelledby="ofertas-titulo">
      <Container>
        <h2 id="ofertas-titulo" className="section-title">
          Nuestras ofertas
        </h2>

        {/* Versión Desktop (>= 1200px): Grilla de cards centradas */}
        <Row className="g-3 g-md-4 justify-content-center d-none d-xl-flex">
          {ofertas.map((producto) => (
            <Col xs={10} sm={8} md={5} lg={4} xl={3} key={producto.id}>
              <ProductoCard producto={producto} onAgregar={onAgregar} compact />
            </Col>
          ))}
        </Row>

        {/* Versión Tablet y Mobile (< 1200px): Carrusel común de tarjetas */}
        <div
          className="hm-cards-slider d-xl-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          aria-roledescription="carrusel de ofertas"
        >
          <div className="hm-cards-slider__track">
            {/* Tarjeta 1 (visible en mobile y tablet) */}
            <div className="hm-cards-slider__item">
              <ProductoCard producto={ofertas[activo]} onAgregar={onAgregar} />
            </div>

            {/* Tarjeta 2 (visible solo en tablet) */}
            {total > 1 && (
              <div className="hm-cards-slider__item d-none d-md-block">
                <ProductoCard producto={ofertas[segundoIndice]} onAgregar={onAgregar} />
              </div>
            )}
          </div>

          {total > 1 && (
            <>
              {/* Flechas visibles en tablet, ocultas en mobile */}
              <Button
                variant="light"
                className="hm-cards-slider__arrow hm-cards-slider__arrow--prev"
                onClick={anterior}
                aria-label="Oferta anterior"
              >
                <i className="bi bi-chevron-left" aria-hidden="true" />
              </Button>
              <Button
                variant="light"
                className="hm-cards-slider__arrow hm-cards-slider__arrow--next"
                onClick={siguiente}
                aria-label="Siguiente oferta"
              >
                <i className="bi bi-chevron-right" aria-hidden="true" />
              </Button>

              <div className="d-flex justify-content-center gap-2 mt-3" role="tablist" aria-label="Ofertas">
                {ofertas.map((producto, index) => (
                  <button
                    key={producto.id}
                    type="button"
                    role="tab"
                    aria-selected={index === activo}
                    aria-label={`Ir a oferta ${index + 1}`}
                    className={`novedades-rotator__dot${index === activo ? ' is-active' : ''}`}
                    onClick={() => setActivo(index)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </Container>
    </section>
  )
}

export default OfertasGrid
