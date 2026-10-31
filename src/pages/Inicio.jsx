import Beneficios from '../components/home/Beneficios'
import CarouselNovedades from '../components/home/CarouselNovedades'
import HeroBanner from '../components/home/HeroBanner'
import OfertasGrid from '../components/home/OfertasGrid'
import { productos } from '../data/productos'

function Inicio({ onAgregarAlCarrito }) {
  return (
    <>
      <HeroBanner />
      <CarouselNovedades productos={productos} onAgregar={onAgregarAlCarrito} />
      <OfertasGrid productos={productos} onAgregar={onAgregarAlCarrito} />
      <Beneficios />
    </>
  )
}

export default Inicio
