import { Accordion, Badge, Button, Card, Container } from 'react-bootstrap'

const preguntasFrecuentes = [
  {
    pregunta: '¿Los envíos son gratuitos a todo el país?',
    respuesta:
      '¡Sí! En Hola Mundo ofrecemos envíos sin cargo a todo el territorio nacional a través de correo prioritario, sin mínimo de compra.',
  },
  {
    pregunta: '¿Qué medios de pago aceptan y qué cuotas ofrecen?',
    respuesta:
      'Aceptamos tarjetas de crédito, débito y transferencias bancarias. Podés abonar en hasta 6 cuotas sin interés con Visa y hasta 12 cuotas sin interés con Mastercard.',
  },
  {
    pregunta: '¿Puedo retirar mi compra personalmente en una sucursal?',
    respuesta:
      'Sí, al confirmar tu pedido en el carrito podés elegir la opción de retiro gratuito en nuestra sucursal de Hurlingham de lunes a sábados de 9 a 18 hs.',
  },
  {
    pregunta: '¿Cuál es el plazo para cambios y devoluciones?',
    respuesta:
      'Disponés de hasta 30 días corridos a partir de la recepción de tu compra para solicitar un cambio o devolución sin costo adicional, siempre que el producto se encuentre sin uso y en su embalaje original.',
  },
  {
    pregunta: '¿Qué garantía tienen los artículos?',
    respuesta:
      'Todos nuestros productos (carritos, butacas, cunas, mecedoras, etc.) cuentan con garantía oficial de fábrica de 6 a 12 meses ante cualquier desperfecto de fabricación.',
  },
  {
    pregunta: '¿Las butacas y cochecitos cumplen con las normas de seguridad?',
    respuesta:
      'Absolutamente. Todas las butacas infantiles y artículos de paseo comercializados en Hola Mundo cuentan con homologación IRAM y certificación internacional de retención infantil (ECE R44/04 o R129 i-Size).',
  },
]

function PreguntasFrecuentes() {
  return (
    <div className="py-4 py-lg-5">
      <Container>
        {/* Cabecera */}
        <div className="text-center mb-5 mx-auto" style={{ maxWidth: '680px' }}>
          <Badge className="hm-pill-badge mb-3">Centro de Ayuda</Badge>
          <h1 className="fw-extrabold display-5 mb-3">Preguntas Frecuentes</h1>
          <p className="text-muted fs-5 lh-base">
            Respuestas a las consultas más habituales sobre compras, envíos, pagos y garantías en Hola Mundo.
          </p>
        </div>

        {/* Acordeón con las 6 preguntas generales */}
        <div className="mx-auto mb-5" style={{ maxWidth: '780px' }}>
          <Accordion defaultActiveKey="0" className="hm-accordion">
            {preguntasFrecuentes.map((item, index) => (
              <Accordion.Item key={index} eventKey={String(index)}>
                <Accordion.Header>{item.pregunta}</Accordion.Header>
                <Accordion.Body>{item.respuesta}</Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>

        {/* Tarjeta simple de contacto directo */}
        <div className="mx-auto" style={{ maxWidth: '780px' }}>
          <Card
            className="border-0 shadow-sm rounded-4 p-4 p-md-5 text-center"
            style={{ background: 'var(--hm-surface)' }}
          >
            <div className="mx-auto" style={{ maxWidth: '480px' }}>
              <div
                className="display-6 mb-3 text-success d-inline-flex align-items-center justify-content-center rounded-circle"
                style={{ width: '64px', height: '64px', background: 'rgba(37, 211, 102, 0.12)' }}
              >
                <i className="bi bi-whatsapp" />
              </div>
              <h3 className="fw-bold mb-2">¿Tenés otra consulta?</h3>
              <p className="text-muted small mb-4">
                Escribinos de lunes a sábados de 9 a 18 hs y te asesoramos de forma personalizada.
              </p>
              <Button
                as="a"
                href="https://wa.me/5491158056091"
                target="_blank"
                rel="noreferrer"
                variant="success"
                className="rounded-pill px-4 py-2 fw-bold d-inline-flex align-items-center gap-2"
              >
                <i className="bi bi-whatsapp" />
                Contactar por WhatsApp
              </Button>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  )
}

export default PreguntasFrecuentes
