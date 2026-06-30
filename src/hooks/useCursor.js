import { useEffect } from 'react';

export function useCursor(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const isFine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isFine) return;

    const dot = document.createElement('div');
    const ring = document.createElement('div');
    dot.style.cssText =
      'position:fixed;top:0;left:0;width:7px;height:7px;background:#B15BFF;border-radius:50%;pointer-events:none;z-index:9999;transform:translate(-100px,-100px) translate(-50%,-50%);will-change:transform;';
    ring.style.cssText =
      'position:fixed;top:0;left:0;width:42px;height:42px;border:1.5px solid rgba(177,91,255,0.9);border-radius:50%;pointer-events:none;z-index:9999;transform:translate(-100px,-100px) translate(-50%,-50%);mix-blend-mode:difference;will-change:transform;';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mx = innerWidth / 2,
      my = innerHeight / 2,
      rx = mx,
      ry = my,
      scale = 1,
      tScale = 1,
      raf = 0;
    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
    };
    const tick = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      scale += (tScale - scale) * 0.18;
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%) scale(${scale})`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('mousemove', onMove);
    tick();

    const hovers = root.querySelectorAll(
      'a, button, [data-magnetic], [data-cursor], [data-row], [data-card-link]'
    );
    const cleanups = [];
    hovers.forEach((el) => {
      const en = () => {
        tScale = 2.1;
        ring.style.borderColor = 'rgba(177,91,255,0.95)';
        ring.style.background = 'rgba(177,91,255,0.12)';
      };
      const lv = () => {
        tScale = 1;
        ring.style.background = 'transparent';
      };
      el.addEventListener('mouseenter', en);
      el.addEventListener('mouseleave', lv);
      cleanups.push(() => {
        el.removeEventListener('mouseenter', en);
        el.removeEventListener('mouseleave', lv);
      });
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      cleanups.forEach((fn) => fn());
      dot.remove();
      ring.remove();
    };
  }, [rootRef]);
}
