function CarritoItem({ item, onCambiarCantidad, onEliminar }) {
  const subtotal = item.precio * item.cantidad

  return (
    <div className="d-flex align-items-center justify-content-between gap-3 py-2">
      <div>
        <strong>{item.nombre}</strong>
        <div className="text-muted small">
          ${item.precio.toLocaleString('es-AR')} × {item.cantidad}
        </div>
      </div>
      <div className="d-flex align-items-center gap-2">
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary"
          onClick={() => onCambiarCantidad?.(item.id, item.cantidad - 1)}
          aria-label="Restar cantidad"
        >
          −
        </button>
        <span>{item.cantidad}</span>
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary"
          onClick={() => onCambiarCantidad?.(item.id, item.cantidad + 1)}
          aria-label="Sumar cantidad"
        >
          +
        </button>
        <strong>${subtotal.toLocaleString('es-AR')}</strong>
        <button
          type="button"
          className="btn btn-sm btn-outline-danger"
          onClick={() => onEliminar?.(item.id)}
          aria-label="Eliminar del carrito"
        >
          ×
        </button>
      </div>
    </div>
  )
}

export default CarritoItem
