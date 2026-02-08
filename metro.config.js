const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Enable aggressive minification for production builds
config.transformer.minifierConfig = {
  compress: {
    // Drop console.log and other console methods to reduce bundle
    drop_console: true,
    drop_debugger: true,
    // Optimize arithmetic operations
    evaluate: true,
    // Remove unreachable code
    passes: 3,
  },
  mangle: {
    // Aggressively mangle variable names, including top-level
    toplevel: true,
    // Keep class names for debugging
    keep_classnames: false,
  },
  output: {
    // Reduce comments to save bytes
    comments: false,
  },
};

// Optimize worker threads for faster builds
config.maxWorkers = 4;

// Exclude unnecessary modules
config.resolver.blockList = [
  // Exclude dev-only test files
  /react-native\/Libraries\/Animated\/.*\/__tests__\/.*/,
];

module.exports = config;
