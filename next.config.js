/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  basePath: process.env.GITHUB_ACTIONS ? "/nextjs-nextui" : "",
  trailingSlash: true,
  experimental: {
    images: {
      loader: 'akamai',
      path: '',
    },
}
}

module.exports = nextConfig



