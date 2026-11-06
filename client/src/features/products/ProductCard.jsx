import { useDispatch } from "react-redux";
import { addToCart } from "../cart/cartSlice.js";
import {
  getProductFallbackImageUrl,
  getProductImageUrl,
} from "./productImages.js";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const fallbackImageUrl = getProductFallbackImageUrl(product.name);
  const imageUrl = getProductImageUrl(product);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#202735] transition duration-200 hover:-translate-y-1 hover:border-[#3B82F6]/50 hover:shadow-xl hover:shadow-black/20">
      <div className="relative flex h-56 items-center justify-center overflow-hidden bg-[#191F29] p-6">
        <span className="text-sm text-[#A1AAB8]">Image unavailable</span>
        {imageUrl && (
          <img
            src={imageUrl}
            alt={product.name}
            className="absolute inset-0 h-full w-full bg-[#191F29] object-contain p-6 "
            loading="lazy"
            onError={(event) => {
              const image = event.currentTarget;
              if (
                fallbackImageUrl &&
                image.dataset.fallbackApplied !== "true" &&
                image.src !== fallbackImageUrl
              ) {
                image.dataset.fallbackApplied = "true";
                image.src = fallbackImageUrl;
                return;
              }
              image.hidden = true;
            }}
          />
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#60A5FA]">
          {product.category}
        </p>
        <h3 className="text-lg font-semibold text-[#F8FAFC]">{product.name}</h3>
        <p className="mt-2 line-clamp-2 min-h-12 text-sm leading-6 text-[#A1AAB8]">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-4 pt-6">
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
      </div>
    </article>
  );
}

export default ProductCard;
