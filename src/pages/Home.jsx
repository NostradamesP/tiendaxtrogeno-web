import HeroBanner from '../components/HeroBanner';
import CategoryGrid from '../components/CategoryGrid';
import ProductGrid from '../components/ProductGrid';
import InstagramFeed from '../components/InstagramFeed';
import { products } from '../data/products';

export default function Home() {
  const destacados = products.filter((p) => p.isNew || p.isSale).slice(0, 8);

  return (
    <>
      <HeroBanner />
      <CategoryGrid />
      <ProductGrid products={destacados} title="Destacados" />
      <InstagramFeed />
    </>
  );
}
