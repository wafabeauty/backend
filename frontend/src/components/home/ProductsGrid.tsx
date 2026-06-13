import { PRODUCTS } from '@/lib/products'
import ProductCard from '@/components/ui/ProductCard'

export default function ProductsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
      {PRODUCTS.map((product, index) => (
        <div key={product.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  )
}
