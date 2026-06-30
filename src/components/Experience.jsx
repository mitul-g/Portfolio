import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin } from 'lucide-react';
import SectionHeader from './SectionHeader';

const LOGOS = [
  { name: 'Buzzboard', years: "'24 — Now" },
  { name: 'Bacancy', years: "'20 — '24" },
  { name: 'Zestbrain', years: '2020' },
  { name: 'Orange Technolab', years: "'19 — '20" },
  { name: 'Creart Solutions', years: "'18 — '19" },
];

// Order: current first, oldest last — they will stack newest-on-top as the user scrolls
const ROLES = [
  {
    current: true,
    dates: { from: 'Nov 2024', to: '— Present', loc: 'Hyderabad' },
    company: 'Buzzboard',
    role: 'Senior UX/UI Designer',
    bullets: [
      'Built the design system from scratch — tokens, component library and usage docs the team now uses daily across web and mobile.',
      'Run user research end-to-end and audit the live product every sprint, clearing the inconsistency backlog with engineering.',
      'Solo product designer on Zylo, an AI marketing platform for small businesses.',
    ],
    metrics: [
      { v: '0→1', l: 'design system' },
      { v: '60+', l: 'UI issues fixed' },
      { v: '~40%', l: 'faster ideation' },
    ],
  },
  {
    dates: { from: 'Jul 2020', to: '— Nov 2024', loc: 'Ahmedabad' },
    company: 'Bacancy Technology',
    role: 'Lead UX/UI Designer',
    bullets: [
      'Led and grew a design team from 18 to 40 across concurrent client accounts — reviews, quality sign-offs, mentoring and hiring.',
      'Shipped 100+ projects; running UX reviews before dev lifted client conversion ~20% on average.',
      'Overhauled Figma libraries and handoff conventions — dev rework dropped 30% within six months.',
    ],
    metrics: [
      { v: '18→40', l: 'team led' },
      { v: '100+', l: 'projects shipped' },
      { v: '+20%', l: 'conversion' },
      { v: '−30%', l: 'dev rework' },
    ],
  },
  {
    dates: { from: '2020', to: '~6 months', loc: 'Ahmedabad' },
    company: 'Zestbrain Pvt Ltd',
    role: 'Lead UX/UI Designer',
    bullets: [
      'Ran a team of six across 20+ UI/UX projects in six months, keeping design quality predictable under tight deadlines.',
      'Client retention rose 10% over the period as output became more consistent.',
    ],
    metrics: [
      { v: '6', l: 'designers led' },
      { v: '20+', l: 'projects' },
      { v: '+10%', l: 'retention' },
    ],
  },
  {
    dates: { from: 'May 2019', to: '— Jan 2020', loc: 'Ahmedabad' },
    company: 'Orange Technolab',
    role: 'Senior UI/UX Designer',
    bullets: [
      'Redesigned core product screens from user feedback — the client reported a 15% lift in satisfaction scores after launch.',
      'Stayed involved through dev and QA rather than handing off — fewer last-minute fires, cleaner final builds.',
    ],
    metrics: [{ v: '+15%', l: 'satisfaction' }],
  },
  {
    intern: true,
    dates: { from: 'Nov 2018', to: '— May 2019', loc: 'Ahmedabad' },
    company: 'Creart Solutions',
    role: 'UX/UI Designer',
    bullets: [
      'College internship where I moved from web-dev coursework into design, working on real client interfaces under senior designers — and came out certain product design was the career.',
    ],
    metrics: [],
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative px-4 sm:px-6 md:px-10 lg:px-16 pt-20 sm:pt-28 md:pt-32 pb-12 sm:pb-16"
      style={{ background: 'var(--surface-2)' }}
    >
      <div className="max-w-[1400px] mx-auto">
        <SectionHeader title="Where I've" italic="worked" meta="2018 — present" />

        <p className="eyebrow m-0 mb-4">Companies &amp; clients</p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-10 sm:mb-14"
        >
          {LOGOS.map((l, i) => (
            <motion.div
              key={l.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="card flex flex-col items-center gap-3 px-3 py-5"
            >
              <div className="font-display font-bold text-[15px] sm:text-[17px] text-ink text-center">
                {l.name}
              </div>
              <span className="font-mono text-[10px] text-ink-4 tracking-[0.04em]">{l.years}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* STICKY STACK */}
        <StickyStack roles={ROLES} />
      </div>
    </section>
  );
}

function StickyStack({ roles }) {
  // Tight scroll budget per card so deck doesn't span a forever-screen.
  // Increasing top offset means older cards peek above the newer one.
  const stackPx = 14;
  return (
    <div className="relative">
      {roles.map((r, i) => (
        <StickyCard
          key={r.company}
          r={r}
          i={i}
          total={roles.length}
          topOffset={88 + i * stackPx}
        />
      ))}
      <div className="h-[18vh]" aria-hidden="true" />
    </div>
  );
}

function StickyCard({ r, i, total, topOffset }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const scale = useTransform(scrollYProgress, [0.5, 1], [1, 1 - (total - i) * 0.014]);
  return (
    <div
      ref={ref}
      className="relative"
      style={{
        // Compact scroll budget — just enough for the stack motion to read.
        // Negative margin on subsequent cards pulls them up so the visible
        // gap between cards collapses (the stack-on-top effect is created
        // by the sticky pin, not by physical card spacing).
        height: 340,
        marginTop: i === 0 ? 0 : -200,
        zIndex: i + 1,
      }}
    >
      <motion.article
        style={{
          position: 'sticky',
          top: topOffset,
          scale,
          transformOrigin: 'top center',
        }}
        className="card p-6 sm:p-8 md:p-10 flex flex-col"
      >
        <div className="flex items-baseline justify-between flex-wrap gap-2 mb-2">
          <div className="font-mono text-[12px] text-ink-3">
            {r.dates.from} <span className="text-ink-4">{r.dates.to}</span>
          </div>
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.04em] uppercase text-ink-3">
            <MapPin size={12} strokeWidth={1.75} />
            {r.dates.loc}
          </span>
        </div>

        <div className="flex items-center flex-wrap gap-2.5 mb-1.5">
          <h3
            className="font-display m-0 font-extrabold text-ink"
            style={{
              fontSize: 'clamp(24px,2.6vw,38px)',
              letterSpacing: '-0.025em',
              lineHeight: 1,
            }}
          >
            {r.company}
          </h3>
          {r.current && (
            <span
              className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.08em] uppercase rounded-full px-2.5 py-1"
              style={{
                color: '#0F766E',
                border: '1px solid rgba(15,118,110,0.3)',
                background: 'rgba(15,118,110,0.08)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Current
            </span>
          )}
          {r.intern && (
            <span className="font-mono text-[10px] tracking-[0.08em] uppercase text-ink-3 border border-border rounded-full px-2.5 py-1">
              Internship
            </span>
          )}
        </div>
        <p className="m-0 mb-5 font-mono text-[12px] tracking-[0.05em] uppercase text-ink-3">
          {r.role}
        </p>

        <ul className="m-0 p-0 list-none flex flex-col gap-3">
          {r.bullets.map((b, idx) => (
            <li key={idx} className="flex gap-3 text-[14.5px] leading-[1.55] text-ink-2 text-pretty">
              <span style={{ color: 'var(--accent)' }} className="flex-shrink-0">
                —
              </span>
              <span>{b}</span>
            </li>
          ))}
        </ul>

        {r.metrics.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-border">
            {r.metrics.map((m, idx) => (
              <span
                key={idx}
                className="font-mono text-[11px] text-ink-3 border border-border rounded-full px-3 py-1 inline-flex gap-1.5"
              >
                <span className="font-bold" style={{ color: 'var(--accent)' }}>
                  {m.v}
                </span>
                {m.l}
              </span>
            ))}
          </div>
        )}
      </motion.article>
    </div>
  );
}
