import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/query";
import { addToCart } from "../cart/cartSlice.js";
import ProductImage from "./ProductImage.jsx";
import { useGetProductByIdQuery } from "./productApi.js";

const isMongoId = (id) => /^[a-f\d]{24}$/i.test(id ?? "");

function ProductMessage({ title, children }) {
  return (
    <section className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-[#191F29] px-5 py-10 text-center sm:px-8 sm:py-12">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <div className="mt-3 text-sm leading-6 text-[#A1AAB8]">{children}</div>
      <Link
        to="/#products"
        className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-[#3B82F6] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#60A5FA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
      >
        Back to Products
      </Link>
    </section>
  );
}

function ProductDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const validId = isMongoId(id);
  const {
    data: product,
    error,
    isLoading,
    refetch,
  } = useGetProductByIdQuery(validId ? id : skipToken);

  if (!validId) {
    return (
      <ProductMessage title="Invalid product">
        This product link is not valid. Browse the catalog to find a product.
      </ProductMessage>
    );
  }

  if (isLoading) {
    return (
      <p
        role="status"
        className="rounded-2xl border border-white/10 bg-[#191F29] px-6 py-10 text-center text-[#A1AAB8]"
      >
        Loading product details...
      </p>
    );
  }

  if (error?.status === 400 || error?.status === 404) {
    return (
      <ProductMessage title="Product not found">
        This product may have been removed or the link may be incorrect.
      </ProductMessage>
    );
  }

  if (error) {
    return (
      <ProductMessage title="Could not load product">
        Please check your connection and try again.
        <button
          type="button"
          onClick={refetch}
          className="ml-2 font-semibold text-[#60A5FA] underline underline-offset-4"
        >
          Retry
        </button>
      </ProductMessage>
    );
  }

  if (!product) {
    return (
      <ProductMessage title="Product not found">
        This product may have been removed or the link may be incorrect.
      </ProductMessage>
    );
  }

  const stock = Number(product.stock);
  const hasStockValue = product.stock !== undefined && product.stock !== null;
  const isOutOfStock = hasStockValue && stock <= 0;

  return (
    <section className="mx-auto max-w-6xl">
      <Link
        to="/#products"
        className="mb-6 inline-flex min-h-11 items-center rounded-lg px-1 text-sm font-medium text-[#A1AAB8] transition-colors hover:text-[#60A5FA] focus-visible:outline-2 focus-visible:outline-[#60A5FA]"
      >
        <span aria-hidden="true" className="mr-2 text-lg">
          ←
        </span>
        Back to Products
      </Link>

      <article className="grid min-w-0 gap-6 lg:grid-cols-2 lg:gap-10">
        <ProductImage
          product={product}
          loading="eager"
          wrapperClassName="aspect-square max-h-[34rem] w-full rounded-2xl border border-white/10 sm:rounded-3xl"
          imageClassName="p-5 sm:p-8"
        />

        <div className="flex min-w-0 flex-col justify-center rounded-2xl border border-white/10 bg-[#202735] p-5 sm:p-8 lg:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#60A5FA]">
            {product.category}
          </p>
          <h1 className="mt-3 break-words text-3xl font-semibold tracking-tight sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-5 text-3xl font-bold tracking-tight text-white">
            ${Number(product.price).toFixed(2)}
          </p>
          <p className="mt-6 whitespace-pre-line text-base leading-7 text-[#A1AAB8]">
            {product.description || "No description is available for this product."}
          </p>

          <p
            className={`mt-6 text-sm font-medium ${
              isOutOfStock ? "text-red-300" : "text-emerald-300"
            }`}
          >
            {hasStockValue
              ? isOutOfStock
                ? "Out of stock"
                : `${stock} in stock`
              : "Stock status unavailable"}
          </p>

          <button
            type="button"
            disabled={isOutOfStock}
            onClick={() => dispatch(addToCart(product))}
            className="mt-7 min-h-12 w-full rounded-lg bg-amber-500 px-5 py-3 text-sm font-semibold text-[#101318] transition-colors hover:bg-amber-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:self-start"
          >
            Add to Cart
          </button>
        </div>
      </article>
    </section>
  );
}

export default ProductDetailsPage;
