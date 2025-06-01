/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: [],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Force specific npm registry for security
  env: {
    NPM_CONFIG_REGISTRY: 'https://registry.npmjs.org/'
  },
  // Override module resolution to prevent problematic imports
  webpack: (config) => {
    // Handle problematic modules 
    config.resolve.alias = {
      ...config.resolve.alias,
      // Prevent loading of any problematic modules by pointing to empty module
      'web-speech-api': false,
    }
    return config
  }
}

export default nextConfig
