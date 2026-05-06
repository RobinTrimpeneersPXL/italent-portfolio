import React, { useState } from 'react';
import { Container, Row, Col, Card, Badge, Button, Modal, Carousel, Nav } from 'react-bootstrap';
import { activitiesData, type Activity } from './ActivitiesData';
import { useLanguage } from '../../context/LanguageContext';
import './Activities.css';

const Activities: React.FC = () => {
  const { language, t } = useLanguage();
  const [filter, setFilter] = useState<string>('All');
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [showModal, setShowModal] = useState(false);

  const categories = ['All', 'Seminarie', 'Innovatie', 'POP', 'Internationalisering', 'Extra'];
  const categoriesEn = ['All', 'Seminar', 'Innovation', 'POP', 'Internationalization', 'Extra'];

  const currentData = activitiesData[language] || activitiesData.nl;

  const filteredActivities = filter === 'All' 
    ? currentData 
    : currentData.filter(a => {
        // Handle filter match across languages if needed, but here categories in data match the filter list for that language
        if (language === 'nl') return a.category === filter;

        // Map Dutch filter to English category for EN language
        const idx = categories.indexOf(filter);
        return a.category === categoriesEn[idx];
      });

  const handleReadMore = (activity: Activity) => {
    setSelectedActivity(activity);
    setShowModal(true);
  };

  // Group activities into slides (e.g., 3 cards per slide)
  const groupSize = 3;
  const slides = [];
  for (let i = 0; i < filteredActivities.length; i += groupSize) {
    slides.push(filteredActivities.slice(i, i + groupSize));
  }

  return (
    <section className="py-5 bg-white" id="activities">
      <Container>
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold">{t('activities.title')}</h2>
          <p className="text-muted">{t('activities.subtitle')}</p>
        </div>

        {/* Filter Navigation */}
        <Nav variant="pills" className="justify-content-center mb-5 gap-2 custom-filters">
          {categories.map((cat, idx) => (
            <Nav.Item key={cat}>
              <Nav.Link 
                active={filter === cat} 
                onClick={() => setFilter(cat)}
                className="rounded-pill px-4"
              >
                {language === 'nl' ? t(`activities.categories.${['all', 'seminarie', 'innovatie', 'pop', 'inter', 'extra'][idx]}`) : categoriesEn[idx]}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>

        {/* Multi-item Carousel */}
        <Carousel 
          indicators={true} 
          interval={null} 
          className="activities-carousel p-4"
          variant="dark"
        >
          {slides.map((slide, idx) => (
            <Carousel.Item key={idx}>
              <Row>
                {slide.map(activity => (
                  <Col md={4} key={activity.id} className="mb-4">
                    <Card className="h-100 border-0 shadow-sm hover-up overflow-hidden activity-card">
                      <div 
                        className="activity-image-wrapper" 
                        style={{ backgroundImage: `url(${activity.image})` }}
                      >
                        <div className="activity-overlay"></div>
                        <Badge bg="info" className="category-badge position-absolute m-3">
                          {activity.category}
                        </Badge>
                      </div>
                      <Card.Body className="p-4 d-flex flex-column">
                        <small className="text-muted mb-1">{activity.date}</small>
                        <h5 className="fw-bold mb-2">{activity.title}</h5>
                        <p className="text-muted small mb-3 flex-grow-1">
                          {activity.description.substring(0, 100)}...
                        </p>
                        <div className="mt-auto">
                          <div className="mb-3">
                            {activity.tags.slice(0, 2).map((tag, tIdx) => (
                              <Badge key={tIdx} bg="light" text="dark" className="me-1 fw-light border">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <Button 
                            variant="outline-info" 
                            size="sm" 
                            className="w-100"
                            onClick={() => handleReadMore(activity)}
                          >
                            {t('activities.buttons.readMore')}
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>

        {/* Activity Detail Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
          {selectedActivity && (
            <>
              <Modal.Header closeButton className="border-0">
                <Modal.Title className="fw-bold">{selectedActivity.title}</Modal.Title>
              </Modal.Header>
              <Modal.Body className="p-4 pt-0">
                <div 
                  className="modal-hero-image mb-4 rounded" 
                  style={{ 
                    backgroundImage: `url(${selectedActivity.image})`,
                    height: '250px',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                ></div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <Badge bg="info">{selectedActivity.category}</Badge>
                  <small className="text-muted">{selectedActivity.date}</small>
                </div>
                <h4 className="fw-bold mb-3">{selectedActivity.subtitle}</h4>
                <p className="lead">{selectedActivity.description}</p>
                <hr />
                <div className="mt-4">
                  <h6 className="fw-bold text-uppercase text-info mb-2">{t('activities.tags')}</h6>
                  <div>
                    {selectedActivity.tags.map((tag, idx) => (
                      <Badge key={idx} bg="light" text="dark" className="me-2 mb-2 p-2 px-3 border fw-normal">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer className="border-0">
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  {t('activities.buttons.close')}
                </Button>
              </Modal.Footer>
            </>
          )}
        </Modal>
      </Container>
    </section>
  );
};

export default Activities;