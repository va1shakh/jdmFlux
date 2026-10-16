
import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";

export function HeroSection({
  desktopImage = "/images/desktop.jpg",
  mobileImage = "/images/mobile.jpg",
  eyebrow = "JDMFLUX — BUILT FOR ENTHUSIASTS",
  description = "Discover the parts, performance upgrades, and automotive culture that define your own style.",
  primaryLabel = "Explore Mods",
  primaryHref = "/mods",
  secondaryLabel = "Explore Builds",
  secondaryHref = "/builds",
}) {
  return (
    <section className="relative isolate flex min-h-[620px] items-center overflow-hidden bg-zinc-950 sm:min-h-[680px] lg:min-h-[760px]">
      {/* Responsive background image */}
      <picture className="absolute inset-0 z-0 block h-full w-full">
        <source
          media="(max-width: 767px)"
          srcSet={mobileImage}
          type="image/webp"
        />

        <img
          src={desktopImage}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-[60%_center] md:object-center"
        />
      </picture>

      {/* Overlay for text readability */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/65 to-black/25 md:bg-gradient-to-r md:from-black/90 md:via-black/55 md:to-black/10"
      />

      {/* Hero content */}
      <div className="relative z-20 mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
        <div className="max-w-3xl text-center md:text-left">
          <p className="mb-5 gap-3 text-xs font-bold uppercase tracking-[0.25em] text-cyan-200 sm:text-sm">
            <span className="h-px w-8 bg-cyan-200" />
            {eyebrow}
          </p>

          <h1 className="text-5xl font-black leading-[0.95] tracking-[-0.05em] text-[#f8f7f4] sm:text-6xl lg:text-8xl">
            ENTER THE <span className="text-red-800">CULTURE</span>
          </h1>

          <p className="mt-6 max-w-xl text-sm leading-7 text-white/80 tracking-wider sm:text-base sm:leading-8">
            {description}
          </p>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-wrap justify-center gap-3 sm:mt-10 md:justify-start">
            <Link
              to={primaryHref}
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#0057ff] px-5 py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400 motion-reduce:transition-none sm:px-6"
            >
              {primaryLabel}
              <ArrowUpRight
                size={18}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
              />
            </Link>

            <Link
              to={secondaryHref}
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/35 bg-white/5 px-5 py-3 text-sm font-bold text-white backdrop-blur-sm transition-colors duration-200 hover:border-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transition-none sm:px-6"
            >
              {secondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
