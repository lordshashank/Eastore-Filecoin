const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://eastore-backend-ue30.onrender.com/:path*",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "https://eastore-filecoin.vercel.app",
          },
        ],
      },
    ];
  },
};
