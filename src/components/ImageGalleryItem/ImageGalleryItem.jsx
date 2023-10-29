import React from 'react';

export default function ImageGalleryItem({ images, onImageClick }) {
  return (
    <>
      {images.map(({ id, webformatURL, tags }) => {
        return (
          <li key={id} className="ImageGalleryItem">
            <img
              src={webformatURL}
              alt={tags}
              onClick={() => onImageClick(id)}
            />
          </li>
        );
      })}
    </>
  );
}
