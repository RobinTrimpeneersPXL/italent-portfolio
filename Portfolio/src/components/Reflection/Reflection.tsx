import { Container, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faLightbulb, faCompass } from '@fortawesome/free-solid-svg-icons';
import { useLanguage } from '../../context/LanguageContext';

const Reflection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-5 bg-light" id="reflection">
      <Container>
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold">{t('reflection.title')}</h2>
          <p className="lead text-muted">{t('reflection.subtitle')}</p>
        </div>

        <Row className="mb-5">
          <Col lg={4} className="mb-4">
            <Card className="h-100 border-0 shadow-sm p-4 text-center">
              <FontAwesomeIcon icon={faLightbulb} size="3x" className="text-info mb-3" />
              <h4 className="fw-bold">{t('reflection.evolution.title')}</h4>
              <p className="text-muted">
                {t('reflection.evolution.text')}
              </p>
            </Card>
          </Col>
          <Col lg={4} className="mb-4">
            <Card className="h-100 border-0 shadow-sm p-4 text-center text-white bg-dark">
              <FontAwesomeIcon icon={faCompass} size="3x" className="text-info mb-3" />
              <h4 className="fw-bold">{t('reflection.xfactor.title')}</h4>
              <p className="opacity-75">
                {t('reflection.xfactor.text')}
              </p>
            </Card>
          </Col>
          <Col lg={4} className="mb-4">
            <Card className="h-100 border-0 shadow-sm p-4 text-center">
              <FontAwesomeIcon icon={faRocket} size="3x" className="text-info mb-3" />
              <h4 className="fw-bold">{t('reflection.future.title')}</h4>
              <p className="text-muted">
                {t('reflection.future.text')}
              </p>
            </Card>
          </Col>
        </Row>

        <Card className="border-0 shadow-sm p-5 bg-white">
          <Row className="align-items-center">
            <Col lg={12}>
              <p className="mb-4">
                {t('reflection.journey')}
              </p>
              <p className="mb-4">
                {t('reflection.strengths')}
              </p>
              <p className="mb-0 fw-bold text-info">
                {t('reflection.closing')}
              </p>
            </Col>
          </Row>
        </Card>
      </Container>
    </section>
  );
};

export default Reflection;