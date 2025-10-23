import Banner from "./Banner";
import ProductSection from "./ProductSection";
import TestimonialsSection from "./TestimonialsSection";
import Trusted from "./Trusted";

export default function Home() {
  return (
    <div>
        <Banner/>
        <Trusted/>
        <ProductSection/>
        <TestimonialsSection/>
    </div>
  )
}