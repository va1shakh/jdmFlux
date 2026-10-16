import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const FeaturedMods = ({ children }) => {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
    },
    [
      Autoplay({
        delay: 5000,
        playOnInit: true,
        stopOnInteraction: false,
      }),
    ],
  );

  return (
    <div className="w-full min-w-0 overflow-hidden" ref={emblaRef}>
      <div className="flex pb-10 sm:pb-14 lg:pb-20">
        {children}
      </div>
    </div>
  );
};

export default FeaturedMods;