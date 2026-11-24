import React, { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Toast from './components/shared/Toast';
import ScrollToTop from './components/shared/ScrollToTop';
import FibotAvatar from './components/fibot/FibotAvatar';
import HomePage from './pages/home/HomePage';
import { PROJECTS_DATA, DEFAULT_PROJECT } from './data/projectsData';
import { EXPERIENCES_DATA, DEFAULT_EXPERIENCE } from './data/resumeData';

// Code-Splitting: Lazy load heavy sub-pages and AI chatbot to minimize initial bundle size
const ProjectOverviewPage = lazy(() => import('./pages/ProjectOverviewPage'));
const ResumeOverviewPage = lazy(() => import('./pages/ResumeOverviewPage'));
const FibotDrawer = lazy(() => import('./components/fibot/FibotDrawer'));

export default function App() {
  const [toastMsg, setToastMsg] = useState(null);
  const [currentView, setCurrentView] = useState('portfolio'); // 'portfolio' | 'project-overview' | 'resume-overview'
  const [selectedProject, setSelectedProject] = useState(DEFAULT_PROJECT);
  const [selectedExperience, setSelectedExperience] = useState(DEFAULT_EXPERIENCE);
  const [isFibotOpen, setIsFibotOpen] = useState(false);

  // Remember the visitor's scroll position before opening an overview page
  const returnScrollRef = useRef(null);

  const showToast = useCallback((msg) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg(null);
    }, 2800);
  }, []);

  const handleOpenOverview = useCallback((project) => {
    returnScrollRef.current = window.scrollY;
    setSelectedProject(project || DEFAULT_PROJECT);
    setCurrentView('project-overview');
    window.location.hash = `overview-${project?.id || 'default'}`;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  const handleOpenResumeOverview = useCallback((experience) => {
    returnScrollRef.current = window.scrollY;
    setSelectedExperience(experience || DEFAULT_EXPERIENCE);
    setCurrentView('resume-overview');
    window.location.hash = `resume-overview-${experience?.id || 'default'}`;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  const handleBackToPortfolio = useCallback((sectionId = 'projects') => {
    setCurrentView('portfolio');

    const savedScrollY = returnScrollRef.current;
    returnScrollRef.current = null;
    const restorePosition = savedScrollY !== null;

    if (restorePosition) {
      if (window.history?.replaceState) {
        window.history.replaceState(
          null,
          '',
          window.location.pathname + window.location.search
        );
      }
    } else if (window.history?.replaceState) {
      window.history.replaceState(null, '', `#${sectionId}`);
    } else {
      window.location.hash = sectionId;
    }

    const performScroll = () => {
      if (window.ScrollTrigger) {
        window.ScrollTrigger.refresh();
      }

      if (restorePosition) {
        const maxY = document.documentElement.scrollHeight - window.innerHeight;
        const targetY = Math.max(0, Math.min(savedScrollY, maxY));
        window.scrollTo({ top: targetY, left: 0, behavior: 'instant' });
        document.documentElement.scrollTop = targetY;
        document.body.scrollTop = targetY;
        return;
      }

      const el = document.getElementById(sectionId);
      if (el) {
        const navbarHeight = document.getElementById('navbar')?.offsetHeight || 64;
        const targetTop = el.getBoundingClientRect().top + window.scrollY - (navbarHeight + 24);
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      }
    };

    requestAnimationFrame(() => {
      setTimeout(performScroll, 40);
    });
  }, []);

  const handleContactClick = useCallback((e) => {
    if (currentView !== 'portfolio') {
      e?.preventDefault();
      handleBackToPortfolio('contact');
    }
    showToast('💬 Scrolling to contact section...');
  }, [currentView, handleBackToPortfolio, showToast]);

  const handleToggleFibot = useCallback(() => {
    setIsFibotOpen((prev) => !prev);
  }, []);

  const handleCloseFibot = useCallback(() => {
    setIsFibotOpen(false);
  }, []);

  // Sync hash on initial load or browser back/forward
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#overview-')) {
        const projId = hash.replace('#overview-', '');
        const found = PROJECTS_DATA.find((p) => p.id === projId || p.slug === projId);
        setSelectedProject(found || DEFAULT_PROJECT);
        setCurrentView('project-overview');
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      } else if (hash === '#overview') {
        setSelectedProject(DEFAULT_PROJECT);
        setCurrentView('project-overview');
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      } else if (hash.startsWith('#resume-overview-') || hash.startsWith('#experience-')) {
        const expId = hash.replace('#resume-overview-', '').replace('#experience-', '');
        const found = EXPERIENCES_DATA.find((e) => e.id === expId || e.slug === expId);
        setSelectedExperience(found || DEFAULT_EXPERIENCE);
        setCurrentView('resume-overview');
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      } else {
        setCurrentView('portfolio');
        const targetId = hash.replace('#', '');
        if (targetId && (targetId === 'projects' || targetId === 'resume' || targetId === 'about' || targetId === 'contact')) {
          setTimeout(() => {
            const el = document.getElementById(targetId);
            if (el) {
              const navbarHeight = document.getElementById('navbar')?.offsetHeight || 64;
              const targetTop = el.getBoundingClientRect().top + window.scrollY - (navbarHeight + 24);
              window.scrollTo({ top: targetTop, behavior: 'smooth' });
            }
          }, 80);
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="app-container" id="app">
      <Navbar onContactClick={handleContactClick} />

      {currentView === 'project-overview' ? (
        <Suspense fallback={<div className="page-suspense-loader" />}>
          <div className="content-dark-wrapper overview-view-wrapper">
            <ProjectOverviewPage
              project={selectedProject}
              onBack={() => handleBackToPortfolio('projects')}
              onContactClick={() => showToast('📬 Opening mail client / contact...')}
            />
            <Footer onVisionClick={() => showToast('📬 Opening mail client / contact...')} />
          </div>
        </Suspense>
      ) : currentView === 'resume-overview' ? (
        <Suspense fallback={<div className="page-suspense-loader" />}>
          <div className="content-dark-wrapper overview-view-wrapper">
            <ResumeOverviewPage
              experience={selectedExperience}
              onBack={() => handleBackToPortfolio('resume')}
            />
            <Footer onVisionClick={() => showToast('📬 Opening mail client / contact...')} />
          </div>
        </Suspense>
      ) : (
        <HomePage
          showToast={showToast}
          onOpenOverview={handleOpenOverview}
          onOpenResumeOverview={handleOpenResumeOverview}
        />
      )}

      <Toast message={toastMsg} />
      <ScrollToTop />

      {/* Fibot AI Chatbot Widget */}
      <FibotAvatar
        isOpen={isFibotOpen}
        onClick={handleToggleFibot}
      />

      {/* Fibot Drawer Lazy Loaded on demand */}
      {isFibotOpen && (
        <Suspense fallback={null}>
          <FibotDrawer
            isOpen={isFibotOpen}
            onClose={handleCloseFibot}
          />
        </Suspense>
      )}
    </div>
  );
}