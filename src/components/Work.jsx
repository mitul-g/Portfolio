import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SectionHeader from './SectionHeader';
import ImgSlot from './ImgSlot';

const TAG = ({ children }) => (
  <span className="font-mono text-[11px] text-ink-3 border border-border rounded-full px-3 py-1">
    {children}
  </span>
);

const enter = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-10% 0px' },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
};

export default function Work() {
  return (
    <section id="work" className="relative px-4 sm:px-6 md:px-10 lg:px-16 py-20 sm:py-28 md:py-36">
      <div className="max-w-[1400px] mx-auto">
        <SectionHeader title="Selected" italic="work" meta="04 — projects" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7 md:gap-9">
          {/* ZYLO feature */}
          <motion.article {...enter} className="card md:col-span-2 overflow-hidden">
            <Link
              to="/work/zylo"
              className="grid grid-cols-1 md:grid-cols-[1.05fr_1fr] no-underline text-inherit"
            >
              <div className="relative p-6 sm:p-10 lg:p-14 flex flex-col justify-between gap-10 min-h-[320px]">
                <div className="flex items-center justify-between font-mono text-[12px] tracking-[0.06em] uppercase text-ink-3">
                  <span style={{ color: 'var(--accent)' }}>★ Feature project</span>
                  <span>2024 · Solo Designer</span>
                </div>
                <div>
                  <h3
                    className="font-display m-0 mb-4 font-extrabold text-ink"
                    style={{ fontSize: 'clamp(30px,3.6vw,56px)', letterSpacing: '-0.03em', lineHeight: 1 }}
                  >
                    Zylo
                  </h3>
                  <p
                    className="m-0 mb-6 text-ink-2 text-pretty"
                    style={{ fontSize: 'clamp(15px,1.4vw,18px)', lineHeight: 1.5, maxWidth: '42ch' }}
                  >
                    An AI marketing platform that lets small businesses run social, ads, Google
                    Business &amp; email — without a marketing team.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-7">
                    <TAG>AI Product</TAG>
                    <TAG>Multi-channel</TAG>
                    <TAG>End-to-end UX</TAG>
                  </div>
                  <span className="inline-flex items-center gap-3 font-mono text-[13px] tracking-[0.05em] uppercase text-ink group">
                    Read the case study
                    <span className="inline-flex w-8 h-8 rounded-full bg-accent text-white items-center justify-center transition-transform group-hover:translate-x-1">
                      <ArrowUpRight size={14} strokeWidth={2} />
                    </span>
                  </span>
                </div>
              </div>
              <div className="relative overflow-hidden min-h-[280px] md:min-h-[340px] bg-surface-2">
                <ImgSlot src="/screenshots/hero.png" alt="Zylo platform" />
              </div>
            </Link>
          </motion.article>

          <ProjectCard
            href="https://solvpro.com"
            tag1="Field Service SaaS"
            tag2="Lead Designer"
            title="SolvPro"
            desc="Scheduling, work orders, mobile time-tracking & analytics — built to read at a glance, mid-job, on a phone."
            image="/screenshots/lab.png"
          />
          <ProjectCard
            href="https://fanbasis.com"
            tag1="Creator Commerce"
            tag2="Lead Designer"
            title="FanBasis"
            desc="Checkout funnels, subscriptions & order bumps — every decision filtered through one question: does this reduce friction to buy?"
            image="/screenshots/lab3.png"
          />

          {/* CallonDoc feature */}
          <motion.article {...enter} className="card md:col-span-2 overflow-hidden">
            <a
              href="https://callondoc.com"
              target="_blank"
              rel="noopener"
              className="grid grid-cols-1 md:grid-cols-[1fr_1.05fr] no-underline text-inherit"
            >
              <div className="relative overflow-hidden min-h-[280px] md:min-h-[300px] bg-surface-2 order-2 md:order-1">
                <ImgSlot src="/screenshots/lab4.png" alt="CallonDoc" />
              </div>
              <div className="relative p-6 sm:p-10 lg:p-14 flex flex-col justify-center gap-5 order-1 md:order-2">
                <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.05em] uppercase text-ink-3">
                  <span>Telemedicine</span>
                  <span>Solo Designer · Adobe XD</span>
                </div>
                <h3
                  className="font-display m-0 font-bold text-ink"
                  style={{ fontSize: 'clamp(26px,3vw,46px)', letterSpacing: '-0.03em' }}
                >
                  CallonDoc
                </h3>
                <p
                  className="m-0 text-ink-2 text-pretty"
                  style={{ fontSize: 'clamp(15px,1.4vw,17px)', lineHeight: 1.5, maxWidth: '46ch' }}
                >
                  Patient–doctor booking flows, full app UI, and a conversion-focused landing page
                  built to hit a specific CTA target — not just look pretty.
                </p>
                <span className="inline-flex items-center gap-2.5 font-mono text-[12px] tracking-[0.05em] uppercase text-ink">
                  Visit live <ArrowUpRight size={14} strokeWidth={2} style={{ color: 'var(--accent)' }} />
                </span>
              </div>
            </a>
          </motion.article>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ href, tag1, tag2, title, desc, image }) {
  return (
    <motion.article {...enter} className="card overflow-hidden">
      <a
        href={href}
        target="_blank"
        rel="noopener"
        className="flex flex-col no-underline text-inherit h-full"
      >
        <div className="relative overflow-hidden aspect-[16/10] bg-surface-2">
          <ImgSlot src={image} alt={title} />
        </div>
        <div className="relative p-6 sm:p-7 flex flex-col gap-3.5 flex-1">
          <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.05em] uppercase text-ink-3">
            <span>{tag1}</span>
            <span>{tag2}</span>
          </div>
          <h3
            className="font-display m-0 font-bold text-ink"
            style={{ fontSize: 'clamp(24px,2.4vw,34px)', letterSpacing: '-0.025em' }}
          >
            {title}
          </h3>
          <p className="m-0 text-ink-2 text-[15px] leading-[1.5] text-pretty">{desc}</p>
          <span className="mt-1 inline-flex items-center gap-2.5 font-mono text-[12px] tracking-[0.05em] uppercase text-ink">
            Visit live <ArrowUpRight size={14} strokeWidth={2} style={{ color: 'var(--accent)' }} />
          </span>
        </div>
      </a>
    </motion.article>
  );
}
