import React, { useMemo } from 'react';
import { Image, ImageProps, StyleSheet } from 'react-native';
import { getOptimizedImageSource } from '../../utils/imageOptimization';

interface OptimizedImageProps extends Omit<ImageProps, 'source'> {
  uri: string;
}

/**
 * Optimized Image Component with automatic caching and memory efficiency
 * Replaces <Image source={{ uri: '...' }} /> for better bundle size performance
 * 
 * Usage:
 * <OptimizedImage uri={product.image} style={styles.image} />
 */
export const OptimizedImage = React.memo(({ uri, style, ...props }: OptimizedImageProps) => {
  // Memoize the optimized source to prevent unnecessary recalculations
  const optimizedSource = useMemo(() => getOptimizedImageSource(uri), [uri]);

  return (
    <Image
      source={optimizedSource}
      style={StyleSheet.flatten(style)}
      {...props}
    />
  );
});

OptimizedImage.displayName = 'OptimizedImage';
