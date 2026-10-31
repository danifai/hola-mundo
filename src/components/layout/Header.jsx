import { useEffect, useRef, useState } from 'react'
import {
  Button,
  Container,
  Form,
  InputGroup,
  Nav,
  NavDropdown,
  Navbar,
} from 'react-bootstrap'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { productos } from '../../data/productos'
import './Header.css'

const categorias = [...new Set(productos.map((p) => p.categoria))]

function CategoriaDropdown({ categoria, items }) {
  const [show, setShow] = useState(false)
  const esDesktop = () => window.matchMedia('(min-width: 992px)').matches

  return (
    <NavDropdown
      title={categoria}
      id={`cat-${categoria}`}
      className="hm-header__dropdown"
      show={show}
      onToggle={(next) => setShow(next)}
      onMouseEnter={() => esDesktop() && setShow(true)}
      onMouseLeave={() => esDesktop() && setShow(false)}
    >
      <NavDropdown.Item
        as={Link}
        to={`/productos?categoria=${encodeURIComponent(categoria)}`}
      >
        Ver {categoria}
      </NavDropdown.Item>
      <NavDropdown.Divider />
      {items.map((producto) => (
        <NavDropdown.Item as={Link} key={producto.id} to={`/producto/${producto.id}`}>
          {producto.nombre}
        </NavDropdown.Item>
      ))}
    </NavDropdown>
  )
}

function Header({ cantidadCarrito, temaOscuro, onToggleTema }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()
  const [busqueda, setBusqueda] = useState(searchParams.get('q') || '')
  const [compacto, setCompacto] = useState(false)
  const headerRef = useRef(null)

  useEffect(() => {
    setBusqueda(searchParams.get('q') || '')
  }, [searchParams])

  // Guarda la altura del header "completo" para que el hero se ubique debajo
  useEffect(() => {
    const medir = () => {
      if (!headerRef.current || headerRef.current.classList.contains('hm-header--compact')) return
      document.documentElement.style.setProperty(
        '--hm-header-full',
        `${headerRef.current.offsetHeight}px`
      )
    }
    medir()
    window.addEventListener('resize', medir)
    return () => window.removeEventListener('resize', medir)
  }, [])

  // Se achica al scrollear: en Home cuando "Novedades" toca el borde inferior
  // del header; en el resto de las páginas al pasar cierto scroll.
  // Se usa histéresis para evitar parpadeo por el cambio de altura del header.
  useEffect(() => {
    const evaluar = () => {
      const header = headerRef.current
      if (!header) return
      const bottom = header.getBoundingClientRect().bottom
      const novedades = document.querySelector('.novedades-section')

      setCompacto((actual) => {
        if (novedades) {
          const top = novedades.getBoundingClientRect().top
          return actual ? top <= bottom + 40 : top <= bottom
        }
        return actual ? window.scrollY > 20 : window.scrollY > 80
      })
    }

    evaluar()
    window.addEventListener('scroll', evaluar, { passive: true })
    window.addEventListener('resize', evaluar)
    return () => {
      window.removeEventListener('scroll', evaluar)
      window.removeEventListener('resize', evaluar)
    }
  }, [pathname])

  const handleBuscar = (event) => {
    event.preventDefault()
    const query = busqueda.trim()
    navigate(query ? `/productos?q=${encodeURIComponent(query)}` : '/productos')
  }

  return (
    <Navbar
      ref={headerRef}
      expand="lg"
      sticky="top"
      className={`hm-header py-2${compacto ? ' hm-header--compact' : ''}`}
      bg={temaOscuro ? 'dark' : 'light'}
      data-bs-theme={temaOscuro ? 'dark' : 'light'}
    >
      <Container fluid="xl" className="hm-header__bar gap-3">
        <Navbar.Brand as={Link} to="/" className="hm-header__brand me-0" aria-label="Hola Mundo - Inicio">
          <span className="hm-header__logo-box">
            <img src="/img/logo.jpg" alt="Hola Mundo" className="hm-header__logo" />
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="hm-main-nav" className="ms-auto" />

        <Navbar.Collapse id="hm-main-nav" className="hm-header__collapse">
          {/* Fila 1: buscador centrado + acciones a la derecha */}
          <div className="hm-header__row-top">
            <Form className="hm-header__search" onSubmit={handleBuscar} role="search">
              <InputGroup>
                <Form.Control
                  type="search"
                  placeholder="Buscar productos..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  aria-label="Buscar productos"
                />
                <Button type="submit" variant="outline-secondary" aria-label="Buscar">
                  <i className="bi bi-search" aria-hidden="true" />
                </Button>
              </InputGroup>
            </Form>

            <div className="hm-header__actions d-flex align-items-center gap-2">
              <Button
                type="button"
                variant="link"
                className="hm-theme-btn"
                onClick={onToggleTema}
                aria-label={temaOscuro ? 'Activar modo claro' : 'Activar modo oscuro'}
              >
                <i
                  className={`bi ${temaOscuro ? 'bi-sun-fill' : 'bi-moon-stars-fill'}`}
                  aria-hidden="true"
                />
              </Button>

              <Button
                as={Link}
                to="/carrito"
                variant="link"
                className="hm-cart-btn position-relative"
                aria-label="Ir al carrito"
              >
                <i className="bi bi-cart3" aria-hidden="true" />
                {cantidadCarrito > 0 && (
                  <span className="hm-cart-btn__count">{cantidadCarrito}</span>
                )}
              </Button>
            </div>
          </div>

          {/* Fila 2: categorías */}
          <Nav className="hm-header__cats">
            {categorias.map((categoria) => (
              <CategoriaDropdown
                key={categoria}
                categoria={categoria}
                items={productos.filter((p) => p.categoria === categoria)}
              />
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
