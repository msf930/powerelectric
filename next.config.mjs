/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 3600,
      static: 3600,
    },
  },
  images: {
    minimumCacheTTL: 86400,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      { source: "/about/:city", destination: "/about", permanent: true },
      { source: "/contact/:city", destination: "/contact", permanent: true },
      { source: "/financing/:city", destination: "/financing", permanent: true },
      { source: "/membership/:city", destination: "/membership", permanent: true },
      { source: "/instant-quote/:city", destination: "/instant-quote", permanent: true },
      { source: "/holidayLighting/:city", destination: "/holidayLighting", permanent: true },
      { source: "/service-areas/:city", destination: "/service-areas", permanent: true },
      { source: "/contractor/:city", destination: "/contractor", permanent: true },
      {
        source: "/real-estate-inspection-repairs-denver/:city",
        destination: "/real-estate-inspection-repairs-denver",
        permanent: true,
      },
      { source: "/location/:city", destination: "/", permanent: true },
      { source: "/blog/location/:city", destination: "/blog", permanent: true },
      { source: "/blog/:slug/:city", destination: "/blog/:slug", permanent: true },
      {
        source: "/about/more/:topic/:city",
        destination: "/about/more/:topic",
        permanent: true,
      },
      {
        source: "/service/:category/service-area/:city",
        destination: "/service/:category",
        permanent: true,
      },
      {
        source: "/service/:category/:service/:city",
        destination: "/service/:category/:service",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
