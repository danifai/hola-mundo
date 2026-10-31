import { Col, Container, Row } from 'react-bootstrap'
import ProductoCard from '../common/ProductoCard'
import './OfertasGrid.css'

function OfertasGrid({ productos, onAgregar }) {
  const ofertas = productos.filter((producto) => producto.oferta).slice(0, 2)

  if (ofertas.length === 0) {
    return null
  }

  return (
    <section className="section-block ofertas-section" aria-labelledby="ofertas-titulo">
      <Container>
        <h2 id="ofertas-titulo" className="section-title">
          Nuestras ofertas
        </h2>
        <Row className="g-3 g-md-4 justify-content-center">
          {ofertas.map((producto) => (
            <Col xs={10} sm={8} md={5} lg={4} xl={3} key={producto.id}>
              <ProductoCard producto={producto} onAgregar={onAgregar} compact />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default OfertasGrid
