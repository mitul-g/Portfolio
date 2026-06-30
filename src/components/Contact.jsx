import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden px-4 sm:px-6 md:px-10 lg:px-16 py-20 sm:py-28 md:py-36"
    >
      <div
        aria-hidden="true"
        className="absolute top-[-30%] left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
        style={{
          width: '80vw',
          height: '80vw',
          maxWidth: 880,
          maxHeight: 880,
          background:
            'radial-gradient(circle at 50% 50%, var(--accent-soft), transparent 60%)',
          filter: 'blur(60px)',
        }}
      />
      <div className="relative max-w-[1400px] mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="eyebrow m-0 mb-5"
        >
          Let's build something
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-display m-0 font-extrabold text-ink"
          style={{
            fontSize: 'clamp(48px,9.4vw,158px)',
            letterSpacing: '-0.045em',
            lineHeight: 0.92,
            marginBottom: 'clamp(36px,6vh,60px)',
          }}
        >
          Got a hard{' '}
          <span className="font-serif italic font-normal" style={{ color: 'var(--accent)' }}>
            problem
          </span>
          ?
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-3 sm:gap-4 items-center"
        >
          <a
            href="mailto:hello@mitul.design"
            className="btn-primary"
            style={{ padding: '16px 26px', fontSize: 15 }}
          >
            Start a conversation
            <span className="inline-flex w-6 h-6 rounded-full bg-accent text-white items-center justify-center">
              <ArrowRight size={12} strokeWidth={2.25} />
            </span>
          </a>
          <a
            href="https://dribbble.com/mitul690"
            target="_blank"
            rel="noopener"
            className="btn-ghost"
            style={{ padding: '16px 24px', fontSize: 15 }}
          >
            <span className="w-2 h-2 rounded-full" style={{ background: '#EA4C89' }} />
            Dribbble
            <ArrowUpRight size={14} strokeWidth={2} className="text-ink-3" />
          </a>
          <a
            href="https://www.behance.net/mitul690"
            target="_blank"
            rel="noopener"
            className="btn-ghost"
            style={{ padding: '16px 24px', fontSize: 15 }}
          >
            <span className="w-2 h-2 rounded-full" style={{ background: '#1769FF' }} />
            Behance
            <ArrowUpRight size={14} strokeWidth={2} className="text-ink-3" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
