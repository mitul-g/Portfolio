import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useShotsParallax } from '../hooks/useShotsParallax';
import SectionHeader from './SectionHeader';
import ImgSlot from './ImgSlot';

const SHOTS = [
  { id: 'a', src: '/screenshots/shots.png', depth: 0.5, style: { left: '31%', top: '15%', width: '38%', zIndex: 5 }, aspect: '4/3' },
  { id: 'b', src: '/screenshots/lab.png', depth: 1.0, style: { left: '4%', top: '31%', width: '25%', zIndex: 6 }, aspect: '4/3' },
  { id: 'c', src: '/screenshots/lab3.png', depth: 0.85, style: { left: '70%', top: '19%', width: '25%', zIndex: 6 }, aspect: '4/3' },
  { id: 'd', src: '/screenshots/lab4.png', depth: 1.25, style: { left: '14%', top: '59%', width: '23%', zIndex: 7 }, aspect: '4/3' },
  { id: 'e', src: '/screenshots/shots-drift.png', depth: 1.05, style: { left: '55%', top: '57%', width: '31%', zIndex: 7 }, aspect: '16/10' },
  { id: 'f', src: '/screenshots/01-lab2.png', depth: 1.5, style: { left: '47%', top: '5%', width: '15%', zIndex: 8 }, aspect: '1/1' },
];

export default function Shots() {
  const stageRef = useRef(null);
  useShotsParallax(stageRef);

  return (
    <section
      id="demo"
      className="relative overflow-hidden px-4 sm:px-6 md:px-10 lg:px-16 py-20 sm:py-28 md:py-32"
      style={{ background: 'var(--surface-2)' }}
    >
      <div className="max-w-[1300px] mx-auto">
        <SectionHeader kicker="Off the clock" title="Lately on" italic="Dribbble." />

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:block"
        >
          <div
            ref={stageRef}
            data-shots
            className="relative rounded-[26px] overflow-hidden border border-border"
            style={{
              height: 'clamp(440px,62vh,600px)',
              background: 'var(--surface)',
              perspective: 1100,
            }}
          >
            {SHOTS.map((s) => (
              <div
                key={s.id}
                data-shot
                data-depth={s.depth}
                className="absolute rounded-[14px] overflow-hidden border border-border bg-surface"
                style={{
                  ...s.style,
                  boxShadow: 'var(--shadow-3)',
                  willChange: 'transform',
                }}
              >
                <ImgSlot src={s.src} aspect={s.aspect} />
              </div>
            ))}
          </div>
          <p className="eyebrow mt-5 m-0">↳ move your cursor — they drift</p>
        </motion.div>

        {/* mobile — simple grid */}
        <div className="md:hidden grid grid-cols-2 gap-3">
          {SHOTS.map((s) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-[14px] overflow-hidden border border-border bg-surface"
              style={{ aspectRatio: s.aspect }}
            >
              <ImgSlot src={s.src} aspect={s.aspect} />
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <a
            href="https://dribbble.com/mitul690"
            target="_blank"
            rel="noopener"
            className="btn-ghost"
          >
            <span className="w-2 h-2 rounded-full" style={{ background: '#EA4C89' }} />
            View all shots
            <ArrowUpRight size={14} strokeWidth={2} />
          </a>
        </div>
      </div>
    </section>
  );
}
