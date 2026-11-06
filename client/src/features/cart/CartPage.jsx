import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "./cartSlice.js";
import ProductImage from "../products/ProductImage.jsx";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);

function CartPage() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const subtotal = items.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );
  const total = subtotal;

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-2xl py-10 text-center sm:py-16">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#202735] text-[#60A5FA]">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className="h-8 w-8"
          >
            <path
              d="M3 4h2l2.1 10.1a2 2 0 0 0 2 1.6h8.5a2 2 0 0 0 1.9-1.4L21 8H6"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="10" cy="20" r="1" fill="currentColor" />
            <circle cx="18" cy="20" r="1" fill="currentColor" />
          </svg>
        </div>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight">
          Your cart is empty
        </h1>
        <p className="mt-3 text-[#A1AAB8]">
          Looks like you haven’t added anything to your cart yet.
        </p>
        <Link
          to="/#products"
          className="mt-7 inline-flex rounded-lg bg-[#3B82F6] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#60A5FA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
        >
          Continue Shopping
        </Link>
      </section>
    );
  }

  return (
    <section>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-sm font-medium text-[#60A5FA]">
            Your selections
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Shopping cart
          </h1>
        </div>
        <button
          type="button"
          onClick={() => dispatch(clearCart())}
          className="rounded-lg border border-white/10 px-4 py-2.5 text-sm font-medium text-[#A1AAB8] transition-colors hover:border-red-400/40 hover:text-red-300"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-4">
          {items.map((item) => {
            return (
              <article
                key={item._id}
                className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-[#202735] p-4 sm:flex-row sm:items-center sm:p-5"
              >
                <ProductImage
                  product={item}
                  wrapperClassName="h-48 w-full shrink-0 rounded-xl sm:h-36 sm:w-40"
                  imageClassName="bg-[#191F29] p-2"
                />

                <div className="flex min-w-0 flex-1 flex-col justify-between gap-4 sm:min-h-28">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#60A5FA]">
                      {item.category}
                    </p>
                    <h2 className="mt-1 text-lg font-semibold text-[#F8FAFC]">
                      {item.name}
                    </h2>
                    <p className="mt-1 text-sm text-[#A1AAB8]">
                      {formatPrice(Number(item.price))} each
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center rounded-lg border border-white/10 bg-[#191F29]">
                      <button
                        type="button"
                        aria-label={`Decrease ${item.name} quantity`}
                        disabled={item.quantity <= 1}
                        onClick={() => dispatch(decreaseQuantity(item._id))}
                        className="h-9 w-10 rounded-l-lg text-lg text-[#A1AAB8] transition-colors hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        −
                      </button>
                      <span
                        aria-live="polite"
                        className="min-w-9 text-center text-sm font-semibold"
                      >
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label={`Increase ${item.name} quantity`}
                        onClick={() => dispatch(increaseQuantity(item._id))}
                        className="h-9 w-10 rounded-r-lg text-lg text-[#A1AAB8] transition-colors hover:bg-white/5 hover:text-white"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <p className="font-semibold text-white">
                        {formatPrice(Number(item.price) * item.quantity)}
                      </p>
                      <button
                        type="button"
                        onClick={() => dispatch(removeFromCart(item._id))}
                        className="text-sm font-medium text-[#A1AAB8] transition-colors hover:text-red-300"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <aside className="rounded-2xl border border-white/10 bg-[#191F29] p-5 sm:p-6">
          <h2 className="text-lg font-semibold">Order summary</h2>
          <div className="mt-6 flex justify-between text-sm text-[#A1AAB8]">
            <span>Subtotal</span>
            <span className="font-medium text-white">{formatPrice(subtotal)}</span>
          </div>
          <div className="mt-4 flex justify-between border-t border-white/10 pt-4 text-base font-semibold">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
          <p className="mt-3 text-xs leading-5 text-[#A1AAB8]">
            Shipping and taxes are not included.
          </p>
          <Link
            to="/#products"
            className="mt-6 flex justify-center rounded-lg border border-white/10 px-4 py-3 text-sm font-semibold text-white transition-colors hover:border-[#3B82F6]/60 hover:text-[#60A5FA]"
          >
            Continue Shopping
          </Link>
        </aside>
      </div>
    </section>
  );
}

export default CartPage;
