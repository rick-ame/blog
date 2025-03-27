import type { NextConfig } from 'next'
import { build } from 'velite'

const isDev = process.argv.indexOf('dev') !== -1
if (!process.env.VELITE_STARTED && isDev) {
  process.env.VELITE_STARTED = '1'
  build({ watch: true })
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
    ],
  },
  webpack: (config) => {
    config.plugins.push(new VeliteWebpackPlugin())
    return config
  },
}

export default nextConfig

class VeliteWebpackPlugin {
  static started = false
  constructor() {}
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  apply(/** @type {import('webpack').Compiler} */ compiler: any) {
    compiler.hooks.beforeCompile.tapPromise('VeliteWebpackPlugin', async () => {
      if (VeliteWebpackPlugin.started) return
      VeliteWebpackPlugin.started = true
      await build({ clean: true })
    })
  }
}
