import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useLanguage } from '../../context/LanguageContext';
import './Navbar.css';

const AppNavbar = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="py-3 shadow-sm border-bottom border-secondary">
      <Container>
        <Navbar.Brand href="#home" className="fw-bold tracking-tight">
          ROBIN <span className="text-info">TRIMPENEERS</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#about" className="px-3">{t('navbar.about')}</Nav.Link>
            <Nav.Link href="#activities" className="px-3">{t('navbar.activities')}</Nav.Link>
            <Nav.Link href="#reflection" className="px-3">{t('navbar.reflection')}</Nav.Link>
            <Nav.Link href="#playground" className="px-3 text-info fw-bold">{t('navbar.playground')}</Nav.Link>
            <Nav.Link href="#contact" className="px-3">{t('navbar.contact')}</Nav.Link>

            <NavDropdown title={language.toUpperCase()} id="language-nav-dropdown" className="ms-3 border rounded border-secondary">
              <NavDropdown.Item onClick={() => setLanguage('nl')} active={language === 'nl'}>
                NL (Nederlands)
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => setLanguage('en')} active={language === 'en'}>
                EN (English)
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;