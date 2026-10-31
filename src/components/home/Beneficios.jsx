import { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import BeneficiosModal from './BeneficiosModal'
import './Beneficios.css'

const beneficios = [
  {
    id: 'envios',
    titulo: 'Envíos gratis',
    icono: 'bi-truck',
    clickable: false,
  },
  {
    id: 'cuotas',
    titulo: 'Cuotas sin interés',
    icono: 'bi-credit-card-2-front',
    clickable: true,
  },
  {
    id: 'protegida',
    titulo: 'Compra protegida',
    icono: 'bi-shield-check',
    clickable: false,
  },
  {
    id: 'cambios',
    titulo: 'Cambios y devoluciones',
    icono: 'bi-arrow-repeat',
    clickable: false,
  },
]

function Beneficios() {
  const [mostrarCuotas, setMostrarCuotas] = useState(false)

  return (
    <section className="section-block beneficios" aria-labelledby="beneficios-titulo">
      <Container>
        <h2 id="beneficios-titulo" className="section-title">
          Beneficios Hola Mundo
        </h2>
        <Row className="g-4 text-center justify-content-center">
          {beneficios.map((item) => {
            const Tag = item.clickable ? 'button' : 'div'
            return (
              <Col xs={6} md={3} key={item.id}>
                <Tag
                  type={item.clickable ? 'button' : undefined}
                  className={`beneficio-item${item.clickable ? ' beneficio-item--clickable' : ''}`}
                  onClick={item.clickable ? () => setMostrarCuotas(true) : undefined}
                >
                  <i className={`bi ${item.icono} beneficio-item__icon`} aria-hidden="true" />
                  <h3 className="beneficio-item__titulo">{item.titulo}</h3>
                </Tag>
              </Col>
            )
          })}
        </Row>
      </Container>

      <BeneficiosModal show={mostrarCuotas} onHide={() => setMostrarCuotas(false)} />
    </section>
  )
}

export default Beneficios
