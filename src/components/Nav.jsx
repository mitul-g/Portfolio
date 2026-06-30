import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, Mail } from 'lucide-react';
import { DribbbleIcon, BehanceIcon } from './SocialIcons';
import { useTheme } from '../theme/ThemeProvider';

const ITEMS = [
  { id: 'work', n: '01', label: 'Work' },
  { id: 'experience', n: '02', label: 'Path' },
  { id: 'voices', n: '03', label: 'Voices' },
  { id: 'about', n: '04', label: 'About' },
  { id: 'demo', n: '05', label: 'Shots' },
];

const SOCIALS = [
  { Icon: DribbbleIcon, href: 'https://dribbble.com/mitul690', label: 'Dribbble' },
  { Icon: BehanceIcon, href: 'https://www.behance.net/mitul690', label: 'Behance' },
  { Icon: Mail, href: 'mailto:hello@mitul.design', label: 'Email' },
];

export default function Nav() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  return (
    <>
      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
        className="fixed top-0 inset-x-0 z-[200] px-3 sm:px-4 md:px-6 pt-3 sm:pt-4"
      >
        <div className="max-w-[1400px] mx-auto flex items-center gap-2 sm:gap-3">
          {/* MAIN NAV PILL */}
          <nav
            className={`relative flex-1 flex items-center justify-between gap-3 rounded-full transition-all duration-300 h-14 px-3 sm:px-4 ${
              scrolled
                ? 'bg-bg/85 backdrop-blur-xl border border-border shadow-s2'
                : 'bg-transparent border border-transparent'
            }`}
          >
            <a
              href="#top"
              className="flex items-center gap-2 no-underline text-ink pl-1 pr-2 h-11 rounded-full"
              aria-label="Home"
            >
              <span className="relative inline-flex w-2.5 h-2.5 items-center justify-center">
                <span className="absolute inset-0 rounded-full bg-accent" />
                <span className="absolute inset-0 rounded-full bg-accent animate-pulse-dot" />
              </span>
              <span className="font-display font-extrabold text-[17px] sm:text-[18px] tracking-[-0.03em]">
                Mitul
              </span>
            </a>

            <ul className="hidden md:flex items-center gap-0 list-none m-0 p-0">
              {ITEMS.map((it) => (
                <li key={it.id}>
                  <a
                    href={`#${it.id}`}
                    className="group inline-flex items-center gap-1.5 h-10 px-3 rounded-full no-underline text-ink-3 hover:text-ink hover:bg-accent/8 font-mono text-[11px] tracking-[0.06em] uppercase transition-colors"
                  >
                    <span className="text-[9px] text-ink-4 group-hover:text-accent transition-colors">
                      {it.n}
                    </span>
                    {it.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <button
                onClick={toggle}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-border hover:border-ink/40 transition-colors"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {theme === 'dark' ? (
                    <motion.span key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }} className="inline-flex">
                      <Sun size={16} strokeWidth={1.75} />
                    </motion.span>
                  ) : (
                    <motion.span key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }} className="inline-flex">
                      <Moon size={16} strokeWidth={1.75} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              <a
                href="#contact"
                className="hidden sm:inline-flex items-center gap-2 h-10 px-4 rounded-full text-bg bg-ink no-underline font-mono font-bold text-[11px] tracking-[0.06em] uppercase hover:bg-accent transition-colors"
              >
                Let's talk
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              </a>

              <button
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-border"
              >
                <Menu size={16} strokeWidth={1.75} />
              </button>
            </div>
          </nav>

          {/* SEPARATE SOCIAL ICONS CLUSTER */}
          <div
            className={`hidden lg:flex items-center gap-1.5 rounded-full transition-all duration-300 h-14 px-2 ${
              scrolled
                ? 'bg-bg/85 backdrop-blur-xl border border-border shadow-s2'
                : 'bg-transparent border border-transparent'
            }`}
          >
            {SOCIALS.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener"
                aria-label={label}
                className="group inline-flex items-center justify-center w-10 h-10 rounded-full text-ink-3 hover:text-ink hover:bg-accent/8 transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[300] bg-bg md:hidden"
          >
            <div className="flex items-center justify-between px-4 py-4">
              <span className="font-display font-extrabold text-[19px]">Mitul</span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-border"
              >
                <X size={16} strokeWidth={1.75} />
              </button>
            </div>
            <ul className="px-4 mt-6 space-y-1">
              {ITEMS.map((it, i) => (
                <motion.li
                  key={it.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + i * 0.04, duration: 0.3 }}
                >
                  <a
                    href={`#${it.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-4 border-b border-border no-underline text-ink"
                  >
                    <span className="font-mono text-[10px] text-ink-4">{it.n}</span>
                    <span className="font-display text-[28px] font-bold tracking-[-0.02em]">
                      {it.label}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="px-4 mt-8 flex flex-wrap gap-3">
              <a href="#contact" onClick={() => setOpen(false)} className="btn-primary flex-1 justify-center min-w-[200px]">
                Let's talk
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              </a>
              {SOCIALS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener"
                  aria-label={label}
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-border text-ink"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
