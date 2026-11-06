const fallbackImageUrls = {
  "Wireless Headphones":
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=85",
  "Cotton T-Shirt":
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=85",
  "Ceramic Coffee Mug":
    "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=85",
  "Running Shoes":
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=85",
  "Notebook Set":
    "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=800&q=85",
  "Desk Lamp":
    "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=85",
};

export function getProductFallbackImageUrl(productName) {
  return fallbackImageUrls[productName];
}

export function getProductImageUrl(product) {
  const fallbackImageUrl = getProductFallbackImageUrl(product.name);

  if (product.image?.startsWith("/")) {
    return fallbackImageUrl || `http://localhost:5000${product.image}`;
  }

  return product.image || fallbackImageUrl;
}
