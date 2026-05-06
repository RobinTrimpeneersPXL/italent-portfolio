import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useLanguage } from '../../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-dark text-white py-5">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
            <h5 className="fw-bold mb-1">ROBIN TRIMPENEERS</h5>
            <p className="small text-muted mb-0">{t('footer.specialist')}</p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <div className="d-flex justify-content-center justify-content-md-end gap-4">
              <a href="#" className="text-white opacity-75 hover-opacity-100">
                <FontAwesomeIcon icon={faLinkedin} size="lg" />
              </a>
              <a href="#" className="text-white opacity-75 hover-opacity-100">
                <FontAwesomeIcon icon={faGithub} size="lg" />
              </a>
              <a href="mailto:robin.trimpeneers@student.pxl.be" className="text-white opacity-75 hover-opacity-100">
                <FontAwesomeIcon icon={faEnvelope} size="lg" />
              </a>
            </div>
          </Col>
        </Row>
        <hr className="my-4 opacity-25" />
        <Row>
          <Col className="text-center">
            <small className="text-muted">{t('footer.copyright')}</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;