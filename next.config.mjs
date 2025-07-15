/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "r2.knut.ptj.kr",
            },
        ],
    }
};

export default nextConfig;
