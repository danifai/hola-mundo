import { useMemo, useState } from 'react'
import {
  Alert,
  Badge,
  Button,
  Card,
  CloseButton,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Toast,
  ToastContainer,
} from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'
import ProductoCard from '../components/common/ProductoCard'
import { productos } from '../data/productos'

const categorias = [...new Set(productos.map((p) => p.categoria))]

function Productos({ onAgregarAlCarrito }) {
  const [searchParams, setSearchParams] = useSearchParams()

  const qParam = searchParams.get('q') || ''
  const catParam = searchParams.get('categoria') || 'todas'

  // Estados locales para filtros y orden
  const [busqueda, setBusqueda] = useState(qParam)
  const [categoria, setCategoria] = useState(catParam)
  const [prevParams, setPrevParams] = useState({ q: qParam, cat: catParam })
  const [orden, setOrden] = useState('destacados')
  const [soloEnStock, setSoloEnStock] = useState(false)
  const [soloOfertas, setSoloOfertas] = useState(false)
  const [toastMensaje, setToastMensaje] = useState(null)

  // Sincronizar estados si los query params cambian externamente (ej: desde Header)
  if (prevParams.q !== qParam || prevParams.cat !== catParam) {
    setPrevParams({ q: qParam, cat: catParam })
    setBusqueda(qParam)
    setCategoria(catParam)
  }

  // Actualiza los query params en la URL sin recargar
  const actualizarParams = (nuevaBusqueda, nuevaCategoria) => {
    const params = {}
    const q = nuevaBusqueda !== undefined ? nuevaBusqueda : busqueda
    const cat = nuevaCategoria !== undefined ? nuevaCategoria : categoria

    if (q.trim()) params.q = q.trim()
    if (cat && cat !== 'todas') params.categoria = cat

    setSearchParams(params, { replace: true })
  }

  const handleBusquedaChange = (valor) => {
    setBusqueda(valor)
    actualizarParams(valor, categoria)
  }

  const handleCategoriaChange = (nuevaCategoria) => {
    setCategoria(nuevaCategoria)
    actualizarParams(busqueda, nuevaCategoria)
  }

  const limpiarFiltros = () => {
    setBusqueda('')
    setCategoria('todas')
    setOrden('destacados')
    setSoloEnStock(false)
    setSoloOfertas(false)
    setSearchParams({}, { replace: true })
  }

  const handleAgregar = (producto) => {
    if (onAgregarAlCarrito) {
      onAgregarAlCarrito(producto)
      setToastMensaje(`¡"${producto.nombre}" agregado al carrito!`)
    }
  }

  // Filtrado y ordenamiento mediante métodos de array (.filter() y .sort())
  const productosFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase()

    return productos
      .filter((prod) => {
        // Filtro por texto (nombre, categoría o descripción)
        if (
          texto &&
          !prod.nombre.toLowerCase().includes(texto) &&
          !prod.categoria.toLowerCase().includes(texto) &&
          !prod.descripcion.toLowerCase().includes(texto)
        ) {
          return false
        }

        // Filtro por categoría
        if (categoria !== 'todas' && prod.categoria !== categoria) {
          return false
        }

        // Filtro por stock disponible
        if (soloEnStock && prod.stock === 0) {
          return false
        }

        // Filtro por ofertas
        if (soloOfertas && !prod.oferta) {
          return false
        }

        return true
      })
      .sort((a, b) => {
        switch (orden) {
          case 'precio-asc':
            return a.precio - b.precio
          case 'precio-desc':
            return b.precio - a.precio
          case 'nombre-asc':
            return a.nombre.localeCompare(b.nombre)
          case 'destacados':
          default:
            if (a.destacado && !b.destacado) return -1
            if (!a.destacado && b.destacado) return 1
            return a.id - b.id
        }
      })
  }, [busqueda, categoria, orden, soloEnStock, soloOfertas])

  const hayFiltrosActivos =
    Boolean(busqueda.trim()) ||
    categoria !== 'todas' ||
    orden !== 'destacados' ||
    soloEnStock ||
    soloOfertas

  return (
    <div className="py-4">
      {/* Cabecera / Banner de la página */}
      <Container className="text-center mb-4">
        <h1 className="fw-bold mb-2">Catálogo de Productos</h1>
        <p className="text-muted mx-auto" style={{ maxWidth: '620px' }}>
          Descubrí todo lo necesario para acompañar cada etapa de tu bebé:
          diseño, seguridad y el confort que tu familia necesita.
        </p>
      </Container>

      <Container>
        {/* Panel de Filtros usando Card, Form y utilidades de React Bootstrap */}
        <Card className="shadow-sm border-0 rounded-4 mb-4 bg-body-tertiary">
          <Card.Body className="p-3 p-md-4">
            <Row className="g-3 align-items-center">
              {/* Buscador de texto con InputGroup */}
              <Col xs={12} md={5} lg={4}>
                <InputGroup>
                  <InputGroup.Text className="bg-body border-end-0">
                    <i className="bi bi-search text-muted" aria-hidden="true" />
                  </InputGroup.Text>
                  <Form.Control
                    type="search"
                    placeholder="Buscar por nombre o descripción..."
                    value={busqueda}
                    onChange={(e) => handleBusquedaChange(e.target.value)}
                    className="border-start-0"
                    aria-label="Buscar productos"
                  />
                  {busqueda && (
                    <Button
                      variant="outline-secondary"
                      onClick={() => handleBusquedaChange('')}
                      aria-label="Borrar texto"
                    >
                      <i className="bi bi-x-lg" aria-hidden="true" />
                    </Button>
                  )}
                </InputGroup>
              </Col>

              {/* Selector de Categoría (Dropdown) */}
              <Col xs={12} sm={6} md={3} lg={3}>
                <Form.Select
                  value={categoria}
                  onChange={(e) => handleCategoriaChange(e.target.value)}
                  aria-label="Seleccionar categoría"
                >
                  <option value="todas">Todas las categorías</option>
                  {categorias.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </Form.Select>
              </Col>

              {/* Selector de Ordenamiento */}
              <Col xs={12} sm={6} md={4} lg={3}>
                <Form.Select
                  value={orden}
                  onChange={(e) => setOrden(e.target.value)}
                  aria-label="Ordenar productos"
                >
                  <option value="destacados">Destacados primero</option>
                  <option value="precio-asc">Precio: menor a mayor</option>
                  <option value="precio-desc">Precio: mayor a menor</option>
                  <option value="nombre-asc">Nombre: A a Z</option>
                </Form.Select>
              </Col>

              {/* Botón para limpiar filtros */}
              {hayFiltrosActivos && (
                <Col xs={12} lg={2} className="text-lg-end">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={limpiarFiltros}
                    className="w-100 rounded-pill"
                  >
                    <i className="bi bi-arrow-counterclockwise me-1" />
                    Limpiar
                  </Button>
                </Col>
              )}
            </Row>

            <hr className="my-3 opacity-25" />

            {/* Switches de filtros rápidos */}
            <div className="d-flex flex-wrap gap-4 align-items-center">
              <Form.Check
                type="switch"
                id="filtro-stock"
                label="Solo con stock disponible"
                checked={soloEnStock}
                onChange={(e) => setSoloEnStock(e.target.checked)}
              />
              <Form.Check
                type="switch"
                id="filtro-ofertas"
                label="Solo ofertas"
                checked={soloOfertas}
                onChange={(e) => setSoloOfertas(e.target.checked)}
              />
            </div>
          </Card.Body>
        </Card>

        {/* Resumen de resultados y badges de filtros activos */}
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
          <span className="text-muted small fw-semibold">
            Mostrando <strong className="text-body">{productosFiltrados.length}</strong> de{' '}
            {productos.length} productos
          </span>

          {hayFiltrosActivos && (
            <div className="d-flex flex-wrap align-items-center gap-2">
              {busqueda && (
                <Badge
                  bg="light"
                  text="dark"
                  className="border d-flex align-items-center gap-2 py-2 px-3 rounded-pill fw-normal"
                >
                  <span>Texto: "{busqueda}"</span>
                  <CloseButton onClick={() => handleBusquedaChange('')} />
                </Badge>
              )}
              {categoria !== 'todas' && (
                <Badge
                  bg="light"
                  text="dark"
                  className="border d-flex align-items-center gap-2 py-2 px-3 rounded-pill fw-normal"
                >
                  <span>Categoría: {categoria}</span>
                  <CloseButton onClick={() => handleCategoriaChange('todas')} />
                </Badge>
              )}
              {soloEnStock && (
                <Badge
                  bg="light"
                  text="dark"
                  className="border d-flex align-items-center gap-2 py-2 px-3 rounded-pill fw-normal"
                >
                  <span>Solo con stock</span>
                  <CloseButton onClick={() => setSoloEnStock(false)} />
                </Badge>
              )}
              {soloOfertas && (
                <Badge
                  bg="light"
                  text="dark"
                  className="border d-flex align-items-center gap-2 py-2 px-3 rounded-pill fw-normal"
                >
                  <span>Solo ofertas</span>
                  <CloseButton onClick={() => setSoloOfertas(false)} />
                </Badge>
              )}
              <Button
                variant="link"
                size="sm"
                onClick={limpiarFiltros}
                className="text-decoration-none p-0 ms-1"
              >
                Restablecer todo
              </Button>
            </div>
          )}
        </div>

        {/* Grilla de Productos */}
        {productosFiltrados.length > 0 ? (
          <Row className="g-4 mb-5">
            {productosFiltrados.map((producto) => (
              <Col key={producto.id} xs={12} sm={6} lg={4} xl={3}>
                <ProductoCard producto={producto} onAgregar={handleAgregar} />
              </Col>
            ))}
          </Row>
        ) : (
          /* Estado Vacío con Alert de React Bootstrap */
          <Alert
            variant="light"
            className="text-center py-5 border rounded-4 shadow-sm my-4"
          >
            <div className="display-4 mb-3" aria-hidden="true">
              🧸
            </div>
            <Alert.Heading as="h3" className="fw-bold">
              No encontramos productos
            </Alert.Heading>
            <p className="text-muted mx-auto mb-4" style={{ maxWidth: '420px' }}>
              No hay productos que coincidan con los filtros o término de búsqueda ingresado.
              Probá restableciendo los filtros para ver el catálogo completo.
            </p>
            <Button className="btn-hm" onClick={limpiarFiltros}>
              Ver todos los productos
            </Button>
          </Alert>
        )}
      </Container>

      {/* Notificación con Toast y ToastContainer de React Bootstrap */}
      <ToastContainer
        position="bottom-center"
        className="p-3 position-fixed"
        style={{ zIndex: 1080 }}
      >
        <Toast
          show={Boolean(toastMensaje)}
          onClose={() => setToastMensaje(null)}
          delay={2500}
          autohide
          className="rounded-pill shadow border-0"
        >
          <Toast.Body className="d-flex align-items-center gap-2 px-4 py-2">
            <i className="bi bi-check-circle-fill text-success fs-5" aria-hidden="true" />
            <span className="fw-semibold">{toastMensaje}</span>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  )
}

export default Productos
