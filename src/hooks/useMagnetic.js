import { useEffect } from 'react';

export function useMagnetic(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const cleanups = [];
    root.querySelectorAll('[data-magnetic]').forEach((el) => {
      const mm = (e) => {
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - (r.left + r.width / 2)) * 0.28}px, ${
          (e.clientY - (r.top + r.height / 2)) * 0.32
        }px)`;
      };
      const ml = () => {
        el.style.transform = 'translate(0,0)';
      };
      el.addEventListener('mousemove', mm);
      el.addEventListener('mouseleave', ml);
      cleanups.push(() => {
        el.removeEventListener('mousemove', mm);
        el.removeEventListener('mouseleave', ml);
      });
    });
    return () => cleanups.forEach((fn) => fn());
  }, [rootRef]);
}
