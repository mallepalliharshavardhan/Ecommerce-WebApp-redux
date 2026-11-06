import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../cart/cartSlice.js";
import ProductImage from "./ProductImage.jsx";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#202735] transition duration-200 hover:-translate-y-1 hover:border-[#3B82F6]/50 hover:shadow-xl hover:shadow-black/20">
      <Link
        to={`/products/${product._id}`}
        className="flex flex-1 flex-col focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#60A5FA]"
      >
        <ProductImage
          product={product}
          wrapperClassName="h-56 p-6"
          imageClassName="bg-[#191F29] p-6"
        />

        <div className="flex flex-1 flex-col p-5">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#60A5FA]">
            {product.category}
          </p>
          <h3 className="text-lg font-semibold text-[#F8FAFC]">
            {product.name}
          </h3>
          <p className="mt-2 line-clamp-2 min-h-12 text-sm leading-6 text-[#A1AAB8]">
            {product.description}
          </p>
          <span className="mt-auto pt-4 text-sm font-medium text-[#60A5FA]">
            View details
          </span>
        </div>
      </Link>

      <div className="flex items-center justify-between gap-3 px-5 pb-5 pt-4">
        <p className="text-xl font-bold tracking-tight text-white">
          ${Number(product.price).toFixed(2)}
        </p>
        <button
          type="button"
          className="rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-[#101318] transition-colors hover:bg-amber-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
          onClick={() => dispatch(addToCart(product))}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
