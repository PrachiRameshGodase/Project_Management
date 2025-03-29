/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Disables ESLint checks during builds
  },
  output: 'standalone', // Ensures the build output is accessible
  distDir: 'build', // Changes the build folder from ".next" to "build"
  devIndicators: {
    buildActivity: false,
  },
  compiler: {
    reactRemoveProperties: true,
  },
};

export default nextConfig;
