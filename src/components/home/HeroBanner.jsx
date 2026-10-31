import './HeroBanner.css'

/**
 * Hero con efecto "cover": la imagen queda fija (position: fixed) y las
 * secciones siguientes, con fondo opaco, la van tapando al hacer scroll.
 */
function HeroBanner() {
  return (
    <section className="hero-parallax" aria-label="Banner principal Hola Mundo">
      <div className="hero-parallax__bg" role="img" aria-label="Accesorios para darle la bienvenida soñada al mundo a tu bebé" />
    </section>
  )
}

export default HeroBanner
