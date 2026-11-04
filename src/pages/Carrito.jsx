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
  ProgressBar,
  Row,
  Spinner,
} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import CarritoItem from '../components/common/CarritoItem'
import FormularioCompra from '../components/common/FormularioCompra'
import ProductoCard from '../components/common/ProductoCard'
import { cuponesValidos } from '../data/cupones'
import { productos } from '../data/productos'

const formatearPrecio = (precio) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(precio)

const labelsMetodoEntrega = {
  domicilio: 'Envío a domicilio sin cargo',
  sucursal: 'Retiro en sucursal Hola Mundo',
  express: 'Envío express en el día',
}

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

  // Estados del modal y formulario controlado de compra
  const [showModal, setShowModal] = useState(false)
  const [procesandoCompra, setProcesandoCompra] = useState(false)
  const [compraConfirmada, setCompraConfirmada] = useState(false)
  const [numeroOrden, setNumeroOrden] = useState('')
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    metodoEntrega: 'domicilio',
    mensaje: '',
  })
  const [errores, setErrores] = useState({})

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

  // Control de apertura del modal
  const handleIniciarCompra = () => {
    if (carrito.length === 0) return
    setCompraConfirmada(false)
    setProcesandoCompra(false)
    setErrores({})
    setShowModal(true)
  }

  // Manejo de cambios en el formulario controlado
  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Limpia el error del campo a medida que el usuario escribe
    if (errores[name]) {
      setErrores((prev) => {
        const copia = { ...prev }
        delete copia[name]
        return copia
      })
    }
  }

  // Validación con React de todos los campos obligatorios y formatos
  const validarFormulario = () => {
    const nuevosErrores = {}

    // Nombre obligatorio (mínimo 3 caracteres)
    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre y apellido es obligatorio.'
    } else if (formData.nombre.trim().length < 3) {
      nuevosErrores.nombre = 'Ingresá al menos 3 caracteres.'
    }

    // Email obligatorio y con formato válido
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      nuevosErrores.email = 'El correo electrónico es obligatorio.'
    } else if (!regexEmail.test(formData.email.trim())) {
      nuevosErrores.email = 'Ingresá un correo electrónico válido (ej: nombre@correo.com).'
    }

    // Teléfono obligatorio (mínimo 8 dígitos)
    const regexTelefono = /^[0-9+() -]{8,20}$/
    if (!formData.telefono.trim()) {
      nuevosErrores.telefono = 'El teléfono de contacto es obligatorio.'
    } else if (!regexTelefono.test(formData.telefono.trim())) {
      nuevosErrores.telefono = 'Ingresá un teléfono válido (al menos 8 números).'
    }

    // Dirección o localidad obligatoria
    if (!formData.direccion.trim()) {
      nuevosErrores.direccion = 'La dirección o localidad de entrega es obligatoria.'
    } else if (formData.direccion.trim().length < 4) {
      nuevosErrores.direccion = 'Por favor ingresá una dirección más específica.'
    }

    // Método de entrega obligatorio
    if (!formData.metodoEntrega) {
      nuevosErrores.metodoEntrega = 'Por favor seleccioná un método de entrega.'
    }

    // Validar que el carrito no esté vacío
    if (carrito.length === 0) {
      nuevosErrores.carrito = 'El carrito está vacío, no se puede confirmar la compra.'
    }

    return nuevosErrores
  }

  // Enviar formulario (onSubmit)
  const handleConfirmarPedido = (e) => {
    e.preventDefault()

    const erroresDetectados = validarFormulario()
    if (Object.keys(erroresDetectados).length > 0) {
      setErrores(erroresDetectados)
      return
    }

    // Iniciar simulación de transacción con estado de procesamiento de 2 segundos
    setProcesandoCompra(true)
    setTimeout(() => {
      const ordenGenerada = `#HM-${Math.floor(10000 + Math.random() * 90000)}`
      setNumeroOrden(ordenGenerada)
      setProcesandoCompra(false)
      setCompraConfirmada(true)
    }, 2000)
  }

  const handleFinalizarYLimpiar = () => {
    setShowModal(false)
    setCompraConfirmada(false)
    setProcesandoCompra(false)
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

      {/* Modal de Confirmación de Compra con Formulario Controlado */}
      <Modal
        show={showModal}
        onHide={() => {
          if (!procesandoCompra) setShowModal(false)
        }}
        centered
        backdrop="static"
        keyboard={!procesandoCompra}
        className="hm-modal-checkout"
      >
        {procesandoCompra ? (
          /* Vista de Procesamiento / Transacción Simulada (2 segundos) */
          <div className="p-4 p-md-5 text-center hm-fade-in">
            <div className="mb-4 d-flex justify-content-center">
              <Spinner
                animation="border"
                role="status"
                className="hm-modal-processing-spinner"
              />
            </div>
            <h4 className="fw-bold mb-2">Procesando tu compra...</h4>
            <p className="text-muted small mb-4 mx-auto" style={{ maxWidth: '340px' }}>
              Estamos validando tus datos y reservando los productos seleccionados en nuestro depósito.
            </p>
            <ProgressBar
              animated
              now={100}
              className="rounded-pill mx-auto mb-3"
              style={{ height: '8px', maxWidth: '280px' }}
            />
            <span className="small text-muted fst-italic">
              Por favor aguardá unos instantes...
            </span>
          </div>
        ) : !compraConfirmada ? (
          <>
            <Modal.Header closeButton className="border-bottom">
              <Modal.Title className="fw-bold fs-5">
                Datos de entrega y confirmación
              </Modal.Title>
            </Modal.Header>
            <FormularioCompra
              formData={formData}
              onChange={handleFormChange}
              errores={errores}
              onSubmit={handleConfirmarPedido}
              onCancel={() => setShowModal(false)}
              totalFinal={totalFinal}
              cantidadTotal={cantidadTotal}
              cuponAplicado={cuponAplicado}
              montoDescuento={montoDescuento}
            />
          </>
        ) : (
          /* Vista de Confirmación Exitosa */
          <div className="p-4 p-md-5 text-center hm-fade-in">
            <div className="mb-3">
              <div className="hm-modal-success-check">
                <i className="bi bi-check2" />
              </div>
            </div>
            <h3 className="fw-bold mb-2">¡Felicitaciones, {formData.nombre}!</h3>
            <p className="text-muted mb-3">
              Tu compra simulada fue procesada exitosamente.
            </p>
            <div className="bg-light p-3 rounded-4 mb-4 border d-inline-block px-4">
              <span className="small text-muted d-block">Número de orden</span>
              <strong className="fs-5 text-primary" style={{ color: 'var(--hm-accent-dark)' }}>
                {numeroOrden}
              </strong>
            </div>

            {/* Detalle confirmado del pedido */}
            <div className="bg-light p-3 rounded-3 text-start small mb-4 border mx-auto" style={{ maxWidth: '420px' }}>
              <div className="mb-1">
                <strong>Email:</strong> {formData.email}
              </div>
              <div className="mb-1">
                <strong>Teléfono:</strong> {formData.telefono}
              </div>
              <div className="mb-1">
                <strong>Dirección:</strong> {formData.direccion}
              </div>
              <div className="mb-1">
                <strong>Método de entrega:</strong> {labelsMetodoEntrega[formData.metodoEntrega]}
              </div>
              {formData.mensaje && (
                <div className="mb-1 text-muted">
                  <strong>Aclaración:</strong> "{formData.mensaje}"
                </div>
              )}
              <div className="pt-2 mt-2 border-top fw-bold d-flex justify-content-between">
                <span>Total abonado:</span>
                <span className="text-primary" style={{ color: 'var(--hm-accent-dark)' }}>
                  {formatearPrecio(totalFinal)}
                </span>
              </div>
            </div>

            <Button className="btn-hm px-4 py-2 fw-bold" onClick={handleFinalizarYLimpiar}>
              Volver a la tienda
            </Button>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Carrito
