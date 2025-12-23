const webpack = require('webpack');
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.pexels.com'],
  },
  transpilePackages: ['@supabase/supabase-js'],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    // Ignorar react-router-dom completamente
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^react-router-dom$/,
      })
    );
    
    // Excluir carpeta src/ del build (archivos antiguos de React Router)
    config.module.rules.push({
      test: /\.(tsx?|jsx?)$/,
      include: path.resolve(__dirname, 'src'),
      use: {
        loader: path.resolve(__dirname, 'webpack-ignore-loader.js'),
      },
    });
    
    return config;
  },
};

module.exports = nextConfig;

