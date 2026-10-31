import { Container } from 'react-bootstrap'

function Carrito({ carrito }) {
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0)

  return (
    <section className="page-placeholder">
      <Container>
        <h1>Carrito</h1>
        <p>
          {totalItems === 0
            ? 'Tu carrito está vacío. Próximamente: listado, totales y formulario de compra.'
            : `Tenés ${totalItems} producto(s) en el carrito. El checkout se completará en el próximo paso.`}
        </p>
      </Container>
    </section>
  )
}

export default Carrito
