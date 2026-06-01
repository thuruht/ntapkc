/* ═══════════════════════════════════════════════════════════════
   index.js — NtApKC interactive layer
   Handles: mouse-glow · tentacle spawn · bracket draw · entrance
   ═══════════════════════════════════════════════════════════════ */

(function () {
  const prefersReduced =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Mouse-tracking background glow ──────────────────────── */
  if (!prefersReduced) {
    document.addEventListener('mousemove', (e) => {
      document.body.style.setProperty(
        '--mx', `${((e.clientX / innerWidth) * 100).toFixed(1)}%`
      );
      document.body.style.setProperty(
        '--my', `${((e.clientY / innerHeight) * 100).toFixed(1)}%`
      );
    });

    /* Glow pulse on click */
    window.addEventListener('mousedown', () => {
      gsap.to(document.body, {
        '--bg-glow': '#036b58',
        duration: 0.18,
        ease: 'power2.out',
        onComplete: () => {
          gsap.to(document.body, {
            '--bg-glow': '#024034',
            duration: 0.9,
            ease: 'power2.out'
          });
        }
      });
    });
  }

  /* ── Tentacle spawn ───────────────────────────────────────── */
  const host = document.getElementById('tentacles');
  if (host) {
    const n = innerWidth < 700 ? 10 : 18;
    for (let i = 0; i < n; i++) {
      const el = document.createElement('span');
      el.className = 'tentacle';
      el.style.setProperty('--x',   `${(Math.random() * 100).toFixed(1)}%`);
      el.style.setProperty('--len', `${(28 + Math.random() * 42).toFixed(1)}vh`);
      el.style.setProperty('--rot', `${(3  + Math.random() * 10).toFixed(1)}deg`);
      el.style.setProperty('--dur', `${(4  + Math.random() *  6).toFixed(1)}s`);
      el.style.opacity = (0.25 + Math.random() * 0.50).toFixed(2);
      el.style.animationDelay = `${(Math.random() * 4).toFixed(2)}s`;
      host.appendChild(el);
    }
  }

  /* ── GSAP entrance + bracket line-draw ───────────────────── */
  window.addEventListener('load', () => {
    if (prefersReduced) return;

    /* Corner bracket draw */
    gsap.to('.bracket-path', {
      strokeDashoffset: 0,
      duration: 1.8,
      ease: 'power2.out',
      stagger: 0.25
    });

    /* Panel entrance */
    gsap.from('.panel', {
      opacity: 0,
      y: 32,
      duration: 1.1,
      ease: 'power3.out',
      delay: 0.35
    });

    /* Feature card stagger */
    gsap.from('.feat', {
      opacity: 0,
      y: 20,
      duration: 0.7,
      ease: 'power2.out',
      stagger: 0.15,
      delay: 0.85
    });

    /* Serve-list pill stagger */
    gsap.from('.serve-list li', {
      opacity: 0,
      scale: 0.9,
      duration: 0.5,
      ease: 'back.out(1.5)',
      stagger: 0.07,
      delay: 1.2
    });

    /* CTA block */
    gsap.from('.cta-block', {
      opacity: 0,
      y: 16,
      duration: 0.8,
      ease: 'power2.out',
      delay: 1.6
    });
  });
})();
