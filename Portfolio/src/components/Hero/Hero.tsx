import { Container, Row, Col, Button } from 'react-bootstrap';
import { useLanguage } from '../../context/LanguageContext';
import './Hero.css';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <header className="hero-container d-flex align-items-center" id="home">
      <div className="hero-overlay"></div>
      <Container className="position-relative text-white">
        <Row className="justify-content-center">
          <Col md={10} lg={8} className="text-center">
            <h1 className="display-2 fw-bold mb-3 animate-fade-in">Robin Trimpeneers</h1>
            <h2 className="h3 mb-4 text-info fw-light">{t('hero.subtitle')}</h2>
            <p className="lead mb-5 opacity-75">
              {t('hero.intro')}
            </p>
            <div className="d-flex justify-content-center gap-3">
              <Button variant="info" size="lg" href="#about" className="px-4 py-2 text-white">
                {t('hero.buttons.about')}
              </Button>
              <Button variant="outline-light" size="lg" href="#playground" className="px-4 py-2">
                {t('hero.buttons.playground')}
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Hero;