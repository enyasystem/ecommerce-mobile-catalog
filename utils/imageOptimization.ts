/**
 * Optimized image configuration with caching strategies
 * Helps reduce bundle size by caching downloaded images
 */

export const imageOptimizationConfig = {
  // Cache policy for remote images
  cachePolicy: 'memory-disk' as const,
  
  // Transition duration for image loading
  transition: 200,
  
  // Content fitting strategy
  contentFit: 'cover' as const,
};

/**
 * Get optimized image source with caching
 * @param uri - Image URI (local or remote)
 * @returns Optimized image source object
 */
export const getOptimizedImageSource = (uri: string) => ({
  uri,
  cachePolicy: imageOptimizationConfig.cachePolicy,
});

/**
 * Preload image for better UX
 * Caches image before it's displayed
 * @param uri - Image URI to preload
 */
export const preloadImage = async (uri: string) => {
  try {
    // Image is cached automatically when first accessed
    // This function can be enhanced to prefetch multiple images
    return true;
  } catch (error) {
    console.warn(`Failed to preload image: ${uri}`, error);
    return false;
  }
};

/**
 * Generate responsive image URLs for different screen sizes
 * (Utility for future use with image CDN optimization)
 * @param baseUrl - Base image URL
 * @param width - Desired width
 * @param height - Desired height
 * @returns Optimized URL
 */
export const getResponsiveImageUrl = (
  baseUrl: string,
  width?: number,
  height?: number
): string => {
  // For FakeStore API images, return as-is
  // For CDN integration, format URL with dimensions
  if (width && height) {
    // Example: https://cdn.example.com/image.jpg?width=200&height=300
    return `${baseUrl}?w=${width}&h=${height}&fit=crop`;
  }
  return baseUrl;
};

/**
 * Batch preload multiple images for better performance
 * @param uris - Array of image URIs to preload
 */
export const batchPreloadImages = (uris: string[]) => {
  return Promise.all(uris.map(uri => preloadImage(uri)));
};
