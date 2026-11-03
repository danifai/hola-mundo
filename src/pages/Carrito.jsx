import { useState } from 'react'
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Modal,
  Row,
} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import CarritoItem from '../components/common/CarritoItem'
import ProductoCard from '../components/common/ProductoCard'
import { cuponesValidos } from '../data/cupones'
import { productos } from '../data/productos'

const formatearPrecio = (precio) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(precio)

function Carrito({
  carrito,
  onModificarCantidad,
  onEliminar,
  onVaciarCarrito,
  onAgregarAlCarrito,
}) {
  const navigate = useNavigate()

  // Estado del cupón de descuento
  const [codigoInput, setCodigoInput] = useState('')
  const [cuponAplicado, setCuponAplicado] = useState(null)
  const [errorCupon, setErrorCupon] = useState('')

  // Estados del modal de confirmación de compra simulada
  const [showModal, setShowModal] = useState(false)
  const [compraConfirmada, setCompraConfirmada] = useState(false)
  const [numeroOrden, setNumeroOrden] = useState('')
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    direccion: '',
    metodoPago: 'tarjeta',
  })

  // Cálculos de totales
  const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0)
  const subtotal = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0)

  // Descuento en caso de cupón aplicado
  const montoDescuento = cuponAplicado
    ? Math.round(subtotal * (cuponAplicado.descuento / 100))
    : 0

  const totalFinal = Math.max(0, subtotal - montoDescuento)

  // Aplicar cupón
  const handleAplicarCupon = (e) => {
    e.preventDefault()
    setErrorCupon('')
    const codigoLimpio = codigoInput.trim().toUpperCase()

    if (!codigoLimpio) {
      setErrorCupon('Por favor ingresá un código.')
      return
    }

    const encontrado = cuponesValidos.find(
      (c) => c.codigo.toUpperCase() === codigoLimpio
    )

    if (encontrado) {
      setCuponAplicado(encontrado)
      setErrorCupon('')
    } else {
      setErrorCupon('El código ingresado no es válido. Probá con 1010, 1515 o 2020.')
    }
  }

  const handleQuitarCupon = () => {
    setCuponAplicado(null)
    setCodigoInput('')
    setErrorCupon('')
  }

  // 4 productos sugeridos totalmente random (cambian en cada recarga de la página)
  const [sugerencias] = useState(() => {
    return [...productos].sort(() => Math.random() - 0.5).slice(0, 4)
  })

  // Manejo de confirmación de compra
  const handleIniciarCompra = () => {
    if (carrito.length === 0) return
    setCompraConfirmada(false)
    setShowModal(true)
  }

  const handleConfirmarPedido = (e) => {
    e.preventDefault()
    const ordenGenerada = `#HM-${Math.floor(10000 + Math.random() * 90000)}`
    setNumeroOrden(ordenGenerada)
    setCompraConfirmada(true)
  }

  const handleFinalizarYLimpiar = () => {
    setShowModal(false)
    onVaciarCarrito?.()
    navigate('/')
  }

  return (
    <div className="py-4">
      <Container>
        <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
          <div>
            <h1 className="fw-bold mb-1">Carrito de compras</h1>
            <p className="text-muted small">
              {cantidadTotal === 0
                ? 'Tu carrito actualmente no tiene productos'
                : `Tenés ${cantidadTotal} ${cantidadTotal === 1 ? 'producto' : 'productos'} en tu lista`}
            </p>
          </div>
          {carrito.length > 0 && (
            <Button
              variant="outline-danger"
              size="sm"
              className="rounded-pill px-3"
              onClick={onVaciarCarrito}
            >
              <i className="bi bi-trash3 me-1" />
              Vaciar carrito
            </Button>
          )}
        </div>

        <Row className="g-4 align-items-start">
          {/* Columna Izquierda: Lista de productos agregados */}
          <Col xs={12} lg={7} xl={8}>
            {carrito.length === 0 ? (
              <Card className="border-0 shadow-sm rounded-4 p-5 text-center mb-5 bg-white">
                <div className="display-3 text-muted mb-3 opacity-50">
                  <i className="bi bi-bag-x" />
                </div>
                <h3 className="fw-bold mb-2">Tu carrito está vacío</h3>
                <p className="text-muted mx-auto mb-4" style={{ maxWidth: '420px' }}>
                  Parece que todavía no agregaste nada. Explorá nuestro catálogo para
                  encontrar los mejores artículos para tu bebé.
                </p>
                <div>
                  <Button as={Link} to="/productos" className="btn-hm px-4 py-2">
                    <i className="bi bi-arrow-left me-2" />
                    Explorar productos
                  </Button>
                </div>
              </Card>
            ) : (
              <div className="mb-5">
                {carrito.map((item) => (
                  <CarritoItem
                    key={item.id}
                    item={item}
                    onModificarCantidad={onModificarCantidad}
                    onEliminar={onEliminar}
                  />
                ))}
              </div>
            )}

            {/* Sugerencias para acompañar la compra (Estilo Bugaboo) */}
            <section className="mt-4 pt-3 border-top">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h4 className="fw-bold mb-0">Te puede interesar para acompañar</h4>
                <span className="text-muted small">Sugerencias aleatorias</span>
              </div>
              <Row className="g-3">
                {sugerencias.map((prod) => (
                  <Col key={prod.id} xs={12} sm={6} xl={3}>
                    <ProductoCard producto={prod} onAgregar={onAgregarAlCarrito} compact />
                  </Col>
                ))}
              </Row>
            </section>
          </Col>

          {/* Columna Derecha: Resumen de compra / Price overview */}
          <Col xs={12} lg={5} xl={4}>
            <Card
              className="border-0 shadow-sm rounded-4 bg-white p-3 p-md-4"
              style={{ position: 'sticky', top: '100px' }}
            >
              <Card.Title as="h4" className="fw-bold mb-3 border-bottom pb-3">
                Resumen de compra
              </Card.Title>

              {/* Subtotal */}
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted">Subtotal productos</span>
                <span className="fw-semibold">{formatearPrecio(subtotal)}</span>
              </div>

              {/* Envío */}
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted">Costo de envío</span>
                <Badge bg="success" className="px-2 py-1 fw-bold">
                  Gratis
                </Badge>
              </div>

              {/* Descuento por cupón si aplica */}
              {cuponAplicado && (
                <div className="d-flex justify-content-between align-items-center mb-2 text-success">
                  <span className="d-flex align-items-center gap-1">
                    <i className="bi bi-tag-fill" />
                    <span>Descuento ({cuponAplicado.descuento}%)</span>
                    <button
                      type="button"
                      className="btn btn-sm btn-link text-danger p-0 ms-1"
                      onClick={handleQuitarCupon}
                      title="Quitar cupón"
                    >
                      <i className="bi bi-x-circle" />
                    </button>
                  </span>
                  <span className="fw-bold">- {formatearPrecio(montoDescuento)}</span>
                </div>
              )}

              <hr className="my-3 opacity-25" />

              {/* Campo para ingresar Código Promocional */}
              <div className="mb-3">
                <label htmlFor="codigo-cupon" className="form-label small fw-bold text-muted mb-1">
                  Código promocional
                </label>
                <Form onSubmit={handleAplicarCupon}>
                  <InputGroup>
                    <Form.Control
                      id="codigo-cupon"
                      type="text"
                      placeholder="Ej: 1010, 1515, 2020"
                      value={codigoInput}
                      onChange={(e) => setCodigoInput(e.target.value)}
                      disabled={Boolean(cuponAplicado)}
                      aria-label="Código promocional"
                    />
                    <Button
                      type="submit"
                      variant="outline-primary"
                      className="btn-hm-outline"
                      disabled={Boolean(cuponAplicado) || !codigoInput.trim()}
                    >
                      Aplicar
                    </Button>
                  </InputGroup>
                </Form>
                {errorCupon && (
                  <div className="text-danger small mt-1">
                    <i className="bi bi-exclamation-circle me-1" />
                    {errorCupon}
                  </div>
                )}
                {cuponAplicado && (
                  <div className="text-success small mt-1 fw-semibold">
                    <i className="bi bi-check-circle-fill me-1" />
                    {cuponAplicado.descripcion}
                  </div>
                )}
              </div>

              <hr className="my-3 opacity-25" />

              {/* Total final */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <span className="fs-5 fw-bold">Total a pagar</span>
                <span className="fs-3 fw-bold" style={{ color: 'var(--hm-accent-dark)' }}>
                  {formatearPrecio(totalFinal)}
                </span>
              </div>

              {/* Botón Iniciar Compra */}
              <Button
                className="btn-hm w-100 py-3 fw-bold fs-6 mb-2"
                onClick={handleIniciarCompra}
                disabled={carrito.length === 0}
              >
                <i className="bi bi-credit-card-2-front-fill me-2" />
                Iniciar compra
              </Button>

              {/* Botón Continuar Comprando */}
              <Button
                as={Link}
                to="/productos"
                variant="outline-secondary"
                className="w-100 py-2 rounded-pill fw-semibold small"
              >
                Continuar comprando
              </Button>

              {/* Beneficios de confianza */}
              <div className="mt-4 pt-3 border-top">
                <div className="d-flex flex-column gap-2 small text-muted">
                  <div className="d-flex align-items-center gap-2">
                    <i className="bi bi-shield-lock-fill text-success" />
                    <span>Compra 100% segura y encriptada</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <i className="bi bi-truck text-primary" />
                    <span>Envío gratuito a todo el país</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <i className="bi bi-credit-card-fill text-info" />
                    <span>Hasta 6 cuotas sin interés con todas las tarjetas</span>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Modal de Confirmación de Compra Simulada */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        backdrop="static"
        className="hm-modal-checkout"
      >
        {!compraConfirmada ? (
          <>
            <Modal.Header closeButton className="border-bottom">
              <Modal.Title className="fw-bold fs-5">
                Confirmar compra simulada
              </Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleConfirmarPedido}>
              <Modal.Body className="p-4">
                <p className="text-muted small mb-3">
                  Completá los datos para simular tu orden de compra en Hola Mundo.
                </p>

                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">Nombre y Apellido *</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    placeholder="Ej: Laura Gómez"
                    value={formData.nombre}
                    onChange={(e) =>
                      setFormData({ ...formData, nombre: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">Email de contacto *</Form.Label>
                  <Form.Control
                    type="email"
                    required
                    placeholder="tucorreo@ejemplo.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">Dirección de entrega *</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    placeholder="Calle, número, localidad"
                    value={formData.direccion}
                    onChange={(e) =>
                      setFormData({ ...formData, direccion: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">Método de pago simulado</Form.Label>
                  <Form.Select
                    value={formData.metodoPago}
                    onChange={(e) =>
                      setFormData({ ...formData, metodoPago: e.target.value })
                    }
                  >
                    <option value="tarjeta">Tarjeta de crédito / débito (6 cuotas sin interés)</option>
                    <option value="transferencia">Transferencia bancaria</option>
                    <option value="mercadopago">Mercado Pago</option>
                  </Form.Select>
                </Form.Group>

                {/* Resumen dentro del modal */}
                <div className="bg-light p-3 rounded-3 mt-3 border">
                  <div className="d-flex justify-content-between small text-muted mb-1">
                    <span>Productos a abonar:</span>
                    <span>{cantidadTotal} unidades</span>
                  </div>
                  {cuponAplicado && (
                    <div className="d-flex justify-content-between small text-success mb-1">
                      <span>Cupón ({cuponAplicado.codigo}):</span>
                      <span>-{formatearPrecio(montoDescuento)}</span>
                    </div>
                  )}
                  <div className="d-flex justify-content-between fw-bold fs-6">
                    <span>Total final:</span>
                    <span style={{ color: 'var(--hm-accent-dark)' }}>
                      {formatearPrecio(totalFinal)}
                    </span>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer className="border-top">
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  Cancelar
                </Button>
                <Button type="submit" className="btn-hm fw-bold">
                  Confirmar pedido
                </Button>
              </Modal.Footer>
            </Form>
          </>
        ) : (
          /* Vista de Confirmación Exitosa */
          <div className="p-4 p-md-5 text-center">
            <div className="display-3 text-success mb-3">
              <i className="bi bi-check-circle-fill" />
            </div>
            <h3 className="fw-bold mb-2">¡Felicitaciones, {formData.nombre}!</h3>
            <p className="text-muted mb-3">
              Tu compra simulada fue procesada con éxito.
            </p>
            <div className="bg-light p-3 rounded-4 mb-4 border d-inline-block px-4">
              <span className="small text-muted d-block">Número de orden</span>
              <strong className="fs-5 text-primary" style={{ color: 'var(--hm-accent-dark)' }}>
                {numeroOrden}
              </strong>
            </div>
            <p className="text-muted small mb-4 mx-auto" style={{ maxWidth: '380px' }}>
              Enviamos la confirmación a <strong>{formData.email}</strong> y despacharemos
              tu pedido a <strong>{formData.direccion}</strong> con envío sin cargo.
            </p>
            <Button className="btn-hm px-4 py-2" onClick={handleFinalizarYLimpiar}>
              Volver a la tienda
            </Button>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Carrito
