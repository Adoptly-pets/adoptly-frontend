import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import AppRoutes from './routes/AppRoutes';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { AuthProvider } from './context/AuthContext';

const ErrorFallback = () => {
  const { t } = useTranslation();
  return (
    <div className="route-error">
      <p>{t('errors.somethingWentWrong')}</p>
      <button type="button" onClick={() => window.location.reload()}>
        {t('errors.reload')}
      </button>
    </div>
  );
};

// Remounts ErrorBoundary on route change so its hasError state resets —
// prevents fallback from getting stuck after user navigates away from a failed route.
const RouteErrorBoundary = () => {
  const location = useLocation();
  return (
    <ErrorBoundary key={location.pathname} fallback={<ErrorFallback />}>
      <AppRoutes />
    </ErrorBoundary>
  );
};

function App() {
  return (
    <Router basename="/adoptly-frontend">
      <Header />
      <main>
        <AuthProvider>
          <RouteErrorBoundary />
        </AuthProvider>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
