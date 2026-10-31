import './FloatingWhatsApp.css'

function FloatingWhatsApp() {
  return (
    <a
      className="hm-whatsapp"
      href="https://wa.me/5491122334455"
      target="_blank"
      rel="noreferrer"
      aria-label="Contactar por WhatsApp"
    >
      <i className="bi bi-whatsapp" aria-hidden="true" />
    </a>
  )
}

export default FloatingWhatsApp
