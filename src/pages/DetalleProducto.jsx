import { useState } from 'react'
import {
  Alert,
  Badge,
  Breadcrumb,
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Toast,
  ToastContainer,
} from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ProductoCard from '../components/common/ProductoCard'
import { productos } from '../data/productos'

const formatearPrecio = (precio) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(precio)

function DetalleProducto({ onAgregarAlCarrito }) {
  const { id } = useParams()
  const navigate = useNavigate()

  // Buscar el producto por id
  const productoId = Number(id)
  const producto = productos.find((p) => p.id === productoId)

  // Estado para la cantidad a agregar
  const [cantidad, setCantidad] = useState(1)
  const [toastMensaje, setToastMensaje] = useState(null)

  // Si el producto no existe en el catálogo
  if (!producto) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="warning" className="border-0 shadow-sm rounded-4 p-5 mx-auto" style={{ maxWidth: '540px' }}>
          <div className="display-4 mb-3" aria-hidden="true">
            🔍
          </div>
          <Alert.Heading as="h2" className="fw-bold">
            Producto no encontrado
          </Alert.Heading>
          <p className="text-muted mb-4">
            El producto que estás buscando no existe o fue removido de nuestro catálogo.
          </p>
          <Button className="btn-hm" onClick={() => navigate('/productos')}>
            <i className="bi bi-arrow-left me-2" />
            Volver al catálogo
          </Button>
        </Alert>
      </Container>
    )
  }

  const sinStock = producto.stock === 0

  // Controladores de cantidad
  const incrementar = () => {
    if (cantidad < producto.stock) {
      setCantidad((prev) => prev + 1)
    }
  }

  const decrementar = () => {
    if (cantidad > 1) {
      setCantidad((prev) => prev - 1)
    }
  }

  const handleCantidadManual = (e) => {
    const valor = parseInt(e.target.value, 10)
    if (Number.isNaN(valor) || valor < 1) {
      setCantidad(1)
    } else if (valor > producto.stock) {
      setCantidad(producto.stock)
    } else {
      setCantidad(valor)
    }
  }

  const handleAgregar = () => {
    if (sinStock || !onAgregarAlCarrito) return
    onAgregarAlCarrito(producto, cantidad)
    setToastMensaje(
      `¡Agregaste ${cantidad} ${cantidad === 1 ? 'unidad' : 'unidades'} de "${producto.nombre}" al carrito!`
    )
  }

  // Productos relacionados de la misma categoría (excluyendo el actual)
  const relacionados = productos
    .filter((p) => p.categoria === producto.categoria && p.id !== producto.id)
    .slice(0, 3)

  const handleImgError = (event) => {
    event.currentTarget.src =
      'data:image/svg+xml,' +
      encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
              <stop stop-color="#d6eef6"/>
              <stop offset="1" stop-color="#fde8d8"/>
            </linearGradient>
          </defs>
          <rect width="600" height="600" fill="url(#g)"/>
          <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
            fill="#3f7a92" font-family="Nunito, sans-serif" font-size="28" font-weight="700">
            Hola Mundo
          </text>
        </svg>`
      )
  }

  return (
    <div className="py-4">
      <Container>
        {/* Navegación tipo Breadcrumb */}
        <Breadcrumb className="mb-4">
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>
            Inicio
          </Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/productos' }}>
            Catálogo
          </Breadcrumb.Item>
          <Breadcrumb.Item
            linkAs={Link}
            linkProps={{ to: `/productos?categoria=${encodeURIComponent(producto.categoria)}` }}
          >
            {producto.categoria}
          </Breadcrumb.Item>
          <Breadcrumb.Item active>{producto.nombre}</Breadcrumb.Item>
        </Breadcrumb>

        {/* Detalle Principal del Producto */}
        <Card className="border-0 shadow-sm rounded-4 overflow-hidden mb-5">
          <Card.Body className="p-4 p-lg-5">
            <Row className="g-4 g-lg-5 align-items-center">
              {/* Columna Izquierda: Imagen Ampliada */}
              <Col xs={12} md={6}>
                <div
                  className="position-relative bg-white rounded-4 p-4 text-center border"
                  style={{ minHeight: '380px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  {/* Badges de estado */}
                  <div className="position-absolute top-0 start-0 m-3 d-flex flex-column gap-2">
                    {sinStock && (
                      <Badge bg="danger" className="p-2 fw-bold">
                        Sin stock
                      </Badge>
                    )}
                    {!sinStock && producto.oferta && (
                      <Badge className="badge-oferta p-2 fw-bold">
                        Oferta Especial
                      </Badge>
                    )}
                    {!sinStock && !producto.oferta && producto.destacado && (
                      <Badge className="badge-nuevo p-2 fw-bold">
                        Novedad
                      </Badge>
                    )}
                  </div>

                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="img-fluid"
                    style={{ maxHeight: '420px', objectFit: 'contain' }}
                    onError={handleImgError}
                  />
                </div>
              </Col>

              {/* Columna Derecha: Información y Acciones */}
              <Col xs={12} md={6}>
                <div className="d-flex flex-column gap-3">
                  {/* Categoría y disponibilidad */}
                  <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                    <span className="text-uppercase fw-bold text-muted small">
                      {producto.categoria}
                    </span>
                    <Badge
                      bg={sinStock ? 'danger' : 'success'}
                      className="px-3 py-2 rounded-pill fw-semibold"
                    >
                      <i className={`bi ${sinStock ? 'bi-x-circle' : 'bi-check2-circle'} me-1`} />
                      {sinStock ? 'Sin stock' : `${producto.stock} disponibles`}
                    </Badge>
                  </div>

                  {/* Nombre del producto */}
                  <h1 className="fw-bold mb-0" style={{ fontSize: 'clamp(1.75rem, 2.5vw, 2.25rem)' }}>
                    {producto.nombre}
                  </h1>

                  {/* Precio */}
                  <div className="py-2">
                    <span className="fs-1 fw-extrabold text-primary" style={{ color: 'var(--hm-accent-dark)' }}>
                      {formatearPrecio(producto.precio)}
                    </span>
                    <div className="text-muted small mt-1">
                      <i className="bi bi-credit-card me-1" />
                      Hasta <strong>6 cuotas sin interés</strong> de {formatearPrecio(producto.precio / 6)}
                    </div>
                  </div>

                  <hr className="my-1 opacity-25" />

                  {/* Descripción completa */}
                  <div>
                    <h5 className="fw-bold mb-2">Descripción</h5>
                    <p className="text-muted lh-base" style={{ fontSize: '1.02rem' }}>
                      {producto.descripcion}
                    </p>
                  </div>

                  {/* Características principales */}
                  <div className="p-3 rounded-3 bg-body-tertiary">
                    <h6 className="fw-bold mb-2">Características principales:</h6>
                    <ul className="list-unstyled mb-0 d-flex flex-column gap-2 small text-muted">
                      <li className="d-flex align-items-center gap-2">
                        <i className="bi bi-shield-check text-success fs-6" />
                        <span>Producto testeado y certificado bajo normas de seguridad infantil.</span>
                      </li>
                      <li className="d-flex align-items-center gap-2">
                        <i className="bi bi-truck text-primary fs-6" />
                        <span>Envío rápido a todo el país o retiro en tienda sin costo.</span>
                      </li>
                      <li className="d-flex align-items-center gap-2">
                        <i className="bi bi-arrow-repeat text-info fs-6" />
                        <span>Garantía de satisfacción y cambios hasta 30 días posteriores a la compra.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Control de Cantidad y Botones de Compra */}
                  <div className="pt-2">
                    <div className="d-flex flex-wrap align-items-center gap-3">
                      {/* Control para sumar/restar cantidad */}
                      <div>
                        <label htmlFor="cantidad-input" className="form-label small fw-bold text-muted mb-1 d-block">
                          Cantidad
                        </label>
                        <InputGroup style={{ width: '140px' }}>
                          <Button
                            variant="outline-secondary"
                            onClick={decrementar}
                            disabled={sinStock || cantidad <= 1}
                            aria-label="Disminuir cantidad"
                          >
                            <i className="bi bi-dash" />
                          </Button>
                          <Form.Control
                            id="cantidad-input"
                            type="number"
                            min="1"
                            max={producto.stock}
                            value={cantidad}
                            onChange={handleCantidadManual}
                            disabled={sinStock}
                            className="text-center fw-bold"
                            aria-label="Cantidad seleccionada"
                          />
                          <Button
                            variant="outline-secondary"
                            onClick={incrementar}
                            disabled={sinStock || cantidad >= producto.stock}
                            aria-label="Aumentar cantidad"
                          >
                            <i className="bi bi-plus" />
                          </Button>
                        </InputGroup>
                      </div>

                      {/* Botón Agregar al carrito */}
                      <div className="flex-grow-1" style={{ minWidth: '200px' }}>
                        <label className="form-label small fw-bold text-muted mb-1 d-block opacity-0">
                          Acción
                        </label>
                        <Button
                          className="btn-hm w-100 py-2 d-flex align-items-center justify-content-center gap-2"
                          size="lg"
                          disabled={sinStock}
                          onClick={handleAgregar}
                        >
                          <i className="bi bi-cart-plus-fill fs-5" aria-hidden="true" />
                          <span>{sinStock ? 'Sin stock disponible' : 'Agregar al carrito'}</span>
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Botón secundario para volver al catálogo */}
                  <div className="pt-2">
                    <Button
                      as={Link}
                      to="/productos"
                      variant="link"
                      className="text-decoration-none p-0 fw-bold d-inline-flex align-items-center gap-1 text-muted"
                    >
                      <i className="bi bi-arrow-left" />
                      <span>Volver al catálogo completo</span>
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Sección de Productos Relacionados */}
        {relacionados.length > 0 && (
          <section className="mt-5">
            <h3 className="fw-bold mb-4">También te puede interesar</h3>
            <Row className="g-4">
              {relacionados.map((rel) => (
                <Col key={rel.id} xs={12} sm={6} lg={4}>
                  <ProductoCard producto={rel} onAgregar={onAgregarAlCarrito} />
                </Col>
              ))}
            </Row>
          </section>
        )}
      </Container>

      {/* Toast de confirmación con React Bootstrap */}
      <ToastContainer
        position="bottom-center"
        className="p-3 position-fixed"
        style={{ zIndex: 1080 }}
      >
        <Toast
          show={Boolean(toastMensaje)}
          onClose={() => setToastMensaje(null)}
          delay={3000}
          autohide
          className="rounded-pill shadow border-0"
        >
          <Toast.Body className="d-flex align-items-center gap-2 px-4 py-2">
            <i className="bi bi-check-circle-fill text-success fs-5" aria-hidden="true" />
            <span className="fw-semibold">{toastMensaje}</span>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  )
}

export default DetalleProducto
