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
  const [carrito, setCarrito] = useState(() => {
    try {
      const guardado = localStorage.getItem('hm_carrito')
      return guardado ? JSON.parse(guardado) : []
    } catch {
      return []
    }
  })
  const [temaOscuro, setTemaOscuro] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      temaOscuro ? 'dark' : 'light'
    )
  }, [temaOscuro])

  // Guardar en localStorage cada vez que cambia el carrito
  useEffect(() => {
    try {
      localStorage.setItem('hm_carrito', JSON.stringify(carrito))
    } catch {
      // Ignorar error si almacenamiento está deshabilitado
    }
  }, [carrito])

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

  const modificarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(id)
      return
    }

    setCarrito((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const limite = item.stock || 99
          return {
            ...item,
            cantidad: Math.min(nuevaCantidad, limite),
          }
        }
        return item
      })
    )
  }

  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id))
  }

  const vaciarCarrito = () => {
    setCarrito([])
  }

  const cantidadCarrito = carrito.reduce((acc, item) => acc + item.cantidad, 0)

  return (
    <div className="app-shell">
      <Header
        cantidadCarrito={cantidadCarrito}
        temaOscuro={temaOscuro}
        onToggleTema={() => setTemaOscuro((prev) => !prev)}
        carrito={carrito}
        onModificarCantidadCarrito={modificarCantidad}
        onEliminarDelCarrito={eliminarDelCarrito}
      />

      <main className="app-main">
        <Routes>
          <Route
            path="/"
            element={<Inicio onAgregarAlCarrito={agregarAlCarrito} />}
          />
          <Route
            path="/productos"
            element={<Productos onAgregarAlCarrito={agregarAlCarrito} />}
          />
          <Route
            path="/producto/:id"
            element={<DetalleProducto onAgregarAlCarrito={agregarAlCarrito} />}
          />
          <Route
            path="/carrito"
            element={
              <Carrito
                carrito={carrito}
                onModificarCantidad={modificarCantidad}
                onEliminar={eliminarDelCarrito}
                onVaciarCarrito={vaciarCarrito}
                onAgregarAlCarrito={agregarAlCarrito}
              />
            }
          />
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
