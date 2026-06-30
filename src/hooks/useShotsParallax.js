import { useEffect } from 'react';

export function useShotsParallax(stageRef) {
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const cards = Array.from(stage.querySelectorAll('[data-shot]'));
    if (!cards.length) return;
    const st = cards.map(() => ({ x: 0, y: 0 }));
    let tnx = 0,
      tny = 0,
      nx = 0,
      ny = 0,
      raf = 0;
    const onMove = (e) => {
      const r = stage.getBoundingClientRect();
      tnx = Math.max(-1.2, Math.min(1.2, ((e.clientX - r.left) / r.width - 0.5) * 2));
      tny = Math.max(-1.2, Math.min(1.2, ((e.clientY - r.top) / r.height - 0.5) * 2));
    };
    const leave = () => {
      tnx = 0;
      tny = 0;
    };
    window.addEventListener('mousemove', onMove);
    stage.addEventListener('mouseleave', leave);
    const cleanups = [];
    cards.forEach((c) => {
      c.dataset.z0 = c.style.zIndex || '1';
      const en = () => {
        c.style.zIndex = '40';
        c.dataset.hover = '1';
        c.style.boxShadow = '0 44px 90px -26px rgba(177,91,255,0.55)';
        c.style.borderColor = 'rgba(177,91,255,0.5)';
      };
      const lv = () => {
        c.style.zIndex = c.dataset.z0;
        c.dataset.hover = '';
        c.style.boxShadow = '0 30px 70px -30px rgba(0,0,0,0.8)';
        c.style.borderColor = 'rgba(255,255,255,0.12)';
      };
      c.addEventListener('mouseenter', en);
      c.addEventListener('mouseleave', lv);
      cleanups.push(() => {
        c.removeEventListener('mouseenter', en);
        c.removeEventListener('mouseleave', lv);
      });
    });
    const loop = () => {
      nx += (tnx - nx) * 0.07;
      ny += (tny - ny) * 0.07;
      for (let i = 0; i < cards.length; i++) {
        const c = cards[i];
        const depth = parseFloat(c.dataset.depth) || 0.6;
        const s = st[i];
        const tx = nx * depth * 36,
          ty = ny * depth * 36;
        s.x += (tx - s.x) * 0.12;
        s.y += (ty - s.y) * 0.12;
        const ry = nx * depth * 5,
          rx = -ny * depth * 5;
        const sc = c.dataset.hover ? 1.05 : 1;
        c.style.transform = `translate(${s.x.toFixed(2)}px,${s.y.toFixed(
          2
        )}px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale(${sc})`;
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      window.removeEventListener('mousemove', onMove);
      stage.removeEventListener('mouseleave', leave);
      cancelAnimationFrame(raf);
      cleanups.forEach((fn) => fn());
    };
  }, [stageRef]);
}
