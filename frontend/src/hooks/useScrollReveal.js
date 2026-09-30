import { useLayoutEffect } from "react";

/*
  Scroll-reveal ("before" -> "after") for the marketing-site cards.

  The hidden "before" state and the transition live in reveal.css; this hook only
  toggles the classes as cards scroll into view, so it needs no animation
  library and behaves the same in every browser.

  Why not a CSS scroll timeline (animation-timeline: view())? responsive.css sets
  `overflow-x: hidden` on body and #root, which makes them the scroll container
  for view timelines. They never scroll, so the timeline never moved and cards
  sat frozen part-way through their animation.
*/

const REVEAL_UP = ".service-card, .machine-link, .doctor-card, .testimonial-card";
const REVEAL_SCALE = ".container-appoinment";

const REVEAL_CLASSES = ["reveal", "reveal-up", "reveal-scale", "reveal-in"];

// A little longer than the 0.7s transition in reveal.css
const SETTLE_MS = 900;

export function useScrollReveal(routeKey) {
  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // No observer / reduced motion: leave the cards in their normal state
    if (!("IntersectionObserver" in window) || reduceMotion) return undefined;

    const timers = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;

          // Also reveal cards that are already above the viewport when first
          // observed (e.g. the page was reloaded part-way down)
          const scrolledPast = entry.boundingClientRect.top < 0;
          if (!entry.isIntersecting && !scrolledPast) return;

          observer.unobserve(el);
          el.classList.add("reveal-in");

          // Once revealed, drop the helper classes so the card goes back to its
          // own styles (hover lift, its own transitions)
          const timer = setTimeout(() => {
            el.classList.remove(...REVEAL_CLASSES);
            timers.delete(timer);
          }, SETTLE_MS);
          timers.add(timer);
        });
      },
      // Start the reveal a little before the card is fully on screen
      { rootMargin: "0px 0px -10% 0px" }
    );

    const prepare = (selector, variant) => {
      document.querySelectorAll(selector).forEach((el) => {
        el.classList.add("reveal", variant);
        observer.observe(el);
      });
    };

    prepare(REVEAL_UP, "reveal-up");
    prepare(REVEAL_SCALE, "reveal-scale");

    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
      document
        .querySelectorAll(".reveal")
        .forEach((el) => el.classList.remove(...REVEAL_CLASSES));
    };
  }, [routeKey]);
}
