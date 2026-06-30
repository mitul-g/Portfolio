import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './theme/ThemeProvider';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Work from './components/Work';
import About from './components/About';
import Experience from './components/Experience';
import Voices from './components/Voices';
import Contact from './components/Contact';
import Shots from './components/Shots';
import Footer from './components/Footer';
import ZyloCaseStudy from './pages/ZyloCaseStudy';
import { useScrollProgress } from './hooks/useScrollProgress';

function Home() {
  useScrollProgress();
  return (
    <div className="relative w-full font-body" style={{ overflowX: 'clip' }}>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[400] focus:bg-ink focus:text-bg focus:px-4 focus:py-2 focus:rounded-full focus:no-underline"
      >
        Skip to content
      </a>
      <Nav />
      <Hero />
      <Work />
      <Voices />
      <About />
      <Experience />
      <Contact />
      <Shots />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/zylo" element={<ZyloCaseStudy />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}
