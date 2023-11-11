/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5555',
      },
      {
        protocol: "http",
        hostname: "52.66.203.14",
        port: "5555"
      },
      {
        protocol: "https",
        hostname: "file.danlu.online",
        port: "80"
      }
    ],
  },
}

module.exports = nextConfig
