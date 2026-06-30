import { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Quote } from 'lucide-react';
import SectionHeader from './SectionHeader';

const QUOTES = [
  {
    body:
      'Mitul rebuilt our design system from scratch and dragged the entire product back into consistency. The team ships faster, designers stop arguing about tokens, and the inconsistency backlog dropped to near zero.',
    name: 'Engineering Lead',
    role: 'Buzzboard',
    initials: 'BB',
  },
  {
    body:
      "He doesn't hand off and disappear. Mitul stays involved through dev and QA, which is the difference between a Figma file and a real shipped feature. Our last release was the cleanest we've ever done.",
    name: 'Product Manager',
    role: 'SaaS client',
    initials: 'PM',
  },
  {
    body:
      'Grew our design team from 18 to 40 without losing the bar. Mitul instituted UX reviews before dev and our average client conversion lift went up ~20%. He treats design quality like a deadline.',
    name: 'Studio Director',
    role: 'Bacancy',
    initials: 'BC',
  },
  {
    body:
      'Asked Mitul to redesign our core flow with two weeks left in a release window. He shipped wireframes, hi-fi, and a working prototype inside the deadline, and the team reported a 15% lift in user satisfaction after launch.',
    name: 'Founder',
    role: 'Healthcare client',
    initials: 'HC',
  },
  {
    body:
      'Mitul turns vague briefs into clear flows. He asks the right questions early, ships fewer screens but the right screens, and his Figma libraries are the cleanest I have inherited.',
    name: 'Tech Lead',
    role: 'Creator commerce',
    initials: 'CC',
  },
];

export default function Voices() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const clamped = Math.max(0, Math.min(0.9999, v));
    const idx = Math.floor(clamped * QUOTES.length);
    if (idx !== active) setActive(idx);
  });

  return (
    <section
      id="voices"
      ref={sectionRef}
      className="relative"
      style={{ height: `${QUOTES.length * 90}vh` }}
    >
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
        {/* soft accent wash */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 pointer-events-none"
          style={{
            background:
              'radial-gradient(60vmax circle at 80% 20%, var(--accent-soft), transparent 65%)',
          }}
        />

        <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-16 pt-24 sm:pt-28">
          <SectionHeader
            kicker="In their words"
            title="What teams"
            italic="say"
            meta={`${String(active + 1).padStart(2, '0')} / ${String(QUOTES.length).padStart(2, '0')}`}
          />
        </div>

        {/* CARD DECK */}
        <div className="relative flex-1 max-w-[1400px] w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
          <div className="relative w-full h-full flex items-center justify-center">
            <div
              className="relative w-full"
              style={{
                maxWidth: 760,
                height: 'min(440px, 60vh)',
              }}
            >
              {QUOTES.map((q, i) => {
                const offset = i - active;

                let xPct = 0;
                let yPx = 0;
                let scale = 1;
                let rotate = 0;
                let opacity = 1;
                let blur = 0;
                let pointer = 'auto';

                if (offset === 0) {
                  // active
                } else if (offset > 0 && offset <= 2) {
                  // queued behind — stacked deck (only 2 visible behind)
                  yPx = offset * 16;
                  scale = 1 - offset * 0.05;
                  rotate = offset * 1.5;
                  opacity = offset === 1 ? 0.5 : 0.25;
                  pointer = 'none';
                } else if (offset < 0) {
                  // passed — fully off-screen left, hidden
                  xPct = -130;
                  rotate = -10;
                  scale = 0.9;
                  opacity = 0;
                  pointer = 'none';
                } else {
                  // far queued
                  opacity = 0;
                  pointer = 'none';
                }

                return (
                  <motion.article
                    key={i}
                    initial={false}
                    animate={{
                      x: `${xPct}%`,
                      y: yPx,
                      scale,
                      rotate,
                      opacity,
                      filter: `blur(${blur}px)`,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 130,
                      damping: 24,
                      mass: 0.9,
                    }}
                    style={{
                      zIndex: QUOTES.length - Math.abs(offset),
                      pointerEvents: pointer,
                      transformOrigin: '50% 50%',
                      background: 'var(--surface)',
                    }}
                    className="absolute inset-0 rounded-[24px] border border-border p-6 sm:p-10 lg:p-12 flex flex-col justify-between shadow-s3"
                    // solid bg so behind cards don't bleed through active
                    // (separate from className so motion can't overwrite)
                  >
                    <div>
                      <Quote
                        aria-hidden="true"
                        size={32}
                        strokeWidth={1.5}
                        className="mb-4"
                        style={{ color: 'var(--accent)' }}
                      />
                      <blockquote className="m-0">
                        <p
                          className="m-0 font-display text-ink font-semibold text-balance"
                          style={{
                            fontSize: 'clamp(18px, 2.2vw, 28px)',
                            lineHeight: 1.32,
                            letterSpacing: '-0.015em',
                          }}
                        >
                          {q.body}
                        </p>
                      </blockquote>
                    </div>
                    <footer className="mt-6 flex items-center gap-3 pt-4 border-t border-border">
                      <span
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full font-mono text-[11px] font-bold flex-shrink-0"
                        style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
                        aria-hidden="true"
                      >
                        {q.initials}
                      </span>
                      <div className="min-w-0">
                        <div className="font-display font-bold text-[14px] text-ink truncate">
                          {q.name}
                        </div>
                        <div className="font-mono text-[10px] tracking-[0.06em] uppercase text-ink-3 truncate">
                          {q.role}
                        </div>
                      </div>
                    </footer>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>

        {/* pager dashes */}
        <div className="relative pb-6 sm:pb-10 flex items-center justify-center gap-2 z-[2]">
          {QUOTES.map((_, j) => (
            <motion.span
              key={j}
              animate={{
                width: j === active ? 36 : 12,
                backgroundColor:
                  j === active ? 'var(--accent)' : 'var(--border-2)',
              }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ height: 4, borderRadius: 999 }}
              aria-hidden="true"
            />
          ))}
        </div>

        <p className="relative text-center pb-4 font-mono text-[10px] tracking-[0.1em] uppercase text-ink-4">
          ↓ scroll to advance
        </p>
      </div>
    </section>
  );
}
