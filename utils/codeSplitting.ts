/**
 * Code splitting and dynamic loading utilities
 * Helps reduce initial bundle size by loading code on-demand
 */

/**
 * Dynamic import wrapper with error handling
 * Useful for lazy-loading heavy components/modules
 * @param importFn - Function that returns import promise
 * @param fallback - Fallback component or value
 */
export const dynamicImport = async (
  importFn: () => Promise<any>,
  fallback?: any
) => {
  try {
    const module = await importFn();
    return module.default || module;
  } catch (error) {
    console.warn('Dynamic import failed:', error);
    return fallback;
  }
};

/**
 * Prefetch module for better UX
 * Call before user likely needs the module
 * @param importFn - Function that returns import promise
 */
export const prefetchModule = (importFn: () => Promise<any>) => {
  // Start the import but don't await
  importFn().catch(error => {
    console.warn('Module prefetch failed:', error);
  });
};

/**
 * Code splitting strategy configuration
 * Defines which screens/components should be preloaded
 */
export const codeSplittingConfig = {
  // Screens that should be eagerly loaded (startup path)
  eager: [
    'home',
    'search',
    'browse',
  ],

  // Screens that can be lazy-loaded
  lazy: [
    'product-details',
    'checkout',
    'order-confirmation',
  ],

  // Components that should be lazy-loaded
  lazyComponents: [
    'FilterModal',
    'SortModal',
  ],
};

/**
 * Memory-efficient debounce for search/filter operations
 * Reduces bundle by combining with memoized selectors
 */
export const createOptimizedDebounce = (fn: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;

  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

/**
 * Batch API requests to reduce network overhead
 * Helps reduce perceived app slowness with deferred loading
 */
export const batchRequests = async (
  requests: Array<() => Promise<any>>,
  batchSize: number = 3
) => {
  const results = [];

  for (let i = 0; i < requests.length; i += batchSize) {
    const batch = requests.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(req => req()));
    results.push(...batchResults);
  }

  return results;
};
