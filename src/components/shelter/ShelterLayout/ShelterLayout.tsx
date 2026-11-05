import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ShelterSidebar from '../ShelterSidebar/ShelterSidebar';
import './ShelterLayout.css';

const ShelterLayout = () => {
  const { t } = useTranslation();

  return (
    <div className="container shelter-layout">
      <ShelterSidebar />
      <section className="shelter-content">
        <div className="shelter-page">
          <Suspense
            fallback={
              <div className="content-loading">{t('common.loading')}</div>
            }
          >
            <Outlet />
          </Suspense>
        </div>
      </section>
    </div>
  );
};
export default ShelterLayout;
