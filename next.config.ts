import type { NextConfig } from 'next';
import withPWA from 'next-pwa';

const pwaConfig = withPWA({
 dest: 'public',
 register: true,
 skipWaiting: true,
});

const nextConfig: NextConfig = {
 // your existing config
};

export default pwaConfig(nextConfig as any);
