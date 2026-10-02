import { Children } from "react";

function FeaturedMods({
  children,
  speed = 40,        // pixels per second (lower = slower)
  cardWidth = 288,   // px, width of one card
  gap = 20,          // px, space between cards
  minItems = 10,     // minimum cards per set; keeps the loop gap-free on wide screens
  className = "",
}) {
  const items = Children.toArray(children);
  if (!items.length) return null;

  // Repeat the cards until one "set" is wider than any screen
  const repeats = Math.ceil(minItems / items.length);
  const setLength = repeats * items.length;
  const duration = (setLength * (cardWidth + gap)) / speed;

  const renderSet = (prefix, hidden) => (
    <div className="flex shrink-0" aria-hidden={hidden || undefined}>
      {Array.from({ length: repeats }).flatMap((_, r) =>
        items.map((child) => (
          <div
            key={`${prefix}-${r}-${child.key}`}
            className="shrink-0  transition duration-500 hover:grayscale-0"
            style={{ width: cardWidth + gap, paddingRight: gap }}
          >
            {child}
          </div>
        ))
      )}
    </div>
  );

  return (
    <section className={`bg-black px-6 py-16 ${className}`}>
      <style>{`
        @keyframes fps-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .fps-track { animation: fps-scroll linear infinite; will-change: transform; }
        .fps-viewport:hover .fps-track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) { .fps-track { animation: none; } }
      `}</style>

      <div
        className="fps-viewport overflow-hidden"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div
          className="fps-track flex w-max"
          style={{ animationDuration: `${duration}s` }}
        >
          {renderSet("a", false)}
          {renderSet("b", true)}
        </div>
      </div>
    </section>
  );
}
export default FeaturedMods