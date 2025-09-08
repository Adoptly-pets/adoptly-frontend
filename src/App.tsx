import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import AboutPage from './pages/AboutPage/AboutPage';
import HowToHelpPage from './pages/HowToHelpPage/HowToHelpPage';
import SheltersPage from './pages/SheltersPage/SheltersPage';
import ContactPage from './pages/ContactPage/ContactPage';
import NotFound from './pages/NotFound/NotFound';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <Router basename="/adoptly-frontend">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/how-to-help" element={<HowToHelpPage />} />
          <Route path="/shelters" element={<SheltersPage />} />
          <Route path="/contacts" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
