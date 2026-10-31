import { Badge, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const formatearPrecio = (precio) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(precio)

function ProductoCard({ producto, onAgregar, compact = false }) {
  const sinStock = producto.stock === 0

  const handleImgError = (event) => {
    event.currentTarget.src =
      'data:image/svg+xml,' +
      encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
              <stop stop-color="#d6eef6"/>
              <stop offset="1" stop-color="#fde8d8"/>
            </linearGradient>
          </defs>
          <rect width="400" height="400" fill="url(#g)"/>
          <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
            fill="#3f7a92" font-family="Nunito, sans-serif" font-size="22" font-weight="700">
            Hola Mundo
          </text>
        </svg>`
      )
  }

  return (
    <Card className={`producto-card border-0${compact ? ' producto-card--compact' : ''}`}>
      <div className="producto-card__img-wrap">
        {sinStock && (
          <Badge bg="danger" className="producto-card__badge badge-sin-stock">
            Sin stock
          </Badge>
        )}
        {!sinStock && producto.oferta && (
          <Badge className="producto-card__badge badge-oferta">Oferta</Badge>
        )}
        {!sinStock && !producto.oferta && producto.destacado && (
          <Badge className="producto-card__badge badge-nuevo">Novedad</Badge>
        )}
        <Card.Img
          variant="top"
          src={producto.imagen}
          alt={producto.nombre}
          className="producto-card__img"
          onError={handleImgError}
        />
      </div>
      <Card.Body className="producto-card__body">
        <span className="producto-card__categoria">{producto.categoria}</span>
        <Card.Title as="h3" className="producto-card__nombre">
          {producto.nombre}
        </Card.Title>
        <p className="producto-card__precio">{formatearPrecio(producto.precio)}</p>
        <div className="producto-card__actions">
          <Button
            as={Link}
            to={`/producto/${producto.id}`}
            variant="outline-primary"
            className="btn-hm-outline"
            size="sm"
          >
            Ver detalle
          </Button>
          <Button
            className="btn-hm"
            size="sm"
            disabled={sinStock}
            onClick={() => onAgregar?.(producto)}
          >
            {sinStock ? 'Sin stock' : 'Agregar'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default ProductoCard
