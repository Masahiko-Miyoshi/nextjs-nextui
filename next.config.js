/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  basePath: process.env.GITHUB_ACTIONS ? "/nextjs-nextui" : "",
  trailingSlash: true,
  // images: {
  //   loader: 'akamai',
  //   path: '',
  // },
}

module.exports = nextConfig



