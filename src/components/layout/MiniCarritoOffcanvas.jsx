import { Button, Offcanvas } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

const formatearPrecio = (precio) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(precio)

function MiniCarritoOffcanvas({ show, onHide, carrito, onModificarCantidad, onEliminar }) {
  const navigate = useNavigate()
  const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0)
  const subtotalTotal = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0)

  const handleIrAlCarrito = () => {
    onHide()
    navigate('/carrito')
  }

  const handleImgError = (event) => {
    event.currentTarget.src =
      'data:image/svg+xml,' +
      encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
          <rect width="100" height="100" fill="#fde8d8"/>
          <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
            fill="#3f7a92" font-family="sans-serif" font-size="10" font-weight="700">
            HM
          </text>
        </svg>`
      )
  }

  return (
    <Offcanvas
      show={show}
      onHide={onHide}
      placement="end"
      className="border-0 shadow-lg"
      style={{ maxWidth: '420px', width: '100%' }}
    >
      <Offcanvas.Header closeButton className="border-bottom pb-3">
        <Offcanvas.Title className="fw-bold fs-5 text-uppercase letter-spacing-1">
          Carrito ({cantidadTotal})
        </Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body className="d-flex flex-column justify-content-between p-3 overflow-x-hidden">
        {carrito.length === 0 ? (
          <div className="text-center my-auto py-5">
            <div className="display-4 text-muted mb-3 opacity-50">
              <i className="bi bi-cart-x" />
            </div>
            <h5 className="text-dark fw-bold mb-2">Tu carrito está vacío</h5>
            <p className="text-muted small mb-4">
              ¡Aún no agregaste productos! Descubrí nuestras novedades y ofertas.
            </p>
            <Button
              as={Link}
              to="/productos"
              className="btn-hm btn-sm px-4 py-2"
              onClick={onHide}
            >
              Explorar catálogo
            </Button>
          </div>
        ) : (
          <>
            {/* Lista de productos con scroll */}
            <div className="overflow-y-auto flex-grow-1 pe-1" style={{ maxHeight: 'calc(100vh - 230px)' }}>
              {carrito.map((item) => (
                <div
                  key={item.id}
                  className="d-flex align-items-center gap-3 py-3 border-bottom overflow-hidden"
                >
                  {/* Imagen del producto */}
                  <div
                    className="bg-light rounded-3 p-1 flex-shrink-0 d-flex align-items-center justify-content-center border"
                    style={{ width: '64px', height: '64px' }}
                  >
                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      style={{ maxHeight: '54px', maxWidth: '54px', objectFit: 'contain' }}
                      onError={handleImgError}
                    />
                  </div>

                  {/* Nombre y cantidades */}
                  <div className="flex-grow-1 min-w-0">
                    <Link
                      to={`/producto/${item.id}`}
                      onClick={onHide}
                      className="text-decoration-none text-dark fw-bold small d-block text-break mb-1"
                      title={item.nombre}
                    >
                      {item.nombre}
                    </Link>

                    <div className="d-flex align-items-center justify-content-between">
                      {/* Controles de cantidad compactos */}
                      <div className="d-inline-flex align-items-center border rounded-pill bg-light px-2 py-0">
                        <Button
                          variant="link"
                          size="sm"
                          className="p-0 text-dark text-decoration-none"
                          style={{ width: '18px', height: '20px', lineHeight: 1 }}
                          onClick={() => onModificarCantidad?.(item.id, item.cantidad - 1)}
                          disabled={item.cantidad <= 1}
                          aria-label="Restar una unidad"
                        >
                          <i className="bi bi-dash" />
                        </Button>
                        <span className="mx-2 small fw-bold">{item.cantidad}</span>
                        <Button
                          variant="link"
                          size="sm"
                          className="p-0 text-dark text-decoration-none"
                          style={{ width: '18px', height: '20px', lineHeight: 1 }}
                          onClick={() => onModificarCantidad?.(item.id, item.cantidad + 1)}
                          disabled={item.stock && item.cantidad >= item.stock}
                          aria-label="Sumar una unidad"
                        >
                          <i className="bi bi-plus" />
                        </Button>
                      </div>

                      {/* Subtotal por ítem */}
                      <span className="fw-bold small text-primary" style={{ color: 'var(--hm-accent-dark)' }}>
                        {formatearPrecio(item.precio * item.cantidad)}
                      </span>
                    </div>
                  </div>

                  {/* Botón tachito para eliminar */}
                  <Button
                    variant="link"
                    size="sm"
                    className="p-0 text-muted text-decoration-none ms-1 flex-shrink-0"
                    onClick={() => onEliminar?.(item.id)}
                    title="Eliminar del carrito"
                    aria-label={`Eliminar ${item.nombre}`}
                  >
                    <i className="bi bi-trash3 fs-6 text-danger opacity-75" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Pie del resumen con subtotal y botones de acción */}
            <div className="pt-3 border-top mt-auto">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted fw-bold small text-uppercase">Subtotal</span>
                <span className="fs-5 fw-bold" style={{ color: 'var(--hm-accent-dark)' }}>
                  {formatearPrecio(subtotalTotal)}
                </span>
              </div>

              <div className="d-flex flex-column gap-2">
                <Button
                  className="btn-hm w-100 py-2 fw-bold"
                  onClick={handleIrAlCarrito}
                >
                  Ver carrito completo
                </Button>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  className="w-100 rounded-pill py-1"
                  onClick={onHide}
                >
                  Seguir comprando
                </Button>
              </div>
            </div>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  )
}

export default MiniCarritoOffcanvas
