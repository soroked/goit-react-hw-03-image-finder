import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import React from 'react';

export default function ImageGallery({ images, onImageClick }) {
  return (
    <ul className="ImageGallery">
      <ImageGalleryItem images={images} onImageClick={onImageClick} />
    </ul>
  );
}
