import { publicUrl } from '../../utils/assets'
import './HeroBanner.css'

function HeroBanner() {
  const style = {
    '--hero-bg': `url(${publicUrl('img/fondo_bebe.jpg')})`,
    '--hero-bg-mobile': `url(${publicUrl('img/fondo_bebe_vertical.jpg')})`,
  }

  return (
    <section className="hero-parallax" aria-label="Banner principal Hola Mundo" style={style}>
      <div className="hero-parallax__bg" role="img" aria-label="Accesorios para darle la bienvenida soñada al mundo a tu bebé" />
    </section>
  )
}

export default HeroBanner
