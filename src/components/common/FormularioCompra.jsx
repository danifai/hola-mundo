import { Button, Form, Modal } from 'react-bootstrap'

const formatearPrecio = (precio) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(precio)

function FormularioCompra({
  formData,
  onChange,
  errores,
  onSubmit,
  onCancel,
  totalFinal,
  cantidadTotal,
  cuponAplicado,
  montoDescuento,
}) {
  return (
    <Form noValidate onSubmit={onSubmit}>
      <Modal.Body className="p-4">
        <p className="text-muted small mb-3">
          Completá tus datos para finalizar la simulación de compra en Hola Mundo.
          Todos los campos marcados con (*) son obligatorios.
        </p>

        {/* Nombre y Apellido */}
        <Form.Group className="mb-3">
          <Form.Label className="small fw-bold">Nombre y apellido *</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            placeholder="Ej: Laura Gómez"
            value={formData.nombre}
            onChange={onChange}
            isInvalid={Boolean(errores.nombre)}
            aria-label="Nombre y apellido"
          />
          <Form.Control.Feedback type="invalid">
            {errores.nombre}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Email */}
        <Form.Group className="mb-3">
          <Form.Label className="small fw-bold">Correo electrónico *</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="ejemplo@correo.com"
            value={formData.email}
            onChange={onChange}
            isInvalid={Boolean(errores.email)}
            aria-label="Correo electrónico"
          />
          <Form.Control.Feedback type="invalid">
            {errores.email}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Teléfono */}
        <Form.Group className="mb-3">
          <Form.Label className="small fw-bold">Teléfono de contacto *</Form.Label>
          <Form.Control
            type="tel"
            name="telefono"
            placeholder="Ej: 11 5555 4321"
            value={formData.telefono}
            onChange={onChange}
            isInvalid={Boolean(errores.telefono)}
            aria-label="Teléfono de contacto"
          />
          <Form.Control.Feedback type="invalid">
            {errores.telefono}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Dirección o Localidad */}
        <Form.Group className="mb-3">
          <Form.Label className="small fw-bold">Dirección o localidad *</Form.Label>
          <Form.Control
            type="text"
            name="direccion"
            placeholder="Calle, número, piso, localidad"
            value={formData.direccion}
            onChange={onChange}
            isInvalid={Boolean(errores.direccion)}
            aria-label="Dirección de entrega"
          />
          <Form.Control.Feedback type="invalid">
            {errores.direccion}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Método de entrega */}
        <Form.Group className="mb-3">
          <Form.Label className="small fw-bold">Método de entrega *</Form.Label>
          <Form.Select
            name="metodoEntrega"
            value={formData.metodoEntrega}
            onChange={onChange}
            isInvalid={Boolean(errores.metodoEntrega)}
            aria-label="Método de entrega"
          >
            <option value="domicilio">Envío a domicilio sin cargo (Todo el país)</option>
            <option value="sucursal">Retiro en sucursal Hola Mundo (Gratis)</option>
            <option value="express">Envío express en el día (AMBA)</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errores.metodoEntrega}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Mensaje o aclaración opcional */}
        <Form.Group className="mb-3">
          <Form.Label className="small fw-bold">
            Mensaje o aclaración <span className="text-muted fw-normal">(opcional)</span>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            name="mensaje"
            placeholder="Ej: Dejar en portería o tocar timbre en departamento B..."
            value={formData.mensaje}
            onChange={onChange}
            aria-label="Mensaje o aclaración opcional"
          />
        </Form.Group>

        {/* Resumen dentro del formulario */}
        <div className="bg-light p-3 rounded-3 mt-3 border">
          <div className="d-flex justify-content-between small text-muted mb-1">
            <span>Productos a confirmar:</span>
            <span>{cantidadTotal} {cantidadTotal === 1 ? 'unidad' : 'unidades'}</span>
          </div>
          {cuponAplicado && (
            <div className="d-flex justify-content-between small text-success mb-1">
              <span>Cupón aplicado ({cuponAplicado.codigo}):</span>
              <span>-{formatearPrecio(montoDescuento)}</span>
            </div>
          )}
          <div className="d-flex justify-content-between fw-bold fs-6 pt-1 border-top">
            <span>Total a pagar:</span>
            <span style={{ color: 'var(--hm-accent-dark)' }}>
              {formatearPrecio(totalFinal)}
            </span>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer className="border-top">
        <Button variant="outline-secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" className="btn-hm fw-bold px-4">
          Confirmar compra
        </Button>
      </Modal.Footer>
    </Form>
  )
}

export default FormularioCompra
