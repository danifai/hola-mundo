import { Col, Modal, Row } from 'react-bootstrap'

const MEDIOS = [
  {
    id: 'visa',
    nombre: 'Visa',
    texto: 'Hasta 6 cuotas sin interés',
    logo: '/img/visa.png',
  },
  {
    id: 'mastercard',
    nombre: 'Mastercard',
    texto: 'Hasta 12 cuotas sin interés',
    logo: '/img/mastercard.png',
  },
]

function BeneficiosModal({ show, onHide }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      className="cuotas-modal"
      backdropClassName="cuotas-modal-backdrop"
      aria-labelledby="cuotas-titulo"
    >
      <Modal.Header closeButton>
        <Modal.Title id="cuotas-titulo">Cuotas sin interés</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="g-3 text-center">
          {MEDIOS.map((medio) => (
            <Col xs={12} sm={6} key={medio.id}>
              <div className="cuotas-modal__card">
                <img src={medio.logo} alt={medio.nombre} className="cuotas-modal__logo" />
                <p className="mb-0 fw-semibold">{medio.texto}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Modal.Body>
    </Modal>
  )
}

export default BeneficiosModal
