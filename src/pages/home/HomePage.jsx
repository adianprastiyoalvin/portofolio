import React, { memo } from 'react';
import { StarBackground } from './StarBackground';
import Hero from '../../components/sections/Hero';
import AboutMe from '../../components/sections/AboutMe';
import Resume from '../../components/sections/Resume';
import Projects from '../../components/sections/Projects';
import Footer from '../../components/layout/Footer';

/**
 * Halaman utama portofolio (Hero + semua section).
 * Di-memoize agar tidak re-render saat state global (seperti Toast / Fibot Drawer) berubah di App.jsx.
 */
const HomePage = memo(function HomePage({ showToast, onOpenOverview, onOpenResumeOverview }) {
  return (
    <>
      {/* Bintang hanya tampil di halaman utama */}
      <StarBackground />

      <Hero
        onLike={() => showToast('Liked card! ❤️')}
        onOpenOverview={onOpenOverview}
      />

      {/* Solid Black Background Container for all sections other than Hero */}
      <div className="content-dark-wrapper">
        <AboutMe />
        <Resume onOpenOverview={onOpenResumeOverview} />
        <Projects onOpenOverview={onOpenOverview} />
        <Footer onVisionClick={() => showToast('📬 Opening mail client / contact...')} />
      </div>
    </>
  );
});

export default HomePage;