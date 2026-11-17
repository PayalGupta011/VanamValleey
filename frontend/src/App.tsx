import { VanamPreloader } from './components/shared/VanamPreloader';
import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { EnquiryModal } from './components/shared/EnquiryModal';
import { SiteVisitModal } from './components/shared/SiteVisitModal';
import { DocumentChecklistModal } from './components/shared/DocumentChecklistModal';

// Public Landing Page (Eagerly loaded for instantaneous first paint)
import { Home } from './pages/Home';

// Lazy Loaded Secondary & Heavy Pages (Code-Split on Demand)
const Properties = lazy(() => import('./pages/Properties').then((m) => ({ default: m.Properties })));
const PropertyDetail = lazy(() => import('./pages/PropertyDetail').then((m) => ({ default: m.PropertyDetail })));
const Locations = lazy(() => import('./pages/Locations').then((m) => ({ default: m.Locations })));
const Calculators = lazy(() => import('./pages/Calculators').then((m) => ({ default: m.Calculators })));
const About = lazy(() => import('./pages/About').then((m) => ({ default: m.About })));
const Gallery = lazy(() => import('./pages/Gallery').then((m) => ({ default: m.Gallery })));
const Contact = lazy(() => import('./pages/Contact').then((m) => ({ default: m.Contact })));

// Lazy Loaded Admin Pages & Layout
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin').then((m) => ({ default: m.AdminLogin })));
import { AdminLayout } from './components/admin/AdminLayout';
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard').then((m) => ({ default: m.AdminDashboard })));
const AdminProperties = lazy(() => import('./pages/admin/AdminProperties').then((m) => ({ default: m.AdminProperties })));
const AdminEnquiries = lazy(() => import('./pages/admin/AdminEnquiries').then((m) => ({ default: m.AdminEnquiries })));
const AdminContent = lazy(() => import('./pages/admin/AdminContent').then((m) => ({ default: m.AdminContent })));
const AdminMedia = lazy(() => import('./pages/admin/AdminMedia').then((m) => ({ default: m.AdminMedia })));

function PageLoadingFallback() {
  return <VanamPreloader isInitialSplash={false} />;
}

import type { WebsiteSettings } from './types';
import { api } from './services/api';
import './App.css';

// Automatically scroll window to top and update document title on route changes
function RouteWatcher() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    const titles: Record<string, string> = {
      '/': 'Vanam Valley — Luxury Forest Villas & Plots | Balaghat, MP',
      '/properties': 'Villas & Residential Plots | Vanam Valley',
      '/locations': 'Balaghat Setting & Sanctuaries | Vanam Valley',
      '/calculators': 'Real Estate & Land Calculators | Vanam Valley',
      '/about': 'About the Master Plan | Vanam Valley',
      '/gallery': 'Architectural & Forest Gallery | Vanam Valley',
      '/contact': 'Contact & Private Site Tour | Vanam Valley',
      '/admin/login': 'Executive CMS Login | Vanam Valley',
      '/admin': 'Overview Dashboard | Vanam Valley CMS',
      '/admin/properties': 'Manage Residences | Vanam Valley CMS',
      '/admin/enquiries': 'Client Consultations & Site Visits | Vanam Valley CMS',
      '/admin/content': 'Website Content Editor | Vanam Valley CMS',
      '/admin/media': 'Cloudinary Media Library | Vanam Valley CMS',
    };

    if (titles[pathname]) {
      document.title = titles[pathname];
    } else if (pathname.startsWith('/properties/')) {
      document.title = 'Residence Details | Vanam Valley';
    }
  }, [pathname]);

  return null;
}

