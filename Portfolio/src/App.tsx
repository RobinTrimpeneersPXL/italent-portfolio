import React from 'react';
import './App.css';
import AppNavbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Activities from './components/Activities/Activities';
import Reflection from './components/Reflection/Reflection';
import K8sDashboard from './components/K8sDashboard/K8sDashboard';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import { LanguageProvider } from './context/LanguageContext';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <div className="App">
        <AppNavbar />
        <main>
          <Hero />
          <About />
          <Activities />
          <Reflection />
          <K8sDashboard />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default App;
