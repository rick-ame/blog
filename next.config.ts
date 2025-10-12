import type { NextConfig } from 'next'

async function setupVelite() {
  const isDev = process.argv.indexOf('dev') !== -1
  const isBuild = process.argv.indexOf('build') !== -1
  if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
    process.env.VELITE_STARTED = '1'
    const { build } = await import('velite')
    await build({ watch: isDev, clean: !isDev })
  }
}

setupVelite()

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
    ],
  },
}

export default nextConfig
