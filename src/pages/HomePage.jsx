import { useEffect } from 'react';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import CultureGrid from '../components/CultureGrid';
import Features from '../components/Features';
import Quote from '../components/Quote';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

export default function HomePage() {
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.12 });
    reveals.forEach(r => obs.observe(r));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <Hero />
      <Marquee />
      <CultureGrid />
      <Features />
      <Quote />
      <CTA />
    </>
  );
}
