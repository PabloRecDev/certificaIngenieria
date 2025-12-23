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
    
    // Excluir carpeta src/ del build (archivos antiguos de React Router)
    config.module.rules.push({
      test: /\.(tsx?|jsx?)$/,
      include: path.resolve(__dirname, 'src'),
      use: 'ignore-loader',
    });
    
    // Ignorar react-router-dom completamente
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-router-dom': false,
    };
    
    return config;
  },
};

module.exports = nextConfig;

