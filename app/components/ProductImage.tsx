import {useEffect, useMemo, useState} from 'react';
import type {ProductVariantFragment} from 'storefrontapi.generated';

type GalleryImage = {
  id?: string | null;
  url?: string | null;
  altText?: string | null;
};

type ResolvedGalleryImage = {
  id: string;
  url: string;
  altText?: string | null;
};

export function ProductImage({
  image,
  images = [],
}: {
  image: ProductVariantFragment['image'];
  images?: GalleryImage[];
}) {
  const gallery = useMemo(() => {
    const candidates = [image, ...images].filter(
      (candidate): candidate is ResolvedGalleryImage =>
        Boolean(candidate?.id && candidate.url),
    );

    return candidates.filter(
      (candidate, index) =>
        candidates.findIndex((other) => other.id === candidate.id) === index,
    );
  }, [image, images]);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(
    gallery[0]?.id ?? null,
  );

  useEffect(() => {
    if (image?.id) setSelectedImageId(image.id);
  }, [image?.id]);

  const selectedImage =
    gallery.find((candidate) => candidate.id === selectedImageId) ?? gallery[0];

  if (!selectedImage) {
    return <div className="product-image" />;
  }

  return (
    <div className="product-gallery-media">
      <div className="product-image">
        <img
          alt={selectedImage.altText || 'Imagen del producto'}
          src={selectedImage.url}
        />
      </div>
      {gallery.length > 1 && (
        <div className="product-image-thumbnails" aria-label="Galería del producto">
          {gallery.map((galleryImage) => (
            <button
              aria-label={`Ver imagen ${gallery.indexOf(galleryImage) + 1}`}
              aria-pressed={galleryImage.id === selectedImage.id}
              className={galleryImage.id === selectedImage.id ? 'is-active' : ''}
              key={galleryImage.id}
              onClick={() => setSelectedImageId(galleryImage.id)}
              type="button"
            >
              <img alt="" src={galleryImage.url} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
