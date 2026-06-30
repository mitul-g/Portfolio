import { useEffect } from 'react';

export function useCardHover(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const cleanups = [];
    root.querySelectorAll('[data-card]').forEach((card) => {
      const sweep = card.querySelector('[data-card-sweep]');
      const veil = card.querySelector('[data-card-veil]');
      const en = () => {
        card.style.transform = 'translateY(-6px)';
        card.style.borderColor = 'rgba(177,91,255,0.4)';
        if (sweep) sweep.style.transform = 'translateX(120%)';
        if (veil) veil.style.opacity = '1';
      };
      const lv = () => {
        card.style.transform = 'translateY(0)';
        card.style.borderColor = 'rgba(255,255,255,0.08)';
        if (sweep) sweep.style.transform = 'translateX(-120%)';
        if (veil) veil.style.opacity = '0';
      };
      card.addEventListener('mouseenter', en);
      card.addEventListener('mouseleave', lv);
      cleanups.push(() => {
        card.removeEventListener('mouseenter', en);
        card.removeEventListener('mouseleave', lv);
      });
    });
    root.querySelectorAll('[data-row]').forEach((rowEl) => {
      const fill = rowEl.querySelector('[data-row-fill]');
      const title = rowEl.querySelector('[data-row-title]');
      const arrow = rowEl.querySelector('[data-row-arrow]');
      const body = rowEl.querySelector('[data-row-body]');
      const en = () => {
        if (fill) fill.style.transform = 'scaleX(1)';
        if (title) {
          title.style.transform = 'translateX(14px)';
          title.style.color = '#fff';
        }
        if (arrow) {
          arrow.style.opacity = '1';
          arrow.style.transform = 'translateX(0)';
        }
        if (body) body.style.maxHeight = body.scrollHeight + 'px';
      };
      const lv = () => {
        if (fill) fill.style.transform = 'scaleX(0)';
        if (title) {
          title.style.transform = 'translateX(0)';
          title.style.color = '#ECEAF2';
        }
        if (arrow) {
          arrow.style.opacity = '0';
          arrow.style.transform = 'translateX(-10px)';
        }
        if (body) body.style.maxHeight = '0px';
      };
      rowEl.addEventListener('mouseenter', en);
      rowEl.addEventListener('mouseleave', lv);
      cleanups.push(() => {
        rowEl.removeEventListener('mouseenter', en);
        rowEl.removeEventListener('mouseleave', lv);
      });
    });
    return () => cleanups.forEach((fn) => fn());
  }, [rootRef]);
}
