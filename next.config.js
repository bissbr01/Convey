/** @type {import('next').NextConfig} */

// Security headers applied to every route. Tuned for this app's needs:
// images load from /public, Mantine/emotion inject runtime <style> tags, and
// the app makes same-origin fetches only.
const ContentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  // Next.js injects inline bootstrap scripts; 'unsafe-inline' is required for the
  // pages-router runtime. Avoid 'unsafe-eval' so eval-based payloads are blocked.
  "script-src 'self' 'unsafe-inline'",
  // Emotion (Mantine) injects styles at runtime, which needs 'unsafe-inline'.
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  // The /explore graph (graphology ForceAtlas2 + Sigma) runs its layout in a
  // Web Worker created from a blob: URL. Allow blob workers explicitly —
  // otherwise worker-src falls back to script-src and the worker is blocked.
  "worker-src 'self' blob:",
  "child-src 'self' blob:",
  "object-src 'none'",
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: ContentSecurityPolicy },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
