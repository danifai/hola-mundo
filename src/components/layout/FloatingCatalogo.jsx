import { Link, useLocation } from 'react-router-dom'
import './FloatingCatalogo.css'

function FloatingCatalogo() {
  const { pathname } = useLocation()

  // Ya estás en el catálogo: no hace falta el acceso directo
  if (pathname === '/productos') return null

  return (
    <Link to="/productos" className="hm-floating-catalogo btn btn-hm" aria-label="Ver catálogo">
      <i className="bi bi-grid-fill" aria-hidden="true" />
      <span>Ver catálogo</span>
    </Link>
  )
}

export default FloatingCatalogo
