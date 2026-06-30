import { motion } from 'framer-motion';
import { Compass, Target, Layers, Rocket } from 'lucide-react';
import SectionHeader from './SectionHeader';

const STEPS = [
  {
    icon: Compass,
    n: '01',
    title: 'Discover',
    body:
      'Stakeholder interviews, user research and analytics — understanding the real problem before drawing a single screen.',
  },
  {
    icon: Target,
    n: '02',
    title: 'Define',
    body:
      'Information architecture, user flows and wireframes that align the team on what we are actually building, and why.',
  },
  {
    icon: Layers,
    n: '03',
    title: 'Design',
    body:
      'High-fidelity UI, micro-interactions and design system tokens — pixel-tight, accessible, ready for engineering.',
  },
  {
    icon: Rocket,
    n: '04',
    title: 'Deliver',
    body:
      'Dev handoff, QA in staging and post-launch iteration — staying involved until the feature is shipping and learning.',
  },
];

export default function Process() {
  return (
    <section id="process" className="relative px-4 sm:px-6 md:px-10 lg:px-16 py-20 sm:py-28 md:py-36">
      <div className="max-w-[1400px] mx-auto">
        <SectionHeader
          kicker="how I work"
          title="A repeatable"
          italic="process"
          meta="04 — steps"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="card relative p-6 sm:p-7 flex flex-col gap-4 h-full"
              >
                <div className="flex items-center justify-between">
                  <div
                    className="inline-flex items-center justify-center w-11 h-11 rounded-2xl"
                    style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
                  >
                    <Icon size={20} strokeWidth={1.75} />
                  </div>
                  <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-ink-4">
                    {s.n}
                  </span>
                </div>
                <h3
                  className="font-display m-0 mt-2 font-bold text-ink"
                  style={{ fontSize: 'clamp(22px,2.2vw,28px)', letterSpacing: '-0.02em' }}
                >
                  {s.title}
                </h3>
                <p
                  className="m-0 text-ink-2 text-pretty"
                  style={{ fontSize: 14.5, lineHeight: 1.55 }}
                >
                  {s.body}
                </p>
                {i < STEPS.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 w-8 h-px"
                    style={{ background: 'var(--border-2)' }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
