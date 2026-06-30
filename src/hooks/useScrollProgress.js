import { useEffect } from 'react';

export function useScrollProgress() {
  useEffect(() => {
    const bar = document.createElement('div');
    bar.style.cssText =
      'position:fixed;top:0;left:0;height:2px;width:100%;transform-origin:left;transform:scaleX(0);background:linear-gradient(90deg,var(--accent),var(--accent-2));z-index:300;pointer-events:none;';
    document.body.appendChild(bar);
    let raf = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
      bar.style.transform = 'scaleX(' + p + ')';
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => { update(); raf = 0; });
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
      bar.remove();
    };
  }, []);
}
