import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';

const ROWS = [
  {
    n: '01',
    title: 'End-to-end Product Design',
    body:
      'Owning the whole arc — discovery, IA, user flows, wireframes, hi-fi UI and dev handoff — so the experience stays coherent from first click to shipped feature.',
  },
  {
    n: '02',
    title: 'UX Research & Testing',
    body:
      'Interviews, usability sessions and behavioural data turned into decisions — so design choices answer to evidence, not opinion.',
  },
  {
    n: '03',
    title: 'AI-Powered Product UX',
    body:
      'Designing the human side of AI — generation, prompts, suggestions and guardrails that feel like help, not homework, for non-technical users.',
  },
  {
    n: '04',
    title: 'Design Systems',
    body:
      'Scalable component libraries and tokens that keep teams fast and consistent — one source of truth from Figma to production.',
  },
  {
    n: '05',
    title: 'Conversion & Growth Design',
    body:
      'Landing pages and checkout flows designed against real targets — reducing friction between deciding to buy and actually buying.',
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative px-4 sm:px-6 md:px-10 lg:px-16 py-20 sm:py-28 md:py-36"
      style={{ background: 'var(--surface-2)' }}
    >
      <div className="max-w-[1400px] mx-auto">
        <SectionHeader title="The" italic="practice" meta="about — experience" />

        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16 items-start pf-about-grid">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:sticky lg:top-28"
          >
            <div className="relative flex items-start gap-1.5 leading-[0.8]">
              <span
                className="font-display font-extrabold"
                style={{
                  fontSize: 'clamp(96px,15vw,210px)',
                  letterSpacing: '-0.05em',
                  background: 'linear-gradient(160deg, var(--ink), var(--accent))',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                7
              </span>
              <span
                className="font-display font-bold"
                style={{
                  fontSize: 'clamp(40px,6vw,84px)',
                  marginTop: '0.1em',
                  color: 'var(--accent)',
                }}
              >
                +
              </span>
            </div>
            <p className="eyebrow m-0 mt-1.5 mb-6">years designing products</p>
            <p
              className="m-0 text-ink-2 text-pretty"
              style={{ fontSize: 'clamp(16px,1.5vw,19px)', lineHeight: 1.6, maxWidth: '40ch' }}
            >
              I work end-to-end — from research and flows to the last pixel and the handoff. I'm
              happiest where products are dense and the stakes are high: AI tools, SaaS dashboards,
              and checkout flows where a single confusing screen costs real money.
            </p>
          </motion.div>

          <div className="flex flex-col border-t border-border">
            {ROWS.map((r, i) => (
              <HoverRow key={r.n} r={r} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HoverRow({ r, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 32 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="group relative border-b border-border overflow-hidden cursor-default"
    >
      {/* Sweeping fill */}
      <span
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[550ms] ease-[cubic-bezier(.2,.8,.2,1)]"
        style={{
          background: 'linear-gradient(90deg, var(--accent-soft), transparent)',
        }}
      />

      <div className="relative flex items-center gap-4 sm:gap-5 py-5 sm:py-7 px-2">
        <span className="font-mono text-[12px] text-ink-4 w-8 flex-shrink-0">{r.n}</span>
        <h3
          className="m-0 flex-1 font-display font-semibold text-ink transition-transform duration-[450ms] ease-[cubic-bezier(.2,.8,.2,1)] group-hover:translate-x-3.5"
          style={{ fontSize: 'clamp(20px,2.6vw,34px)', letterSpacing: '-0.02em' }}
        >
          {r.title}
        </h3>
        <span
          aria-hidden="true"
          className="text-[20px] flex-shrink-0 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
          style={{ color: 'var(--accent)' }}
        >
          →
        </span>
      </div>

      {/* Body — expands inline on hover. Reserve no space when collapsed. */}
      <div
        className="relative overflow-hidden grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-[500ms] ease-[cubic-bezier(.2,.8,.2,1)]"
      >
        <div className="min-h-0 overflow-hidden">
          <p
            className="m-0 text-ink-2 text-pretty pb-6 sm:pb-7"
            style={{
              padding: '0 8px 24px 56px',
              fontSize: 15,
              lineHeight: 1.6,
              maxWidth: '60ch',
            }}
          >
            {r.body}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
