import { useEffect } from "react";

export function AsciiBackground() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const bg = document.getElementById("ascii-bg") as HTMLElement | null;
    if (!bg) return;
    const bgEl = bg as HTMLElement;

    const charW = 7.4;
    const charH = 15.4;

    // Lensing character map keyed by angle (8 directions)
    // Each angle bucket gets the character that visually suggests
    // light bending in that direction around the void
    function lensChar(angle: number) {
      // angle in radians, 0 = right, going clockwise
      const norm = ((angle / Math.PI * 4) + 8) % 8; // 0–8 buckets
      const bucket = Math.floor(norm);
      const chars = ['—', '\\', '|', '/', '—', '\\', '|', '/'];
      return chars[bucket];
    }

    // Ambient starfield chars
    const SPARSE = ['·', ' ', ' ', '·', '∘', ' ', ' ', '·', ' '];
    const MID    = ['·', '∘', '°', '·', '∘'];
    const DENSE  = ['∘', '°', '·', '+', '∘'];

    // Black hole position — left of centre so content stays readable
    // On narrow screens this naturally sits in the upper portion
    const BH_X = 0.75;
    const BH_Y = 0.35;

    // Elliptical event horizon — wider than tall, tilted viewing angle
    // rx > ry gives the oblique Gargantua silhouette
    const EH_RX = 0.055; // horizontal radius (in normalised x, aspect-corrected later)
    const EH_RY = 0.032; // vertical radius
    const EH_TILT = -0.18; // slight counter-clockwise tilt in radians

    // Lensing zones
    const LENS_INNER = 1.0;  // multiplier on EH — starts lensing immediately outside horizon
    const LENS_OUTER = 5.5;  // multiplier — lensing fades beyond this
    const GRAVITY_FADE = 9.0;// ambient pull zone

    // Gravitational wave pulses
    const GW_INTERVAL = 280; // frames between pulses
    const gwPulses: Array<{ radius: number; born: number }> = [];

    let mouseX = -999, mouseY = -999;
    let targetX = -999, targetY = -999;
    let cols = 0, rows = 0;
    let t = 0;
    let running = true;
    const ripples: Array<{ x: number; y: number; born: number; radius: number }> = [];
    const MAX_RIPPLES = 6;

    function isDark() {
      return document.documentElement.getAttribute('data-theme') === 'dark';
    }

    function resize() {
      cols = Math.ceil(window.innerWidth / charW);
      rows = Math.ceil(window.innerHeight / charH);
    }

    window.addEventListener('resize', resize);
    resize();

    function onMouseMove(e: MouseEvent) {
      targetX = e.clientX / window.innerWidth;
      targetY = e.clientY / window.innerHeight;
      const last = ripples[ripples.length - 1];
      if (!last || t - last.born > 6) {
        if (ripples.length >= MAX_RIPPLES) ripples.shift();
        ripples.push({ x: targetX, y: targetY, born: t, radius: 0 });
      }
    }

    function onMouseLeave() {
      targetX = -999; targetY = -999;
    }

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    document.addEventListener('visibilitychange', onVisibilityChange);

    function onVisibilityChange() {
      running = !document.hidden;
      if (running) requestAnimationFrame(render);
    }

    function easeOut(x: number) { return 1 - Math.pow(1 - Math.max(0, x), 2); }

    function hash(x: number, y: number) {
      const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
      return n - Math.floor(n);
    }

    // Ellipse signed distance — returns 0 on edge, <0 inside, >0 outside
    // applies tilt rotation before testing
    function ellipseDist(dx: number, dy: number, rx: number, ry: number, tilt: number) {
      const cos = Math.cos(tilt), sin = Math.sin(tilt);
      const rx2 = cos * dx + sin * dy;
      const ry2 = -sin * dx + cos * dy;
      return Math.sqrt((rx2 / rx) * (rx2 / rx) + (ry2 / ry) * (ry2 / ry));
    }

    function render() {
      if (!running) return;
      const dark = isDark();
      const aspect = window.innerWidth / window.innerHeight;

      // Smooth cursor
      mouseX += (targetX - mouseX) * 0.10;
      mouseY += (targetY - mouseY) * 0.10;

      // Advance cursor ripples
      for (const r of ripples) r.radius += 0.013;
      while (ripples.length && ripples[0].radius > 0.85) ripples.shift();

      // Emit gravitational wave pulses periodically
      if (t % GW_INTERVAL === 0) {
        gwPulses.push({ radius: 0, born: t });
      }
      for (const p of gwPulses) p.radius += 0.006;
      while (gwPulses.length && gwPulses[0].radius > 0.9) gwPulses.shift();

      t++;
      let out = '';

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const nx = col / cols;
          const ny = row / rows;

          // Vector from this cell to black hole centre, aspect-corrected
          const rawDx = (nx - BH_X) * aspect;
          const rawDy = ny - BH_Y;
          const angleToBH = Math.atan2(rawDy, rawDx);

          // Ellipse distance (1.0 = on horizon edge, <1 = inside, >1 = outside)
          const ed = ellipseDist(rawDx, rawDy, EH_RX * aspect, EH_RY, EH_TILT);

          // ── EVENT HORIZON — absolute void ────────────
          if (ed <= LENS_INNER) {
            out += ' ';
            continue;
          }

          // ── PHOTON SPHERE — tight lensing ring ───────
          // Just outside the horizon: pure lensing chars, dense
          if (ed < 1.6) {
            // Brightness flicker along the ring based on angle — mimics
            // the bright photon ring seen in BH images (brighter on one side)
            const brightSide = Math.cos(angleToBH + EH_TILT + 0.4); // doppler-like
            const ringBright = (brightSide * 0.5 + 0.5);
            if (ringBright > 0.25) {
              out += lensChar(angleToBH);
            } else {
              out += ' ';
            }
            continue;
          }

          // ── LENSING ZONE — distortion falloff ────────
          let lensIntensity = 0;
          if (ed < LENS_OUTER) {
            lensIntensity = easeOut(1 - (ed - LENS_INNER) / (LENS_OUTER - LENS_INNER));
          }

          // ── AMBIENT STARFIELD ─────────────────────────
          const slow1 = Math.sin(nx * 5.8 + ny * 2.9 + t * 0.007) * 0.5 + 0.5;
          const slow2 = Math.sin(nx * 2.3 - ny * 6.1 + t * 0.004) * 0.5 + 0.5;
          const ambient = slow1 * slow2 * 0.5;

          // Rare deterministic sparkle stars
          const h = hash(col, row);
          const sparkle = h > 0.987
            ? (Math.sin(t * 0.035 + h * 71.3) * 0.5 + 0.5) * 0.85
            : 0;

          // Gravity pull on ambient — field gets denser approaching BH
          let gravityBoost = 0;
          if (ed < GRAVITY_FADE) {
            gravityBoost = easeOut(1 - (ed - LENS_OUTER) / (GRAVITY_FADE - LENS_OUTER)) * 0.3;
          }

          // ── CURSOR RIPPLE ─────────────────────────────
          let coreGlow = 0;
          if (mouseX > -1) {
            const cdx = (nx - mouseX) * aspect;
            const cdy = ny - mouseY;
            const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
            coreGlow = easeOut(Math.max(0, 1 - cdist / 0.15)) * 0.7;
          }

          let rippleGlow = 0;
          for (const r of ripples) {
            const rdx = (nx - r.x) * aspect;
            const rdy = ny - r.y;
            const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
            const ringW = 0.022;
            const diff = Math.abs(rdist - r.radius);
            if (diff < ringW) {
              const age = r.radius / 0.6;
              rippleGlow = Math.max(rippleGlow, (1 - diff / ringW) * (1 - age * 0.88) * 0.5);
            }
          }

          // ── GRAVITATIONAL WAVES ───────────────────────
          let gwGlow = 0;
          for (const p of gwPulses) {
            const pdx = rawDx; // already aspect-corrected
            const pdy = rawDy;
            const pdist = Math.sqrt(pdx * pdx + pdy * pdy) / aspect; // normalised
            const ringW = 0.018;
            const diff = Math.abs(pdist - p.radius);
            if (diff < ringW) {
              const age = p.radius / 0.7;
              gwGlow = Math.max(gwGlow, (1 - diff / ringW) * (1 - age * 0.92) * 0.45);
            }
          }

          // ── COMPOSITE ─────────────────────────────────
          const intensity = Math.min(1,
            ambient + sparkle + gravityBoost +
            lensIntensity * 0.4 +
            coreGlow + rippleGlow + gwGlow
          );

          // Character selection
          let ch: string;
          if (intensity < 0.04) {
            ch = ' ';
          } else if (lensIntensity > 0.15 && intensity > 0.15) {
            // In lensing zone — characters follow the bend geometry
            ch = lensChar(angleToBH);
          } else if (sparkle > 0.55) {
            ch = intensity > 0.72 ? '★' : '·';
          } else if (intensity < 0.22) {
            ch = SPARSE[Math.floor(h * SPARSE.length)];
          } else if (intensity < 0.5) {
            ch = MID[Math.floor(intensity * MID.length) % MID.length];
          } else {
            ch = DENSE[Math.floor(intensity * DENSE.length) % DENSE.length];
          }

          out += ch;
        }
        out += '\n';
      }

      bgEl.textContent = out;
      requestAnimationFrame(render);
    }

    render();

    return () => {
      running = false;
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return <div className="ascii-bg" id="ascii-bg" aria-hidden="true" />;
}
