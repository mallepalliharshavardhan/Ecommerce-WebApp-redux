import {
  getProductFallbackImageUrl,
  getProductImageUrl,
} from "./productImages.js";

function ProductImage({
  product,
  wrapperClassName,
  imageClassName,
  loading = "lazy",
}) {
  const fallbackImageUrl = getProductFallbackImageUrl(product.name);
  const imageUrl = getProductImageUrl(product);

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-[#191F29] ${wrapperClassName}`}
    >
      <span
        data-image-fallback
        hidden={Boolean(imageUrl)}
        className="text-center text-sm text-[#A1AAB8]"
      >
        Image unavailable
      </span>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={product.name}
          loading={loading}
          className={`absolute inset-0 h-full w-full object-contain ${imageClassName}`}
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
            image.parentElement
              .querySelector("[data-image-fallback]")
              ?.removeAttribute("hidden");
          }}
        />
      )}
    </div>
  );
}

export default ProductImage;
