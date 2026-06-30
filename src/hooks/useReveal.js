import { useEffect } from 'react';

export function useReveal(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reveals = Array.from(root.querySelectorAll('[data-reveal]'));
    reveals.forEach((el) => {
      const dir = el.getAttribute('data-reveal') || 'up';
      let tf = 'translateY(32px)';
      if (dir === 'left') tf = 'translateX(-52px)';
      else if (dir === 'right') tf = 'translateX(52px)';
      else if (dir === 'scale') tf = 'scale(0.93)';
      el.style.opacity = '0';
      el.style.transform = tf;
      el.style.filter = 'blur(6px)';
      el.style.willChange = 'opacity, transform, filter';
      el.style.transition =
        'opacity .7s cubic-bezier(.16,1,.3,1), transform .8s cubic-bezier(.16,1,.3,1), filter .55s ease';
      let delay = 0;
      const parent = el.closest('[data-stagger]');
      if (parent) {
        const sibs = Array.from(parent.querySelectorAll('[data-reveal]'));
        delay = Math.max(0, sibs.indexOf(el)) * 0.08;
      }
      el.style.transitionDelay = delay + 's';
    });
    const show = (el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.filter = 'none';
      el.__shown = true;
    };
    const check = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      for (const el of reveals) {
        if (el.__shown) continue;
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.9 && r.bottom > 0) show(el);
      }
    };
    check();
    requestAnimationFrame(check);
    const onScroll = () => check();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    const fb = setTimeout(() => {
      reveals.forEach((el) => {
        if (!el.__shown) {
          el.style.transition = 'none';
          show(el);
        }
      });
    }, 2800);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      clearTimeout(fb);
    };
  }, [rootRef]);
}
