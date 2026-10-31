import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className="hm-footer">
      <Container>
        <Row className="gy-4 py-5">
          <Col md={4} className="text-center text-md-start">
            <h3 className="h5 fw-bold mb-3">Hola Mundo</h3>
            <ul className="list-unstyled mb-0 hm-footer__links">
              <li>
                <Link to="/nosotros">Nosotros</Link>
              </li>
              <li>
                <Link to="/preguntas-frecuentes">Preguntas Frecuentes</Link>
              </li>
            </ul>
          </Col>

          <Col md={4} className="text-center">
            <h3 className="h5 fw-bold mb-3">Contactanos</h3>
            <ul className="list-unstyled mb-0 hm-footer__links">
              <li>
                <a href="https://wa.me/5491122334455" target="_blank" rel="noreferrer">
                  WhatsApp: +54 9 11 2233-4455
                </a>
              </li>
              <li>
                <a href="tel:+5491144556677">Celular: +54 9 11 4455-6677</a>
              </li>
              <li>
                <a href="mailto:hola@holamundo.tienda">Mail: hola@holamundo.tienda</a>
              </li>
              <li>
                <span>Ubicación: Hurlingham, Buenos Aires</span>
              </li>
            </ul>
          </Col>

          <Col md={4} className="text-center text-md-end">
            <h3 className="h5 fw-bold mb-3">Seguinos</h3>
            <div className="hm-footer__social justify-content-center justify-content-md-end">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                <i className="bi bi-instagram" aria-hidden="true" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                <i className="bi bi-facebook" aria-hidden="true" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <i className="bi bi-linkedin" aria-hidden="true" />
              </a>
            </div>
          </Col>
        </Row>

        <p className="hm-footer__copy text-center mb-0 py-3">
          Copyright @2026 Todos los derechos reservados
        </p>
      </Container>
    </footer>
  )
}

export default Footer
