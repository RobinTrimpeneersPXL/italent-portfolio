import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import { useLanguage } from '../../context/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();

  return (
    <section className="py-5 bg-white" id="contact">
      <Container>
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold">{t('contact.title')}</h2>
          <p className="text-muted">{t('contact.subtitle')}</p>
        </div>
        <Row className="justify-content-center">
          <Col lg={5} className="mb-4">
            <Card className="bg-dark text-white p-4 h-100 border-0 shadow">
              <h4 className="fw-bold mb-4 text-info">{t('contact.info')}</h4>
              <div className="d-flex align-items-center mb-4">
                <div className="bg-secondary rounded-circle p-3 me-3">
                  <FontAwesomeIcon icon={faEnvelope} className="text-info" />
                </div>
                <div>
                  <h6 className="mb-0">{t('contact.labels.email')}</h6>
                  <p className="small text-muted mb-0">robin.trimpeneers@student.pxl.be</p>
                </div>
              </div>
              <div className="d-flex align-items-center mb-4">
                <div className="bg-secondary rounded-circle p-3 me-3">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="text-info" />
                </div>
                <div>
                  <h6 className="mb-0">{t('contact.labels.location')}</h6>
                  <p className="small text-muted mb-0">Hasselt, Belgium</p>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="bg-secondary rounded-circle p-3 me-3">
                  <FontAwesomeIcon icon={faPhone} className="text-info" />
                </div>
                <div>
                  <h6 className="mb-0">{t('contact.labels.role')}</h6>
                  <p className="small text-muted mb-0">SOC Engineering Intern @ Cegeka</p>
                </div>
              </div>
            </Card>
          </Col>
          <Col lg={7}>
            <Card className="border-0 shadow-sm p-4 h-100">
              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>{t('contact.labels.name')}</Form.Label>
                      <Form.Control type="text" placeholder={t('contact.placeholders.name')} className="bg-light border-0 py-2" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>{t('contact.labels.email')}</Form.Label>
                      <Form.Control type="email" placeholder={t('contact.placeholders.email')} className="bg-light border-0 py-2" />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>{t('contact.labels.subject')}</Form.Label>
                  <Form.Control type="text" placeholder={t('contact.placeholders.subject')} className="bg-light border-0 py-2" />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>{t('contact.labels.message')}</Form.Label>
                  <Form.Control as="textarea" rows={4} placeholder={t('contact.placeholders.message')} className="bg-light border-0" />
                </Form.Group>
                <Button variant="info" type="submit" className="w-100 py-3 text-white fw-bold shadow-sm">
                  {t('contact.submit')}
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact;