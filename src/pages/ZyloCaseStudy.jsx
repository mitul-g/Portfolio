import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, ArrowRight } from 'lucide-react';
import ImgSlot from '../components/ImgSlot';

const GLANCE = [
  { k: 'Role', v: 'Solo Product Designer' },
  { k: 'Year', v: '2024' },
  { k: 'Platform', v: 'Responsive Web App' },
  { k: 'Scope', v: 'Research → UI → Handoff' },
];

const FEATURES = [
  {
    n: '01',
    title: 'Social post & image generation',
    body:
      'An AI composer that turns a one-line idea into ready-to-post copy and on-brand imagery. I designed the prompt-to-preview loop so editing feels like nudging, not starting over — with brand voice, channel and aspect ratio baked in before a single word is generated.',
    img: '/screenshots/lab.png',
  },
  {
    n: '02',
    title: 'Meta & Google Ads builder',
    body:
      "The scariest surface in the product. I broke campaign setup into a guided flow — objective, audience, budget, creative — that hides the platform's complexity behind plain-language choices and a live spend preview, so a first-timer can launch a real ad with confidence.",
    img: '/screenshots/lab3.png',
    reverse: true,
  },
  {
    n: '03',
    title: 'Google Business Profile management',
    body:
      'Posts, reviews, hours and insights for the profile most local customers actually see first — pulled into one calm dashboard. The design nudges owners toward the few actions that move the needle instead of drowning them in every metric Google exposes.',
    img: '/screenshots/lab4.png',
  },
  {
    n: '04',
    title: 'Email campaign flows',
    body:
      'From a blank inbox to a sequence that sends itself. I designed templated, editable flows — welcome, promo, re-engagement — where the owner picks an intent and Zylo assembles the emails, timing and audience, ready to review and ship.',
    img: '/screenshots/01-lab2.png',
    reverse: true,
  },
];

const PRINCIPLES = [
  {
    letter: 'A',
    title: 'Default to done',
    body:
      'Every surface opens with a smart starting point — a generated draft, a suggested budget, a pre-built flow. The owner reacts and edits instead of facing a blank canvas.',
  },
  {
    letter: 'B',
    title: 'Plain language over platform jargon',
    body:
      'No "PMax", no "CBO". Choices are framed around the owner\'s goal — "get more calls", "fill quiet weekdays" — and translated into ad-platform settings underneath.',
  },
  {
    letter: 'C',
    title: 'One consistent shell across channels',
    body:
      'Social, ads, email and GBP all share the same compose → preview → publish rhythm, so learning one surface teaches you the rest.',
  },
];

const enter = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-10% 0px' },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
};