function MainApp() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  const [settings, setSettings] = useState<WebsiteSettings | null>(null);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [selectedInterest, setSelectedInterest] = useState('General Enquiry');
  const [siteVisitModalOpen, setSiteVisitModalOpen] = useState(false);
  const [selectedVisitProperty, setSelectedVisitProperty] = useState('');
  const [checklistModalOpen, setChecklistModalOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    api.getSettings().then((data) => {
      if (isMounted && data) {
        setSettings(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleOpenEnquiry = (interest?: string) => {
    setSelectedInterest(interest || 'General Enquiry');
    setEnquiryModalOpen(true);
  };

  const handleOpenSiteVisit = (propertyTitle?: string) => {
    setSelectedVisitProperty(propertyTitle || '');
    setSiteVisitModalOpen(true);
  };

  const handleOpenChecklist = () => {
    setChecklistModalOpen(true);
  };

  // Lock background scrolling completely whenever any global modal is open
  useEffect(() => {
    if (enquiryModalOpen || siteVisitModalOpen || checklistModalOpen) {
      const origBodyOverflow = document.body.style.overflow;
      const origHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
      document.documentElement.classList.add('modal-open');
      return () => {
        document.body.style.overflow = origBodyOverflow || '';
        document.documentElement.style.overflow = origHtmlOverflow || '';
        document.body.classList.remove('modal-open');
        document.documentElement.classList.remove('modal-open');
      };
    }
  }, [enquiryModalOpen, siteVisitModalOpen, checklistModalOpen]);

  // Universal Buttery Smooth Scroll Reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('vanam-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    const observeElements = () => {
      const elements = document.querySelectorAll(
        '.vanam-reveal, .vanam-reveal-left, .vanam-reveal-right, .vanam-reveal-scale, section, .vanam-amenity-card, .vanam-pillar-card, .vanam-contact-card'
      );
      elements.forEach((el) => {
        if (!el.classList.contains('vanam-revealed')) {
          if (
            !el.classList.contains('vanam-reveal') &&
            !el.classList.contains('vanam-reveal-left') &&
            !el.classList.contains('vanam-reveal-right') &&
            !el.classList.contains('vanam-reveal-scale')
          ) {
            el.classList.add('vanam-reveal');
          }
          observer.observe(el);
        }
      });
    };

    observeElements();
    const timeout = setTimeout(observeElements, 250);

    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      clearTimeout(timeout);
    };
  }, [location.pathname]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <VanamPreloader isInitialSplash={true} />
      {/* Show public navbar only on public routes */}
      {!isAdminRoute && (
        <Navbar
          settings={settings}
          onOpenEnquiry={() => handleOpenEnquiry('General Enquiry')}
          onOpenSiteVisit={() => handleOpenSiteVisit()}
          onOpenChecklist={handleOpenChecklist}
        />
      )}

      <main style={{ flex: 1, paddingTop: isAdminRoute ? 0 : '74px' }}>
        <Suspense fallback={<PageLoadingFallback />}>
          <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <Home
                settings={settings}
                onOpenEnquiry={handleOpenEnquiry}
                onOpenSiteVisit={handleOpenSiteVisit}
                onOpenChecklist={handleOpenChecklist}
              />
            }
          />
          <Route
            path="/properties"
            element={
              <Properties
                onOpenEnquiry={handleOpenEnquiry}
                onOpenSiteVisit={handleOpenSiteVisit}
                onOpenChecklist={handleOpenChecklist}
              />
            }
          />
          <Route path="/properties/:slug" element={<PropertyDetail onOpenEnquiry={handleOpenEnquiry} />} />
          <Route path="/locations" element={<Locations onOpenEnquiry={handleOpenEnquiry} />} />
          <Route
            path="/calculators"
            element={
              <Calculators
                onOpenEnquiry={handleOpenEnquiry}
                onOpenSiteVisit={handleOpenSiteVisit}
              />
            }
          />
          <Route
            path="/about"
            element={
              <About
                settings={settings}
                onOpenEnquiry={handleOpenEnquiry}
                onOpenSiteVisit={handleOpenSiteVisit}
              />
            }
          />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact settings={settings} />} />

          {/* Admin Authentication */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="properties" element={<AdminProperties />} />
            <Route path="enquiries" element={<AdminEnquiries />} />
            <Route path="content" element={<AdminContent />} />
            <Route path="media" element={<AdminMedia />} />
          </Route>

          {/* 404 Fallback */}
          <Route
            path="*"
            element={
              <Home
                settings={settings}
                onOpenEnquiry={handleOpenEnquiry}
                onOpenSiteVisit={handleOpenSiteVisit}
                onOpenChecklist={handleOpenChecklist}
              />
            }
          />
          </Routes>
        </Suspense>
      </main>

      {/* Show public footer only on public routes */}
      {!isAdminRoute && <Footer settings={settings} />}

      {/* General Property Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        defaultPropertyInterest={selectedInterest}
      />

      {/* VIP Site Visit Appointment Modal */}
      <SiteVisitModal
        isOpen={siteVisitModalOpen}
        onClose={() => setSiteVisitModalOpen(false)}
        defaultProperty={selectedVisitProperty}
      />

      {/* Official Property Buyer Document Checklist Modal */}
      <DocumentChecklistModal
        isOpen={checklistModalOpen}
        onClose={() => setChecklistModalOpen(false)}
        onOpenEnquiry={() => handleOpenEnquiry('Document Verification & Registry')}
      />
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <RouteWatcher />
      <MainApp />
    </BrowserRouter>
  );
}

export default App;
