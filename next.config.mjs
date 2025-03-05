/** @type {import('next').NextConfig} */
const nextConfig = { devIndicators: {
    buildActivity: false,  // Hides build activity indicator
  },
  compiler: {
    reactRemoveProperties: true, // Removes certain Next.js debug info
  },};

export default nextConfig;
