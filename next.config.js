/** @type {import('next').NextConfig} */
const nextConfig = {
  // 生产环境关闭 Source Map（减少构建内存占用）
  productionBrowserSourceMaps: false,
  // 关闭 React 严格模式（开发时有用，构建时增加开销）
  reactStrictMode: false,
  // 关闭 x-powered-by 响应头（微小优化）
  poweredByHeader: false,
  
  // Standalone build for Cloudflare Pages
  // Note: Most routes use 'edge' runtime which is compatible with Cloudflare
  output: 'standalone',

  // Don't fail build on ESLint warnings
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 如果确认不需要 ESLint 和 TypeScript 检查，可以跳过
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      'dash.cloudflare.com',
      'www.google.com',
      'ph-static.imgix.net',
      'app.leonardo.ai'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  // 压缩图片（减少构建产物大小）
    formats: ['image/webp'],
  },
  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: '/api/auth/:path*'
      },
      {
        source: '/auth/:path*',
        destination: '/auth/:path*'
      }
    ]
  },
  // Cloudflare Pages configuration
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost', 'newkit.site']
    },
    optimizePackageImports: ['lucide-react', 'date-fns', 'lodash']
  }
}

module.exports = nextConfig
