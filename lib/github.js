import axios from 'axios';

const BASE_URL = 'https://api.github.com/repos/memories-2024/';

export const fetchImages = async (repo) => {
  try {
    const FULL_IMAGES_REPO = `${BASE_URL}${repo}/contents/`;
    const THUMBNAILS_REPO = `${BASE_URL}${repo}/contents/thumbnails`;

    const [fullImagesResponse, thumbnailsResponse] = await Promise.all([
      axios.get(FULL_IMAGES_REPO),
      axios.get(THUMBNAILS_REPO)
    ]);

    const fullImages = fullImagesResponse.data
      .filter(file => file.type === 'file')
      .map(file => ({ name: file.name, url: file.download_url }));

    const thumbnails = thumbnailsResponse.data
      .filter(file => file.type === 'file')
      .map(file => ({ name: file.name, url: file.download_url }));

    const images = fullImages.map(image => {
      const thumbnail = thumbnails.find(thumb => thumb.name === image.name);
      return {
        name: image.name,
        fullUrl: image.url,
        thumbnailUrl: thumbnail ? thumbnail.url : image.url // Fallback to full image if thumbnail not found
      };
    });

    return images;
  } catch (error) {
    console.error('Error fetching images from GitHub:', error);
    return [];
  }
};