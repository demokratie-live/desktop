/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(() => ({
  eslint: {
    dirs: ['.'],
  },
  poweredByHeader: false,
  trailingSlash: true,
  basePath: '',
  // The starter code load resources from `public` folder with `router.basePath` in React components.
  // So, the source code is "basePath-ready".
  // You can remove `basePath` if you don't need it.
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  compiler: {
    styledComponents: true,
  },
  webpack: (config2) => {
    return {
      resolve: {
        ...(config2.resolve || {}),
        alias: {
          ...(config2.resolve.alias || {}),
          'react-native': require.resolve('react-native-web'),
          'react-native-svg': require.resolve('react-native-svg-web'),
          'styled-components/native': require.resolve('styled-components'),
        },
        extensions: [
          ...(config2.resolve.extensions || []),
          '.web.js',
          '.web.ts',
          '.web.tsx',
        ],
      },
    };
  },
}));
