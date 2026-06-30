import { motion } from 'framer-motion';

export default function SectionHeader({ kicker, title, italic, meta }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-15% 0px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-baseline justify-between gap-6 flex-wrap mb-10 sm:mb-16"
    >
      <div>
        {kicker && <p className="eyebrow m-0 mb-3">{kicker}</p>}
        <h2
          className="font-display m-0 font-extrabold text-ink"
          style={{ fontSize: 'clamp(32px,4.6vw,72px)', letterSpacing: '-0.035em', lineHeight: 1 }}
        >
          {title}{' '}
          {italic && (
            <span className="font-serif italic font-normal" style={{ color: 'var(--accent)' }}>
              {italic}
            </span>
          )}
        </h2>
      </div>
      {meta && <span className="eyebrow m-0">{meta}</span>}
    </motion.div>
  );
}
