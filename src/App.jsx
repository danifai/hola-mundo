import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import FloatingCatalogo from './components/layout/FloatingCatalogo'
import FloatingWhatsApp from './components/layout/FloatingWhatsApp'
import Footer from './components/layout/Footer'
import Header from './components/layout/Header'
import Carrito from './pages/Carrito'
import DetalleProducto from './pages/DetalleProducto'
import Inicio from './pages/Inicio'
import Nosotros from './pages/Nosotros'
import PreguntasFrecuentes from './pages/PreguntasFrecuentes'
import Productos from './pages/Productos'

function App() {
  const [carrito, setCarrito] = useState([])
  const [temaOscuro, setTemaOscuro] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      temaOscuro ? 'dark' : 'light'
    )
  }, [temaOscuro])

  const agregarAlCarrito = (producto, cantidad = 1) => {
    if (!producto || producto.stock === 0) return

    setCarrito((prev) => {
      const existente = prev.find((item) => item.id === producto.id)
      if (existente) {
        return prev.map((item) =>
          item.id === producto.id
            ? {
                ...item,
                cantidad: Math.min(item.cantidad + cantidad, producto.stock),
              }
            : item
        )
      }
      return [...prev, { ...producto, cantidad }]
    })
  }

  const cantidadCarrito = carrito.reduce((acc, item) => acc + item.cantidad, 0)

  return (
    <div className="app-shell">
      <Header
        cantidadCarrito={cantidadCarrito}
        temaOscuro={temaOscuro}
        onToggleTema={() => setTemaOscuro((prev) => !prev)}
      />

      <main className="app-main">
        <Routes>
          <Route
            path="/"
            element={<Inicio onAgregarAlCarrito={agregarAlCarrito} />}
          />
          <Route path="/productos" element={<Productos />} />
          <Route path="/producto/:id" element={<DetalleProducto />} />
          <Route path="/carrito" element={<Carrito carrito={carrito} />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/preguntas-frecuentes" element={<PreguntasFrecuentes />} />
        </Routes>
      </main>

      <Footer />
      <FloatingCatalogo />
      <FloatingWhatsApp />
    </div>
  )
}

export default App
