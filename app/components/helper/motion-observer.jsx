'use client';

import { useEffect, useRef } from 'react';

export default function MotionObserver() {
  const progressRef = useRef(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canReveal = !reducedMotion && 'IntersectionObserver' in window;
    let revealObserver;
    let mutationObserver;

    if (canReveal) {
      document.documentElement.classList.add('motion-ready');
      const observed = new WeakSet();
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => entry.target.classList.toggle('motion-visible', entry.isIntersecting));
      }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' });

      const observeMotion = (root) => {
        if (root.nodeType !== Node.ELEMENT_NODE) return;
        if (root.matches('[data-motion]') && !observed.has(root)) {
          observed.add(root);
          revealObserver.observe(root);
        }
        root.querySelectorAll('[data-motion]').forEach((element) => {
          if (!observed.has(element)) {
            observed.add(element);
            revealObserver.observe(element);
          }
        });
      };

      observeMotion(document.documentElement);
      mutationObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => mutation.addedNodes.forEach(observeMotion));
      });
      mutationObserver.observe(document.body, { childList: true, subtree: true });
    }

    let frame = 0;
    const updateScrollEffects = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const root = document.documentElement;
        const scrollable = root.scrollHeight - window.innerHeight;
        const progress = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
        if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
        if (!reducedMotion) {
          root.style.setProperty('--scroll-shift', `${Math.max(window.scrollY * -0.012, -24)}px`);
        }
        frame = 0;
      });
    };

    updateScrollEffects();
    window.addEventListener('scroll', updateScrollEffects, { passive: true });
    window.addEventListener('resize', updateScrollEffects);

    return () => {
      window.removeEventListener('scroll', updateScrollEffects);
      window.removeEventListener('resize', updateScrollEffects);
      if (frame) window.cancelAnimationFrame(frame);
      mutationObserver?.disconnect();
      revealObserver?.disconnect();
      document.documentElement.classList.remove('motion-ready');
      document.documentElement.style.removeProperty('--scroll-shift');
    };
  }, []);

  return <div className="portfolio-scroll-progress" aria-hidden="true"><span ref={progressRef} /></div>;
}
