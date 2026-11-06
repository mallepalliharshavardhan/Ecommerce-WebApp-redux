import { useGetProductsQuery } from "./productApi";
import ProductCard from "./ProductCard";

function ProductList() {
  const { data: products, isLoading, error } = useGetProductsQuery();

  if (isLoading) {
    return (
      <p className="rounded-2xl border border-white/10 bg-[#191F29] px-6 py-10 text-center text-[#A1AAB8]">
        Loading products...
      </p>
    );
  }

  if (error) {
    return (
      <p
        role="alert"
        className="rounded-2xl border border-red-400/20 bg-red-400/5 px-6 py-10 text-center text-red-200"
      >
        Failed to load products. Please try again in a moment.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
      {products?.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;