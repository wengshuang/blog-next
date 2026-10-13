/** @type {import('next').NextConfig} */

const path = require('path')
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  reactStrictMode: true,
  basePath: isProd ? '/blog-next' : '',
  assetPrefix: isProd ? '/blog-next/' : '',
  images: {
    unoptimized: true
  },
  webpack: (config) => {
    config.resolve.alias['@@'] = path.resolve(__dirname, './components')
    return config
  }
}

module.exports = nextConfig
