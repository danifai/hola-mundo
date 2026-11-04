import { Badge, Button, Card, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const miembrosEquipo = [
  {
    nombre: 'Daniel Faigenboim',
    rol: 'Desarrollador Frontend',
    iniciales: 'DF',
    icono: 'bi-code-square',
    descripcion:
      'Estudiante de la Universidad Nacional de Hurlingham (UNAHUR). Enfocado en arquitectura de componentes, flujo de datos y lógica del carrito.',
  },
  {
    nombre: 'Roxana Stephanie Rodriguez',
    rol: 'Desarrolladora Frontend',
    iniciales: 'SR',
    icono: 'bi-laptop',
    descripcion:
      'Estudiante de la Universidad Nacional de Hurlingham (UNAHUR). Enfocada en diseño de interfaces de usuario, experiencia responsiva y microinteracciones.',
  },
  {
    nombre: 'Marcos Espinosa',
    rol: 'Desarrollador Frontend',
    iniciales: 'ME',
    icono: 'bi-terminal',
    descripcion:
      'Estudiante de la Universidad Nacional de Hurlingham (UNAHUR). Enfocado en estructuración modular, catálogo de productos y accesibilidad.',
  },
]

const valoresMarca = [
  {
    titulo: 'Seguridad Certificada',
    descripcion:
      'Cada butaca, cuna y accesorio cumple estrictas normas de homologación y seguridad infantil para el cuidado de los más pequeños.',
    icono: 'bi-shield-check',
    color: 'var(--hm-accent)',
  },
  {
    titulo: 'Confort y Ergonomía',
    descripcion:
      'Diseños anatómicos y telas suaves pensadas para el descanso, la postura y la delicada piel del recién nacido.',
    icono: 'bi-heart-pulse',
    color: '#e89a6b',
  },
  {
    titulo: 'Acompañamiento Familiar',
    descripcion:
      'Sabemos que cada llegada transforma el hogar. Brindamos asesoramiento empático y transparente en cada consulta.',
    icono: 'bi-people',
    color: '#38a169',
  },
  {
    titulo: 'Calidad y Durabilidad',
    descripcion:
      'Materiales resistentes y evolutivos que acompañan el crecimiento del bebé y pueden disfrutarse entre hermanos.',
    icono: 'bi-stars',
    color: '#3182ce',
  },
]

function Nosotros() {
  return (
    <div className="py-4 py-lg-5">
      <Container>
        {/* Cabecera / Hero Institucional */}
        <div className="text-center mb-5 mx-auto" style={{ maxWidth: '780px' }}>
          <Badge className="hm-pill-badge mb-3">
            Construcción de Interfaces de Usuario • UNAHUR
          </Badge>
          <h1 className="fw-extrabold display-5 mb-3">Sobre Hola Mundo</h1>
          <p className="text-muted fs-5 lh-base">
            Una tienda online pensada para acompañar los primeros pasos, siestas y descubrimientos
            de cada bebé, concebida con calidez, diseño moderno y tecnología de vanguardia.
          </p>
        </div>

        {/* Sección: El Origen del Proyecto */}
        <Card className="border-0 shadow-sm rounded-4 mb-5 overflow-hidden bg-white">
          <Card.Body className="p-4 p-md-5">
            <Row className="g-4 align-items-center">
              <Col xs={12} lg={7}>
                <span className="text-muted small text-uppercase fw-bold d-block mb-1">
                  Nuestra Historia
                </span>
                <h2 className="fw-bold h3 mb-3">
                  Un proyecto universitario que une tecnología y ternura
                </h2>
                <p className="text-muted mb-3 lh-base">
                  <strong>Hola Mundo</strong> nació como un proyecto integrador desarrollado por 3
                  estudiantes de la <strong>Universidad Nacional de Hurlingham (UNAHUR)</strong> para
                  la materia <em>Construcción de Interfaces de Usuario</em>.
                </p>
                <p className="text-muted mb-3 lh-base">
                  El nombre rinde homenaje al primer programa informático que todo desarrollador
                  escribe al comenzar su camino, entrelazado con la metáfora más tierna: el primer
                  saludo que un bebé le da al universo cuando llega a su familia.
                </p>
                <p className="text-muted mb-0 lh-base">
                  Diseñamos una Single Page Application (SPA) responsiva con React y React Bootstrap,
                  priorizando la navegación intuitiva, el rendimiento ágil y una estética pastel
                  suave que transmite serenidad y confianza.
                </p>
              </Col>
              <Col xs={12} lg={5}>
                <div
                  className="p-4 rounded-4 text-center border"
                  style={{ background: 'var(--hm-surface)' }}
                >
                  <div className="display-4 mb-2 text-primary" style={{ color: 'var(--hm-accent-dark)' }}>
                    <i className="bi bi-mortarboard-fill" />
                  </div>
                  <h4 className="fw-bold mb-1">UNAHUR</h4>
                  <p className="text-muted small mb-3">Universidad Nacional de Hurlingham</p>
                  <hr className="my-3 opacity-25" />
                  <div className="d-flex justify-content-between small text-muted mb-2">
                    <span>Materia:</span>
                    <strong className="text-dark">Construcción de Interfaces</strong>
                  </div>
                  <div className="d-flex justify-content-between small text-muted mb-2">
                    <span>Modalidad:</span>
                    <strong className="text-dark">Trabajo Práctico Integrador</strong>
                  </div>
                  <div className="d-flex justify-content-between small text-muted">
                    <span>Tecnologías:</span>
                    <strong className="text-dark">React 19 • React Bootstrap</strong>
                  </div>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Sección: Equipo de Desarrollo */}
        <section className="mb-5">
          <div className="text-center mb-4">
            <span className="text-muted small text-uppercase fw-bold d-block mb-1">
              Desarrolladores
            </span>
            <h2 className="fw-bold h3 mb-2">El Equipo Detrás del Proyecto</h2>
            <p className="text-muted small mx-auto" style={{ maxWidth: '520px' }}>
              Estudiantes de Informática de la UNAHUR apasionados por la creación de soluciones
              digitales accesibles y de calidad.
            </p>
          </div>

          <Row className="g-4">
            {miembrosEquipo.map((miembro) => (
              <Col key={miembro.nombre} xs={12} md={4}>
                <Card className="hm-team-card h-100 p-4 text-center">
                  <div className="mb-3 d-flex justify-content-center">
                    <span className="hm-avatar-circle">{miembro.iniciales}</span>
                  </div>
                  <h5 className="fw-bold mb-1">{miembro.nombre}</h5>
                  <Badge
                    bg="light"
                    className="text-dark border mx-auto mb-3 px-3 py-1 fw-semibold small"
                  >
                    <i className={`bi ${miembro.icono} me-1 text-primary`} />
                    {miembro.rol}
                  </Badge>
                  <p className="text-muted small mb-0 lh-base">{miembro.descripcion}</p>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* Sección: Nuestros Pilares */}
        <section className="mb-5">
          <div className="text-center mb-4">
            <span className="text-muted small text-uppercase fw-bold d-block mb-1">
              Compromiso
            </span>
            <h2 className="fw-bold h3 mb-2">Valores de Nuestra Tienda</h2>
            <p className="text-muted small mx-auto" style={{ maxWidth: '520px' }}>
              Cuidamos cada detalle para que tu experiencia de compra sea tan segura como confortable.
            </p>
          </div>

          <Row className="g-4">
            {valoresMarca.map((val) => (
              <Col key={val.titulo} xs={12} sm={6} lg={3}>
                <Card className="border-0 shadow-sm rounded-4 h-100 p-4 text-center bg-white">
                  <div
                    className="d-inline-flex align-items-center justify-content-center rounded-circle mx-auto mb-3"
                    style={{
                      width: '60px',
                      height: '60px',
                      background: 'var(--hm-surface)',
                      color: val.color,
                      fontSize: '1.6rem',
                    }}
                  >
                    <i className={`bi ${val.icono}`} />
                  </div>
                  <h6 className="fw-bold mb-2">{val.titulo}</h6>
                  <p className="text-muted small mb-0 lh-base">{val.descripcion}</p>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* Banner CTA final */}
        <Card
          className="border-0 shadow-sm rounded-4 text-center p-4 p-md-5"
          style={{
            background:
              'linear-gradient(135deg, rgba(214, 238, 246, 0.65), rgba(253, 232, 216, 0.65))',
          }}
        >
          <div className="mx-auto" style={{ maxWidth: '600px' }}>
            <h3 className="fw-bold mb-2">¿Querés conocer nuestros productos?</h3>
            <p className="text-muted mb-4">
              Explorá nuestro catálogo completo con sillas, carritos, mecedoras, cunas y butacas
              diseñadas especialmente para tu bebé.
            </p>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              <Button as={Link} to="/productos" className="btn-hm px-4 py-2">
                <i className="bi bi-grid-fill me-2" />
                Ver catálogo completo
              </Button>
              <Button
                as="a"
                href="https://wa.me/5491158056091"
                target="_blank"
                rel="noreferrer"
                variant="outline-success"
                className="rounded-pill px-4 py-2 fw-bold d-inline-flex align-items-center gap-2"
              >
                <i className="bi bi-whatsapp" />
                Contactar por WhatsApp
              </Button>
            </div>
          </div>
        </Card>
      </Container>
    </div>
  )
}

export default Nosotros