export default function ZyloCaseStudy() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const heroRef = useRef(null);
  const [pos, setPos] = useState({ x: 70, y: 30 });
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      setPos({ x: (e.clientX / window.innerWidth) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div className="relative w-full overflow-hidden font-body">
      {/* MINI NAV */}
      <nav className="fixed top-0 inset-x-0 z-[200] px-3 sm:px-4 md:px-6 pt-3 sm:pt-4">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-3 rounded-full bg-bg/85 backdrop-blur-xl border border-border shadow-s2 h-14 px-3 sm:px-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2.5 no-underline text-ink h-11 px-2 rounded-full font-mono text-[12px] tracking-[0.05em] uppercase"
          >
            <span className="inline-flex w-7 h-7 rounded-full border border-border items-center justify-center">
              <ArrowLeft size={14} strokeWidth={1.75} />
            </span>
            Back to work
          </Link>
          <Link
            to="/#contact"
            className="inline-flex items-center gap-2 h-10 px-4 rounded-full text-bg bg-ink no-underline font-mono font-bold text-[11px] tracking-[0.06em] uppercase hover:bg-accent transition-colors"
          >
            Contact
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <header
        ref={heroRef}
        className="relative overflow-hidden px-4 sm:px-6 md:px-10 lg:px-16 pt-32 sm:pt-40 pb-12 sm:pb-20 grain"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{
            background: `
              radial-gradient(640px circle at ${pos.x}% ${pos.y}%, var(--accent-soft), transparent 55%),
              radial-gradient(420px circle at ${100 - pos.x}% ${100 - pos.y}%, color-mix(in oklab, var(--teal) 25%, transparent), transparent 60%),
              var(--bg)
            `,
          }}
        />
        <div className="relative max-w-[1300px] mx-auto">
          <motion.div
            {...enter}
            className="flex flex-wrap items-center gap-3 font-mono text-[12px] tracking-[0.06em] uppercase text-ink-3 mb-6 sm:mb-10"
          >
            <span style={{ color: 'var(--accent)' }}>★ Feature project</span>
            <span className="opacity-40">/</span>
            <span>Case study</span>
            <span className="opacity-40">/</span>
            <a
              href="https://zylo5.com"
              target="_blank"
              rel="noopener"
              className="text-ink no-underline inline-flex items-center gap-1.5"
            >
              zylo5.com <ArrowUpRight size={12} strokeWidth={2} />
            </a>
          </motion.div>
          <motion.h1
            {...enter}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            className="m-0 font-display font-extrabold text-ink"
            style={{
              fontSize: 'clamp(64px, 11vw, 180px)',
              letterSpacing: '-0.045em',
              lineHeight: 0.9,
            }}
          >
            Zylo
          </motion.h1>
          <motion.p
            {...enter}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="m-0 mt-6 sm:mt-8 font-display font-medium text-ink text-balance"
            style={{
              fontSize: 'clamp(20px, 2.8vw, 40px)',
              lineHeight: 1.18,
              letterSpacing: '-0.02em',
              maxWidth: '22ch',
            }}
          >
            Making multi-channel marketing feel{' '}
            <span className="font-serif italic font-normal" style={{ color: 'var(--accent)' }}>
              effortless
            </span>{' '}
            for people who've never run an ad.
          </motion.p>
        </div>
      </header>

      {/* HERO IMAGE */}
      <section className="px-4 sm:px-6 md:px-10 lg:px-16 pb-16 sm:pb-24">
        <motion.div
          {...enter}
          className="relative max-w-[1300px] mx-auto rounded-[24px] overflow-hidden border border-border bg-surface-2"
          style={{ aspectRatio: '16/9' }}
        >
          <ImgSlot src="/screenshots/zylo.png" alt="Zylo dashboard" />
        </motion.div>
      </section>

      {/* AT A GLANCE */}
      <section className="px-4 sm:px-6 md:px-10 lg:px-16 pb-16 sm:pb-28">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.6 }}
          className="max-w-[1300px] mx-auto grid grid-cols-2 lg:grid-cols-4 border border-border rounded-[18px] overflow-hidden"
          style={{ background: 'var(--border)' }}
        >
          {GLANCE.map((g, i) => (
            <motion.div
              key={g.k}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="bg-surface p-6 sm:p-8"
            >
              <p className="m-0 mb-2.5 font-mono text-[11px] tracking-[0.08em] uppercase text-ink-4">
                {g.k}
              </p>
              <p
                className="m-0 font-medium text-ink"
                style={{ fontSize: 'clamp(15px,1.3vw,19px)' }}
              >
                {g.v}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* THE BRIEF */}
      <section className="px-4 sm:px-6 md:px-10 lg:px-16 pb-16 sm:pb-28">
        <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-[0.4fr_1fr] gap-8 lg:gap-20">
          <motion.p
            {...enter}
            className="m-0 font-mono text-[12px] tracking-[0.08em] uppercase"
            style={{ color: 'var(--accent)' }}
          >
            01 — The brief
          </motion.p>
          <motion.div {...enter}>
            <p
              className="m-0 mb-6 font-display font-medium text-ink text-pretty"
              style={{
                fontSize: 'clamp(22px,2.4vw,36px)',
                lineHeight: 1.32,
                letterSpacing: '-0.015em',
              }}
            >
              Small businesses know they{' '}
              <em
                className="font-serif not-italic"
                style={{ fontStyle: 'italic', color: 'var(--accent)', fontWeight: 400 }}
              >
                should
              </em>{' '}
              be marketing. They just don't have the team, the time, or the vocabulary for it.
            </p>
            <p
              className="m-0 text-ink-2 text-pretty"
              style={{ fontSize: 'clamp(16px,1.3vw,18px)', lineHeight: 1.65, maxWidth: '62ch' }}
            >
              Zylo's promise was a single tool that runs social posts, ads, Google Business and
              email for a business with zero marketing staff. My job was to make a genuinely
              complex, multi-channel product feel like something a busy owner could open between
              customers and actually move forward with — no jargon, no blank-canvas paralysis, no
              ad-platform anxiety.
            </p>
          </motion.div>
        </div>
      </section>

      {/* WHAT I DESIGNED */}
      <section
        className="px-4 sm:px-6 md:px-10 lg:px-16 py-16 sm:py-28"
        style={{ background: 'var(--surface-2)' }}
      >
        <div className="max-w-[1300px] mx-auto">
          <motion.div
            {...enter}
            className="flex items-baseline justify-between gap-6 flex-wrap mb-10 sm:mb-14"
          >
            <h2
              className="m-0 font-display font-bold text-ink"
              style={{ fontSize: 'clamp(28px,4vw,60px)', letterSpacing: '-0.03em', lineHeight: 1 }}
            >
              What I{' '}
              <span className="font-serif italic font-normal" style={{ color: 'var(--accent)' }}>
                designed
              </span>
            </h2>
            <span className="font-mono text-[13px] text-ink-4">04 — core surfaces</span>
          </motion.div>

          <div className="flex flex-col gap-5 sm:gap-7">
            {FEATURES.map((f) => (
              <motion.article
                {...enter}
                key={f.n}
                className="card overflow-hidden grid grid-cols-1 md:grid-cols-2"
              >
                <div
                  className={`p-6 sm:p-10 lg:p-14 flex flex-col justify-center gap-4 ${
                    f.reverse ? 'md:order-2' : ''
                  }`}
                >
                  <span
                    className="font-mono text-[12px] tracking-[0.06em]"
                    style={{ color: 'var(--accent)' }}
                  >
                    {f.n}
                  </span>
                  <h3
                    className="m-0 font-display font-semibold text-ink"
                    style={{ fontSize: 'clamp(22px,2.4vw,34px)', letterSpacing: '-0.02em' }}
                  >
                    {f.title}
                  </h3>
                  <p
                    className="m-0 text-ink-2 text-pretty"
                    style={{
                      fontSize: 'clamp(15px,1.3vw,17px)',
                      lineHeight: 1.6,
                      maxWidth: '48ch',
                    }}
                  >
                    {f.body}
                  </p>
                </div>
                <div
                  className={`relative overflow-hidden bg-surface-2 min-h-[260px] md:min-h-[320px] ${
                    f.reverse ? 'md:order-1' : ''
                  }`}
                >
                  <ImgSlot src={f.img} alt={f.title} />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="px-4 sm:px-6 md:px-10 lg:px-16 py-16 sm:py-28">
        <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-[0.4fr_1fr] gap-8 lg:gap-20">
          <motion.p
            {...enter}
            className="m-0 font-mono text-[12px] tracking-[0.08em] uppercase"
            style={{ color: 'var(--accent)' }}
          >
            02 — The approach
          </motion.p>
          <div>
            <motion.h2
              {...enter}
              className="m-0 mb-8 sm:mb-12 font-display font-semibold text-ink text-balance"
              style={{
                fontSize: 'clamp(26px,3.2vw,46px)',
                letterSpacing: '-0.025em',
                lineHeight: 1.1,
                maxWidth: '18ch',
              }}
            >
              Three principles kept the whole thing approachable.
            </motion.h2>
            <div className="flex flex-col gap-5 sm:gap-7">
              {PRINCIPLES.map((p, i) => (
                <motion.div
                  key={p.letter}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                  transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="grid grid-cols-[auto_1fr] gap-5 items-start border-t border-border pt-6"
                >
                  <span
                    className="font-serif leading-none"
                    style={{ fontSize: 'clamp(28px,3vw,44px)', color: 'var(--accent)' }}
                  >
                    {p.letter}
                  </span>
                  <div>
                    <h3
                      className="m-0 mb-2 font-display font-semibold text-ink"
                      style={{ fontSize: 'clamp(18px,1.7vw,24px)' }}
                    >
                      {p.title}
                    </h3>
                    <p
                      className="m-0 text-ink-2 text-pretty"
                      style={{
                        fontSize: 'clamp(15px,1.3vw,17px)',
                        lineHeight: 1.6,
                        maxWidth: '60ch',
                      }}
                    >
                      {p.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PULL QUOTE */}
      <section className="px-4 sm:px-6 md:px-10 lg:px-16 py-12 sm:py-20 pb-20 sm:pb-28">
        <motion.div {...enter} className="max-w-[1100px] mx-auto text-center">
          <p
            className="m-0 font-display font-medium text-ink text-balance"
            style={{
              fontSize: 'clamp(26px,4.2vw,58px)',
              lineHeight: 1.18,
              letterSpacing: '-0.025em',
            }}
          >
            The win wasn't adding features — it was hiding the{' '}
            <span className="font-serif italic font-normal" style={{ color: 'var(--accent)' }}>
              complexity
            </span>{' '}
            until the moment someone needed it.
          </p>
        </motion.div>
      </section>

      {/* NEXT */}
      <section
        className="relative px-4 sm:px-6 md:px-10 lg:px-16 py-16 sm:py-24 border-t border-border overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 pointer-events-none"
          style={{
            background:
              'radial-gradient(60vmax circle at 50% 100%, var(--accent-soft), transparent 60%)',
          }}
        />
        <div className="relative max-w-[1300px] mx-auto flex flex-wrap items-center justify-between gap-7">
          <motion.div {...enter}>
            <p className="m-0 mb-2.5 font-mono text-[12px] tracking-[0.08em] uppercase text-ink-3">
              Keep exploring
            </p>
            <h2
              className="m-0 font-display font-bold text-ink"
              style={{
                fontSize: 'clamp(30px,5vw,72px)',
                letterSpacing: '-0.03em',
                lineHeight: 1,
              }}
            >
              More work &amp; ways to{' '}
              <span className="font-serif italic font-normal" style={{ color: 'var(--accent)' }}>
                reach me
              </span>
            </h2>
          </motion.div>
          <motion.div {...enter} className="flex flex-wrap gap-3">
            <Link to="/#work" className="btn-primary">
              All projects
              <span className="inline-flex w-6 h-6 rounded-full bg-accent text-white items-center justify-center">
                <ArrowRight size={12} strokeWidth={2.25} />
              </span>
            </Link>
            <a
              href="https://dribbble.com/mitul690"
              target="_blank"
              rel="noopener"
              className="btn-ghost"
            >
              <span className="w-2 h-2 rounded-full" style={{ background: '#EA4C89' }} />
              Dribbble
            </a>
            <a
              href="https://www.behance.net/mitul690"
              target="_blank"
              rel="noopener"
              className="btn-ghost"
            >
              <span className="w-2 h-2 rounded-full" style={{ background: '#1769FF' }} />
              Behance
            </a>
          </motion.div>
        </div>
        <div className="relative max-w-[1300px] mx-auto mt-12 border-t border-border pt-6 flex items-center justify-between gap-5 flex-wrap">
          <div className="flex items-center gap-2.5">
            <span
              className="inline-block w-2.5 h-2.5 rounded-full"
              style={{ background: 'var(--accent)', boxShadow: '0 0 12px var(--accent)' }}
            />
            <span className="font-display font-extrabold text-[16px] text-ink">Mitul</span>
            <span className="font-mono text-[12px] text-ink-3 ml-1.5">
              Senior UI/UX Designer
            </span>
          </div>
          <span className="font-mono text-[12px] text-ink-4">© 2026 — Zylo case study</span>
        </div>
      </section>
    </div>
  );
}
