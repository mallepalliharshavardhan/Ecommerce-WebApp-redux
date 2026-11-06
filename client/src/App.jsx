import { useSelector } from "react-redux";
import { Link, Route, Routes } from "react-router-dom";
import CartPage from "./features/cart/CartPage";
import ProductDetailsPage from "./features/products/ProductDetailsPage";
import ProductList from "./features/products/ProductList";

function App() {
  const cartItemCount = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <div className="min-h-screen bg-[#101318] text-[#F8FAFC]">
      <header className="border-b border-white/10 bg-[#151A22]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-5 sm:px-8">
          <Link to="/" className="flex items-center gap-3" aria-label="Nexora home">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#3B82F6] text-lg font-bold text-white shadow-lg shadow-blue-500/20">
              $
            </span>
            <span className="text-xl font-semibold tracking-tight">GenZ Store</span>
          </Link>

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-8 text-sm font-medium text-[#A1AAB8] sm:flex"
          >
            <Link to="/" className="text-white transition-colors hover:text-[#60A5FA]">
              Home
            </Link>
            <Link
              to="/#products"
              className="transition-colors hover:text-[#60A5FA]"
            >
              Shop
            </Link>
            <Link
              to="/#products"
              className="transition-colors hover:text-[#60A5FA]"
            >
              Products
            </Link>
          </nav>

          <Link
            to="/cart"
            aria-label={`Shopping cart, ${cartItemCount} items`}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#202735] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-[#3B82F6]/60 hover:bg-[#263247]"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5"
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
            <span className="hidden sm:inline">Cart</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#3B82F6] px-1 text-xs text-white">
              {cartItemCount}
            </span>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 pb-16 pt-12 sm:px-8 sm:pt-16">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <section className="mb-14 max-w-3xl">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#60A5FA]">
                    Thoughtful picks. Everyday essentials.
                  </p>
                  <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                    Find your next
                    <span className="text-[#60A5FA]"> favorite thing.</span>
                  </h1>
                  <p className="mt-5 max-w-2xl text-base leading-7 text-[#A1AAB8] sm:text-lg">
                    Explore a curated collection of useful, well-made products
                    for everyday life.
                  </p>
                </section>

                <section id="products" aria-labelledby="products-heading">
                  <div className="mb-7 flex items-end justify-between gap-4">
                    <div>
                      <p className="mb-2 text-sm font-medium text-[#60A5FA]">
                        Made for your day
                      </p>
                      <h2
                        id="products-heading"
                        className="text-2xl font-semibold tracking-tight sm:text-3xl"
                      >
                        Explore products
                      </h2>
                    </div>
                    <span className="hidden text-sm text-[#A1AAB8] sm:inline">
                      A little something for everyone
                    </span>
                  </div>
                  <ProductList />
                </section>
              </>
            }
          />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
        </Routes>
      </main>

      <footer className="border-t border-white/10 px-5 py-6 text-center text-sm text-[#A1AAB8]">
        GenZ Store <span aria-hidden="true">·</span> Everyday finds, thoughtfully
        chosen.
      </footer>
    </div>
  );
}

export default App;
