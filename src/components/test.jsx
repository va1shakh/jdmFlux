import CoverflowCarousel from "@/components/ui/coverflow-carousel";
import ProductCard from "@/components/ProductCard"; // adjust to your path

// Replace with your real product data / props
const products = [
  { id: "1", name: "Product one", price: 49 },
  { id: "2", name: "Product two", price: 59 },
  { id: "3", name: "Product three", price: 39 },
  { id: "4", name: "Product four", price: 79 },
  { id: "5", name: "Product five", price: 29 },
];

const items = products.map((product) => ({
  id: product.id,
  content: <ProductCard {...product} />,
}));

export default function CoverflowCarouselDemo() {
  return (
    <div className="flex w-full items-center justify-center py-10">
      <CoverflowCarousel
        items={items}
        loop
        // Match these to your ProductCard size
        slideClassName="h-[360px] w-[280px]"
        stageClassName="h-[420px]"
      />
    </div>
  );
}