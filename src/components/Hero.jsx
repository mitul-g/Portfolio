import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import { useHeroThree } from '../hooks/useHeroThree';

const TAGS = [
  'UX Design', 'UX Research', 'AI-Powered Products', 'Product Design',
  'Design Systems', 'Interaction Design', 'SaaS', 'Prototyping',
  'User Flows', 'Conversion Design', 'Mobile UX', 'Usability Testing',
  'Figma', 'Information Architecture',
];

// Smooth long sine path. viewBox 3200x200, repeats every 800px in x.
// Each peak/trough ~400 wide so type follows a gentle curve.
const WAVE_PATH =
  'M -100 100 C 100 40, 300 40, 500 100 S 900 160, 1100 100 S 1500 40, 1700 100 S 2100 160, 2300 100 S 2700 40, 2900 100 S 3300 160, 3500 100';

export default function Hero() {
  const ref = useRef(null);
  const canvasRef = useRef(null);
  const accentRef = useRef('#E8743C');

  useHeroThree(canvasRef, accentRef);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacityTitle = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Mouse-driven gradient — softened opacities, smaller radii
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.4);
  const sx = useSpring(mx, { stiffness: 50, damping: 24, mass: 0.7 });
  const sy = useSpring(my, { stiffness: 50, damping: 24, mass: 0.7 });
  const sx2 = useSpring(mx, { stiffness: 28, damping: 20, mass: 1.2 });
  const sy2 = useSpring(my, { stiffness: 28, damping: 20, mass: 1.2 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      if (y < -0.1 || y > 1.1) return;
      mx.set(Math.max(0, Math.min(1, x)));
      my.set(Math.max(0, Math.min(1, y)));
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, [mx, my]);

  const [pos, setPos] = useState({ x: 50, y: 40, x2: 80, y2: 30, x3: 30, y3: 80 });
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const x = sx.get() * 100;
      const y = sy.get() * 100;
      const x2 = sx2.get() * 100;
      const y2 = sy2.get() * 100;
      setPos({
        x, y,
        x2: 90 - x2 * 0.6,
        y2: 30 + y2 * 0.4,
        x3: 30 + x * 0.4,
        y3: 90 - y * 0.5,
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [sx, sy, sx2, sy2]);

  // Marquee tag string — long enough to fill path, then animate offset for loop
  const tagString = TAGS.map((t) => `${t}    ✳    `).join('');
  const repeated = tagString.repeat(6);

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-[100svh] flex flex-col justify-end pt-28 sm:pt-32 pb-0 overflow-hidden"
    >
      {/* Three.js subtle particles — very low opacity, behind gradient */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full -z-30 pointer-events-none"
        style={{ opacity: 0.18 }}
      />

      {/* Mouse-mixing gradient — very subtle, easy on eyes */}
      <div aria-hidden="true" className="absolute inset-0 -z-20 pointer-events-none">
        <div className="absolute inset-0" style={{ background: 'var(--bg)' }} />
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(30vmax circle at ${pos.x}% ${pos.y}%, color-mix(in oklab, var(--accent) 7%, transparent), transparent 70%),
              radial-gradient(28vmax circle at ${pos.x2}% ${pos.y2}%, color-mix(in oklab, var(--teal) 5%, transparent), transparent 70%),
              radial-gradient(32vmax circle at ${pos.x3}% ${pos.y3}%, color-mix(in oklab, var(--accent-2) 5%, transparent), transparent 70%)
            `,
            opacity: 0.7,
            filter: 'blur(8px)',
          }}
        />
        {/* Strong vignette — fades all colour back to bg toward edges + bottom */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(90% 70% at 50% 45%, transparent 30%, var(--bg) 100%)',
          }}
        />
        {/* Bottom fade — clean handoff into next section */}
        <div
          className="absolute inset-x-0 bottom-0 h-1/3"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, var(--bg) 80%)',
          }}
        />
      </div>

      <motion.div
        style={{ y: yTitle, opacity: opacityTitle }}
        className="relative max-w-[1400px] w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-16"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2.5 font-mono uppercase text-ink-3 mb-6 sm:mb-10 px-3 py-1.5 rounded-full border border-border bg-surface/60 backdrop-blur"
          style={{ fontSize: 12, letterSpacing: '0.08em' }}
        >
          <span className="relative inline-flex w-1.5 h-1.5">
            <span className="absolute inset-0 rounded-full bg-emerald-500" />
            <span className="absolute inset-0 rounded-full bg-emerald-500 animate-pulse-dot" />
          </span>
          Available for new work — 2026
        </motion.div>

        <h1
          className="font-display font-bold text-balance m-0 text-ink"
          style={{
            fontSize: 'clamp(36px, 7.5vw, 112px)',
            lineHeight: 0.98,
            letterSpacing: '-0.035em',
            maxWidth: '19ch',
          }}
        >
          {['Senior', 'UI/UX', 'designer', 'turning'].map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block mr-[0.25em]"
            >
              {w}
            </motion.span>
          ))}
          <motion.span
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block mr-[0.25em] font-serif italic font-normal"
            style={{ color: 'var(--accent)' }}
          >
            complex products
          </motion.span>
          {['into', 'effortless', 'experiences.'].map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block mr-[0.25em]"
            >
              {w}
            </motion.span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mt-8 sm:mt-12 max-w-[1400px]"
        >
          <p
            className="m-0 text-ink-2 text-pretty"
            style={{
              fontSize: 'clamp(16px, 1.5vw, 19px)',
              lineHeight: 1.55,
              maxWidth: '46ch',
            }}
          >
            I'm <span className="text-ink font-semibold">Mitul</span> — 7+ years designing
            AI-powered products, dense SaaS tools and conversion-focused flows that real people
            actually understand.
          </p>
          <a href="#work" className="btn-ghost flex-shrink-0 self-start sm:self-auto">
            See selected work
            <span className="inline-flex w-7 h-7 rounded-full bg-accent text-white items-center justify-center">
              <ArrowDown size={14} strokeWidth={2} />
            </span>
          </a>
        </motion.div>
      </motion.div>

      {/* CURVED MARQUEE — text along sine path, masked at top + bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="relative mt-12 sm:mt-20 w-full overflow-hidden"
        style={{
          height: 'clamp(120px, 18vh, 200px)',
          WebkitMaskImage:
            'linear-gradient(180deg, transparent 0%, #000 26%, #000 74%, transparent 100%)',
          maskImage:
            'linear-gradient(180deg, transparent 0%, #000 26%, #000 74%, transparent 100%)',
        }}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 3200 200"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 w-full h-full"
        >
          <defs>
            <path id="wavePath" d={WAVE_PATH} />
          </defs>
          <text
            fill="var(--ink)"
            style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 600,
              fontSize: 56,
              letterSpacing: '-0.02em',
            }}
          >
            <textPath href="#wavePath" startOffset="0%">
              {repeated}
              <animate
                attributeName="startOffset"
                from="0%"
                to="-50%"
                dur="60s"
                repeatCount="indefinite"
              />
            </textPath>
          </text>
        </svg>
      </motion.div>
    </section>
  );
}
