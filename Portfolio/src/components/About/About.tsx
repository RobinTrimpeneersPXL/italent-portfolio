import { Container, Row, Col, ProgressBar, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faShieldHalved, faNetworkWired, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useLanguage } from '../../context/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  const skills = [
    { name: t('about.skills.cloud'), value: 85, icon: faCloud },
    { name: t('about.skills.security'), value: 80, icon: faShieldHalved },
    { name: t('about.skills.network'), value: 90, icon: faNetworkWired },
    { name: t('about.skills.automation'), value: 75, icon: faShieldHalved },
    { name: t('about.skills.leadership'), value: 95, icon: faUsers },
  ];

  return (
    <section className="py-5 bg-white" id="about">
      <Container>
        <Row className="mb-5">
          <Col lg={6}>
            <h2 className="display-4 fw-bold mb-4">{t('about.title')}</h2>
            <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80" alt={t('about.alt')} className="img-fluid rounded shadow-sm mb-4" />
            <p className="lead text-muted mb-4">
              {t('about.intro')}
            </p>
            <p>
              {t('about.journey')}
            </p>
            <p>
              {t('about.leadership')}
            </p>
          </Col>
          <Col lg={6}>
            <Card className="shadow-sm border-0 p-4 bg-light">
              <h4 className="mb-4 fw-bold">{t('about.expertise')}</h4>
              {skills.map((skill, index) => (
                <div key={index} className="mb-3">
                  <div className="d-flex justify-content-between mb-1">
                    <span>
                      <FontAwesomeIcon icon={skill.icon} className="me-2 text-info" />
                      {skill.name}
                    </span>
                    <span className="fw-bold">{skill.value}%</span>
                  </div>
                  <ProgressBar now={skill.value} variant="info" style={{ height: '8px' }} />
                </div>
              ))}
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;