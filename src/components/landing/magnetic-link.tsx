"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

/**
 * The one action on the page.
 *
 * The anchor itself never moves: it is a stable, generously padded hit area.
 * Inside it a pill is carried by a damped spring toward the pointer, a hairline
 * ring trails it on a softer spring, and the label leads slightly, so the
 * button reads as layered mass rather than a sliding rectangle. Because the
 * pull is bounded below the anchor's padding, the pointer can never chase the
 * pill out of the clickable region.
 *
 * Touch gets a press response but no pursuit (there is no hover to pursue), and
 * reduced motion keeps the control perfectly still. Keyboard use is a native link.
 */

const RANGE = 150; // px beyond the pill's edge where attraction begins
const MAX_PULL = 13; // px — must stay below the anchor padding in landing.css
const STEP = 1 / 120;

type Spring = { value: number; velocity: number };

function advance(
  spring: Spring,
  target: number,
  stiffness: number,
  damping: number,
) {
  const force = (target - spring.value) * stiffness - spring.velocity * damping;
  spring.velocity += force * STEP;
  spring.value += spring.velocity * STEP;
}

export function MagneticLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const anchorRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const anchor = anchorRef.current;
    const pill = anchor?.querySelector<HTMLElement>(".landing__cta-pill");
    const ring = anchor?.querySelector<HTMLElement>(".landing__cta-ring");
    const label = anchor?.querySelector<HTMLElement>(".landing__cta-label");
    const arrow = anchor?.querySelector<SVGElement>(".landing__cta-arrow");
    if (!anchor || !pill || !ring || !label || !arrow) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const x: Spring = { value: 0, velocity: 0 };
    const y: Spring = { value: 0, velocity: 0 };
    const ringX: Spring = { value: 0, velocity: 0 };
    const ringY: Spring = { value: 0, velocity: 0 };
    const scale: Spring = { value: 1, velocity: 0 };
    let targetX = 0;
    let targetY = 0;
    let engaged = 0;
    let pressed = false;
    let hovered = false;
    let centerX = 0;
    let centerY = 0;
    let halfWidth = 0;
    let halfHeight = 0;
    let raf = 0;
    let last = 0;
    let carry = 0;

    const measure = () => {
      const box = anchor.getBoundingClientRect();
      centerX = box.left + box.width / 2;
      centerY = box.top + box.height / 2;
      halfWidth = pill.offsetWidth / 2;
      halfHeight = pill.offsetHeight / 2;
    };

    const render = () => {
      const dx = x.value;
      const dy = y.value;
      pill.style.transform = `translate3d(${dx.toFixed(2)}px, ${dy.toFixed(2)}px, 0) scale(${scale.value.toFixed(4)})`;
      ring.style.transform = `translate3d(${ringX.value.toFixed(2)}px, ${ringY.value.toFixed(2)}px, 0) scale(${(1 + (scale.value - 1) * 1.8 + engaged * 0.035).toFixed(4)})`;
      label.style.transform = `translate3d(${(dx * 0.22).toFixed(2)}px, ${(dy * 0.22).toFixed(2)}px, 0)`;
      arrow.style.transform = `translate3d(${(dx * 0.5).toFixed(2)}px, ${(dy * 0.36).toFixed(2)}px, 0)`;
    };

    const frame = (now: number) => {
      const elapsed = last ? Math.min(0.05, (now - last) / 1000) : STEP;
      last = now;
      carry += elapsed;
      const held = engaged > 0;
      // Taut while the pointer holds it; a looser, slightly livelier spring for the release.
      const stiffness = held ? 230 : 150;
      const damping = held ? 19 : 13.5;
      const scaleTarget = pressed ? 0.955 : hovered ? 1.025 : 1;
      while (carry >= STEP) {
        advance(x, targetX, stiffness, damping);
        advance(y, targetY, stiffness, damping);
        advance(ringX, targetX * 0.55, 90, 12);
        advance(ringY, targetY * 0.55, 90, 12);
        advance(scale, scaleTarget, 420, 26);
        carry -= STEP;
      }
      render();
      const resting =
        !held &&
        !pressed &&
        Math.abs(x.value) + Math.abs(y.value) < 0.02 &&
        Math.abs(x.velocity) + Math.abs(y.velocity) < 0.4 &&
        Math.abs(ringX.value) + Math.abs(ringY.value) < 0.02 &&
        Math.abs(ringX.velocity) + Math.abs(ringY.velocity) < 0.4 &&
        Math.abs(scale.value - scaleTarget) < 0.0005 &&
        Math.abs(scale.velocity) < 0.01;
      if (resting) {
        x.value = y.value = ringX.value = ringY.value = 0;
        x.velocity = y.velocity = ringX.velocity = ringY.velocity = 0;
        scale.value = scaleTarget;
        render();
        raf = 0;
        last = 0;
        carry = 0;
        return;
      }
      raf = requestAnimationFrame(frame);
    };
    const wake = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const release = () => {
      targetX = 0;
      targetY = 0;
      engaged = 0;
      wake();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch" || reducedMotion.matches) return;
      measure(); // the anchor never moves, so this is a clean, cheap read
      const dx = event.clientX - centerX;
      const dy = event.clientY - centerY;
      // Distance to the pill's edge, not its centre: a wide button attracts evenly.
      const radius = halfHeight;
      const qx = Math.abs(dx) - halfWidth + radius;
      const qy = Math.abs(dy) - halfHeight + radius;
      const outside = Math.hypot(Math.max(qx, 0), Math.max(qy, 0));
      const edge = outside + Math.min(Math.max(qx, qy), 0) - radius;
      if (edge >= RANGE) {
        if (engaged) release();
        return;
      }
      const nearness = edge <= 0 ? 1 : 1 - edge / RANGE;
      const pull = nearness * nearness * (3 - 2 * nearness);
      // Lean toward the pointer, then saturate smoothly at the travel limit.
      const rawX = dx * 0.17 * pull;
      const rawY = dy * 0.36 * pull;
      const magnitude = Math.hypot(rawX, rawY);
      const limited =
        magnitude > 0.001
          ? (MAX_PULL * Math.tanh(magnitude / MAX_PULL)) / magnitude
          : 1;
      targetX = rawX * limited;
      targetY = rawY * limited;
      engaged = pull;
      wake();
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      if (reducedMotion.matches) return;
      pressed = true;
      wake();
    };
    const onPointerUp = () => {
      if (!pressed) return;
      pressed = false;
      wake();
    };
    const onEnter = (event: PointerEvent) => {
      if (event.pointerType === "touch" || reducedMotion.matches) return;
      hovered = true;
      wake();
    };
    const onLeave = () => {
      hovered = false;
      pressed = false;
      wake();
    };
    const onWindowLeave = () => release();
    const onMotionChange = () => {
      if (reducedMotion.matches) {
        hovered = false;
        pressed = false;
        release();
      }
    };

    measure();
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("pointercancel", onPointerUp, { passive: true });
    window.addEventListener("blur", onWindowLeave);
    document.documentElement.addEventListener("pointerleave", onWindowLeave);
    anchor.addEventListener("pointerdown", onPointerDown);
    anchor.addEventListener("pointerenter", onEnter);
    anchor.addEventListener("pointerleave", onLeave);
    reducedMotion.addEventListener("change", onMotionChange);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      window.removeEventListener("blur", onWindowLeave);
      document.documentElement.removeEventListener(
        "pointerleave",
        onWindowLeave,
      );
      anchor.removeEventListener("pointerdown", onPointerDown);
      anchor.removeEventListener("pointerenter", onEnter);
      anchor.removeEventListener("pointerleave", onLeave);
      reducedMotion.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <Link ref={anchorRef} href={href} className="landing__cta">
      <span className="landing__cta-ring" aria-hidden />
      <span className="landing__cta-pill">
        <span className="landing__cta-label">{children}</span>
        <svg
          className="landing__cta-arrow"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          aria-hidden
          focusable="false"
        >
          <path d="M3.5 12h16M13.5 5.5 20 12l-6.5 6.5" />
        </svg>
      </span>
    </Link>
  );
}
