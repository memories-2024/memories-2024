import { useEffect, useState } from 'react';
import { fetchImages } from '../lib/github';

const Gallery = ({ images, repo }) => {
  return (
    <div>
      <h1>2022 - {repo}</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
        gap: '10px',
      }}>
        {images.map((image, index) => (
          <div key={index} style={{
            position: 'relative',
            paddingTop: '100%', // Aspect ratio 1:1 (square)
            overflow: 'hidden',
            borderRadius: '8px',
            border: '1px solid #ddd',
          }}>
            <img
              src={image.thumbnailUrl}
              alt={`Thumbnail ${index}`}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                cursor: 'pointer',
              }}
              onClick={() => window.open(image.fullUrl, '_blank')}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Fetch the list of repositories for static paths
export async function getStaticPaths() {
  const repos = [
    'abc'
  ];

  const paths = repos.map(repo => ({ params: { repo } }));

  return { paths, fallback: false };
}

// Fetch the images for the given repository
export async function getStaticProps(context) {
  const { repo } = context.params;
  const images = await fetchImages(repo);

  return { props: { images, repo } };
}

export default Gallery;
