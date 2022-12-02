/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  redirects() {
    return [
      {
        source: '/',
        destination: '/en',
        permanent: true
      }
    ]
  }
}

module.exports = nextConfig
