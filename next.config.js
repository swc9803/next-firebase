const nextConfig = {
	reactStrictMode: false,
	async rewrites() {
		return [
			// {
			// 	source: "/api/:path*",
			// 	destination: `${process.env.API_BASE_URL}/:path*`,
			// },
		];
	},
};

module.exports = nextConfig;
