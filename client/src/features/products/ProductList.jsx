import { useGetProductsQuery } from "./productApi";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFilters,
  setSearchText,
  setSelectedCategory,
} from "./filterSlice.js";

function ProductList() {
  const dispatch = useDispatch();
  const { searchText, selectedCategory } = useSelector(
    (state) => state.productFilters
  );
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

  const categories = [
    "All Categories",
    ...new Set((products ?? []).map((product) => product.category)),
  ];
  const filteredProducts = (products ?? []).filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchText.trim().toLowerCase());
    const matchesCategory =
      selectedCategory === "All Categories" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="flex-1">
          <span className="sr-only">Search products by name</span>
          <input
            type="search"
            value={searchText}
            onChange={(event) => dispatch(setSearchText(event.target.value))}
            placeholder="Search products..."
            className="w-full rounded-xl border border-white/10 bg-[#191F29] px-4 py-3 text-sm text-[#F8FAFC] placeholder:text-[#778191] focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/30"
          />
        </label>

        <label className="sm:w-56">
          <span className="sr-only">Filter by category</span>
          <select
            value={selectedCategory}
            onChange={(event) =>
              dispatch(setSelectedCategory(event.target.value))
            }
            className="w-full rounded-xl border border-white/10 bg-[#191F29] px-4 py-3 text-sm text-[#F8FAFC] focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/30"
          >
            {categories.map((category) => (
              <option key={category} value={category} className="bg-[#191F29]">
                {category}
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          onClick={() => dispatch(clearFilters())}
          disabled={!searchText && selectedCategory === "All Categories"}
          className="rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-[#A1AAB8] transition-colors hover:border-[#3B82F6]/50 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          Clear Filters
        </button>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-[#191F29] px-6 py-10 text-center">
          <p className="text-lg font-medium text-[#F8FAFC]">
            No products match your filters
          </p>
          <p className="mt-2 text-sm text-[#A1AAB8]">
            Try another search or category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;