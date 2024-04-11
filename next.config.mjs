import withPlaiceholder from '@plaiceholder/next'
/** @type {import('next').NextConfig} */
// import { defaultConfig } from 'next/dist/server/config-shared'
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.pexels.com'
            },
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com'
            }
        ]
    }
}

// module.exports = nextConfig
export default withPlaiceholder(nextConfig)
