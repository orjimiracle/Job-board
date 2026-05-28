/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removes "X-Powered-By: Next.js" header [fixes ZAP 10037]
  poweredByHeader: false,

  async headers() {
    return [
      {
        // Apply safe security headers to all routes
        source: '/(.*)',
        headers: [
          // Prevents clickjacking [fixes ZAP 10020]
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },

          // Prevents MIME-type sniffing [fixes ZAP 10021]
          { key: 'X-Content-Type-Options', value: 'nosniff' },

          // Restricts browser feature access [fixes ZAP 10063]
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          },

          // Controls referrer info sent with requests
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      {
        // No caching for HTML pages only [fixes ZAP 10015]
        // Excludes Next.js static assets — those keep their long-lived cache
        source: '/((?!_next/static|_next/image|favicon.ico).*)',
        headers: [
          { key: 'Cache-Control', value: 'no-store, must-revalidate' },
        ],
      },
    ];
  },
};

export default nextConfig;
