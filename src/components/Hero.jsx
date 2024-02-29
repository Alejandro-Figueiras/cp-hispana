import './hero.css'
import Heading from '@theme/Heading';

const Hero = () => {
  return <div className="hero" data-theme="dark">
    <div className="heroInner">
      <Heading as="h1" className="heroProjectTagline">
        <img
          alt={'Globo'}
          className="heroLogo"
          src='/img/globo.png'
          width="250"
          height="250"
        />
        <p
          className="heroTitleTextHtml"
        >
          Documentación para <b>Programación Competitiva</b> en Español
        </p>
        <p
          className="heroSubtitleTextHtml"
        >
          Algoritmos en Español desde <a href='https://cp-algorithms.com' target="_blank" rel="noopener noreferrer" style={{textWrap: 'nowrap'}}>cp-algorithms</a> y más fuentes.
        </p>
      </Heading>
    </div>
  </div>
}

export default Hero;