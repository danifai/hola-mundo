import { Button, Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const formatearPrecio = (precio) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(precio)

function CarritoItem({ item, onModificarCantidad, onEliminar }) {
  const subtotal = item.precio * item.cantidad

  const handleImgError = (event) => {
    event.currentTarget.src =
      'data:image/svg+xml,' +
      encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
          <rect width="200" height="200" fill="#fde8d8"/>
          <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
            fill="#3f7a92" font-family="sans-serif" font-size="14" font-weight="700">
            Hola Mundo
          </text>
        </svg>`
      )
  }

  return (
    <Card className="border-0 shadow-sm rounded-4 mb-3 overflow-hidden bg-white">
      <Card.Body className="p-3">
        <Row className="align-items-center g-3">
          {/* Imagen miniatura */}
          <Col xs={4} sm={3} md={2} className="text-center">
            <div
              className="bg-light rounded-3 p-2 d-flex align-items-center justify-content-center"
              style={{ width: '100%', aspectRatio: '1 / 1' }}
            >
              <img
                src={item.imagen}
                alt={item.nombre}
                className="img-fluid"
                style={{ maxHeight: '85px', objectFit: 'contain' }}
                onError={handleImgError}
              />
            </div>
          </Col>

          {/* Información y detalles */}
          <Col xs={8} sm={5} md={6}>
            <div className="d-flex flex-column gap-1">
              <span className="text-uppercase text-muted fw-bold" style={{ fontSize: '0.75rem' }}>
                {item.categoria}
              </span>
              <h6 className="fw-bold mb-1">
                <Link to={`/producto/${item.id}`} className="text-decoration-none text-dark">
                  {item.nombre}
                </Link>
              </h6>
              <div className="text-muted small">
                Precio unitario: <strong>{formatearPrecio(item.precio)}</strong>
              </div>

              {/* Control de cantidad */}
              <div className="d-flex align-items-center gap-2 mt-2">
                <span className="small text-muted fw-semibold me-1">Cantidad:</span>
                <div className="d-inline-flex align-items-center border rounded-pill bg-light px-2 py-1">
                  <Button
                    variant="link"
                    size="sm"
                    className="p-0 text-dark text-decoration-none fw-bold"
                    style={{ width: '22px', height: '22px', lineHeight: 1 }}
                    onClick={() => onModificarCantidad?.(item.id, item.cantidad - 1)}
                    disabled={item.cantidad <= 1}
                    aria-label="Disminuir cantidad"
                  >
                    <i className="bi bi-dash" />
                  </Button>
                  <span className="mx-2 fw-bold" style={{ minWidth: '18px', textAlign: 'center' }}>
                    {item.cantidad}
                  </span>
                  <Button
                    variant="link"
                    size="sm"
                    className="p-0 text-dark text-decoration-none fw-bold"
                    style={{ width: '22px', height: '22px', lineHeight: 1 }}
                    onClick={() => onModificarCantidad?.(item.id, item.cantidad + 1)}
                    disabled={item.stock && item.cantidad >= item.stock}
                    aria-label="Aumentar cantidad"
                  >
                    <i className="bi bi-plus" />
                  </Button>
                </div>
              </div>
            </div>
          </Col>

          {/* Subtotal y botón de eliminar (tachito) */}
          <Col xs={12} sm={4} md={4} className="text-sm-end mt-2 mt-sm-0">
            <div className="d-flex flex-row flex-sm-column justify-content-between align-items-center align-items-sm-end gap-2">
              <div>
                <span className="text-muted small d-block d-sm-inline me-1">Subtotal:</span>
                <span className="fs-5 fw-bold text-primary" style={{ color: 'var(--hm-accent-dark)' }}>
                  {formatearPrecio(subtotal)}
                </span>
              </div>
              <Button
                variant="outline-danger"
                size="sm"
                className="rounded-circle d-inline-flex align-items-center justify-content-center p-0 border-0"
                style={{ width: '34px', height: '34px', background: 'rgba(220, 53, 69, 0.08)' }}
                onClick={() => onEliminar?.(item.id)}
                title="Eliminar producto"
                aria-label={`Eliminar ${item.nombre} del carrito`}
              >
                <i className="bi bi-trash3 text-danger" aria-hidden="true" />
              </Button>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

export default CarritoItem
