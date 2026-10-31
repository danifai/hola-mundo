import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

function DetalleProducto() {
  const { id } = useParams()

  return (
    <section className="page-placeholder">
      <Container>
        <h1>Detalle de producto</h1>
        <p>
          Vista ampliada del producto #{id}. Se completará con cantidad,
          stock y agregado al carrito.
        </p>
      </Container>
    </section>
  )
}

export default DetalleProducto
