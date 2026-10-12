import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const FeaturedMods = ({ children }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 3,
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
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex ml-34 pb-20">{children}</div>
    </div>
  );
};

export default FeaturedMods;
